# /// script
# dependencies = [
#   "loguru",
#   "starlette",
#   "typer",
#   "vt-py",
# ]
# ///

# Forked from https://github.com/VirusTotal/vt-py/blob/master/examples/intelligence_search_to_network_infrastructure.py
#
# Copyright © 2019 The vt-py authors under the Apache License version 2.0.
"""VT Intelligence searches to network IoCs.

This is a script to showcase how programmatic VT Intelligence searches can be
combined with file sandbox behavior lookups in order to generate network
indicators of compromise that can be fed into network perimeter defenses.

Read more:
https://www.virustotal.com/gui/intelligence-overview
https://docs.virustotal.com/reference/search
https://docs.virustotal.com/docs/virustotal-intelligence-introduction
"""

import asyncio
import re
from collections import defaultdict
from typing import Annotated, Any, DefaultDict, Literal, TypedDict, cast

import typer
import vt
from loguru import logger
from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

VT_API_KEY: Secret | None = config("VT_API_KEY", cast=Secret, default=None)

NetworkSingularType = Literal["domain", "ip", "url"]


class ContactedAddress(TypedDict):
    type: NetworkSingularType
    id: str
    context_attributes: dict[str, str] | None


NetworkPluralType = Literal["domains", "ips", "urls"]


class NetworkContainer(TypedDict):
    contacted_addresses: list[ContactedAddress]
    type: NetworkPluralType
    file: str


class VTISearchToNetworkInfrastructureHandler:
    """Class for handling the process of analyzing VTI search matches."""

    _SEARCH_ENTITY_REGEX = re.compile(r"entity: (\w+)")

    def __init__(self, apikey: Secret):
        self.apikey = apikey

        self.queue: asyncio.Queue[NetworkContainer] = asyncio.Queue()
        self.files_queue: asyncio.Queue[str] = asyncio.Queue()

        self.networking_counters: dict[NetworkPluralType, defaultdict[str, int]] = {
            "domains": defaultdict(lambda: 0),
            "ips": defaultdict(lambda: 0),
            "urls": defaultdict(lambda: 0),
        }
        self.networking_infrastructure: DefaultDict[
            str, DefaultDict[NetworkPluralType, Any]
        ] = defaultdict(lambda: defaultdict(lambda: {}))

    async def get_file_async(self, checksum: str, *, relationships: str | None = None):
        """Look up a file object."""
        async with vt.Client(str(self.apikey)) as client:
            return await client.get_object_async(
                f"/files/{checksum}", params={"relationships": relationships}
            )

    async def get_matching_files(self, query: str, max_files: int):
        """Query intelligence for files matching the given criteria."""
        entity_match = self._SEARCH_ENTITY_REGEX.match(query.lower())
        if entity_match and entity_match.group(1) != "file":
            raise ValueError("Only file search queries are valid in this example.")

        async with vt.Client(str(self.apikey)) as client:
            query = query.lower()
            url = "/intelligence/search"

            logger.info("Performing VT Intelligence search...")

            files = client.iterator(url, params={"query": query}, limit=max_files)
            async for matching_file in files:
                sha256 = cast(str, matching_file.sha256)
                await self.files_queue.put(sha256)

            logger.info(
                "Search concluded, waiting on network infrastructure retrieval..."
            )

    async def get_network(self):
        """Retrieve the network infrastructure related to matching files."""
        while True:
            checksum = await self.files_queue.get()
            file_obj = await self.get_file_async(
                checksum, relationships="contacted_domains,contacted_ips,contacted_urls"
            )
            relationships = file_obj.relationships
            contacted_domains = relationships["contacted_domains"]["data"]
            contacted_urls = relationships["contacted_urls"]["data"]
            contacted_ips = relationships["contacted_ips"]["data"]

            await self.queue.put(
                {
                    "contacted_addresses": contacted_domains,
                    "type": "domains",
                    "file": checksum,
                }
            )
            await self.queue.put(
                {
                    "contacted_addresses": contacted_ips,
                    "type": "ips",
                    "file": checksum,
                }
            )
            await self.queue.put(
                {
                    "contacted_addresses": contacted_urls,
                    "type": "urls",
                    "file": checksum,
                }
            )

            self.networking_infrastructure[checksum]["domains"] = contacted_domains
            self.networking_infrastructure[checksum]["ips"] = contacted_ips
            self.networking_infrastructure[checksum]["urls"] = contacted_urls
            self.files_queue.task_done()

    async def build_network(self):
        """Build the stats of the network infrastructure."""
        while True:
            item = await self.queue.get()
            item_type = item["type"]

            for contacted_address in item["contacted_addresses"]:
                if item_type in ("domains", "ips"):
                    address = contacted_address["id"]
                else:
                    # url type should have url in context_attributes
                    address = contacted_address["context_attributes"]["url"]  # type: ignore

                self.networking_counters[item_type][address] += 1

            self.queue.task_done()

    def print_results(self):
        print("=== Results: ===")
        for item in self.networking_infrastructure.items():
            contacted_addr = item[1].values()
            if any(contacted_addr):
                for inf in item[1].items():
                    for key in inf[1]:
                        key = cast(ContactedAddress, key)
                        k = key["type"].upper()
                        context_attributes = key.get("context_attributes") or {}
                        v = context_attributes.get("url") or key["id"]
                        print(f"{k}: {v}")


def main(
    query: str,
    *,
    apikey: Annotated[
        str | None,
        typer.Option(help="Your VirusTotal API key. Defaults to VT_API_KEY ENV."),
    ] = None,
    limit: Annotated[int, typer.Option(help="Limit of files to process.")] = 10,
):
    key = apikey or VT_API_KEY
    assert key, "API key is required."

    async def inner():
        handler = VTISearchToNetworkInfrastructureHandler(Secret(str(key)))

        enqueue_files_task = asyncio.create_task(
            handler.get_matching_files(query, limit)
        )
        _ = asyncio.create_task(handler.get_network())  # noqa: RUF006
        _ = asyncio.create_task(handler.build_network())  # noqa: RUF006

        await asyncio.gather(enqueue_files_task)

        await handler.files_queue.join()
        await handler.queue.join()

        handler.print_results()

    asyncio.run(inner())


if __name__ == "__main__":
    typer.run(main)

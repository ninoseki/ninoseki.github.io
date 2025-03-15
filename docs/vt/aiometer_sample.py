import asyncio
from functools import partial
from typing import Awaitable, Callable

import aiometer
import vt


async def main():
    hashes: list[str] = ["..."]

    async with vt.Client(apikey="...") as client:

        async def get_file(client: vt.Client, h: str):
            return await client.get_object_async(f"/files/{h}")

        fns: list[Callable[..., Awaitable[vt.Object]]] = [
            partial(get_file, client, h) for h in hashes
        ]
        # max_at_once: this is used to limit the maximum number of concurrently running tasks at any given time.
        # max_per_second: this option limits the number of tasks spawned per second.
        #                 This is useful to not overload I/O resources, such as servers that may have a rate limiting policy in place.
        objects: list[vt.Object] = await aiometer.run_all(
            fns, max_at_once=2, max_per_second=2
        )

    for obj in objects:
        print(obj.id, obj.type)


asyncio.run(main())

import asyncio
from collections.abc import Coroutine
from typing import Any

import httpx


async def main():
    urls: list[str] = [
        "http://example.com",
        "http://example.net",
        "http://example.org",
    ]
    async with httpx.AsyncClient() as client:
        coroutines: list[Coroutine[Any, Any, httpx.Response]] = [
            client.get(url) for url in urls
        ]
        responses: list[httpx.Response] = await asyncio.gather(*coroutines)

    for res in responses:
        print(res.url, res.status_code)


asyncio.run(main())

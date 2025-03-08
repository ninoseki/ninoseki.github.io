---
aside: false
---

# Supercharging VT API With vt-py

## Agenda

- What is vt-py?
- Why am I speaking?
- Why vt-py? (or what's new in modern Python?)
- So what?

In short, this talk gives you insight why were you get the following error in vt-py:

```py
>>> client = vt.Client(apikey="dummy")
>>> file = client.get_object("/files/44d88612fea8a8f36de82e1278abb02f")
>>> exit()
Unclosed connector
```

And how to use it well.

## What is vt-py?

> This is the official Python client library for VirusTotal. With this library you can interact with the VirusTotal REST API v3 and automate your workflow quickly and efficiently.
>
> --- https://github.com/VirusTotal/vt-py

```bash
pip install vt-py
```

## Why am I Speaking?

[I'm one of contributors](https://github.com/VirusTotal/vt-py/releases/tag/0.18.0) so.

## Why vt-py? (Or What's New in Modern Python)

vt-py is an **asyncio** native client library (based on [aio-libs/aiohttp](https://github.com/aio-libs/aiohttp)) and also **type-hinted** by default. It provides powerful features to play along with VT REST API.

### What's New in Modern Python?

#### asyncio (Since Python 3.4)

> asyncio is a library to write concurrent code using the async/await syntax.
> asyncio is used as a foundation for multiple Python asynchronous frameworks that provide high-performance network and web-servers, database connection libraries, distributed task queues, etc.
> asyncio is often a perfect fit for IO-bound and high-level structured network code.
>
> --- https://docs.python.org/3/library/asyncio.html

![img](https://devopedia.org/images/article/280/6110.1593611188.png)
(Source: https://devopedia.org/asynchronous-programming-in-python)

```py
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
        print(res.url, res.status_code)  # noqa: T201


asyncio.run(main())
```

#### Type Hints (Python 3.5+)

> Python has support for optional "type hints" (also called "type annotations").
> These "type hints" or annotations are a special syntax that allow declaring the type of a variable.
> By declaring types for your variables, editors and tools can give you better support.
>
> --- https://fastapi.tiangolo.com/python-types/

### vt-py 101

```py
import vt

with vt.Client(apikey="...") as client:
    obj = client.get_object("/files/44d88612fea8a8f36de82e1278abb02f")
```

Note that even it looks non-async, asyncio works under the hood.

```py
# vt-py/vt/client.py
class Client:
    ...

  def get_object(
      self,
      path: str,
      *path_args: typing.Any,
      params: typing.Optional[typing.Dict] = None,
  ) -> Object:
    ...
    return make_sync(self.get_object_async(path, *path_args, params=params))
```

```py
# vt-py/vt/utils.py
import asyncio
import typing


def make_sync(future: typing.Coroutine):
  """Utility function that waits for an async call, making it sync."""
  try:
    event_loop = asyncio.get_event_loop()
  except RuntimeError:
    # Generate an event loop if there isn't any.
    event_loop = asyncio.new_event_loop()
    asyncio.set_event_loop(event_loop)
  return event_loop.run_until_complete(future)
```

**asyncio version**

```py
async with vt.Client(apikey="...") as client:
    obj = await client.get_object_async("/files/44d88612fea8a8f36de82e1278abb02f")
```

```py
hashes: list[str] = ["..."]

async with vt.Client(apikey="dummy") as client:
    coroutines = [client.get_object_async(f"/files/{h}") for h in hashes]
    objects: list[vt.Object] = await asyncio.gather(*coroutines)

for obj in objects:
    print(obj.id, obj.type)  # noqa: T201
```

Note that the above example is not a good example since it may violate the rate limit.

> The Public API is limited to 500 requests per day and a rate of 4 requests per minute.
> The Public API must not be used in commercial products or services.
>
> The Premium API does not have request rate or daily allowance limitations, limits are governed by your licensed service step.
>
> --- https://docs.virustotal.com/reference/public-vs-premium-api

You have to manage [Semaphore](https://docs.python.org/3/library/asyncio-sync.html#semaphore). But it's bothersome.

So I recommend to use [florimondmanca/aiometer](https://github.com/florimondmanca/aiometer).

```py
hashes: list[str] = ["..."]

async with vt.Client(apikey="...") as client:

    async def get_file(client: vt.Client, h: str):
        return await client.get_object_async(f"/files/{h}")

    tasks: list[Callable[..., Awaitable[vt.Object]]] = [
        partial(get_file, client, h) for h in hashes
    ]
    # max_at_once: this is used to limit the maximum number of concurrently running tasks at any given time.
    # max_per_second: this option limits the number of tasks spawned per second.
    #                 This is useful to not overload I/O resources, such as servers that may have a rate limiting policy in place.
    objects: list[vt.Object] = await aiometer.run_all(
        tasks, max_at_once=2, max_per_second=2
    )

for obj in objects:
    print(obj.id, obj.type)  # noqa: T201
```

### Appendix: Why and What Is the `with` statement?

> The with statement is used to wrap the execution of a block with methods defined by a context manager.
>
> The context manager’s **exit**() method is invoked. If an exception caused the suite to be exited, its type, value, and traceback are passed as arguments to **exit**(). Otherwise, three None arguments are supplied.
>
> --- https://docs.python.org/3/reference/compound_stmts.html

```py
# vt-py/client.py
class Client:
  ...

  async def __aenter__(self):
    return self

  async def __aexit__(self, item_type, value, traceback):
    await self.close_async()

  def __enter__(self):
    return self

  def __exit__(self, item_type, value, traceback):
    self.close()

  async def close_async(self) -> None:
    """Like :func:`close` but returns a coroutine."""
    # Using getattr(self, '_session', None) instead of self._session because
    # close_async can be called from __del__ when the object is not yet
    # inialized and therefore the object doesn't have a _session. Calling
    # self._session in that case would raise AttributeError. See:
    # https://github.com/VirusTotal/vt-py/issues/125#issue-1449917146
    session = getattr(self, "_session", None)
    if session:
      await session.close()
      self._session = None

  def close(self) -> None:
    """Closes the client.

    When the client is not needed anymore it must be closed for releasing
    resources like TCP connections.

    Not closing the client after it's used might show error tracebacks
    indicating it was not properly closed.
    """
    return make_sync(self.close_async())
```

### Iterator

Also there is `Iterator` which is suitable for VT Intelligence search.

```py
for obj in client.iterator(
    "/intelligence/search", params={"query": "..."},  batch_size=10, limit=100
):
    print(obj)
# or
async for obj in client.iterator(
    "/intelligence/search", params={"query": "..."}, batch_size=10, limit=100
):
    print(obj)
```

- `batch_size`: Maximum number of objects retrieved on each call to the endpoint. If not provided the server will decide how many objects to return.
- `limit`: Maximum number of objects that will be returned by the iterator. If a limit is not provided the iterator continues until it reaches the last object in the collection.

`batch_size=10, limit=100` iterates over the most recent 100 objects, retrieving them in batches of 10.

### Feed

```py
for obj in client.feed(vt.FeedType.URLS):
    print(obj)
# or
async for obj in client.feed(vt.FeedType.URLS):
    print(obj)
```

### Object

VT object data layout:

```json
{
  "data": {
    "attributes": {},
    "context_attributes": {},
    "relationships": {},
    "id": "...",
    "links": {
      "self": "https://www.virustotal.com/ui/..."
    },
    "type": "..."
  },
  "meta": {
    "cursor": "..."
  }
}
```

- `id`: ID.
- `type:` Object type.
- `links`: Links to self, next, etc.
- `attributes`: Object attributes.
- `context_attributes`: Context attributes. Automatically added by VT through analysis?. Optional.
- `relationships`: Links or dependencies between objects. Should be explicitly requested via `relationships` query parameters. Optional.
- `meta`: Metadata for pagination. cursor, days_back, etc. Optional.

**FileBehavior context_attributes** (Feed only?)

> The FileBehaviour object will contain an extra attribute (context_attributes), which is a JSON structure that contains links for downloading the PCAP, HTML, EVTX and memdump files generated in the analysis through our API without consuming your quota (bear in mind that you will have to use your API Key and add it to the request headers in order to get access to the behaviour reports pointed by those two links).
>
> --- https://docs.virustotal.com/reference/feeds-file-behaviour

```json
"context_attributes": {
  "file_md5": "...",
  "file_sha1": "...",
  "file_type_tag": "...",
  "html_report": "https://www.virustotal.com/api/v3/feeds/file-behaviours/<TOKEN>/html",
  "pcap": "https://www.virustotal.com/api/v3/feeds/file-behaviours/<TOKEN>/pcap",
  "evtx": "https://www.virustotal.com/api/v3/feeds/file-behaviours/<TOKEN>/evtx",
  "memdump": "https://www.virustotal.com/api/v3/feeds/file-behaviours/<TOKEN>/memdump"
}
```

**IP address relationships**

```py
# https://www.virustotal.com/api/v3/{collection name}/{object id}?relationships={relationship 1},{relationship 2}
client.get_object(
    "/ip_addresses/...",
    params={"relationships": "communicating_files,downloaded_files"},
)
```

```json
"relationships": {
  "communicating_files": {
    "data": [
      {
        "id": "...",
        "type": "file"
      }
    ],
    "links": {}
  },
  "downloaded_files": {
    "data": [
      {
        "id": "...",
        "type": "file"
      }
    ],
    "links": {}
  }
}
```

vt-py's `Object`' fields:

- `id`: SHA256 (`file`), domain (`domain`), URL SHA256 (`url`), etc.
- `type`: `file`, `domain`, `url`, etc.
- `context_attributes`
- `relationships`

```py
>>> obj = client.get_object("/files/275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f")
>>> obj.type
file
>>> obj.id
275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f
>>> obj.context_attributes
{}
>>> obj.relationships
{}
```

`attributes` are stored as `Object` object's attributes and you can access it via the dot notation or `get` method.

```json
{
  "data": {
    "attributes": {
      "reputation": 0,
      "first_seen_itw_date": 1582585760,
      "last_analysis_stats": {
        "malicious": 0,
        ...
      }
      ...
    },
    "id": "...",
    "type": "file"
  }
}
```

```py
>>> obj.reputation
0
>>> obj.get("reputation")
0
```

Note that there is a different between `#get` and the dot notation.

- `get` method returns an original value.
- The dot notation returns a value as `datetime.datetime` if an attribute name matches with any of:

- `^.+_date$`
- `^date$`
- `^last_login$`
- `^user_since$`

```py
>>> obj.first_seen_itw_date
datetime.datetime(2020, 2, 24, 23, 9, 20)
>>> obj.get("first_seen_itw_date")
1582585760
```

Also note that the dot notation only supports top level fields.

```py
>>> obj.last_analysis_stats
{'malicious': 0, ...}
>>> obj.last_analysis_stats.malicious
AttributeError: 'WhistleBlowerDict' object has no attribute 'malicious'
```

`#to_dict` is for getting the whole data.

```py
>>> obj.to_dict()
{
    'type': 'file',
    'id': '275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f',
    'attributes': { ... },
}
```

I recommend to use `dictpath` (based on [h2non/jsonpath-ng](https://github.com/h2non/jsonpath-ng)).

**Bad**

```py
# can have AttributeError and KeyError
obj.pe_info["imphash"]
# redundant
obj.get("pe_info", {}).get("imphash")
```

**Good** (Or Better)

Use `dictpath`, a tiny wrapper of `jsonpath-ng`.

```py
# "pip install jsonpath-ng" is needed
# https://github.com/VirusTotal/vt-py/blob/master/examples/utils/dictpath.py
>>> import dictpath
>>> obj = vt.Object(...)
>>> data = obj.to_dict()
>>> dictpath.get(data, "$.id")
...
>>> dictpath.get(data, "$.attributes.pe_info.imphash")
...
>>> dictpath.get_all(data, "$.attributes.sandbox_verdicts.*.sandbox_name")
['VirusTotal Jujubox', '...']
```

## Appendix: URL ID Utility

> Whenever we talk about an URL identifier in this documentation we are referring to a sequence of characters that uniquely identify a specific URL. Those identifiers can adopt two forms:
>
> - The SHA-256 of the canonized URL.
> - The string resulting from encoding the URL in base64 (without the "=" padding).
>
> --- https://docs.virustotal.com/reference/url

```py
>>> import vt
>>> vt.url_id("https://example.com")
aHR0cHM6Ly9leGFtcGxlLmNvbQ
```

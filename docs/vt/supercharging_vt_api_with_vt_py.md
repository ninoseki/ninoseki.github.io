---
layout: home
---

# Supercharging VT API With vt-py

## Agenda

- What is vt-py?
- Why am I speaking?
- Why vt-py? (or what's new in modern Python?)
- Eventually, all at once

In short, this talk gives you insight why were you get the following warning in vt-py:

```py
>>> client = vt.Client(apikey="dummy")
>>> obj = client.get_object("/files/44d88612fea8a8f36de82e1278abb02f")
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

vt-py can:

- Get/scan/download/post an object
  - Including [creating a retrrohunt job](https://virustotal.github.io/vt-py/quickstart.html#start-and-abort-a-retrohunt-job) and [creating livehunt ruleset](https://virustotal.github.io/vt-py/quickstart.html#create-a-livehunt-ruleset).
- Handling continuation cursor (e.g. Intelligence search).

## Why am I Speaking?

[I'm one of contributors](https://github.com/VirusTotal/vt-py/releases/tag/0.18.0) so.

## Why vt-py? (Or What's New in Modern Python)

vt-py is an **asyncio** native client library (based on [aio-libs/aiohttp](https://github.com/aio-libs/aiohttp)) and also **type-hinted** by default. It provides powerful features to play along with VT REST API.

### What's New in Modern Python?

#### asyncio (Python 3.4+)

> asyncio is a library to write concurrent code using the async/await syntax.
> asyncio is used as a foundation for multiple Python asynchronous frameworks that provide high-performance network and web-servers, database connection libraries, distributed task queues, etc.
> asyncio is often a perfect fit for IO-bound and high-level structured network code.
>
> --- https://docs.python.org/3/library/asyncio.html

![img](https://devopedia.org/images/article/280/6110.1593611188.png)
(Source: https://devopedia.org/asynchronous-programming-in-python)

#### Type Hints (Python 3.5+)

> Python has support for optional "type hints" (also called "type annotations").
> These "type hints" or annotations are a special syntax that allow declaring the type of a variable.
> By declaring types for your variables, editors and tools can give you better support.
>
> --- https://fastapi.tiangolo.com/python-types/

#### Appendix: Inline Script Metadata (PEP 723)

[Inline script metadata](https://packaging.python.org/en/latest/specifications/inline-script-metadata/) allows you to define dependencies required for a script.
[pypa/hatch](https://github.com/pypa/hatch), [astral-sh/uv](https://github.com/astral-sh/uv), etc. support it.
`uv run` with the inline script metadata installs dependencies in an isolated venv per script under `~/.cache/uv`.

```py
# /// script
# dependencies = [
#   "vt-py==0.19.0",
# ]
# ///

import vt

print(vt.__version__)
print(vt.__file__)
```

```bash
$ uv run test.py
Installed 11 packages in 13ms
0.19.0
~/.cache/uv/environments-v2/test-8507df15a68ed868/lib/python3.12/site-packages/vt/__init__.py
```

### vt-py 101

```py
import vt

with vt.Client(apikey="...") as client:
    obj = client.get_object("/files/44d88612fea8a8f36de82e1278abb02f")
```

It looks non-async. But asyncio works under the hood.

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

async with vt.Client(apikey="...") as client:
    coroutines = [client.get_object_async(f"/files/{h}") for h in hashes]
    objects: list[vt.Object] = await asyncio.gather(*coroutines)

for obj in objects:
    print(obj.id, obj.type)
```

### Appendix: Why and What Is the `with` Statement?

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

Also there is `Iterator` which is suitable for handling continuation cursor (e.g. Intelligence search).

```json
{
  "meta": {
    "cursor": "..."
  },
  "data": []
}
```

```py
# Intelligence search
for obj in client.iterator(
    "/intelligence/search", params={"query": "..."},  batch_size=10, limit=100
):
    print(obj)

# IoC stream
for obj in client.iterator("/ioc-stream"):
    print(obj)

# async ver.
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

# async ver.
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
  }
}
```

- `id`: ID.
- `type:` Object type.
- `links`: Links to self, next, etc.
- `attributes`: Object attributes.
- `context_attributes`: Context attributes. Automatically added by VT through analysis?. Optional.
- `relationships`: Links or dependencies between objects. Should be explicitly requested via `relationships` query parameters. Optional.

**FileBehavior context_attributes** (Feed only?)

> The FileBehavior object will contain an extra attribute (context_attributes), which is a JSON structure that contains links for downloading the PCAP, HTML, EVTX and memdump files generated in the analysis through our API without consuming your quota (bear in mind that you will have to use your API Key and add it to the request headers in order to get access to the behaviour reports pointed by those two links).
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

- `communicating_files`: lists all files presenting any sort of traffic to the given IP address at some point of its execution.
- `downloaded_files`: returns a list of files that were available from an URL under the given IP address at some moment.

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

`vt.Object` attributes:

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

#### Playing With Attributes

`attributes` are stored as `Object` instance's attributes and you can access it via the dot notation or `get` method.

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

Also note that the dot notation only supports top level attributes.

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

> [!NOTE]
>
> `#to_dict` result is a dict but it has `collections.UserDict` (= `vt.object.WhistleBlowerDict`) inside. Thus converting it as a JSON is a bit tricky. See the below appendix for details.

> [!Important]
>
> Update: the above issue is fixed in the latest version (0.20.0).

##### Appendix: `#to_dict` to JSON

> [!Important]
>
> Update: you need the following hack only when using vt-py <0.20.0. >=0.20.0 doesn't need the hack.

You have to use `UserDictJsonEncoder` when serializing `#to_dict` result as a JSON. Otherwise you will get `TypeError: Type is not JSON serializable: WhistleBlowerDict`.

```py
import json

import vt
from vt.object import UserDictJsonEncoder

obj = vt.Object(...)

json_str = json.dumps(obj.to_dict(), cls=UserDictJsonEncoder)
```

> [!NOTE]
>
> I created a PR ([vt-py#211](https://github.com/VirusTotal/vt-py/pull/211)) to address this issue and I wish it will be shipped in a next version soon.

> [!Important]
>
> Update: it's been merged and shipped as v0.20.0!

##### Appendix: Playing With Complex (Nested) Attributes

I recommend to use [dictpath](https://github.com/VirusTotal/vt-py/blob/master/examples/utils/dictpath.py) when interacting with complex/nested attributes.

**Bad** (Or not so good)

```py
# can have AttributeError and KeyError
obj.pe_info["imphash"]
# redundant
obj.get("pe_info", {}).get("imphash")
```

**Good** (Or better)

Use [dictpath](https://github.com/VirusTotal/vt-py/blob/master/examples/utils/dictpath.py), a tiny wrapper of [h2non/jsonpath-ng](https://github.com/h2non/jsonpath-ng).

```json
{
  "data": {
    "id": "...",
    "type": "file",
    "attributes": {
      "pe_info": {
        "sections": [
          {
            "name": "UPX0",
            "chi2": -1.0,
            "virtual_address": 4096,
            "entropy": 0.0,
            "raw_size": 0,
            "flags": "rwx",
            "virtual_size": 1458176,
            "md5": "d41d8cd98f00b204e9800998ecf8427e"
          },
          ...
        ]
      },
      "sandbox_verdicts": {
        "Zenbox": {
          "category": "harmless",
          "confidence": 1,
          "sandbox_name": "Zenbox",
          "malware_classification": [
            "CLEAN"
          ]
        },
        ...
      }
      ...
    }
  }
}

```

```py
# "pip install jsonpath-ng" is needed
>>> import dictpath
>>> obj = vt.Object(...)
>>> data = obj.to_dict()
>>> dictpath.get_all(data, "$.attributes.pe_info.sections[*].md5")
['d41d8cd98f00b204e9800998ecf8427e', ...]
>>> dictpath.get_all(data, "$.attributes.sandbox_verdicts.*.sandbox_name")
['Zenbox', ...]
```

## Eventually, All at Once

### Hunting URLs With Intelligence Search

**curl/xh ver.**

> [!NOTE]
>
> [ducaale/xh](https://github.com/ducaale/xh): Friendly and fast tool for sending HTTP requests.

```bash
# brew install xh jq
# or
# choco install xh jq
$ xh https://www.virustotal.com/api/v3/intelligence/search x-apikey:... query=="entity:url ..."
{
  "data": [
    {
      "id": "...",
      "type": "url",
      "links": {},
      "attributes": {},
      "context_attributes": {
        "url": "..."
      }
    }
  ],
  "meta": {
    "cursor": "...",
    ...
  },
}
$ xh https://www.virustotal.com/api/v3/intelligence/search x-apikey:... query=="entity:url ..." | jq -r ".data[].context_attributes.url"
```

Simple enough. But how do you handle continuation cursor (`meta.cursor`)?

**vt-cli ver.**

```bash
# brew install virustotal-cli
# or
# choco install vt-cli
$ vt search "entity:url ..." --format json | jq -r ".[]._context_attributes.url"
MORE WITH:
vt search 'entity:url p:1+' --format=json --cursor=...
...
```

**vt-py ver.**

```py
import vt


with vt.Client(apikey="...") as client:
    for obj in client.iterator(
        "/intelligence/search", params={"query": "entity:url ...."}
    ):
        url: str | None = obj.context_attributes.get("url")
        if url is None:
            continue

        do_something(url)
```

### VT Intelligence Search to Pandas

<<< @/vt/pandas_sample.py

### VT Intelligence Searches to Network IoCs

<<< @/vt/intelligence_search_to_network_infrastructure.py

```bash
$ uv run intelligence_search_to_network_infrastructure.py "entity:file AND sha256:7c347a029d0d8600dc58885d6f359517e093f9f13ccb9a697c2655ed5f87f4d"
=== Results: ===
DOMAIN: acroipm2.adobe.com
DOMAIN: cloud.ccm19.de
DOMAIN: content-autofill.googleapis.com
DOMAIN: edgedl.me.gvt1.com
DOMAIN: google.com
DOMAIN: i.lencr.org
DOMAIN: ka-f.fontawesome.com
DOMAIN: kit.fontawesome.com
DOMAIN: media-exp1.licdn.com
DOMAIN: media.licdn.com
DOMAIN: media.tagembed.com
DOMAIN: platform.linkedin.com
DOMAIN: s3.us-west-1.wasabisys.com
DOMAIN: widget.tagembed.com
DOMAIN: www.eicar.org
DOMAIN: www.youtube.com
DOMAIN: x1.i.lencr.org
IP_ADDRESS: 104.18.40.68
IP_ADDRESS: 104.21.26.223
IP_ADDRESS: 104.244.42.8
IP_ADDRESS: 104.26.6.103
IP_ADDRESS: 104.26.7.103
IP_ADDRESS: 104.26.9.185
IP_ADDRESS: 13.107.42.14
IP_ADDRESS: 142.250.125.94
IP_ADDRESS: 142.251.143.106
IP_ADDRESS: 142.251.143.110
IP_ADDRESS: 142.251.143.138
IP_ADDRESS: 142.251.143.142
IP_ADDRESS: 142.251.143.163
IP_ADDRESS: 142.251.143.170
IP_ADDRESS: 142.251.143.174
IP_ADDRESS: 142.251.143.202
IP_ADDRESS: 142.251.143.206
IP_ADDRESS: 148.251.5.29
IP_ADDRESS: 152.199.21.118
IP_ADDRESS: 172.64.147.188
URL: http://x1.i.lencr.org/
```

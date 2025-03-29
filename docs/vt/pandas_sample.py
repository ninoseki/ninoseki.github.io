# /// script
# dependencies = [
#   "arakawa",
#   "starlette",
#   "vt-py>=0.20.0",
# ]
# ///


import collections

import arakawa as ar
import pandas as pd
import vt
from starlette.config import Config
from starlette.datastructures import Secret

config = Config(".env")

VT_API_KEY: Secret = config("VT_API_KEY", cast=Secret, default="")  # type: ignore

with vt.Client(str(VT_API_KEY)) as client:
    objects = list(
        client.iterator(
            "/intelligence/search", params={"query": "entity:url p:10+"}, limit=10
        )
    )


def extract_attributes_with_url(obj: vt.Object) -> dict:
    # extract attributes and add url in context_attributes
    attributes = obj.to_dict()["attributes"]
    attributes["url"] = obj.context_attributes.get("url")
    return attributes


data = [extract_attributes_with_url(obj) for obj in objects]

df = pd.json_normalize(data)

ar.Report(
    ar.DataTable(df),
    df["title"].value_counts().to_frame(),
    df["favicon.raw_md5"].value_counts().to_frame(),
).save("sample.html", open=True)

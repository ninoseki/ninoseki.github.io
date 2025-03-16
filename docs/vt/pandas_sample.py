# /// script
# dependencies = [
#   "arakawa",
#   "starlette",
#   "vt-py",
# ]
# ///


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


records = [obj.to_dict()["attributes"] for obj in objects]

df = pd.DataFrame.from_records(records)

ar.Report(
    ar.DataTable(df),
    df["tld"].value_counts().to_frame(),
).save("sample.html", open=True)

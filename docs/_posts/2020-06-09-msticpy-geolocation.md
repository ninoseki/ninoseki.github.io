---
title: msticpyでIPジオロケーションデータをマッピングする
date: 2020-06-09
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

## msticpyとは

[msticpy](https://github.com/microsoft/msticpy)(Microsoft Threat Intelligence Python Security Tools)はMicrosoftが開発しているOSSです。

具体的にどんなものかというと、Jupyter Notebookにthreat hunting/investigationをするための機能を追加したツールとなります。

msticpyが持つ主な機能は以下の3つです。

- sectools - Python security tools to help with data enrichment, analysis or investigation.
- nbtools - Jupyter-specific UI tools such as widgets, plotting and other data display.
- data - data layer and pre-defined queries for Azure Sentinel, MDATP and other data sources.

この記事では、msticpyの入門編としてsectools(iocextract & geoip)及びnbtools(foliummap)の機能を使ってIPのジオローケーションデータをマッピングするやり方を紹介します。

## インストール

```bash
pip install msticpy
```

## 設定

IPのジオロケーションデータを取得するために、今回は[MaxMind](https://www.maxmind.com/en/home)のデータベースを使用します。

MaxMindのアカウントを作成し、トークンを`MAXMIND_AUTH`という名前の環境変数に設定してください。その後、下記の内容の`msticpyconfig.yaml`を作成してください。

```yaml
OtherProviders:
  GeoIPLite:
    Args:
      AuthKey:
        EnvironmentVar: "MAXMIND_AUTH"
      DBFolder: "~/.msticpy"
    Provider: "GeoLiteLookup"
```

これで設定完了です。

## ノートブックの作成

今回は例として下記のフィードからIPを抽出してマッピングしてみます。

 - [https://feodotracker.abuse.ch/downloads/ipblocklist.csv](https://feodotracker.abuse.ch/downloads/ipblocklist.csv])

Jupyter Notebookを起動し、新しいノートブックを作成してください。

```bash
jupyter notebook
```

### IPv4の抽出

 ```python
 from IPython.display import display
from msticpy.nbtools.foliummap import FoliumMap
from msticpy.sectools import IoCExtract
from msticpy.sectools.geoip import GeoLiteLookup
import requests

url = "https://feodotracker.abuse.ch/downloads/ipblocklist.csv"

res = requests.get(url)
text = res.text

# Extract IPv4s from the text
ioc_extractor = IoCExtract()
iocs_found = ioc_extractor.extract(text)
ip_addr_list = iocs_found.get("ipv4", [])
print(ip_addr_list)
```

![](https://i.imgur.com/O1yd1Sd.png)

抽出したIPアドレスのジオロケーションデータをルックアップし、マッピングします。

 ```python
# Lookup gelocations
iplocation = GeoLiteLookup()
loc_results, ip_entries = iplocation.lookup_ip(ip_addr_list=ip_addr_list)

folium_map = FoliumMap()

# Set Icon properties to display
icon_props = {"color": "red"}

# Add the IP set to the map
folium_map.add_ip_cluster(ip_entities=ip_entries, **icon_props)

# Display the map (or just have folium_map
display(folium_map)
```

![](https://i.imgur.com/VXe1xIQ.png)

## Notes

msticpyのIoC抽出機能はナイーブな正規表現ベースで実装されています。

- [https://github.com/microsoft/msticpy/blob/a1d53bffdcbfa6a633f440a3dcf7f17a04ebd4c1/msticpy/sectools/iocextract.py#L119-L147](https://github.com/microsoft/msticpy/blob/a1d53bffdcbfa6a633f440a3dcf7f17a04ebd4c1/msticpy/sectools/iocextract.py#L119-L147)

このため、例えば下記のような文字列からはIoCを抽出できませんので注意が必要です。

`1.1.1[.]1 example[.]com`

![](https://i.imgur.com/AWpmn4W.png)

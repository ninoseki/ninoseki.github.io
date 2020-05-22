---
title: IoC 抽出のためのテクニックとツール
date: 2018-11-07
---

## 前提

- IoC(Indicator of Compromise)とは、セキュリティインシデントに関連するインディケーターのことです。具体的には、マルウェアのハッシュ値(MD5, SHA256, sssdeep, etc.)やその通信先の IP アドレス、URL 等がこれに該当します。
- 一般的に、IoC はブラックリストへの適用や情報共有のために用いられます。

## IoC 抽出が必要とされる背景

セキュリティベンダーから提供されるレポートの中に、IoC が含まれていることがありますが、構造化されたデータとして提供されていない場合がほとんどです。(例えば、文中にドメイン名や IP アドレスが記載されているだけ等)

こういったレポートから、IoC を構造化されたデータとして抽出することで、ブラックリストへの適用や情報共有のためのプラットフォームへの入力がスムーズに行うことができます。

また、IoC 抽出は"Compromise"なインディケーターの抽出以外にも使用できます。例えば、ログファイルからそこに含まれる IP アドレスを取り出したい、テキストファイルから URL を取り出したい、といった場合に IoC 抽出ツールを活用することができます。

## IoC 抽出のテクニック

### Defang と Refang

IPアドレス、ドメイン、URL等の IoC は、誤ってそれらに直接通信をしてしまうリスクを避けるため、 それらの値の一部に記号を入れて無害化させる処理が一般的です。
これを Defang と言います。

- Defang の例:
  - `1.1.1.1` => `1.1.1[.]1`
  - `test.com` => `test(.)com`
  - `http://test.com` => `hxxp://test.com`
  - `test@test.com` => `test[at]test.com`

逆に、これらの Defang された値を元に戻すことを Refang と言います。

IoC を抽出するにあたっては、

- Defang された状態の IoC を特定する仕組み
- Defang された状態の IoC を Refang して元に戻す仕組み

が求められます。

### 正規表現

多くの IoC 抽出ツールは、正規表現を用いて IoC を抽出します。例えば MD5, SHA1, SHA256 及び SHA512 を抽出するための正規表現は以下のようになります。

```python
MD5_RE = re.compile(r"(?:[^a-fA-F\d]|\b)([a-fA-F\d]{32})(?:[^a-fA-F\d]|\b)")
SHA1_RE = re.compile(r"(?:[^a-fA-F\d]|\b)([a-fA-F\d]{40})(?:[^a-fA-F\d]|\b)")
SHA256_RE = re.compile(r"(?:[^a-fA-F\d]|\b)([a-fA-F\d]{64})(?:[^a-fA-F\d]|\b)")
SHA512_RE = re.compile(r"(?:[^a-fA-F\d]|\b)([a-fA-F\d]{128})(?:[^a-fA-F\d]|\b)")
# Source: https://github.com/InQuest/python-iocextract/blob/master/iocextract.py
```

Defang を踏まえた上で、どれだけ上手いこと正規表現を書けるか、という点が IoC 抽出ツールの差別化ポイントとなります。

## 代表的な IoC 抽出ツール

代表的な IoC 抽出ツールを3つ紹介します。

### [InQuest/python-iocextract](https://github.com/InQuest/python-iocextract) ⭐️63

[InQuest](https://inquest.net/) が開発している IoC 抽出ツールです。

- 言語: Python
- サポートする IoC のタイプ: IPv4, IPv6, Domain, URL, Email, Yara rule, MD5, SHA1, SHA256, SHA512

対応している Defang ルールの豊富さが大きな特徴です。詳しくは[こちら](https://github.com/InQuest/python-iocextract#more-details)を参照してください。

#### 実行例

[input.txt](https://gist.github.com/ninoseki/104f55329f5a80cada6a0c47e291f9d1) を入力した場合の iocextract の出力結果を以下に示します。

```sh
$ cat input.txt | iocextract
```

```
jetos[.]com
jetos[.]com
jetos[.]com
53[.]147/VxQG
210[.]208/wBNh1
jetos[.]com/qIDj
53[.]147/VxQG
82.221.100.52
151.106.53.147
151.106.53.147
153.92.210.208
153.92.210.208
167.99.121.203
151.106.53[.]147
153.92.210[.]208
151.106.53[.]147
4f83c01e8f7507d23c67ab085bf79e97
f188936d2c8423cf064d6b8160769f21
cca227f70a64e1e7fcf5bccdc6cc25dd
aa3f303c3319b14b4829fe2faa5999c1
182ee99b4f0803628c30411b1faa9992
126067d634d94c45084cbe1d9873d895
5f45532f947501cf024d84c36e3a19a1
fce54b4886cac5c61eda1e7605483ca3
c1942a0ca397b627019dace26eca78d8
126067d634d94c45084cbe1d9873d895
f613846eb5bed227ec1a5f8df7e678d0
50c60f37922ff2ff8733aaeaa9802da5
c500dae1ca41236830b59f1467ee96c1
f613846eb5bed227ec1a5f8df7e678d0
bdc4b9f5af9868e028dd0adc10099a4e6656e9f0ad12b2e75a30f5ca0e34489d
fb9f7fb3c709373523ff27824ed6a31d800e275ec5217d8a11024a3dffb577dd
d3450966ceb2eba93282aace7d7684380d87c6621bbd3c4f621caa079356004a
f12df6984bb65d18e2561bd017df29ee1cf946efa5e510802005aeee9035dd53
bdc4b9f5af9868e028dd0adc10099a4e6656e9f0ad12b2e75a30f5ca0e34489d
f12df6984bb65d18e2561bd017df29ee1cf946efa5e510802005aeee9035dd53
```

### [cmu-sei/cyobstract](https://github.com/cmu-sei/cyobstract) ⭐️28

Carnegie Mellon University の Software Engineering Institute が開発している IoC 抽出ツールです。

- 言語: Python
- サポートする IoC のタイプ: IPv4, IPv4 CIDR, IPv4 range, IPv6, IPv6 CIDR, IPv6 range, MD5, SHA1, SHA256, ssdeep, FQDN, email address, URL, user agent, filename, filepath, registry key, ASN, CVE, country, ISP, ASN owner, malware, attack type

cyobstract はレポートから IoC を抽出することを目的として開発されたツールで、IoC に加えてそのレポートが扱う"トピック"を抽出することができます。

また、IoC 抽出用の正規表現ルール(の一部)を自動生成している点も大きな特徴です。

#### 実行例

cyobstract には CLI インターフェースがないため、簡単なスクリプトを書きました。IoC を抽出した結果を JSON として出力するだけのものです。

```py
from cyobstract import extract
import json
import sys

text = sys.stdin.read()
results = extract.extract_observables(text)

print(json.dumps(results))
```

```sh
$ cat input.txt | python test.py | jq.
```

```json
{
  "ipv4addr": [
    "151.106.53.147",
    "153.92.210.208",
    "167.99.121.203",
    "82.221.100.52"
  ],
  "ipv6addr": [],
  "ipv4range": [],
  "ipv6range": [],
  "ipv4cidr": [],
  "ipv6cidr": [],
  "asn": [],
  "fqdn": [
    "eservake.jetos[.]com"
  ],
  "email": [],
  "filename": [
    "GUP.exe",
    "GUP.txt",
    "certutil.exe",
    "cmd.exe",
    "esentutil.exe",
    "esentutl.exe",
    "libcurl.dll",
    "libcurl.txt",
    "padre1.txt",
    "padre2.txt",
    "padre3.txt",
    "グテマラ大使講演会案内状.doc",
    "米国接近に揺れる北朝鮮内部.doc",
    "自民党海洋総合戦略小委員会が政府に提言申し入れ.doc"
  ],
  "url": [
    "http://151.106.53[.]147/VxQG",
    "http://153.92.210[.]208/wBNh1",
    "http://eservake.jetos[.]com/qIDj"
  ],
  "md5": [
    "126067d634d94c45084cbe1d9873d895",
    "182ee99b4f0803628c30411b1faa9992",
    "4f83c01e8f7507d23c67ab085bf79e97",
    "50c60f37922ff2ff8733aaeaa9802da5",
    "5f45532f947501cf024d84c36e3a19a1",
    "aa3f303c3319b14b4829fe2faa5999c1",
    "c1942a0ca397b627019dace26eca78d8",
    "c500dae1ca41236830b59f1467ee96c1",
    "cca227f70a64e1e7fcf5bccdc6cc25dd",
    "f188936d2c8423cf064d6b8160769f21",
    "f613846eb5bed227ec1a5f8df7e678d0",
    "fce54b4886cac5c61eda1e7605483ca3"
  ],
  "sha1": [],
  "sha256": [
    "bdc4b9f5af9868e028dd0adc10099a4e6656e9f0ad12b2e75a30f5ca0e34489d",
    "d3450966ceb2eba93282aace7d7684380d87c6621bbd3c4f621caa079356004a",
    "f12df6984bb65d18e2561bd017df29ee1cf946efa5e510802005aeee9035dd53",
    "fb9f7fb3c709373523ff27824ed6a31d800e275ec5217d8a11024a3dffb577dd"
  ],
  "ssdeep": [],
  "filepath": [
    "C:\\ProgramData",
    "C:\\ProgramData\\GUP.exe",
    "C:\\ProgramData\\libcurl.dll",
    "C:\\ProgramData\\padre1.txt",
    "C:\\ProgramData\\padre2.txt",
    "C:\\ProgramData\\padre3.txt",
    "C:\\Windows\\System32\\cmd.exe",
    "C:\\Windows\\System32\\esentutl.exe"
  ],
  "regkey": [],
  "useragent": [],
  "cve": [],
  "cc": [
    "DPRK",
    "Guatemala",
    "Japan",
    "Macau",
    "United States"
  ],
  "isp": [],
  "asnown": [],
  "incident": [],
  "malware": [
    "apt.backdoor.win.uppercut"
  ],
  "topic": [
    "2",
    "C2",
    "backdoor",
    "beaconing",
    "compromise",
    "deletion",
    "phishing"
  ]
}
```

Notes:
  - [jq](https://stedolan.github.io/jq/) を使用して出力結果を整形しています。
  - 上記の出力結果に含まれる URL 及び Domain の値は、念のため Defang しています。

### [sroberts/cacador](https://github.com/sroberts/cacador) ⭐️63

[@sroberts](https://www.sans.org/instructors/scott-roberts) が開発している IoC 抽出ツールです。

- 言語: Go
- サポートする IoC のタイプ: md5, sha1, sha256, sha521, ipv4, ipv6, domain, url, email, doc, exe, flash, img, mac, web, zip, cve

Go で書かれており、マルチプラットフォームで簡単に使える点がウリのツールです。

#### 実行例

```sh
$ cat input.txt | cacador
```

```json
{
  "hashes": {
   "md5s": [
    "4f83c01e8f7507d23c67ab085bf79e97",
    "f188936d2c8423cf064d6b8160769f21",
    "cca227f70a64e1e7fcf5bccdc6cc25dd",
    "aa3f303c3319b14b4829fe2faa5999c1",
    "182ee99b4f0803628c30411b1faa9992",
    "126067d634d94c45084cbe1d9873d895",
    "5f45532f947501cf024d84c36e3a19a1",
    "fce54b4886cac5c61eda1e7605483ca3",
    "c1942a0ca397b627019dace26eca78d8",
    "f613846eb5bed227ec1a5f8df7e678d0",
    "50c60f37922ff2ff8733aaeaa9802da5",
    "c500dae1ca41236830b59f1467ee96c1"
   ],
   "sha1s": null,
   "sha256s": [
    "bdc4b9f5af9868e028dd0adc10099a4e6656e9f0ad12b2e75a30f5ca0e34489d",
    "fb9f7fb3c709373523ff27824ed6a31d800e275ec5217d8a11024a3dffb577dd",
    "d3450966ceb2eba93282aace7d7684380d87c6621bbd3c4f621caa079356004a",
    "f12df6984bb65d18e2561bd017df29ee1cf946efa5e510802005aeee9035dd53"
   ],
   "sha512s": null,
   "ssdeeps": null
  },
  "Networks": {
   "domains": null,
   "emails": null,
   "ipv4s": [
    "82.221.100.52",
    "151.106.53.147",
    "153.92.210.208",
    "167.99.121.203"
   ],
   "ipv6s": null,
   "urls": null
  },
  "files": {
   "docs": [
    "padre1.txt",
    "padre2.txt",
    "padre3.txt",
    "GUP.txt",
    "libcurl.txt"
   ],
   "exes": [
    "certutil.exe",
    "cmd.exe",
    "esentutil.exe",
    "esentutl.exe",
    "GUP.exe",
    "libcurl.dll"
   ],
   "flashes": null,
   "imgs": null,
   "macs": null,
   "webs": null,
   "zips": null
  },
  "Utilities": {
   "cves": null
  },
  "comments": "",
  "tags": [
   ""
  ],
  "time": "2018-11-07 12:56:39.646107 +0900 JST m=+0.030745840"
 }
```

## [ioc-extractor](https://github.com/ninoseki/ioc-extractor) の紹介

最後に自作の IoC 抽出ツールである ioc-extractor を紹介します。

ioc-extractor は npm パッケージとして公開しています。このため、クライアントサイド・サーバーサイドの両方で使用することができるツールになっています。

### なぜ ioc-extractor を作ったか

前述したような既存の IoC 抽出ツールが存在するにも関わらず、なぜ ioc-extracotr を作成したのかというと、これまた自作ツールである [Mitaka](https://github.com/ninoseki/mitaka) のためです。

Mitaka は Chrome extension で、ブラウザ上で右クリックして選択した値に応じてコンテキストメニューに検索エンジン(VirusTotal, RiskIQ, ZoomEyeなど)を表示させます。

"選択した値に応じて"というところがミソで、選択した値が URL なら URL を検索できる検索エンジンのみを表示させたいのです。この要件を満たすために、車輪の再発明感はありますが、npm パッケージとしてこの ioc-extractor を実装しました。

### ioc-extractor の実装

ioc-extractor は、cacador を参考にして実装しました。cacador の基本的な実装を踏襲しつつ、

- 新しいタイプの IoC の追加 (BTC / XMR アドレス、 Google Analytics Tracker ID, Goolge Adsense Publishser IDなど)
- 正規表現の最適化

といった改良を行なっています。

### 実行例

ioc-extractor はごく単純な CLI インターフェースを提供しています。

```sh
$ cat input.txt | ioc-extractor
```

```json
{
  "cryptocurrencies": {
    "btcs": [
      "126067d634d94c45084cbe1d9873d895",
      "182ee99b4f0803628c30411b1faa9992"
    ],
    "xmrs": []
  },
  "files": {
    "docs": [
      "GUP.txt",
      "libcurl.txt",
      "padre1.txt",
      "padre2.txt",
      "padre3.txt"
    ],
    "exes": [
      "GUP.exe",
      "certutil.exe",
      "cmd.exe",
      "esentutil.exe",
      "esentutl.exe",
      "libcurl.dll"
    ],
    "flashes": [],
    "imgs": [],
    "macs": [],
    "webs": [],
    "zips": []
  },
  "hashes": {
    "md5s": [
      "126067d634d94c45084cbe1d9873d895",
      "182ee99b4f0803628c30411b1faa9992",
      "4f83c01e8f7507d23c67ab085bf79e97",
      "50c60f37922ff2ff8733aaeaa9802da5",
      "5f45532f947501cf024d84c36e3a19a1",
      "aa3f303c3319b14b4829fe2faa5999c1",
      "c1942a0ca397b627019dace26eca78d8",
      "c500dae1ca41236830b59f1467ee96c1",
      "cca227f70a64e1e7fcf5bccdc6cc25dd",
      "f188936d2c8423cf064d6b8160769f21",
      "f613846eb5bed227ec1a5f8df7e678d0",
      "fce54b4886cac5c61eda1e7605483ca3"
    ],
    "sha1s": [],
    "sha256s": [
      "bdc4b9f5af9868e028dd0adc10099a4e6656e9f0ad12b2e75a30f5ca0e34489d",
      "d3450966ceb2eba93282aace7d7684380d87c6621bbd3c4f621caa079356004a",
      "f12df6984bb65d18e2561bd017df29ee1cf946efa5e510802005aeee9035dd53",
      "fb9f7fb3c709373523ff27824ed6a31d800e275ec5217d8a11024a3dffb577dd"
    ],
    "sha512s": [],
    "ssdeeps": []
  },
  "networks": {
    "domains": [
      "APT.Backdoor[.]Win",
      "eservake.jetos[.]com"
    ],
    "emails": [],
    "ipv4s": [
      "151.106.53.147",
      "153.92.210.208",
      "167.99.121.203",
      "82.221.100.52"
    ],
    "ipv6s": [],
    "urls": [
      "http://151.106.53[.]147/VxQG",
      "http://153.92.210[.]208/wBNh1",
      "http://eservake.jetos[.]com/qIDj"
    ]
  },
  "trackers": {
    "gaTrackIDs": [],
    "gaPubIDs": []
  },
  "utilities": {
    "cves": []
  }
}
```

Note: 上記の出力結果に含まれる URL 及び Domain の値は、念のため Defang しています。

標準入力から抽出した IoC を JSON で出力するだけの単純なものですが、jq と組み合わせることにより様々に活用することができます。

例えば下記のコマンドで、クリップボードの中身から IP アドレスを取り出すことができます。

```sh
$ pbpaste | ioc-extractor | jq -r '.networks.ipv4s | join("\n")'
```

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">How to extract IOCs from clipboard?<br>Try it: <a href="https://t.co/LzFpUgLei3">https://t.co/LzFpUgLei3</a> <a href="https://t.co/70TuWLtw5j">pic.twitter.com/70TuWLtw5j</a></p>&mdash; にのせき (@ninoseki) <a href="https://twitter.com/ninoseki/status/1058701953880940544?ref_src=twsrc%5Etfw">November 3, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

あるいは、ログファイル(`*.log`)から メールアドレスだけを抽出することもできます。

```sh
$ find . -name '*.log' | xargs cat | ioc-extractor | jq '.networks.emails | join("\n")'
```

## まとめ

今現時点で存在する IoC 抽出ツールの中で、最も汎用的なものは [cmu-sei/cyobstract](https://github.com/cmu-sei/cyobstract) だと思われます。

公式に CLI インターフェースが提供されていない点が玉に瑕ですが、本稿に掲載したような簡単な Python スクリプトを作成することでこれを補うことができます。

フロントエンド(= JavaScript)で IoC を抽出しようと思うと、現状では ioc-extractor しか選択肢がありません。もし需要があれば使ってみてください。

以上です。

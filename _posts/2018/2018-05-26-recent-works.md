---
title: 最近作ったツールの話
excerpt: 最近作ったツールの話
---

![img](https://grass-graph.moshimo.works/images/ninoseki.png)

最近GitHub上で草を生やしているので、作ったツールについてまとめておきます。
なにかフィードバックがもらえると嬉しいです。

## [kari](https://github.com/ninoseki/kari)

入力からIOCを抽出するWeb APIです。Golangの勉強で作りました。

### 使い方

```sh
curl -F "data=1.1.1.1 google.com f6f8179ac71eaabff12b8c024342109b" kari-extractor.herokuapp.com/extract
```

```json
{
  "hashes": {
    "md5s": [
      "f6f8179ac71eaabff12b8c024342109b"
    ],
    "sha1s": null,
    "sha256s": null,
    "sha512s": null,
    "ssdeeps": null
  },
  "networks": {
    "domains": [
      "google.com"
    ],
    "emails": null,
    "ipv4s": [
      "1.1.1.1"
    ],
    "ipv6s": null,
    "urls": null
  },
  "files": {
    "docs": null,
    "exes": null,
    "flashes": null,
    "imgs": null,
    "macs": null,
    "webs": null,
    "zips": null
  },
  "utilities": {
    "cves": null
  },
  "time": "2018-05-26 02:48:46.953084088 +0000 UTC m=+45.807881187"
}
```

## [Mitaka](https://github.com/ninoseki/mitaka)

urlscan.io, Censys, Shodan, VirusTotal等にコンテキストメニューからクエリーを投げることのできるChrome Extensionです。
TypeScriptの勉強で作りました。

個人的には超便利で毎日使ってます。

機能の要望などあればIssueを立てるかPRしてください。:D

## [Sleep Warm](https://github.com/ninoseki/sleep_warm)

Rackベースの低対話型Webアプリケーションハニーポットです。
Rackの勉強で作りました。

[GCE](https://cloud.google.com/compute/) + [logz.io](https://logz.io/)で運用中です。

ボットからの攻撃は観測できていますが、面白い攻撃を観測するためには、まだまだ工夫が必要かもしれません。

## [Itamae_thehive](https://github.com/ninoseki/itamae_thehive)

[TheHive](https://github.com/TheHive-Project/TheHive)をデプロイするための[Itamae](https://github.com/itamae-kitchen/itamae)スクリプトです。

少し面倒なTheHive + Cortexのインストールがこれ一発で終わります。


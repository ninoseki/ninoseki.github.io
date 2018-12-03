---
title: OSINT 用検索エンジンあれこれ
toc: true
---

OSINT をする際に活用することができる IoT / Dark & Deep Web / ソースコード検索エンジンについて紹介します。

## [Shodan](https://www.shodan.io/)

Shodan は インターネット経由でアクセス可能な機器に対して、ポートスキャン及びバナー情報[^1]の取得を行なっています。

Shodan は1ヶ月に1回にインターネット全体をスキャンしています。[^2]

課金をすることで、[On-Demand スキャン](https://help.shodan.io/the-basics/on-demand-scanning)をすることも可能です。

[^1]: https://developer.shodan.io/api/banner-specification
[^2]: https://help.shodan.io/the-basics/on-demand-scanning

#### 検索

以下のフィルターを使用して検索することができます。

| filter                  | desc.                                                                                                |
|-------------------------|------------------------------------------------------------------------------------------------------|
| asn                     | The Autonomous System Number that identifies the network the device is on.                           |
| before                  | Only show results that were collected before the given date (dd/mm/yyyy.                             |
| city                    | Show results that are located in the given city.                                                     |
| country                 | Show results that are located within the given country.                                              |
| geo                     | There are 2 modes to the geo filter: radius and bounding box. ex: geo:50,50,100. or geo:10,10,50,50. |
| hash                    | Hash of the "data" property                                                                          |
| has_ipv6                | If "true" only show results that were discovered on IPv6.                                            |
| has_screenshot          | If "true" only show results that have a screenshot available.                                        |
| hostname                | Search for hosts that contain the given value in their hostname.                                     |
| isp                     | Find devices based on the upstream owner of the IP netblock.                                         |
| link                    | Find devices depending on their connection to the Internet.                                          |
| net                     | Search by netblock using CIDR notation; ex: net:69.84.207.0/24                                       |
| org                     | Find devices based on the owner of the IP netblock.                                                  |
| os                      | Filter results based on the operating system of the device.                                          |
| port                    | Find devices based on the services/ ports that are publicly exposed on the Internet.                 |
| postal                  | Search by postal code.                                                                               |
| product                 | Filter using the name of the software/ product; ex: product:Apache                                   |
| state                   | Search for devices based on the state/ region they are located in.                                   |
| version                 | Filter the results to include only products of the given version; ex: product:apache version:1.3.37  |
| bitcoin.ip              | Find Bitcoin servers that had the given IP in their list of peers.                                   |
| bitcoin.ip_count        | Find Bitcoin servers that return the given number of IPs in the list of peers.                       |
| bitcoin.port            | Find Bitcoin servers that had IPs with the given port in their list of peers.                        |
| bitcoin.version         | Filter results based on the Bitcoin protocol version.                                                |
| http.component          | Name of web technology used on the website                                                           |
| http.component_category | Category of web components used on the website                                                       |
| http.html               | Search the HTML of the website for the given value.                                                  |
| http.html_hash          | Hash of the website HTML                                                                             |
| http.status             | Response status code                                                                                 |
| http.title              | Search the title of the website                                                                      |
| ntp.ip                  | Find NTP servers that had the given IP in their monlist.                                             |
| ntp.ip_count            | Find NTP servers that return the given number of IPs in the initial monlist response.                |
| ntp.more                | Whether or not more IPs were available for the given NTP server.                                     |
| ntp.port                | Find NTP servers that had IPs with the given port in their monlist.                                  |
| ssl                     | Search all SSL data                                                                                  |
| ssl.alpn                | Application layer protocols such as HTTP/2 ("h2")                                                    |
| ssl.chain_count         | Number of certificates in the chain                                                                  |
| ssl.version             | Possible values: SSLv2, SSLv3, TLSv1, TLSv1.1, TLSv1.2                                               |
| ssl.cert.alg            | Certificate algorithm                                                                                |
| ssl.cert.expired        | Whether the SSL certificate is expired or not; True/ False                                           |
| ssl.cert.extension      | Names of extensions in the certificate                                                               |
| ssl.cert.serial         | Serial number as an integer or hexadecimal string                                                    |
| ssl.cert.pubkey.bits    | Number of bits in the public key                                                                     |
| ssl.cert.pubkey.type    | Public key type                                                                                      |
| ssl.cipher.version      | SSL version of the preferred cipher                                                                  |
| ssl.cipher.bits         | Number of bits in the preferred cipher                                                               |
| ssl.cipher.name         | Name of the preferred cipher                                                                         |
| telnet.option           | Search all the options                                                                               |
| telnet.do               | The server requests the client to support these options                                              |
| telnet.dont             | The server requests the client to not support these options                                          |
| telnet.will             | The server supports these options                                                                    |
| telnet.wont             | The server doesnt support these options                                                              |

例えば、Nginx を使用しておりかつ日本に存在するホストを検索する場合の検索クエリーは、[product:Nginx country:JP](https://www.shodan.io/search?query=product%3ANginx+country%3AJP)となります。

![Imgur](https://i.imgur.com/NfwzSSd.png)

### Pros & Cons

- Pros:
  - 広範なカバレッジ
  - Maps, Images, Exploits などの多様なプロダクト
  - (課金をすれば)On-demand スキャン可能
  - Shodan に対応したその他のツール(Maltego など)が充実
- Cons:
  - HTML 検索(`http.html` フィルター)は Censys や FOFA に比べると弱い
    - 今後改善される可能性あり?

## [Censys](https://censys.io/)

Censys は IPv4, Popular Websites[^3] 及び X.509 Certificates をスキャンしており、スキャンしたデータに対する検索エンジンを提供しています。

Censys がスキャンしたデータをバルクで取得すること[^4]も可能です。

IPv4 のスキャンは1週間に1度、Popular Websites のスキャンは毎日行われます。[^5]
X.509 Certificate の更新頻度については明らかにされていません。

[^3]: Alexa Top Million に該当する Web サイト
[^4]: https://censys.io/data
[^5]: https://support.censys.io/getting-started/frequently-asked-questions-faq

### 検索

以下のフィルターを使用して検索をすることができます。(フィルターの数が多いため、gist にまとめています)

- [IPv4 用フィルター](https://gist.github.com/ninoseki/e8fcb5da7f94b51b72f645d1640671c6)
- [Popular Websites 用フィルター](https://gist.github.com/ninoseki/825444be096155b818c67867cd69fbf8)
- [X.509 Certificates 用フィルター](https://gist.github.com/ninoseki/7c2df1d803ec11ce342c9f4ee26c7838)

例えば、Coinhive を使用しており、かつ日本に存在するホストを検索する場合の検索クエリーは ["coinhive.min.js" AND location.country_code: JP](https://censys.io/ipv4?q=%22coinhive.min.js%22+AND+location.country_code%3A+JP) となります。

![Imgur](https://i.imgur.com/tmPIQJK.png)

### Pros & Cons

- Pros:
  - Shodan より 優れた HTML 検索機能
  - データをバルクで取得可能

## [ZoomEye](https://www.zoomeye.org)

ZoomEye は "Cyberspace Search Engine" を標榜する検索エンジンです。

ZoomEye は Xmap[^6] と Wmap[^7]という2種類のエンジンを使用してインターネット全体をスキャンしています。

他と比べて、Wmap による デバイス / Web アプリケーション・フィンガープリントの検索に優れています。

ZoomEye がサポートしているフィンガープリントの一覧は[こちら](https://www.zoomeye.org/component)から確認することができます。

### 検索

以下のフィルターを使用して検索することができます。

**Host Search フィルター**

| filter   | desc.                                 |
|----------|---------------------------------------|
| app      | application\software\product and etc. |
| ver      | versions                              |
| device   | device type                           |
| os       | operating system                      |
| service  | service                               |
| ip       | ip address                            |
| cidr     | CIDR Address prefix                   |
| hostname | hostname                              |
| port     | port number                           |
| city     | city name                             |
| country  | country name                          |
| asn      | asn number                            |

**Web Search フィルター**

| filter   | desc.                 |
|----------|-----------------------|
| app      | web application       |
| header   | HTTP Header query     |
| keywords | meta keywords         |
| desc     | HTTP Meta description |
| title    | HTTP Title            |
| ip       | IP Address            |
| site     | site query            |
| city     | city name             |
| country  | country name          |

例えば、Struts2 を使用しており、かつ日本に存在する Web サイトを検索する場合のクエリーは [app:"Struts2" country: "JP"](https://www.zoomeye.org/searchResult?q=app:%22Struts2%22%20%2Bcountry:%22JP%22&t=web) となります。

![Imgur](https://i.imgur.com/CorNFEn.png)

[^6]: ポートスキャン用エンジン
[^7]: フィンガープリント用エンジン

### Pros & Cons

- Pros:
  - 強力なフィンガープリント検索機能

## [FOFA](https://fofa.so/)

FOFA は "cyberspace search engine" を標榜する検索エンジンです。

これまでに紹介した Shoan / Censys / ZoomEye と類似した機能を持っています。

### 検索

以下のフィルターを使用して検索することができます。

- title
- header
- body
- domain
- host
- port
- ip
- protocol
- city
- region
- country
- cert
- banner
- type
- os
- server
- app
- after
- before

例えば、Censys と同様に Coinhive を使用しており、かつ日本に存在するホストを検索する場合の検索クエリーは [body="coinhive.min.js" && country="JP"](https://fofa.so/result?qbase64=Ym9keT0iY29pbmhpdmUubWluLmpzIiAmJiBjb3VudHJ5PSJKUCI%3D) となります。

![Imgur](https://i.imgur.com/Glss6GA.png)

### Pros & Cons

- Pros:
  - Shodan / Censys より優れたユニコード文字対応(Note: 筆者の主観によるもの、定量的な比較は実施していない)
  - ヒストリカルデータあり
- Cons:
  - 貧弱なi18n

## [Onyphe](https://www.onyphe.io/)

Onyphe は "Your Internet SIEM" を標榜する検索エンジンです。

Shodan / Censys と同じようなポートスキャンに加え、

- abuse.ch 等からのフィードによるエンリッチメント
- ペーストサイト (Pastebin など)及び Onion Web サイトのスキャン
- tag(botnet, compromised, mirai, ok, worm, opendir, etc.)による検索

といった機能を備えています。

例えば、opendir(ディレクトリリスティングが有効になっている)かつ日本に存在するホストを検索するためのクエリーは [category:datascan tag:opendir country:JP](https://www.onyphe.io/search/?query=category%3Adatascan+tag%3Aopendir+country%3AJP) となります。

![Imgur](https://i.imgur.com/ZdYnq4r.png)

### Pros & Cons

- Pros:
  - ヒストリカルデータあり
- Cons:
  - 貧弱なドキュメンテーション
    - 使用可能なフィルターの情報がきちんとドキュメント化されておらず、わかりにくい
  - 無料プランではフィルターやエンリッチメントなどの核となる機能へのアクセスは不可能

## [PublicWWW](https://publicwww.com/)

PublicWWWは "Source Code Search Engine" を標榜する検索エンジンです。

Web サイトが持つ HTML, JS と CSS のソースコードに対して検索をすることができます。

### 検索

site(TLD によるフィルター)と filetype フィルターを使用することができます。

例えば、Coinhive を使用しており、かつ TLD が `.jp` な Web サイトを検索するためのクエリーは ["coinhive.min.js" site:jp](https://publicwww.com/websites/%22coinhive.min.js%22+site%3Ajp/) となります。

![Imgur](https://i.imgur.com/SLJlW9S.png)

### Pros & Cons

- Cons:
  - 無料プランでは、検索結果から閲覧可能なのは Top 3M に該当する Web サイトのみ。
    - ここでいう"Top 3M" とは、[Alexa](https://www.alexa.com/topsites) ランキングの TOP 3百万以内のことだと思われる。


## [Intelligence X](https://intelx.io/)

Intelligence X はいわゆる Deep & Dark Web 用の検索エンジンです。

Intelligence X がクローリングしたペーストサイト(Pastebin など)及び Onion & I2P Web サイトの内容について検索することができます。

### Pros & Cons

- Cons:
  - 無料プランで閲覧できるのは、クローリングされた内容の一部のみ。

![Imgur](https://i.imgur.com/PoMRcay.png)

---

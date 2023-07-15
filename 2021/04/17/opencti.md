# OpenCTI 入門

::: tip Notes

- 本稿は OpenCTI v4.4.0 をベースにして書かれている。
  :::

## OpenCTI とは

- OpenCTI は、Luatix が開発している Open Cyber Threat Intelligence Platform.
  - Luatix は[ANSSI/CERT-FR](https://www.cert.ssi.gouv.fr/), [CERT-EU](https://cert.europa.eu/cert/filteredition/en/CERT-LatestNews.html)が founder members になっている非営利組織。
  - Tainum や Thales がスポンサードしている。

![](https://i.imgur.com/vsDIPG0.png)

- STIX2.1 をベースにした Threat Intelligence のナレッジ管理を行うことができる。

![](https://i.imgur.com/MSr1bAA.png)
(Source: [OpenCTI Introduction to the platform & next steps](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a435a173-bbfd-4dd8-99a7-1924b78945a6/20200415_OpenCTI_Webinar_001.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T012752Z&X-Amz-Expires=86400&X-Amz-Signature=b6bea7fedf34d69818725d5140fc3bd7c9025a1144dedc97c87bc03c24ebf8ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2220200415_OpenCTI_Webinar_001.pdf%22))

### アーキテクチャ

![](https://i.imgur.com/cCGIRmu.png)

(Source: [OpenCTI Introduction to the platform & next steps](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a435a173-bbfd-4dd8-99a7-1924b78945a6/20200415_OpenCTI_Webinar_001.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T012752Z&X-Amz-Expires=86400&X-Amz-Signature=b6bea7fedf34d69818725d5140fc3bd7c9025a1144dedc97c87bc03c24ebf8ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2220200415_OpenCTI_Webinar_001.pdf%22))

### ユースケース

#### CERT-EU

![](https://i.imgur.com/sy5Hyeb.png)

![](https://i.imgur.com/Xe5vLXa.png)

(Source: [OpenCTI Introduction to the platform & next steps](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a435a173-bbfd-4dd8-99a7-1924b78945a6/20200415_OpenCTI_Webinar_001.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T012752Z&X-Amz-Expires=86400&X-Amz-Signature=b6bea7fedf34d69818725d5140fc3bd7c9025a1144dedc97c87bc03c24ebf8ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2220200415_OpenCTI_Webinar_001.pdf%22))

#### ANSSI

![](https://i.imgur.com/xKOvwn9.png)
(Source: [OpenCTI Introduction to the platform & next steps](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a435a173-bbfd-4dd8-99a7-1924b78945a6/20200415_OpenCTI_Webinar_001.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T012752Z&X-Amz-Expires=86400&X-Amz-Signature=b6bea7fedf34d69818725d5140fc3bd7c9025a1144dedc97c87bc03c24ebf8ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2220200415_OpenCTI_Webinar_001.pdf%22))

## インストール

Docker によるインストール方法は以下の通り。

```bash
$ git clone https://github.com/OpenCTI-Platform/docker.git
$ cd docker

# .envファイルのサンプルをコピー
$ cp .env.sample .env

# https://www.notion.so/Using-Docker-03d5c0592b9d4547800cc9f4ff7be2b8
# "Configure the environment"のセクションの指示に従い、`ChangeMe`の箇所を適当な値に書き換える
$ vim .env
```

これで`docker-compose up -d`をすれば OpenCTI が`localhost:8080`で起動する。

![](https://i.imgur.com/srg3NyP.png)

しかし、デフォルトの設定のままだと、使用できる Connector が少ない。
(Connector はプラグインのようなもので、外部サービスと OpenCTI のデータ連携に使用される。詳細は後述する。)

![](https://i.imgur.com/REmSroJ.png)

Connector の一覧を確認し、利用できる Connector があれば有効化してみよう。

Connector は下記のリポジトリで管理されている。

- [OpenCTI-Platform/connectors](https://github.com/OpenCTI-Platform/connectors)

Connector の概要を把握するためには、下記の Web ページを参照した方が分かりやすいかもしれない。

- [OpenCTI Ecosystem](https://www.notion.so/868329e9fb734fca89692b2ed6087e76)

![](https://i.imgur.com/cqwtLrt.png)

例えば[Maplpedia](https://malpedia.caad.fkie.fraunhofer.de/)の Connector を有効にしたい場合、下記のように`docker-compose.yml`に Connector 用の設定を追加すれば良い。

![](https://i.imgur.com/nIHFEkE.png)

あるいは個別に(メインの`docker-compose.yml`の外で)Connector を動かすこともできる。

```bash
wget <https://github.com/OpenCTI-Platform/connectors/archive/{RELEASE_VERSION}.zip>
unzip {RELEASE_VERSION}.zip
cd connectors-{RELEASE_VERSION}/{CONNECTOR_NAME}
vim docker-compose.yml
docker-compose up -d
```

しかし、管理の面からすると、1 つの`docker-compose.yml`にまとめておいた方が楽だろう。

## Connectors

Connector には`Data import`, `Stream consumers`, `Enrichment`, `File import`, `File export`の 5 種類がある。

### Data import

Data import 用の Connector は、外部サービスからデータをインポートする機能を持っている。

例えば Malepdia の Connector を使うと、(デフォルトの設定のままだと)1 日 1 回 Malpedia からデータをインポートすることができる。

![](https://i.imgur.com/BKrC3qY.png)

![](https://i.imgur.com/HmUc4nu.png)

### Stream consumers

Stream consumers 用の Connector は、外部サービスとデータを連携する機能を持っている。

Data import と何が違うかというと、Data import はバッチ処理のように特定のタイミングでしか処理が行われてないのに対し、Stream consumers は Pub/Sub モデルのような形で延々と処理が行われる。

SIEM や EDR との連携には Stream consumers が使用される。

### Enrichment

Enrichment 用の Connector は、observables をエンリッチメントする機能を持っている。

例えば、VirusTotal の Connector は、ファイルのハッシュ値を元に、VirusTotal から情報を取得して observable をエンリッチしてくれる。

`File`タイプの observable を登録すると、下記のように`Labels`に情報が追加される。

![](https://i.imgur.com/Ptgegu4.png)

何をキーにしてどのようにエンリッチメントが行われるのかは、実際に Connector を動かしてみるか、ソースコードを確認してみないと分からない。

VirusTotal の場合、自分は IP address をキーにして Passive DNS の情報をエンリッチしてくれることを勝手に期待していた。が、実際は`File`タイプの observable をエンリッチすることしかできない。しかもやってくれることは、tags を`Labels`にマッピングしてくれるだけだ。

![](https://i.imgur.com/skvH4FF.png)

他の種類の Connector にも言えることだが、事前にソースコードやドキュメントを確認しておくのがいいだろう。

### Files import

Files import 用の Connector は、ファイルからデータをインポートする機能を持っている。

例えば、`ImportFilePdfObservables`Connector を使用して PDF から observables を抽出してみるとこうなる。

![](https://i.imgur.com/qICbh25.png)

![](https://i.imgur.com/3iUAx81.png)

ちなみに、`cert.gov`のような値は予め whitelist というか deny-list に入れておいてもらいたいものだが、そういった機能は無いようだ。

### File export

File export 用の Connector は、データをエクスポートする機能を持っている。

OpenCTI 内のデータを、例えば CSV や STIX 形式でエクスポートすることができる。

## 利用方法

OpenCTI のデータモデルは STIX2.1 をベースにしているので、STIX2.1 について最低限の知識が必要となる。

以下の記事を斜め読みしておくくらいのことはしておいた方が良いだろう。

- [Introduction to STIX](https://oasis-open.github.io/cti-documentation/stix/intro.html)
- [OpenCTI Data model](https://www.notion.so/Data-model-4427344d93a74fe194d5a52ce4a41a8d)

### Web UI

Web UI 上でデータの作成・参照ができる。

![](https://i.imgur.com/M0iztUE.png)

![](https://i.imgur.com/Gom7lwg.png)

![](https://i.imgur.com/s6vKDC8.png)

どんなものなのか、デモにアクセスして試してみるのが一番分かりやすいだろう。

- [https://demo.opencti.io/dashboard](https://demo.opencti.io/dashboard)

### GraphQL API

GraphQL を使ってデータの作成・参照が行える。

というか、GraphQL API が OpenCTI の本体で、Web UI は React ベースの SPA で GraphQL を叩いているだけにすぎない。

![](https://i.imgur.com/fnUBC4s.png)

`/graphql`に GraphQL 用の playground が用意されているので、そこで GraphQL を実行してみることができる。

![](https://i.imgur.com/XUoAZYd.png)

## まとめ(あるいは OpenCTI は実際どう使えるのか)

OpenCTI を使うことで、STIX2.1 をベースにした Threat Intelligence のナレッジ管理が行える。

セキュリティベンダーや CERT-FR(ANSSI)のようなナショナル CSIRT はこういったナレッジの管理が業務の一つだから OpenCTI を使うことができるだろう。

セキュリティベンダーやナショナル CSIRT でなくても、大きな組織であれば自前でインディケーターや検知ルールの管理を行っているだろう。そういったナレッジの管理に OpenCTI は使用できる。あるいは OpenCTI の導入を契機にしてインディケーターや検知ルールのナレッジ管理に挑戦してみることもできるだろう。

余談になるが、OpenCTI に限らず言えることだけれども Threat Intelligence Platform(TIP)というか Threat Intelligence の定義は曖昧で、人によって定義や期待している効果が異なっていることが多い。

予めどんなことがしたいのか、どんな効果が期待されるのか、どうやって効果測定を行うのか決めてから　 TIP を導入しないと、どのようなものであっても無用の長物になるだけだろう。

## References

- [OpenCTI Introduction to the platform & next steps / Luatix (PDF)](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a435a173-bbfd-4dd8-99a7-1924b78945a6/20200415_OpenCTI_Webinar_001.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210416%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210416T012752Z&X-Amz-Expires=86400&X-Amz-Signature=b6bea7fedf34d69818725d5140fc3bd7c9025a1144dedc97c87bc03c24ebf8ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%2220200415_OpenCTI_Webinar_001.pdf%22)
- [OpenCTI & SITX / Luatix (PDF)](https://www.oasis-open.org/committees/download.php/68107/20201217_OpenCTI_OASIS-CTI-TC.pdf)
- [Integration of Information in OpenCTI / CERT-FR (PDF)](https://www.ssi.gouv.fr/uploads/2019/10/anssi-doctrine_opencti-v1.0.pdf)
- [Still thinking about your Ex(cel)? Here are some TIPs / SANS CTI Summit 2021 (PDF)](https://threatintelblog.files.wordpress.com/2021/01/sans_cti_summit_2021_andreas_sfakianakis.pdf)

## おまけ(OSS TIP matrix)

![](https://i.imgur.com/eXhWqQj.jpg)

---
title: ゼロからはじめるフィッシング対策 🎣
date: 2019-01-24
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

[フィッシング対策協議会](https://www.antiphishing.jp/)によれば、2018年上半期に報告されたフィッシングの件数は2017年下半期の月平均と比較して1.6倍に増加しているそうです。

![Imgur](https://i.imgur.com/P5dfL8v.png)
(source: https://www.antiphishing.jp/news/pdf/apcseminar2018apc.pdf)

この記事では、増加するフィッシングに対して効率的に対応するため、ドメイン名を起点にフィッシングサイトを見つけ、それを報告するまでの流れについて紹介します。

## 前段

フィッシングをしかける攻撃者は、紛らわしいドメイン名(タイポスクワッティング / typosquatting)を用意し、そこにターゲットを誘導します。

例として、Apple ユーザーを標的にしたフィッシングサイトのドメイン名を以下に示します。

- apple-appleidd[.]ddns[.]net
- store-appleid-manage-subcriptionsdetail-support-new-home[.]com
- web-appleid-secure-notified-home-base-database[.]com

`apple` や `appleid` といったそれらしい単語がドメイン名に含まれていることがわかります。

新しく登録されたドメイン名をモニタリングし、上記の様にタイポスクワッティングなドメインがないか確認をすることでフィッシングサイトを見つけることができます。

### 備考

- フィッシングサイトを見つける方法として、今回紹介する方法の他に [OpenPhish](https://openphish.com/) や [PhishTank](https://www.phishtank.com/) のフィードをモニタリングする方法や [Certificate Transparency](https://www.certificate-transparency.org/) ログサーバーをモニタリングする方法がありますが、今回は割愛します。
  - 参考:
    - [Facebook: Detecting phishing domains using Certificate Transparency](https://www.facebook.com/notes/protect-the-graph/detecting-phishing-domains-using-certificate-transparency/2037453483161459/)
- 最近のフィッシングの手口として、ドメインを取得せず、短縮 URL サービスを使用してフィッシングサイトへ誘導するものがあります。いわゆる smishing でよく使用されています。これについては、今回紹介する手法では発見することはできません。

## 1. 新しく登録されたドメイン名を見つける

[DomainTools](https://www.domaintools.com/) や [SecurityTrails](https://securitytrails.com/) など、新規に登録されたドメイン名を有償で提供しているサービスがあります。

一方、[WhoisDS](https://whoisds.com/), [WebAnalyzer](https://wa-com.com/) や [DnPedia](https://dnpedia.com/) など、無償で新規に登録されたドメイン名を提供しているサービスもあります。
この中でも、DnPeida は検索用のインターフェースを持っており、簡便に扱うことができます。

例えば、DnPedia の[Domain Search](https://dnpedia.com/tlds/search.php) にて `yahoo` で検索してみるとこのような結果になりました。

![Imgur](https://i.imgur.com/YGZzlql.png)

ぱっと見たところ、`yahoo-protect[.]info` や `yahoo-maintain[.]com` が怪しいですね。

## 2. フィッシングサイトか確認する

タイポスクワッティングなドメイン名を見つけたら、それがフィッシングサイトかどうか確認してみましょう。

[CheckPhish.ai](https://checkphish.ai), [phishcheck.me](https://phishcheck.me/) など、URL を入力することでフィッシングサイトかどうか判定してくれるサービスがあるので、これを使うと便利です。

また、[urlscan.io](https://urlscan.io/) のような Web サイトを細かく分析するサービスを使用して確認することもできます。

### 実例

では先ほど `yahoo` で検索した際に怪しく見えた `yahoo-maintain[.]com` を例に試してみましょう。

#### CheckPhish.ai

- https://checkphish.ai/insights/url/1548314631088/1fa757c8c76c2a6fb03b6ba673cd1afab14cc56ba3f39f3b1ccce80d9dbbd33a

![Imgur](https://i.imgur.com/BrWszEO.png)

#### phishcheck.me

- https://phishcheck.me/172512/details

![Imgur](https://i.imgur.com/VFnYw6S.png)

#### urlscan.io

- https://urlscan.io/domain/www.yahoo-maintain.com

![Imgur](https://i.imgur.com/PfsD8Qt.png)

スクリーンショットや HTML、入力フォームなどを確認することで、 Yahoo! Japan のID・パスワードおよびクレジットカード情報を盗み取ろうとするフィッシングサイトだと確認することできました。

### 2.1 Web サイトモニタリング

上記のフィッシングサイトの確認方法は、リアルタイムでフィッシングサイトが稼働していることが前提となっています。

しかし、ドメイン名が登録されていることは、Web サイトが稼働していること(= IP アドレスが割り当てられ Web サーバーが稼働していること)を意味しません。ドメイン名が取得されて、しばらくしてから Web サイトが稼働することは往往にしてあることです。

タイポスクワッティングなドメイン名を見つけたけれど、そのドメイン名で Web サイトが稼働していなかった場合、下記のようなサービスを使ってモニタリングするのが良いでしょう。

- [StatusCake](https://www.statuscake.com/)
  - 無料で10サイトまでモニタリング可能
  - 最短監視間隔: 5分
- [Pingbreak](https://pingbreak.com/)
  - 無料で20サイトまでモニタリング可能
  - 最短監視間隔: 1分
- [freshping](https://www.freshworks.com/website-monitoring/)
  - 無料で50サイトまでモニタリング可能
  - 最短監視間隔: 1分

## 3. フィッシングサイトを報告する

まずは [Google Safe Browsing](https://safebrowsing.google.com/) に報告しましょう。

Google Safe Browsing は Chrome, Safari, Firefox といった主要ブラウザでサポートされています。Google Safe Browsing に報告することで、それらの主要ブラウザのユーザーをフィッシングサイトから守る手助けができます。

Google Safe Browsing にフィッシング報告をするのは簡単です。

[Report Phishing Page](https://safebrowsing.google.com/safebrowsing/report_phish/?hl=en) のフォームに フィッシングサイトの URL を記入してサブミットするだけで完了します。

![Imgur](https://i.imgur.com/AQouxwf.png)

また、[JPCERT/CC](https://www.jpcert.or.jp/) に報告するものいいでしょう。

JPCERT/CC にも [Web フォーム](https://form.jpcert.or.jp/)経由で簡単に報告することができます。

![Imgur](https://i.imgur.com/wJFun4d.png)

さらに進んで フィッシングサイトをホスティングしている ISP に報告する手もあります。これによりフィッシングサイトのテイクダウンにつながる可能性があります。

ISP の公式サイトを確認すれば、報告窓口(abuse 担当)が大抵の場合はわかるでしょう。また、[certsocietegenerale/abuse_finder](https://github.com/certsocietegenerale/abuse_finder) というabuse 担当の連絡先を簡単に調べるためのツールもあります。

## おまけ

新しく登録されたドメイン名のチェックからフィッシング判定の途中までを自動化するツールを作成しました。

- [ninoseki/osakana](https://github.com/ninoseki/osakana)

このツールを使うことで、以下のタスクを自動化することができます。

- DnPedia 上で特定のキーワードを検索
- 検索結果(特定のキーワードを含む新しく登録されたドメイン)を Slack にポスト

### インストール

このツールは Ruby gem として配布しています。

```sh
$ gem install osakana
```

### 実行例

```shell
$ osakana check_newly_domains yahoo
```

![Imgur](https://i.imgur.com/ylFsgBu.png)

このように、特定のキーワードを含むドメインを簡単に確認することができます。

よろしければ使ってみてください。

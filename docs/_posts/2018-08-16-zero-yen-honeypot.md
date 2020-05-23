---
title: ゼロ円から始めるHTTP(S)ハニーポット
date: 2018-08-16
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

## TL;DR

- Honeypot: [Sleep Warm](https://github.com/ninoseki/sleep_warm)
- ELK: [logz.io](https://logz.i0)
- PaaS: [Heroku](https://www.heroku.com/)

を使用することで、ゼロ円で解析基盤まで含めて HTTP(S)ハニーポットを運用することができる。

## はじめに

多くの人にとって、ハニーポットを運用してみようと思った際に最初に直面する問題はお金だと思う。

解析基盤(ここでは ELK スタックとする)を含めると、少なく見積もっても月に数千円はかかってしまうのではないだろうか。

なるべくなら無料で運用したい・・・!という人のために、今回はゼロ円で HTTP(S)ハニーポットを解析基盤まで含めて運用する方法を紹介する。

## ハニーポット

まずは今回使用するハニーポットを紹介する。

- [Sleep Warm](https://github.com/ninoseki/sleep_warm)

Sleep Warm は[WOWHoneypot](https://github.com/morihisa/WOWHoneypot)を参考にして@ninoseki が作成した HTTP(S)ハニーポットである。

基本的な仕様は WOWHoneypot を踏襲しているが、以下の変更/改良を施している。

- Python から Ruby + [Rack](https://github.com/rack/rack)ベースの Web アプリに変更
- File IO の排除
  - [logstash-logger](https://github.com/dwbutler/logstash-logger)による ElasticSearch インスタンスへの出力が前提
- きちんとしたテストの実施
  - テストカバレッジは 100%
- 構築自動化
  - [Itamae](http://itamae.kitchen/)による自動プロビジョニング
  - [Deploy to Heroku](https://devcenter.heroku.com/articles/heroku-button)ボタンによる Heroku へのワンクリック・デプロイ

今回はこのハニーポットを Heroku にデプロイし、ログを logz.io に送ることで、ゼロ円でハニーポット運用を実現する方法を紹介する。

## logz.io

logz.io は"AI-Powered ELK as a Service"を謳うサービスである。logz.io を使用することで、下記に示す制約はあるものの、無料で ELK を使用することが可能となる。

- 主な制約:
  - Daily capacity: 3 GB
  - Data retention: 3 day

Data retention が 3 日なのは痛いが、ゼロ円なのでそこは妥協しよう。

## Heroku

Heroku は PaaS サービスである。Heroku を使用することで、下記に示す制約はあるものの、無料でハニーポットを運用することが可能となる。

- 主な制約:
  - 512 MB RAM
  - Sleeps after 30 min of inactivity

## デプロイ

まず logz.io にアカウントを作成しよう。

アカウントを作成すると、ダッシュボード画面の`Settings` => `General`から logz.io の ElasticSearch インスタンスにログを送る際に必要となるトークンが確認できるようになる。

![Imgur](https://i.imgur.com/vW2sgF0.png)

さて、それでは Heroku に Sleep Warm をデプロイしてみよう。

Sleep Warm の[GitHub リポジトリ](https://github.com/ninoseki/sleep_warm)にある`Deploy to Heroku`ボタンをクリックすると、以下の画面が表示される。

![Imgur](https://i.imgur.com/ElXCXk0.png)

- `App name`: 適当なアプリ名
- `LOGSTASH_HOST`: listener.logz.io
- `LOGSTASH_PORT`: 5050
- `LOGSTASH_TOKEN`: 先ほど確認した logz.io のトークン

を入力して`Deploy app`をクリックすればそれでデプロイが完了だ。

`Open app`をクリックしてブラウザでデプロイしたハニーポットにアクセスすると、そのアクセスログが logz.io に送信される。

![Imgur](https://i.imgur.com/NwidTQy.png)

これで完了だ!

## 最後に

さて、あとはこのハニーポットに対してアクセス・スキャンがあればそれを分析するだけ・・・なのだがここに大きな問題がある。

Heroku 上の Web アプリに対し、ボット等からのスキャンは皆無なのだ。

- Heroku 自体のセキュリティによりスキャン等が弾かれている
- URL(https://hogehoge.herokuapp.com)を類推することが困難

といった点が理由として挙げられるだろう。

残念がら、実際的には(アクセス・スキャンを受けるためには)Heroku 以外のホスティングサービスを使用する必要がある。

しかし、Sleep Warm はほとんどメモリを消費しないので、月あたりワンコイン程度のインスタンスで運用可能である。

![Imgur](https://i.imgur.com/6gqDCUC.png)

DigitalOcean, Linode といったホスティングサービスの最低価格帯のインスタンスでも余裕で運用できる。興味があればぜひ試してみてほしい。

そして Issue/PR がもらえると非常に嬉しい。

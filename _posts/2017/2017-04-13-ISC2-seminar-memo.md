---
title: ISC2 公式セミナー「DevSecOps時代の現場の負担を軽減させるセキュリティ環境構築」聴講メモ
excerpt: ISC2公式セミナーの聴講メモ
---

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">4月8日（土）に日本マイクロソフト品川本社にて開催された、「CISSP meets Microsoft」と、「DevSecOps時代の現場の負担を軽減させるセキュリティ環境構築」、たくさんの方にご参加いただきました。 <a href="https://t.co/vFyekjm8gE">pic.twitter.com/vFyekjm8gE</a></p>&mdash; ISC2_Japan (@ISC2_Japan) <a href="https://twitter.com/ISC2_Japan/status/851713298479198208">2017年4月11日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

後者の方に参加してきた。雑だけどメモを残しておく。
最後のパネルディスカッションの内容が面白かったけど、メモを撮り忘れたので割愛している。すいません。

## ITの潮流としてのDevOpsとその課題 by MS 田丸健三郎

* Air Force Cyber Vision 2025(米空軍による未来予測)
  * ![image](https://csdl-images.computer.org/mags/co/2014/11/figures/mco20141100942.gif)
  * ITの進歩 = 脅威の進歩
* 脅威の進歩に合わせて、開発側も対応しなければいけない
  * Agile開発 / DevOpsが求められている
  * 開発を進めながら、その時の脅威に対応する開発が必要となっている

## ビジネスを活性化させるセキュリティの取り組みとは by MS 高橋正和
* ITとセキュリティのポジショニング
  * 情報系からビジネスの基盤へと変化
* IT基盤の変化
  * IT基盤技術への依存が低下/ライフサイクルの変化(DevOps)
* IT部門のポジショニングの変化
  *  IT部門がビジネス主導のIT化を阻害
* セキュリティ部門のポジショニングのの変化
  * セキュリティ部門がビジネス主導のIT化を阻害
    * 2000年ごろに作成したセキュリティポリシーに基づく新技術導入の見送り
  * 変化に対応するためにはDevSecOpsが必要
* DevSeOpsの狙い
  * Attack Surfaceを縮小し、DetectとRespondを向上させること
* 業務執行としてのIoT
  * セキュリティ部門がIT推進のブレーキとなり、ビジネス部門がIT推進のアクセルになってきた
  * CISOは経営会議で何を報告すべき?
    * 一般的なセキュリティ監査の結果?
      * これはポリシーなどへの遵守率を計測しているだけであり、組織が直面する脅威状況を正しく表していない
    * どの程度の攻撃を受けているのか把握して報告
      * 加えて、セキュリティ対策を通過した攻撃について何からの方法で計測を行う必要がある
    * CISOダッシュボード
      * 1. Attack condition(攻撃検出状況に関するKPI)
        * e.g. AV/IDS等によるアラート
      * 2. Protect condition(対策状況に関するKPI)
        * e.g. セキュリティ対策として実施すべき項目(パッチの適用など)の適用率
      * 3. Suspicious activity(侵入が疑われる状況のKPI)
        * e.g. SIEMによる検出や内部犯行を含んだ疑わしいイベント
      * 4. Indirect activity(人事的、物理的など直接ITとは関係しない状況のKPI
        * e.g. デバイスの紛失盗難、外部からのインテリジェンス

## 備考

* 「CISSP meets Microsoft」に参加された方のメモ。
  * [CISSP meets Microsoft に参加しました](http://mctjp.com/2017/04/09/cissp-meets-microsoft-%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F/)
  * [CISSP meets Microsoftに行ってきた](http://qiita.com/fnifni/items/0b39f2aa669c6b2d2f21)

---
title: Ceynsysで日本国内におけるCoinhiveの使用状況を調べてみた
excerpt: Ceynsysで日本国内におけるCoinhiveの使用状況を調べてみた
category: security
tags: [cryptojacking]
---

Enisaが[Cryptojackingに関するレポート](https://www.enisa.europa.eu/publications/info-notes/cryptojacking-cryptomining-in-the-browser)を出すなど、Cryptojackingはますます流行ってきているようです。

今回は[Censys](https://www.censys.io/)を使用して、Cryptojackingの代表格とも言えるCoinhiveが日本国内でどの程度使われているのか調査してみました。

なお[@bad_packets](https://twitter.com/bad_packets)によれば、この手の調査で一番すぐれているのは[PublicWWW](https://publicwww.com/)だそうです。
料金が高い($49/month)ので、個人用途ではちょっと手が出しにくい・・・。


## 調査方法

* 以下のクエリを用いてCensysで検索を実施
  * `"coinhive.min.js" and location.country_code: JP` (ヒット数: 10件)
    * 地域指定をしない場合(`"coinhive.min.js"`)のヒット数は1,573件
  * `"authedmine.min.js and location.country_code: JP` (ヒット数: 0件)
    * 地域指定をしない場合(`"authedmine.min.js`)のヒット数は79件

## 調査結果
{% gist 489679750f27fe7fe7c25fb46e84d478 %}

## まとめ

* 日本を含め、アジア諸国のCoinhive使用率(中国: 18件、台湾: 14件、韓国: 2件)は欧州に比べて低い模様
  * Censysで`coinhive.min.js`で検索した結果の国別TOP5:
    * アメリカ: 604件 (38.4%)
    * フランス: 217件 (13.8%)
    * ドイツ: 139件 (8.84%)
    * オランダ: 78件 (4.96%)
    * ロシア: 78件 (4.96%)
  * アジアではこれから流行するという見方もできるかも?
* ユーザーの事前同意を得てからマイニングが開始される`authedmine.min.js`の採用はゼロ。
* 中にはスレッド数 = 10でマイニングを行うアグレッシブなサイト(`drarama[.]site`)もあり、注意が必要
  * スレッド数の設定を明示しない場合、Coinhiveはスレッド数 = CPUのコア数で動作
  * `drarama[.]site`の閲覧時のCPU使用率
 ![1](https://user-images.githubusercontent.com/291028/32712866-05509844-c88a-11e7-9885-80b3a739d570.png)
  * `drarama[.]site`のCoinhive設定
 ![2](https://user-images.githubusercontent.com/291028/32712871-0bc9f47c-c88a-11e7-85d2-a083013f0352.png)

## 参考資料
* [Cryptojacking - Cryptomining in the browser](https://www.enisa.europa.eu/publications/info-notes/cryptojacking-cryptomining-in-the-browser)
* [Cryptojacking malware Coinhive found on 30,000+ websites](https://badpackets.net/cryptojacking-malware-coinhive-found-on-30000-websites/)
* [A look into the global drive-by cryptocurrency mining phenomenon](https://blog.malwarebytes.com/cybercrime/2017/11/a-look-into-the-global-drive-by-cryptocurrency-mining-phenomenon/)

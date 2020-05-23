---
title: Censysで日本国内におけるCoinhiveの使用状況を調べてみた
date: 2017-11-13
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

Enisa が[Cryptojacking に関するレポート](https://www.enisa.europa.eu/publications/info-notes/cryptojacking-cryptomining-in-the-browser)を出すなど、Cryptojacking はますます流行ってきているようです。

今回は[Censys](https://www.censys.io/)を使用して、Cryptojacking の代表格とも言える Coinhive が日本国内でどの程度使われているのか調査してみました。

なお[@bad_packets](https://twitter.com/bad_packets)によれば、この手の調査で一番すぐれているのは[PublicWWW](https://publicwww.com/)だそうです。
料金が高い(\$49/month)ので、個人用途ではちょっと手が出しにくい・・・。

## 調査方法

- 以下のクエリを用いて Censys で検索を実施
  - `"coinhive.min.js" and location.country_code: JP` (ヒット数: 10 件)
    - 地域指定をしない場合(`"coinhive.min.js"`)のヒット数は 1,573 件
  - `"authedmine.min.js and location.country_code: JP` (ヒット数: 0 件)
    - 地域指定をしない場合(`"authedmine.min.js`)のヒット数は 79 件

## 調査結果

{% gist 489679750f27fe7fe7c25fb46e84d478 %}

## まとめ

- 日本を含め、アジア諸国の Coinhive 使用率(中国: 18 件、台湾: 14 件、韓国: 2 件)は欧州に比べて低い模様
  - Censys で`coinhive.min.js`で検索した結果の国別 TOP5:
    - アメリカ: 604 件 (38.4%)
    - フランス: 217 件 (13.8%)
    - ドイツ: 139 件 (8.84%)
    - オランダ: 78 件 (4.96%)
    - ロシア: 78 件 (4.96%)
  - アジアではこれから流行するという見方もできるかも?
- ユーザーの事前同意を得てからマイニングが開始される`authedmine.min.js`の採用はゼロ。
- 中にはスレッド数 = 10 でマイニングを行うアグレッシブなサイト(`drarama[.]site`)もあり、注意が必要
  - スレッド数の設定を明示しない場合、Coinhive はスレッド数 = CPU のコア数で動作
  - `drarama[.]site`の閲覧時の CPU 使用率
    ![1](https://user-images.githubusercontent.com/291028/32712866-05509844-c88a-11e7-9885-80b3a739d570.png)
  - `drarama[.]site`の Coinhive 設定
    ![2](https://user-images.githubusercontent.com/291028/32712871-0bc9f47c-c88a-11e7-85d2-a083013f0352.png)

## 参考資料

- [Cryptojacking - Cryptomining in the browser](https://www.enisa.europa.eu/publications/info-notes/cryptojacking-cryptomining-in-the-browser)
- [Cryptojacking malware Coinhive found on 30,000+ websites](https://badpackets.net/cryptojacking-malware-coinhive-found-on-30000-websites/)
- [A look into the global drive-by cryptocurrency mining phenomenon](https://blog.malwarebytes.com/cybercrime/2017/11/a-look-into-the-global-drive-by-cryptocurrency-mining-phenomenon/)

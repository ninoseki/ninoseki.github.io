---
title: 公共機関を含む4,000+のWebサイトにCoinhiveが仕込まれた件についてまとめてみた
excerpt: 公共機関を含む4,000+のWebサイトにCoinhiveが仕込まれた件についてまとめてみた
---

## タイムライン

- **10:46 PM - 11 Feb 2018:**
  - @Scott_Helme(Scott Helme)が@ICOnews(イギリス・情報コミッショナーオフィス)の[公式Webサイト](https://www.ico.org.uk/)上でCoinhiveが見つかったとツイート

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Ummm, so yeah, this is *bad*. I just had <a href="https://twitter.com/phat_hobbit?ref_src=twsrc%5Etfw">@phat_hobbit</a> point out that <a href="https://twitter.com/ICOnews?ref_src=twsrc%5Etfw">@ICOnews</a> has a cryptominer installed on their site... 😮 <a href="https://t.co/xQhspR7A2f">pic.twitter.com/xQhspR7A2f</a></p>&mdash; Scott Helme (@Scott_Helme) <a href="https://twitter.com/Scott_Helme/status/962684239975272450?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **11:14 PM - 11 Feb 2018:**
  - @Scott_HelmeがCoinhiveが埋め込まれた原因は3rdパーティーのJavaScriptが改ざんだと特定
  - 該当のJavaScriptは@texthelp(Texthelp)が提供する[Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/)である

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Ok so this is via a 3rd party compromise, here is the script: <a href="https://t.co/NqwqJxZiTd">https://t.co/NqwqJxZiTd</a></p>&mdash; Scott Helme (@Scott_Helme) <a href="https://twitter.com/Scott_Helme/status/962691297239846914?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **11:16 PM - 11 Feb 2018:**
  - @Scott_Helmeが@texthelpに改ざんされている旨を報告

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Hey <a href="https://twitter.com/texthelp?ref_src=twsrc%5Etfw">@texthelp</a> you&#39;ve been compromised, you need to address this ASAP. Their site also has the crypto miner running: <a href="https://t.co/fl0U9ssZRr">pic.twitter.com/fl0U9ssZRr</a></p>&mdash; Scott Helme (@Scott_Helme) <a href="https://twitter.com/Scott_Helme/status/962691692951474176?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **1:32 AM - 12 Feb 2018:**
  -  @ICOnewsの公式サイトがメンテナンスモードに

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The <a href="https://twitter.com/ICOnews?ref_src=twsrc%5Etfw">@ICOnews</a> website is now offline: <a href="https://t.co/GejpDSBAgw">pic.twitter.com/GejpDSBAgw</a></p>&mdash; Scott Helme (@Scott_Helme) <a href="https://twitter.com/Scott_Helme/status/962726044338917376?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **3:44 AM - 12 Feb 2018:**
  - @ncsc(イギリス・National Cyber Security Centre)が本件に関する声明を発表

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Our statement following incidents of malware being used to illegally mine cryptocurrency <a href="https://t.co/tkC8PPBsbM">https://t.co/tkC8PPBsbM</a></p>&mdash; NCSC UK (@ncsc) <a href="https://twitter.com/ncsc/status/962759217500381186?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **5:35 AM · Feb 12, 2018:**
  - @BBCNewsが本件をニュースとして取り上げる

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Hackers hijack government websites to mine crypto-cash <a href="https://t.co/pqOp4vXuTV">https://t.co/pqOp4vXuTV</a></p>&mdash; BBC News (UK) (@BBCNews) <a href="https://twitter.com/BBCNews/status/962787146192031748?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **5:41 AM - 12 Feb 2018:**
  - @texthelpが本件についての声明を発表

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Data security investigation underway at Texthelp, statement on our website: <a href="https://t.co/6OVscEClY0">https://t.co/6OVscEClY0</a></p>&mdash; Texthelp for Edu (@texthelp) <a href="https://twitter.com/texthelp/status/962788604849377281?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **6:20 AM - 12 Feb 2018:**
  - @texthelpが該当の改ざんされたJavaScriptが除去されたと発表

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Our Data security investigation underway at Texthelp, statement on our website: <a href="https://t.co/KEXFbmDyZE">https://t.co/KEXFbmDyZE</a><br>Browsealoud was automatically removed from all our customers&#39; websites in response.  No action needed by our customers.</p>&mdash; Texthelp for Edu (@texthelp) <a href="https://twitter.com/texthelp/status/962798423941484547?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **8:34 AM - 12 Feb 2018:**
  - @irisscert(IRISS-CERRT)が本件に関するアラートを発表

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">We have issued an alert to the subscribers of our alerting system regarding reports of the cryptomining malware due to the BrowseAloud plugin <a href="https://t.co/62FT8V0FqN">https://t.co/62FT8V0FqN</a></p>&mdash; IRISS (@irisscert) <a href="https://twitter.com/irisscert/status/962832337158451201?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

## 攻撃経路

- @texthelpが提供する[Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/getstartedwithbrowsealoud/)が改ざんされたことが原因
- BrowsealoudはWebサイトのアクセシビリティを向上させるためのソフトウェア
  - イギリスを中心に多くの公共機関のWebサイトで採用されていた模様
- BrowsealoudのJavaScript(`www.browsealoud.com/plus/scripts/ba.js`)が改ざんされた原因については現在も調査中

## 被害にあったWebサイトの数

PublicWWWの検索結果によれば、4,275件のWebサイトが被害にあった模様。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Here&#39;s a list of 4,275 sites that are most likely *all* victims: <a href="https://t.co/1wzp9meUQJ">https://t.co/1wzp9meUQJ</a><br>These sites have neglected to deploy SRI and CSP, which would have completely mitigated this attack.</p>&mdash; Scott Helme (@Scott_Helme) <a href="https://twitter.com/Scott_Helme/status/962696534453256194?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

![Imgur](https://i.imgur.com/Sm5XiNJ.jpg)

## 改ざんされたJavaScriptについて

- **改ざん前(v2.5.0):** https://urlscan.io/responses/38527c93e446580d52617083d72ebea68b5b5f417ee3a2e9b02919d603a1e8ac/
- **改ざん後:**
  - オリジナル: https://pastebin.com/x772SUQU
  - 難読化解除版: https://pastebin.com/57vPLKAH

## 対策について

@Scott_Helmeは3rdパーティーのJavaScript改ざんへの対策として、SRI & CSPの設定をすることが重要だと指摘。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Gov website crypto miner issue was supply chain compromise. Lack of web security fundamentals (SRI &amp; CSP) made it possible. Was literally “let an external partner run anything on our site &amp; don’t tell us when it goes wrong”. Here’s <a href="https://twitter.com/Scott_Helme?ref_src=twsrc%5Etfw">@Scott_Helme</a>’s writeup: <a href="https://t.co/o3RfvK9LVe">https://t.co/o3RfvK9LVe</a></p>&mdash; Troy Hunt (@troyhunt) <a href="https://twitter.com/troyhunt/status/962792149946327040?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- 参考:
  - [MDN: Content Security Policy (CSP) - HTTP](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)
  - [MDN: Subresource Integrity - Web セキュリティ](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity)

## 関連事例

- 本件で使用されていたCoinhiveのSiteKeyは`1GdQGpY1pivrGlVHSp5P2IIr9cyTzzXq`
- このSiteKeyは別の事例でも観測されている

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The <a href="https://twitter.com/hashtag/Coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#Coinhive</a> script was briefly up, again, and gone now. This is getting very, very interesting.  <a href="https://twitter.com/fs0c131y?ref_src=twsrc%5Etfw">@fs0c131y</a> <a href="https://twitter.com/refsrc?ref_src=twsrc%5Etfw">@refsrc</a> What would you advise users? <a href="https://t.co/q1rES9fGBV">pic.twitter.com/q1rES9fGBV</a></p>&mdash; Banbreach (@Banbreach) <a href="https://twitter.com/Banbreach/status/960470919763423234?ref_src=twsrc%5Etfw">February 5, 2018</a></blockquote>

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

---
title: 公共機関を含む4,000+のWebサイトにCoinhiveが仕込まれた件についてまとめてみた
excerpt: 公共機関を含む4,000+のWebサイトにCoinhiveが仕込まれた件についてまとめてみた
---

## タイムライン

- **10:46 PM - 11 Feb 2018:**
  - @Scott_Helme(Scott Helme)が@ICOnews(イギリス・情報コミッショナーオフィス)の[公式Webサイト](https://www.ico.org.uk/)上でCoinhiveが見つかったとツイート

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Ummm, so yeah, this is *bad*. I just had <a href="https://twitter.com/phat_hobbit?ref_src=twsrc%5Etfw">@phat_hobbit</a> point out that <a href="https://twitter.com/ICOnews?ref_src=twsrc%5Etfw">@ICOnews</a> has a cryptominer installed on their site... 😮 <a href="https://t.co/xQhspR7A2f">pic.twitter.com/xQhspR7A2f</a></p>&mdash; Scott Helme (@Scott_Helme) <a href="https://twitter.com/Scott_Helme/status/962684239975272450?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- **11:14 PM - 11 Feb 2018:**
  - @Scott_HelmeがCoinhiveが埋め込まれた原因は3rdパーティーのJavaScript改ざんによるものだと特定
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

- **3:12 AM - 13 Feb 2018:**
  - @ncscが本件に関するガイドラインを発表

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Guidance for members of the public, website administrators and JavaScript developers following the recently publicised cryptocurrency mining compromises of several websites <a href="https://t.co/5vS86Xyif7">https://t.co/5vS86Xyif7</a></p>&mdash; NCSC UK (@ncsc) <a href="https://twitter.com/ncsc/status/963113501760901121?ref_src=twsrc%5Etfw">February 12, 2018</a></blockquote>

- **7:46 AM - 13 Feb 2018:**
  - PCMagのリポーターである@Michael_Kanからの問合せにCoinhiveが応答
    - 本件に関与したCoinhiveユーザーのアカウントは削除した
    - 本件に関与したCoinhiveユーザーの収益は0.1XMR(= 24USD)であった

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Coinhive updated their statement on the Browsealoud hijacking; yes their service was involved. Ended up mining 0.1XMR ($24) <a href="https://twitter.com/bad_packets?ref_src=twsrc%5Etfw">@bad_packets</a> <a href="https://twitter.com/Scott_Helme?ref_src=twsrc%5Etfw">@Scott_Helme</a> <a href="https://t.co/ibh3NX9OPv">pic.twitter.com/ibh3NX9OPv</a></p>&mdash; Michael Kan (@Michael_Kan) <a href="https://twitter.com/Michael_Kan/status/963182433817583617?ref_src=twsrc%5Etfw">February 12, 2018</a></blockquote>

## 攻撃経路

- @texthelpが提供する[Browsealoud](https://www.texthelp.com/en-gb/products/browsealoud/getstartedwithbrowsealoud/)が改ざんされたことが原因
- BrowsealoudはWebサイトのアクセシビリティを向上させるためのソフトウェア
  - イギリスを中心に多くの公共機関のWebサイトで採用されていた模様
- BrowsealoudのJavaScript(`www.browsealoud.com/plus/scripts/ba.js`)が改ざんされた原因については現在も調査中

- @marco_covaはAmazon S3経由で改ざんされたのではないかと指摘している

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">The <a href="https://t.co/gGMeoCMAv7">https://t.co/gGMeoCMAv7</a> script has been injected since at least 11am this morning, so the attack went on for about 5 hours. <a href="https://t.co/FBoCyBCK8Q">pic.twitter.com/FBoCyBCK8Q</a></p>&mdash; Marco Cova (@marco_cova) <a href="https://twitter.com/marco_cova/status/962731649875218433?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">That FULL_CONTROL seems unwise.<br><br>&quot;We highly recommend that you never grant the All Users group WRITE, WRITE_ACP, or FULL_CONTROL permissions.&quot; <a href="https://t.co/vMYMiAF6Ce">pic.twitter.com/vMYMiAF6Ce</a></p>&mdash; Marco Cova (@marco_cova) <a href="https://twitter.com/marco_cova/status/962735563206995968?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">There&#39;s some ongoing work on the browsealoud&#39;s S3 bucket (notice the changed LastModified and Size attribute for the compromised ba.js script). <a href="https://t.co/ojLbGKjF16">pic.twitter.com/ojLbGKjF16</a></p>&mdash; Marco Cova (@marco_cova) <a href="https://twitter.com/marco_cova/status/962743448527953921?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Waiting for the incident analysis from the browsealoud folks, but at this point I&#39;d bet it was an S3 bucket compromise</p>&mdash; Marco Cova (@marco_cova) <a href="https://twitter.com/marco_cova/status/962743691491323905?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

## 被害にあったWebサイト

- [PublicWWWの検索結果](https://publicwww.com/websites/browsealoud.com%2Fplus%2Fscripts%2Fba.js/)によれば、4,275件のWebサイトが被害にあった模様。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Here&#39;s a list of 4,275 sites that are most likely *all* victims: <a href="https://t.co/1wzp9meUQJ">https://t.co/1wzp9meUQJ</a><br>These sites have neglected to deploy SRI and CSP, which would have completely mitigated this attack.</p>&mdash; Scott Helme (@Scott_Helme) <a href="https://twitter.com/Scott_Helme/status/962696534453256194?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- キャプチャ:

![Imgur](https://i.imgur.com/Sm5XiNJ.jpg)

- @bad_packetsによるPublicWWW検索結果のまとめ

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">The full list of websites that may have been affected by the <a href="https://twitter.com/texthelp?ref_src=twsrc%5Etfw">@texthelp</a> Browsealoud <a href="https://twitter.com/hashtag/cryptojacking?src=hash&amp;ref_src=twsrc%5Etfw">#cryptojacking</a> campaign is available here.<a href="https://t.co/2iqKyRtq41">https://t.co/2iqKyRtq41</a></p>&mdash; Bad Packets Report (@bad_packets) <a href="https://twitter.com/bad_packets/status/962859530261471233?ref_src=twsrc%5Etfw">February 12, 2018</a></blockquote>

## 改ざんされたJavaScriptについて

- **改ざん前(v2.5.0):**
  - ref. [urlscan.io](https://urlscan.io/responses/38527c93e446580d52617083d72ebea68b5b5f417ee3a2e9b02919d603a1e8ac/)
- **改ざん後:**
  - [オリジナルver.](https://pastebin.com/x772SUQU)
  - [難読化解除ver.](https://pastebin.com/57vPLKAH)
  - 難読化解除ver.のキャプチャ:

![Imgur](https://i.imgur.com/mrHBqVh.png)

## 対策について

@Scott_Helmeは3rdパーティーのJavaScript改ざんへの対策として、SRI & CSPの設定をすることが重要だと指摘。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Gov website crypto miner issue was supply chain compromise. Lack of web security fundamentals (SRI &amp; CSP) made it possible. Was literally “let an external partner run anything on our site &amp; don’t tell us when it goes wrong”. Here’s <a href="https://twitter.com/Scott_Helme?ref_src=twsrc%5Etfw">@Scott_Helme</a>’s writeup: <a href="https://t.co/o3RfvK9LVe">https://t.co/o3RfvK9LVe</a></p>&mdash; Troy Hunt (@troyhunt) <a href="https://twitter.com/troyhunt/status/962792149946327040?ref_src=twsrc%5Etfw">February 11, 2018</a></blockquote>

- 参考:
  - [MDN: Content Security Policy (CSP) - HTTP](https://developer.mozilla.org/ja/docs/Web/HTTP/CSP)
  - [MDN: Subresource Integrity - Web セキュリティ](https://developer.mozilla.org/ja/docs/Web/Security/Subresource_Integrity)

## 関連事例

- 本件で使用されていたCoinhiveのSiteKeyは`1GdQGpY1pivrGlVHSp5P2IIr9cyTzzXq`
- このSiteKeyは別の事例でも観測されている

### deccanchronicle.com & asianage.comの事例

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hey <a href="https://twitter.com/DeccanChronicle?ref_src=twsrc%5Etfw">@DeccanChronicle</a>, and <a href="https://twitter.com/TheAsianAgeNews?ref_src=twsrc%5Etfw">@TheAsianAgeNews</a>! Your pages are loading <a href="https://twitter.com/hashtag/Coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#Coinhive</a> <a href="https://twitter.com/hashtag/cryptomining?src=hash&amp;ref_src=twsrc%5Etfw">#cryptomining</a> Javascript. <br><br>Unsuspecting users visiting these pages may face unexpected CPU usage spikes, and browsers may hang. <a href="https://t.co/BzbodPYcyK">pic.twitter.com/BzbodPYcyK</a></p>&mdash; Banbreach (@Banbreach) <a href="https://twitter.com/Banbreach/status/960199133016612865?ref_src=twsrc%5Etfw">February 4, 2018</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The <a href="https://twitter.com/hashtag/Coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#Coinhive</a> script was briefly up, again, and gone now. This is getting very, very interesting.  <a href="https://twitter.com/fs0c131y?ref_src=twsrc%5Etfw">@fs0c131y</a> <a href="https://twitter.com/refsrc?ref_src=twsrc%5Etfw">@refsrc</a> What would you advise users? <a href="https://t.co/q1rES9fGBV">pic.twitter.com/q1rES9fGBV</a></p>&mdash; Banbreach (@Banbreach) <a href="https://twitter.com/Banbreach/status/960470919763423234?ref_src=twsrc%5Etfw">February 5, 2018</a></blockquote>

- 上記の事例もCDN上のJavaScript改ざんにより引き起こされている
- 上記の事例で改ざんされたJavaScriptのURLは以下の通り
  - `d2u6vujtbrga6l.cloudfront.net/js/jquery.onImagesLoad.min.js`
  - `cdn.deccanchronicle.com/js/jquery.onImagesLoad.min.js`
    - ref. [urlscan.io](https://urlscan.io/responses/da70a208644e7bbdf8f45a4144b47360e143ecef222d899739d30f60cde49a9a/)
    - キャプチャ:
      - ![Imgur](https://i.imgur.com/gavwTLx.png)

### maalaimalar.comの事例

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#coinhive</a> SiteKey &quot;1GdQGpY1pivrGlVHSp5P2IIr9cyTzzXq&quot; also exists on maalaimalar[.]com.<br>The JS payload is stat.maalaimalar[.]com/prebid_20171006092440.js/prebid.js.<a href="https://t.co/JlcaJ3Kf5X">https://t.co/JlcaJ3Kf5X</a><a href="https://twitter.com/bad_packets?ref_src=twsrc%5Etfw">@bad_packets</a> <a href="https://twitter.com/Scott_Helme?ref_src=twsrc%5Etfw">@Scott_Helme</a> <a href="https://t.co/rmwOyYJNGe">pic.twitter.com/rmwOyYJNGe</a></p>&mdash; にのせき (@ninoseki) <a href="https://twitter.com/ninoseki/status/962882845394944000?ref_src=twsrc%5Etfw">February 12, 2018</a></blockquote>

- 上記の事例で改ざんされたJavaScriptのURLは以下の通り
  - `stat.maalaimalar.com/prebid_20171006092440.js/prebid.js`
    - ref. [urlscan.io](https://urlscan.io/responses/b324910e52376753949a4fe65cfb3191c292408144f6108ffd3ba08f98c453bf/)
    - キャプチャ:
      - ![Imgur](https://i.imgur.com/cbO5WoW.png)

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

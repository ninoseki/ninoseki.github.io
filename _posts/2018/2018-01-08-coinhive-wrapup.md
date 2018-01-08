---
title: そろそろCoinhiveについて振り返るか
excerpt: Coinhiveについてまとめ記事
---

<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

JavaScript実装の仮想通貨(Monero)マイナーであるCoinhiveが登場してから数ヶ月たちました。

毀誉褒貶あるこのCoinhiveについて振り返って見ましょう。

## Coinhiveとは?

![Imgur](https://i.imgur.com/WTZzpxt.png)

CoinhiveはJavaScriptで実装された仮想通貨(Monero)マイナーです。

Webサイトの管理者はCoinhiveを用いることでユーザーのCPUリソースを使用してマイニングを行い、マネタイズすることができます。

Coinhiveのコンセプト自体は興味深いものであり、広告を代替するものとして期待が寄せられました。しかし、Coinhiveはユーザーの同意なくマイニングを行います。Opt-outもできません。

このため、多くのAVベンダーはこれをマルウェアと見なします。

2018/01/08時点においてCoinhive(`coinhive.min.js` / `7a4ed680d5e94d437d2c9d41b07349d308a2e724d3c26c51a420dbbff49adadd`)のVirusTotalにおける検知率は30/59となっています。

![Imgur](https://i.imgur.com/ncJrkxv.png)

## 主な出来事

* 2017/09/14: Coinhiveがローンチ
* 2017/09/15: The Pirate BayがCoinhiveを使用開始
  * ref. [100% CPU on all 8 threads while visiting TPB](https://www.reddit.com/r/thepiratebay/comments/70aip7/100_cpu_on_all_8_threads_while_visiting_tpb/?sort=new)
* 2017/09/16: The Pirate Bayが謝罪
  * ref. [Miner](https://thepiratebay.org/blog/242)
* 2017/09/30: CloudflareのJustin Paine(Head of Trust and Safety)がCoinhiveをマルウェアと見なすとTweet
  * <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">if it’s specifically opt-in with explicit user interaction, perhaps.<br><br>if it’s not opt-in with explicit user interaction then it is malware, and will be treated as such.</p>&mdash; Justin (@xxdesmus) <a href="https://twitter.com/xxdesmus/status/913975353709813761?ref_src=twsrc%5Etfw">September 30, 2017</a></blockquote>
* 2017/10/05: CloudflareがCoinhiveのバンを開始
  * ref. [Cloudflare Bans Sites For Using Cryptocurrency Miners](https://torrentfreak.com/cloudflare-bans-sites-for-using-cryptocurrency-miners-171004/)
* 2017/10/13: USの著名サイトPolitifact.comがハックされ、Coinhiveが埋め込まれる
  * ref. [Hackers have turned Politifact’s website into a trap for your PC](https://www.washingtonpost.com/news/the-switch/wp/2017/10/13/hackers-have-turned-politifacts-website-into-a-trap-for-your-pc/?utm_term=.9fa4a4a7cf4b)
  * 著名サイトがハックされ、Coinhiveを埋め込まれたと公式に認めた例はこれが初と思われる
* 2017/10/16: CoinhiveがOpt-in方式のマイナ-(AuthedMine)を公開
  * ref. [AuthedMine – Non-Adblocked](https://coinhive.com/blog/authedmine)
* 2017/10/23: CoinhiveのDNSレコードが改ざんされる
  * ref. [Security Incident - DNS Breach](https://coinhive.com/blog/dns-breach)
* 2017/10/30: Coinhiveが埋め込まれたAndroidアプリが発見される
  * ref. [Coin Miner Mobile Malware Returns, Hits Google Play](http://blog.trendmicro.com/trendlabs-security-intelligence/coin-miner-mobile-malware-returns-hits-google-play/)
* 2017/11/10: ENISAが「[Cryptojacking - Cryptomining in the browser](https://www.enisa.europa.eu/publications/info-notes/cryptojacking-cryptomining-in-the-browser)」を公開
  * Cryptojacking(ユーザーの同意なく、ブラウザ上でマイニングを行うこと)の代表としてCoinhiveが言及される
* 2017/11/13: CheckpointがCoinhive(及びその亜種)が6番目に多く見られるマルウェアだという統計を公開
  * ref. [Cryptocurrency Mining Presents New Threat to Business, says Check Point](https://www.checkpoint.com/press/2017/cryptocurrency-mining-presents-new-threat-business-says-check-point/)
* 2017/12/02: スターバック(AU)のWi-Fiがハイジャックされ、Coinhiveが埋め込まれる
  * <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Hi <a href="https://twitter.com/Starbucks?ref_src=twsrc%5Etfw">@Starbucks</a> <a href="https://twitter.com/StarbucksAr?ref_src=twsrc%5Etfw">@StarbucksAr</a> did you know that your in-store wifi provider in Buenos Aires forces a 10 second delay when you first connect to the wifi so it can mine bitcoin using a customer&#39;s laptop? Feels a little off-brand.. cc <a href="https://twitter.com/GMFlickinger?ref_src=twsrc%5Etfw">@GMFlickinger</a> <a href="https://t.co/VkVVdSfUtT">pic.twitter.com/VkVVdSfUtT</a></p>&mdash; Noah Dinkin (@imnoah) <a href="https://twitter.com/imnoah/status/936948776119537665?ref_src=twsrc%5Etfw">December 2, 2017</a></blockquote>

## 広がる用途、広がる悪用

Coinhiveのまっとうな使用事例として、広告の代替として使用されている事例が挙げられます。

* [Hextris](http://hextris.io/)(パズルゲーム)
  * 広告の代わりに使用、ゲームプレイ中にマイニングが行われる
* [b3log/solo](https://github.com/b3log/solo)(OSS)
  * OSSプロジェクトへのコントリビューションとして、Coinhiveをビルトインしている
  * 設定によりOpt-out可能
* etc.

一方、Webサイトの改ざんによりCoinhiveを埋め込むなど、悪用される事例は枚挙に暇がありません。

### Webサイトの改ざん事例

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">In my 2017 year-end review, I discuss the most well-known <a href="https://twitter.com/hashtag/cryptojacking?src=hash&amp;ref_src=twsrc%5Etfw">#cryptojacking</a> incidents and how they happened.<br><br>1⃣ <a href="https://twitter.com/Showtime?ref_src=twsrc%5Etfw">@Showtime</a> <br>2⃣ <a href="https://twitter.com/PolitiFact?ref_src=twsrc%5Etfw">@PolitiFact</a> <br>3⃣ <a href="https://twitter.com/UFCFightPass?ref_src=twsrc%5Etfw">@UFCFightPass</a><br>4⃣ <a href="https://twitter.com/CrucialMemory?ref_src=twsrc%5Etfw">@CrucialMemory</a> &amp; <a href="https://twitter.com/Everlast_?ref_src=twsrc%5Etfw">@Everlast_</a> <br>5⃣ <a href="https://twitter.com/globovision?ref_src=twsrc%5Etfw">@globovision</a> &amp; <a href="https://twitter.com/movistar_es?ref_src=twsrc%5Etfw">@movistar_es</a> <a href="https://t.co/MCzoEYwFzG">https://t.co/MCzoEYwFzG</a></p>&mdash; Bad Packets Report (@bad_packets) <a href="https://twitter.com/bad_packets/status/947662498265686017?ref_src=twsrc%5Etfw">January 1, 2018</a></blockquote>

* [Hacked Websites Mine Cryptocurrencies](https://blog.sucuri.net/2017/09/hacked-websites-mine-crypocurrencies.html)
* [Cryptojacking Campaign Impacts Nearly 1,500 Websites](https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/cryptojacking-campaign-impacts-nearly-1-500-websites)
* [Cryptocurrency Miners Exploiting WordPress Sites](https://www.wordfence.com/blog/2017/10/cryptocurrency-mining-wordpress/)

### PDFファイルの事例

PDFファイルにCoinhiveが埋め込まれた事例。

* `e-Receiptmen%iCLoud%purchse-stored#ID91239849.pdf`(`1cbf2cdd487e30595f22e1e1dd504201035edf816c1b7c1aee51e1a8314f8ae6`)
  * ref. [Hybrid Analysis](https://www.hybrid-analysis.com/sample/1cbf2cdd487e30595f22e1e1dd504201035edf816c1b7c1aee51e1a8314f8ae6?environmentId=100)
  * URL短縮サービスBit.do(`https://bit.do/`)でCoinhiveを取得
  * Appleからの領収書に偽装

![Imgur](https://i.imgur.com/5g6RvjC.png)

### Exeファイルの事例

.exeファイルにCoinhiveが埋め込まれた事例。

* `5d33b8a363d6edaad6e02e9a73a44c8cd3eddf87a9fa8686763e91830427a9ab`
  * ref. [Hybird Analysis](https://www.hybrid-analysis.com/sample/5d33b8a363d6edaad6e02e9a73a44c8cd3eddf87a9fa8686763e91830427a9ab?environmentId=100)
  * `upload-center.byethost4[.]com/server-cccam.html?i=3`からCoinhiveを取得

### Andrdoiアプリの事例

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Found hundreds of infected <a href="https://twitter.com/hashtag/android?src=hash&amp;ref_src=twsrc%5Etfw">#android</a> apps with a <a href="https://twitter.com/hashtag/Coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#Coinhive</a> miner: <a href="https://t.co/F8vSSQWSyg">https://t.co/F8vSSQWSyg</a> <br><br>Coinhive miner code: <a href="https://t.co/eIVlFoDZP1">https://t.co/eIVlFoDZP1</a> …<br><br>Dropper app: <a href="https://t.co/kVEHPgmt8W">https://t.co/kVEHPgmt8W</a> …<br><br>VT score: 2/61<br><br>cc <a href="https://twitter.com/JAMESWT_MHT?ref_src=twsrc%5Etfw">@JAMESWT_MHT</a> <a href="https://twitter.com/malwrhunterteam?ref_src=twsrc%5Etfw">@malwrhunterteam</a> <a href="https://twitter.com/bad_packets?ref_src=twsrc%5Etfw">@bad_packets</a> <a href="https://twitter.com/virqdroid?ref_src=twsrc%5Etfw">@virqdroid</a> <a href="https://twitter.com/LukasStefanko?ref_src=twsrc%5Etfw">@LukasStefanko</a> <a href="https://t.co/mxh6abuzfO">pic.twitter.com/mxh6abuzfO</a></p>&mdash; Elliot Alderson (@fs0c131y) <a href="https://twitter.com/fs0c131y/status/949781296187871232?ref_src=twsrc%5Etfw">January 6, 2018</a></blockquote>

## まとめ・私見

> coinhive はウェブサイトの訪問者のCPUでマイニングするスクリプトを仕込むサービスです。coinhive はユーザーのCPU資源を奪うスパム扱いされることが多いんですが、自分の意見はちょっと別で、広告か coinhive かを選ぶ自由がユーザーにあってもいいと思います。あくまで選択肢として、です。
>
> 無許可の coinhive がよくないのはそうなんですが、その理屈で言うと、無許可の広告も良くないってことになりますよね。ユーザーに無許可で視界と動線とユーザー体験とCPUを奪っています。営利サイトで課金か広告かマイニングかユーザーが選ぶ権利はあってもいいと思うんですよね。(現状 coinhive の monero のCPUマイニングは効率悪すぎなんですが)
>
> --- @mizchi (via https://monappy.jp/memo_logs/view/mizchi/1888)

自分もこの意見には基本的には賛成です。
しかし、Opt-inでマイニングができるAuthedMineが登場した以上、Opt-outすることもできないCoinhiveを使うものはすべてMaliciousである、というのが自分の意見です。

@mubixの[ブログ](https://malicious.link/)は理想的な使用事例の1つですが、ユーザー側のリテラシーも含めて、広告の代替として使用するというのは現実的とは思えません。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I&#39;ve added an opt-in javascript cryptominer to my blog from <a href="https://twitter.com/Coinhive?ref_src=twsrc%5Etfw">@Coinhive</a> if you find value in my blog, &amp; want to donate some CPU cycles to it, I appreciate it. If not, no big deal, it&#39;s in the footer and should be unobtrusive. Let me know if you don&#39;t like it, just trying it out.</p>&mdash; Rob Fuller (@mubix) <a href="https://twitter.com/mubix/status/949699163859701760?ref_src=twsrc%5Etfw">January 6, 2018</a></blockquote>

一方、繰り返しになりますが、Coinhiveを悪用される事例は枚挙に暇がありません。

CSO Onlineは「[Top 5 cybersecurity concerns for 2018](https://www.csoonline.com/article/3241766/cyber-attacks-espionage/top-5-cybersecurity-concerns-for-2018.html)」という記事において、Cryptojackingの拡大を予測しています。

エンドユーザーとしてのCryptojacking対策としては、主に以下の2点が挙げられます。

* AVソフトを最新化する
* [NoCoin](https://github.com/keraf/NoCoin), [Crypto Miner Blocker](https://github.com/lesander/crypto-miner-blocker), [MinerBlock](https://github.com/xd4rker/MinerBlock)など仮想通貨マイナーをブロックする拡張機能を使用する

以上です。

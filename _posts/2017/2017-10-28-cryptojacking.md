---
title: Cryptojackingについてまとめてみた
excerpt: Cryptojackingについてまとめてみた
---

## Cryptojackingとは
意図せずに端末上/ブラウザ上で仮想通貨のマイニングを実行させられる攻撃のこと。

[Coinhive](https://coinhive.com/)の登場(2017年9月)以降、この用語が使われるようになった模様。

## 想定シナリオ
* Webサイト管理者が、ユーザーの同意なしにCoinhive等のマイニング用JavaScriptをWebサイト上に埋め込む
* 攻撃者がWebサイトを改ざんし、Webサイト上にCoinhive等のマイニング用JavaScriptを埋め込む

## 事例集

### 海外事例

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">BREAKING NEWS: <a href="https://twitter.com/hashtag/Coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#Coinhive</a> found on official <a href="https://twitter.com/PolitiFact?ref_src=twsrc%5Etfw">@PolitiFact</a> website in latest case of <a href="https://twitter.com/hashtag/cryptojacking?src=hash&amp;ref_src=twsrc%5Etfw">#cryptojacking</a>. <a href="https://t.co/czGc5aaug7">pic.twitter.com/czGc5aaug7</a></p>&mdash; Bad Packets Report (@bad_packets) <a href="https://twitter.com/bad_packets/status/918886823455113216?ref_src=twsrc%5Etfw">October 13, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">.<a href="https://twitter.com/bobmcmillan?ref_src=twsrc%5Etfw">@bobmcmillan</a> spoke with Politifact Executive Director and found their <a href="https://twitter.com/hashtag/cryptojacking?src=hash&amp;ref_src=twsrc%5Etfw">#cryptojacking</a> incident was due to a &quot;misconfigured cloud server&quot; <a href="https://t.co/OcGW2gNPwb">https://t.co/OcGW2gNPwb</a></p>&mdash; Bad Packets Report (@bad_packets) <a href="https://twitter.com/bad_packets/status/924010623465275392?ref_src=twsrc%5Etfw">October 27, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

* USの著名なファクトチェックサイトにCoinhiveが埋め込まれ、閲覧者のCPU使用率が100%になる状態に
* PolitiFactのディレクターはクラウドサーバーの設定ミスが原因でCoinhiveが埋め込まれたと発言

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#coinhive</a> injected into <a href="https://twitter.com/hashtag/CBS?src=hash&amp;ref_src=twsrc%5Etfw">#CBS</a> <a href="https://twitter.com/hashtag/SHOWTIME?src=hash&amp;ref_src=twsrc%5Etfw">#SHOWTIME</a>  mining <a href="https://twitter.com/hashtag/Monero?src=hash&amp;ref_src=twsrc%5Etfw">#Monero</a> crypto-coins in viewers&#39; web browsers <a href="https://t.co/NGwH3qls9W">https://t.co/NGwH3qls9W</a> <a href="https://t.co/3ILVGiHJ2y">pic.twitter.com/3ILVGiHJ2y</a></p>&mdash; Laurent Perche (@Laurent_Perche) <a href="https://twitter.com/Laurent_Perche/status/914551244068413441?ref_src=twsrc%5Etfw">October 1, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

* CBS参加のテレビ局Showtimeの公式サイトにCoinhiveが埋め込まれる(ハックされた結果かどうかは不明)
* [Wall Street Journalの取材](https://www.wsj.com/articles/hackers-latest-move-using-your-computer-to-mine-bitcoin-1509102002?mod=e2tw)に対し、Showtimeのスポークスマンはコメントを辞退

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">We found AdsenseBase, yet another JavaScript cryptocurrency miner hosted in video streaming sites <a href="https://t.co/d139qSdpBP">pic.twitter.com/d139qSdpBP</a></p>&mdash; Microsoft MMPC (@msftmmpc) <a href="https://twitter.com/msftmmpc/status/922728149015826432?ref_src=twsrc%5Etfw">October 24, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">AdsenseBase is embedded w/in multiple layers of iframes, an attempt to hide, just like the use of a name that doesn&#39;t have &quot;coin&quot; or &quot;miner&quot; <a href="https://t.co/V6esfl2pLi">pic.twitter.com/V6esfl2pLi</a></p>&mdash; Microsoft MMPC (@msftmmpc) <a href="https://twitter.com/msftmmpc/status/922728879088746497?ref_src=twsrc%5Etfw">October 24, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

* 某ビデオストリーミングサイトにマイナーが埋め込まれた事例をMicrosoftが報告
* 多段のiframeを使用 + "coin"/"miner"という単語を使わない等の工夫が施されているとのこと

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Continuing our series on Cryptominers on Hacked Sites: CoinHive shows up on more infected sites: <a href="https://t.co/qkZ6W0xEUT">https://t.co/qkZ6W0xEUT</a> by <a href="https://twitter.com/unmaskparasites?ref_src=twsrc%5Etfw">@unmaskparasites</a></p>&mdash; Sucuri (@sucurisecurity) <a href="https://twitter.com/sucurisecurity/status/923279877314408450?ref_src=twsrc%5Etfw">October 25, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
* WordPress, Joomla, DrupalなどのCMSがハックされ、マイナーが埋め込まれる事例をSucuriが報告
* 500以上のWordPressサイトがハックされているとのこと

### 日本国内事例

> 今回観測した事象は、一般の日本企業のWebサイトが改ざんされて仮想通貨をマイニングするスクリプトが埋め込まれるというものです。
>
> ここで注意すべきなのは、仮想通貨をマイニングするスクリプトがWebサイトの管理者によって意図的に埋め込まれたものなのか、あるいは攻撃者が悪意を持って挿入したものなのかを外部から一律に判断することは困難という点です。
>
> 今回に関しては、挿入されたスクリプトが発見されにくいように隠蔽されていたことから、攻撃者によって勝手に挿入されたものと判断しました。
>
> --- via IIJ [Webサイトの改ざんに伴う仮想通貨マイニングスクリプトの埋め込み事例](https://wizsafe.iij.ad.jp/2017/10/94/)

## どんんだけ儲かる?

Cryptojackingは攻撃者にとってどれだけ実入りがいいものなのだろうか?

Checkpointの試算結果によれば、1,000人のユーザーがいるサイトにCoinhiveを埋め込めば月収20万程度は達成できると推測されている。

> Assuming the latest Monero network stats:
>
> Monero Hashrate: 266.122 Mh/s (current worldwide mining power)
>
> A new block is created every 2 minutes in average. (720 blocks per day)
>
> Reward per block is 6.2 XMR.
>
> 1 XMR = 88.46$
>
> Every day 4464 XMR worth of blocks are created (720*6.2)
>
> One’s relative contribution to the network’s hashrate is 0.0000000169095 (45/266.12M)
>
> So we will receive 0.000754 XMR daily, per user.
>
> And for 1000 users, for 30 days: (1000*30*0.000754) = 22.62 XMR
>ß
> In dollars: 2001 USD    (22.62*88.46)
>
> --- via [Crypto Miners Part 2](https://blog.checkpoint.com/2017/10/23/crypto-miners-part-2/)

## エンドユーザー側での対策方法

### AVソフトによる対策

* `coinhive.min.js`(39831bc68dddc4d22b7a0eea978a0193966d2cefda77a223c2b7140305e8b5fd)の検出率は28/59
  * ![Imgur](https://i.imgur.com/H5bO2OQ.png)
  * https://www.virustotal.com/ja/us/file/39831bc68dddc4d22b7a0eea978a0193966d2cefda77a223c2b7140305e8b5fd/analysis/
* Coinhive自体は合法であるため、AV側で検出すべきかどうかは議論が別れるところ

### 拡張機能による対策

[NoCoin](https://github.com/keraf/NoCoin), [Crypto Miner Blocker](https://github.com/lesander/crypto-miner-blocker), [MinerBlock](https://github.com/xd4rker/MinerBlock)などJS実装の仮想通貨マイナーをブロックする拡張機能が公開されている。

大別して、ドメインブラックリスト方式(NoCoin, Crypto Miner Blocker)とJS実装に割り込みをかける方式(MinerBlock)の二種類がある。

**MinerBlockの実装**
```js
for(let name in this) {

	if(name === 'webkitStorageInfo') {
		continue;
	}

	// Check coinhive miner

	if(	this[name]
		&& typeof this[name] !== 'undefined'
		&& typeof this[name].isRunning === 'function'
		&& typeof this[name].stop === 'function') {
		console.log('[+] Coinhive miner found, stopping...');
		this[name].stop();
		this[name] = null;
		triggerMbEvent('coinhive.com');
	}
}
```
* Coinhiveの公式実装では、マイニングをするインスタンスは`isRunning`メソッドと`stop`メソッドを持つ。
* MinerBlockはその両方の持つインスタンスがないか総当りでチェックを行い、該当するインスタンスがある場合は`stop`メソッドを呼び出しマイニングを中止させる。
  * この実装では少し改変されるだけでブロックできなくなる・・・

### Coinhive公式による対策

CoinhiveはユーザーがOpt-Inでマイニングに協力するかどうか選択できる実装を公開。
* [AuthedMine](https://coinhive.com/documentation/authedmine)
  * ![Imgur](https://i.imgur.com/Jekk03c.png)

### ブラウザ実装による対策

bugs.chromium.org上で何か対策ができないのかと議論中
* [Please consider intervention for high cpu usage js](https://bugs.chromium.org/p/chromium/issues/detail?id=766068)

> If a site is using more than XX% CPU for more than YY seconds, then we put the page into "battery saver mode" where we aggressively throttle tasks and show a toast allowing the user to opt-out of battery saver mode.

など色々と提案がなされているか、まとまるかは疑問。

## まとめ

* Cryptojackingが流行ってきている。
* エンドユーザー側での対策方法は色々あるが、ドメインブラックリスト方式の拡張機能を使うのがいいのではないか。



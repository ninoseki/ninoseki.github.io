---
title: 悪性ドメインの名前解決をブロックするパブリックDNS Quad9を使ってみた
excerpt: 悪性ドメインの名前解決をブロックするパブリックDNS Quad9を使ってみた
tags: [security, dns]
---

## 概要

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">New <a href="https://twitter.com/hashtag/CollabDefense?src=hash&amp;ref_src=twsrc%5Etfw">#CollabDefense</a> with <a href="https://twitter.com/IBM?ref_src=twsrc%5Etfw">@IBM</a> ,PCH &amp; <a href="https://twitter.com/GlobalCyberAlln?ref_src=twsrc%5Etfw">@GlobalCyberAlln</a> means private, secure browsing with <a href="https://twitter.com/hashtag/Quad9?src=hash&amp;ref_src=twsrc%5Etfw">#Quad9</a>. Learn more: <a href="https://t.co/NdklxqT2Yj">https://t.co/NdklxqT2Yj</a> <a href="https://t.co/rYJlVopgEy">pic.twitter.com/rYJlVopgEy</a></p>&mdash; IBM Security (@IBMSecurity) <a href="https://twitter.com/IBMSecurity/status/931152614254837760?ref_src=twsrc%5Etfw">November 16, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

IBM, Packet Clearing House, Global Cyber Allianceが提供するパブリックDNS [Quad9](https://www.quad9.net)(9.9.9.9)を使ってみました。

下記の図で示されているように、悪性ドメインの名前解決をブロックしてくれます。

![Imgur](https://i.imgur.com/0qvKHyV.png)

悪性ドメインのリストは、IBM, Packet Clearing House, Global Cyber Allianceの3者が持つものに加えて、以下のパートナーから提供されたものが統合されているとのことです。

* Abuse.ch, the Anti-Phishing Working Group, Bambenek Consulting, F-Secure, mnemonic, 360Netlab, Hybrid Analysis GmbH, Proofpoint, RiskIQ, ThreatSTOP.


## 動作確認

さて、実際に悪性ドメインの名前解決がブロックされるのか確認してみましょう。

### その1(ZeuS)

パートナーの一人であるAbuse.chが提供する[ZeuSのドメインブラックリスト](https://zeustracker.abuse.ch/blocklist.php?download=baddomains)に掲載されているドメインを引いてみます。

```sh
$ nslookup afobal.cl

Server:		9.9.9.9
Address:	9.9.9.9#53

** server can't find afobal.cl: NXDOMAIN
```

名前解決がブロックされました。

### その2(Locky)

同じくAbuse.chが提供する[Lockyのドメインブラックリスト](https://ransomwaretracker.abuse.ch/downloads/LY_C2_DOMBL.txt)に掲載されているドメインを引いてみます。

```sh
$ nslookup sqsigig.pw

Server:		9.9.9.9
Address:	9.9.9.9#53

** server can't find sqsigig.pw: NXDOMAIN
```

### その3(BadRabbit)

BadRabbitに関する[FireEyeのレポート](https://www.fireeye.com/blog/threat-research/2017/10/backswing-pulling-a-badrabbit-out-of-a-hat.html)に掲載されているドメインを引いてみます。

```sh
$ nslookup 1dnscontrol.com

Server:		9.9.9.9
Address:	9.9.9.9#53

** server can't find 1dnscontrol.com: NXDOMAIN
```

名前解決がブロックされました。

### その4(Ursnif)

2017/11/14に[SMBCが注意喚起](http://www.smbc.co.jp/security/attention/index19.html)を行っていたフィッシングメールで使われていた、Ursnifを配布するドメインを引いてみます。

**フィッシングメール 添付ファイルの情報**

* `警告！今はをチェックしてください.zip`(SHA256: `1583f7e210ab76d429e59b2a8d5e362674028c112532041873e88fcfb979c479`)
  * [VirutsTotal](https://www.virustotal.com/#/file/1583f7e210ab76d429e59b2a8d5e362674028c112532041873e88fcfb979c479/)
* `セキュリティ情報.docx`(SHA256: `535343c0decc93cbec65542a5a651df03d02e28622ab0802446b5ea580477d1d`)
  * [VirusTotal](https://www.virustotal.com/#/file/535343c0decc93cbec65542a5a651df03d02e28622ab0802446b5ea580477d1d/)
  * [Hybrid Analysis](https://www.hybrid-analysis.com/sample/535343c0decc93cbec65542a5a651df03d02e28622ab0802446b5ea580477d1d)
* 通信先URL: `http://eu.kihealthandfitness[.]com/doc.bin?syif`
  * Ursnif本体: `doc.bin`(SHA256: `5479746c9f658c99865ea1d0fb605c769f7a8e0b1ef64ae74aa08f66e88063eb`)
    * [VirusTotal](https://www.virustotal.com/#/file/5479746c9f658c99865ea1d0fb605c769f7a8e0b1ef64ae74aa08f66e88063eb/)
    * [Hybrid Analysis](https://www.hybrid-analysis.com/sample/5479746c9f658c99865ea1d0fb605c769f7a8e0b1ef64ae74aa08f66e88063eb)

```sh
$ nslookup eu.kihealthandfitness.com

Server:		9.9.9.9
Address:	9.9.9.9#53

Non-authoritative answer:
Name:	eu.kihealthandfitness.com
Address: 185.17.26.54
```

名前解決がブロックされませんでした。


## まとめ

Quad9は有名どころの悪性ドメインはブロックしてくれます。

ブロックする対象は、公式Twitterアカウント(@Quad9DNS)がつぶやいているように、信頼性が高いものに限られています。

当たり前ですが、あらゆる悪性ドメインをブロックするというわけではありません。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">No, but we do not filter content, only block malicious domains. We strive to use high rep TI feeds with low false positive rate</p>&mdash; Quad9 (@Quad9DNS) <a href="https://twitter.com/Quad9DNS/status/931502831764475909?ref_src=twsrc%5Etfw">November 17, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

あくまでも補助的なセキュリティ対策の一つとして使用する分にはとても有益なソリューションではないでしょうか。
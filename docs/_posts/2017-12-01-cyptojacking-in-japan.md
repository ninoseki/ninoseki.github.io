---
title: ac.jpドメイン上のWebサイトが改ざんされてCoinhiveを埋め込まれてしまった話
date: 2017-12-01
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

ac.jp ドメイン上の Web サイトで Coinhive が動いているのを見かけました。

![Imgur](https://i.imgur.com/IiLtdkx.png)

Coinhive は JavaScript 実装の仮想通貨マイナーです。
ユーザー側(ブラウザ側)の CPU リソースを消費してマイニングを行います。

Coinhive 自体は合法的な用途で使うこともできますが、無断で CPU リソースを消費することから、多くのウイルス対策ソフトはこれを PUP(Potentially Unwanted Program / 好ましくないと思われるプログラム)として検出します。

![Imgur](https://i.imgur.com/pIi8Q67.png)

さて、Web サイト上で Coinhive を見つけた場合、その Web サイトの管理者が意図して埋め込んでいるのか、攻撃者に改ざんされて埋め込まれてしまったのか、どちらか判断するためにはどうすればいいでしょうか。

判断する方法の 1 つは`Site Key`を確認することです。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/hashtag/cryptojacking?src=hash&amp;ref_src=twsrc%5Etfw">#cryptojacking</a> campaign = multiple compromised websites sharing the same <a href="https://twitter.com/hashtag/Coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#Coinhive</a> site key.</p>&mdash; Bad Packets Report (@bad_packets) <a href="https://twitter.com/bad_packets/status/931269542143188993?ref_src=twsrc%5Etfw">November 16, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

`Site Key`は Coinhive ユーザーが Web サイトごとの統計を取得するために用いる識別子です。Web サイトごとに異なる`Site Key`を設定することで、Web サイトごとの収益を確認することができます。

![Imgur](https://i.imgur.com/XJNnee7.png)

これが複数の無関係な Web サイト上にあった場合、攻撃者に改ざんされ Coinhive を埋め込まれてしまった可能性が高いと言えます。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The Institute for Social Economy (<a href="https://twitter.com/IPESBogota?ref_src=twsrc%5Etfw">@IPESBogota</a>) is a government agency Columbia.<br><br>Their website is part of a large <a href="https://twitter.com/hashtag/cryptojacking?src=hash&amp;ref_src=twsrc%5Etfw">#cryptojacking</a> campaign that includes 45 other compromised sites all using the same <a href="https://twitter.com/hashtag/Coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#Coinhive</a> site key:<br>CnPufgprubjWuiJpWZnq3mtjJgWUjNdL <a href="https://t.co/vDF5stmK8M">pic.twitter.com/vDF5stmK8M</a></p>&mdash; Bad Packets Report (@bad_packets) <a href="https://twitter.com/bad_packets/status/930329443955904512?ref_src=twsrc%5Etfw">November 14, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Same <a href="https://twitter.com/hashtag/coinhive?src=hash&amp;ref_src=twsrc%5Etfw">#coinhive</a> site key on www.selme-sokuteiki[.]net &amp; dmc-on-line[.]com.<br>Two points in common: Using PHP and Open 21 FTP port (ProFTPD).<br>Is it a <a href="https://twitter.com/hashtag/cyrptojacking?src=hash&amp;ref_src=twsrc%5Etfw">#cyrptojacking</a> case? <a href="https://t.co/q65q5nVJWa">pic.twitter.com/q65q5nVJWa</a></p>&mdash; にのせき (@ninoseki) <a href="https://twitter.com/ninoseki/status/935391830316847104?ref_src=twsrc%5Etfw">November 28, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

今回の場合、`Site Key` = `OZmgXBQnT984WuYsBHYhmosFksFnOXyt`が複数の Web サイトで使われていることは確認できませんでした。

しかし、学術系の機関が使用する ac.jp ドメイン上の Web サイトで Coinhive を使用することは考えにくいため、改ざんされている可能性が高いと考えました。

この Web サイトの管理者に連絡をしたところ、 懸念していた通り Web サイトが改ざんされていたとのことでした。現在は修正されています。

## Lessons Learned

この Web サイトは WordPress で構築されていたため、WordPress 本体またはプラグインの脆弱性を悪用されて改ざんされてしまった可能性が高いと考えられます。

WordPress を使用する場合、常に WordPress 本体とプラグインを最新版にすることが必要です。気をつけましょう。

また、WordPress に代表される CMS を使うのではなく、このブログのように静的なサイトジェネレーター([Jekyll](https://jekyllrb-ja.github.io/), [Hugo](https://gohugo.io/), [Hexo](https://hexo.io/)など)を使用することも  良いやり方かと思われます。

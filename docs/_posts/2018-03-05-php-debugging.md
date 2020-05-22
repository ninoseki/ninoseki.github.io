---
title: PHP(CakePHP, FuelPHP, Symphony, etc.)のデバッグ機能を本番環境で有効にしてはいけない
date: 2018-03-05
---

## 概要

PHP の Web アプリ開発者は、フロントエンド側で Web アプリのデバッグをしたいという人が多いようです。

具体的にいうと下記は CakePHP の Web デバッグ機能である DebugKit の実行例です。

![CakePHP](https://book.cakephp.org/3.0/ja/_images/history-panel-use.gif)

こういった Web デバッグ機能を有名所のフレームワークは自前で備えています。

- CakePHP: [DebugKit](https://github.com/cakephp/debug_kit)
- CodeIgniter: [Profiler](https://www.codeigniter.com/userguide3/general/profiling.html)
- FuelPHP: [Profilling](https://fuelphp.com/docs/general/profiling.html)
- Symphony: [WebDebugToolbar](https://symfony.com/doc/master/page_creation.html#the-web-debug-toolbar-debugging-dream)
- [PHP Debug Bar](https://github.com/maximebf/php-debugbar)

Web デバッグ機能は開発環境ではとても便利ですが、本番環境では絶対に有効化していはいけません。

本番環境で有効化していると、以下のようなリスクがあります。

- 機微情報(ID. PW など)が第三者に閲覧されてしまう
- 実行した SQL が第三者に閲覧されてしまう
- アクセスログが第三者に閲覧されてしまう
- その他 Web アプリ、Web サーバーの設定が第三者に閲覧されてしまう

本番環境で Web デバッグ機能を有効にするやつなんているか?そう思われたあなた。これが結構いるのです。日本国内の事例に限っても軽く 100 件以上を私は見つけました。

実際にどのような事例があったのか、簡単に紹介しましょう。

### CakePHP の例

Facebook 関連のキーや DB の資格情報が丸見え。

![Imgur](https://i.imgur.com/fFnsGTl.png)

実行した SQL クエリが丸見え。

![Imgur](https://i.imgur.com/qVqCYVZ.png)

### CodeIgniter の例

SMTP の資格情報が丸見え。

![Imgur](https://i.imgur.com/9fmONl2.png)

### FuelPHP の例

DB の資格情報が丸見え。

![Imgur](https://i.imgur.com/vRkt2BF.png)

プライバシーマークとは・・・。

![Imgur](https://i.imgur.com/sEKPk1y.png)

### Symphony の例

アクセスログが丸見え。

![Imgur](https://i.imgur.com/xP4HeZA.png)

### PHP Debug Bar の例

実行した SQL クエリが丸見え。

![Imgur](https://i.imgur.com/murMZuM.png)

## まとめ

この件について tweet していたところ、CakePHP の Core Developer である Jose Diaz-Gonzalez(@savant)からリプライをもらいました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">We don&#39;t enable this in production mode, but would be interested in hearing any suggestions for making this harder to unsecure :)</p>&mdash; Jose Diaz-Gonzalez (@savant) <a href="https://twitter.com/savant/status/969101233519775744?ref_src=twsrc%5Etfw">March 1, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そうです。単純に本番環境(production mode)で Web デバッグ機能を有効にしなければいいだけなのです。注意しましょう。

また、Web アプリのデプロイ後に Web デバッグ機能が有効になっていないか確認するのもいいかもしれません。

CakePHP の場合、以下のような`#debug-kit-toolbar`の要素がないか確認してみれば、Web デバッグ機能が有効になっているかどうか判断することができます。

```html
<div id="debug-kit-toolbar">
  // 省略
</div>
```

## 備考

**Note:** 今回自分が発見したものについては、適時しかるべきところに報告をしているところです。🙏

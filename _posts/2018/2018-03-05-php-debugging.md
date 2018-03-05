---
title: PHP(CakePHP, FuelPHP, Symphony, etc.)のデバッグ機能を本番環境で有効にしてはいけない
excerpt: PHP(CakePHP, FuelPHP, Symphony, etc.)のデバッグ機能を本番環境で有効にしてはいけない
---

## 概要

PHPのWebアプリ開発者は、フロントエンド側でWebアプリのデバッグをしたいという人が多いようです。

具体的にいうと下記はCakePHPのWebデバッグ機能であるDebugKitの実行例です。

![CakePHP](https://book.cakephp.org/3.0/ja/_images/history-panel-use.gif)

こういったWebデバッグ機能を有名所のフレームワークは自前で備えています。

- CakePHP: [DebugKit](https://github.com/cakephp/debug_kit)
- CodeIgniter: [Profiler](https://www.codeigniter.com/userguide3/general/profiling.html)
- FuelPHP: [Profilling](https://fuelphp.com/docs/general/profiling.html)
- Symphony: [WebDebugToolbar](https://symfony.com/doc/master/page_creation.html#the-web-debug-toolbar-debugging-dream)
- [PHP Debug Bar](https://github.com/maximebf/php-debugbar)

Webデバッグ機能は開発環境ではとても便利ですが、本番環境では絶対に有効化していはいけません。

本番環境で有効化していると、以下のようなリスクがあります。

- 機微情報(ID. PWなど)が第三者に閲覧されてしまう
- 実行したSQLが第三者に閲覧されてしまう
- アクセスログが第三者に閲覧されてしまう
- その他Webアプリ、Webサーバーの設定が第三者に閲覧されてしまう

本番環境でWebデバッグ機能を有効にするやつなんているか?そう思われたあなた。これが結構いるのです。日本国内の事例に限っても軽く100件以上を私は見つけました。

実際にどのような事例があったのか、簡単に紹介しましょう。

### CakePHPの例

Facebook関連のキーやDBの資格情報が丸見え。

![Imgur](https://i.imgur.com/fFnsGTl.png)

実行したSQLクエリが丸見え。

![Imgur](https://i.imgur.com/qVqCYVZ.png)

### CodeIgniterの例

SMTPの資格情報が丸見え。

![Imgur](https://i.imgur.com/9fmONl2.png)

### FuelPHPの例

DBの資格情報が丸見え。

![Imgur](https://i.imgur.com/vRkt2BF.png)

プライバシーマークとは・・・。

![Imgur](https://i.imgur.com/sEKPk1y.png)

### Symphonyの例

アクセスログが丸見え。

![Imgur](https://i.imgur.com/xP4HeZA.png)

### PHP Debug Barの例

実行したSQLクエリが丸見え。

![Imgur](https://i.imgur.com/murMZuM.png)

## まとめ

この件についてtweetしていたところ、CakePHPのCore DeveloperであるJose Diaz-Gonzalez(@savant)からリプライをもらいました。

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">We don&#39;t enable this in production mode, but would be interested in hearing any suggestions for making this harder to unsecure :)</p>&mdash; Jose Diaz-Gonzalez (@savant) <a href="https://twitter.com/savant/status/969101233519775744?ref_src=twsrc%5Etfw">March 1, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

そうです。単純に本番環境(production mode)でWebデバッグ機能を有効にしなければいいだけなのです。注意しましょう。

また、Webアプリのデプロイ後にWebデバッグ機能が有効になっていないか確認するのもいいかもしれません。

CakePHPの場合、以下のような`#debug-kit-toolbar`の要素がないか確認してみれば、Webデバッグ機能が有効になっているかどうか判断することができます。

```html
<div id="debug-kit-toolbar">
// 省略
</div>
```

## 備考

**Note:** 今回自分が発見したものについては、適時しかるべきところに報告をしているところです。🙏

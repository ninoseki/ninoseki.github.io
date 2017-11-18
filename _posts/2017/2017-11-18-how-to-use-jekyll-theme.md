---
title: GitHub PagesでJekyll Remote Themeを使ってみる
excerpt: GitHub PagesでJekyll Remote Themeを使ってみる
tags: [jekyll]
---

## 前段

[Jekyll](https://jekyllrb.com/)はv3.2からThemeをGem経由で使用できる機能を導入しました。

GitHub Pages([github/pages-gem](https://github.com/github/pages-gem/))ではv107からこの機能が使用できるようになりました。
しかし、使用できるGemベースThemeはホワイトリストで指定されたものであり、限られたものでした。

```rb
# v107の時点で使用できたGemベースTheme
    THEMES = {
      "minima"                    => "2.0.0",
      "jekyll-swiss"              => "0.4.0",
      "jekyll-theme-primer"       => "0.1.1"
    }.freeze
```

2017/11/06にリリースされた`github/pages-gem`のv168から、Jekyll Remote Theme([benbalter/jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme))が使用可能になったため、基本的にはどのようなGemベースThemeでもGitHub Pagesで使用できるようになりました。

## 導入方法

`Gemfile`に`jekyll-remote-theme`を追加し、`$ bundle install`します。

```ruby
gem "github-pages", group: :jekyll_plugins
gem "jekyll-remote-theme"
```

`jekyll-remote-theme`を`_config.yml`の`plugins`に追加します。
```ruby
# Plugins
plugins:
  - jekyll-remote-theme
```

また同じく`_config.yml`に`remote_theme`を追加します。
```ruby
# 使用したいGemベースThemeを指定
# GitHubのリポジトリ上にあるものしか指定できないので注意
remote_theme: "#{theme.owner}/#{theme.name}"
```

以上の設定を行い、`$ bundle exec jekyll server`を行いましょう。
下記のような出力が出れば`jekyll-remote-theme`が正常に設定できています。
```
......
 Incremental build: disabled. Enable with --incremental
      Generating...
      Remote Theme: Using theme #{theme.owner}/#{theme.name}
......
```

Happy Jekylling!
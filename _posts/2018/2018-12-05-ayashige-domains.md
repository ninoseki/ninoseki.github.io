---
title: 怪しげなドメイン名の Web サイトは本当に怪しいのか - あるいはとある悪性判定ルールを試してみた -
toc: true
---

最近、[Ayashige](https://ayashige.herokuapp.com) という名前の Web アプリを遊びで作成してみました。

この Web アプリは、大きく分けて3つのことをします。

1. 様々なソースから、新しく登録されたドメイン名を取得する
2. ドメイン名から、一定のルールに基づき、そのドメイン名の"怪しさ"を算出し、怪しいと判定されたものを DB(Redis) に保存する
3. 怪しいと判定されたドメイン名を、JSON でフィードする

問題となるのは2.の箇所の判定ルールの精度です。

ここで"怪しい"と判定されたドメインは本当に怪しいのか、確かめてみることにしました。

## そもそもどんな判定ルールなのか

Ayashige で採用したルールは、@x0rz の [phishing_catcher](https://github.com/x0rz/phishing_catcher) で使用されているルールを流用したものです。

phishing_catcher では、以下の5つのルールを使用してそれぞれのポイントを算出し、それらを合算した値をもって"怪しさ"を判定します。

- TLD によるスコアリング
  - 特定の TLD のドメインの場合、ポイントを追加
- ドメイン名のエントロピーによるスコアリング
  - ドメイン名のエントロピーをポイントとして追加
- 怪しげな単語によるスコアリング
  - "verification" や "authenticate" など、フィッシング Web サイトでよく使用される単語がドメイン名に含まれている場合、ポイントを追加
  - ドメイン名を単語単位に分解し、各単語と怪しげな単語のレーベンシュタイン距離を計算、レーベンシュタイン距離が"1"ならポイントを追加
- "-" によるスコアリング
  - ドメイン名に含まれる "-" の数に応じてポイントを追加
- "." によるスコアリング
  - ドメイン名に含まれる "." の数に応じてポイントを追加

実際にこれらのルールを使用してドメイン名の怪しさを算出してみた結果は以下の通りです。

| domain                                                       | score |
|--------------------------------------------------------------|-------|
| alabbasi[.]com[.]sa                                          | 15    |
| alibabasecureupdatelogin[.]com[.]federalstudentloansus[.]com | 165   |
| allyourheadphonesneed[.]com                                  | 22    |
| amazon-special-offers[.]disc-counts[.]in                     | 85    |
| amazonhealingpotions[.]com                                   | 83    |
| americanheating[.]in[.]net                                   | 21    |
| bforbeaute[.]com                                             | 19    |
| chanfoutansers[.]cf                                          | 42    |
| contekofficetech[.]com                                       | 35    |
| credit-agricole[.]fr                                         | 22    |
| crispapplejuice[.]com                                        | 51    |
| davisairconditioningandheating[.]com                         | 22    |
| deptofstripes[.]com                                          | 20    |
| elasticapplewatchbands[.]com                                 | 53    |
| elasticwatchbands[.]com                                      | 22    |
| fkii[.]org                                                   | 12    |
| gmarketc[.]com                                               | 20    |
| hotmial[.]com                                                | 19    |
| icloud[.]com-i[.]support                                     | 119   |

phishing_catcher では、スコアが90以上の場合に怪しい(Suspicious)だと判定しています。

Ayashige では少し基準を弱めて、スコアが80以上の場合は怪しいと判定しています。

## 怪しさを確認する

これからは、怪しいと判定されたドメイン名を持つ Web サイトが本当に怪しいのかどうか確認していきます。

確認する手法は以下の通りです。

- 特定の時点で、Ayashige が怪しいと判定したドメイン名を記録する
- 記録してから数日後に、以下の2つのサービスを使用し、ドメインが悪性かどうか判定する(どちらか1つで悪性と判定されていた場合、そのドメインを悪性とする)
  - Google Safe Browsing
  - FortiGuard Web Filter Lookup

### 確認結果

Ayashige により怪しいと判定されたドメイン全973件のうち、上記の手法で怪しさが確認されたものは140件でした。約15%の正答率となります。

判定結果は以下の通りです。

<script src="https://gist.github.com/ninoseki/b381ebcd9a6bc517f113e2d5f86e9037.js"></script>

## まとめ

phishing_catcher(Ayashige)の悪性判定ルールの正答率は約15%でした。あまり高い数値とは言えません。

より正答率を向上させるには以下のアプローチがありえると考えています。

- Machine learning を使用した判定ルールを導入する
- WHOIS, Certificate, HTTP Response など、ドメイン名以外の情報も判定ルールに組み込む

Ayashige は遊びのプロジェクトですが、暇を見つけて判定ルールを向上させるつもりです。何かいいアイディアがあれば教えてください。

## おまけ(類似のツール・論文など)

- [wesleyraptor/streamingphish](https://github.com/wesleyraptor/streamingphish)
  - Python-based utility that uses supervised machine learning to detect phishing domains from the Certificate Transparency log network.
- [Malicious URL Detection using Machine Learning: A Survey (PDF)](https://arxiv.org/pdf/1701.07179.pdf)
- [Detecting Malicious Web Links and Identifying Their Attack Types (PDF)](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/paper-65.pdf)

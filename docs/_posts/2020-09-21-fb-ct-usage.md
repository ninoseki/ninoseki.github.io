---
title: Facebook Certificate Transparency Monitoringで証明書の発行状況をモニタリング
date: 2020-07-25
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

Facebook の [Certificate Transparency Monitoring](https://developers.facebook.com/tools/ct/search/) を使用して SSL 証明書の発行状況をモニタリングする手法を紹介します。

ざっくりいうと、 Certificate Transparency Monitoring を使うと以下のことができます。

- 特定のドメインへの証明書の発行状況のモニタリング
- 特定のドメインを模倣した(フィッシングに使用される疑いがある)ドメインへの証明書の発行状況のモニタリング

仮に、あなたが `example.com` を所持しているとしましょう。

その場合、`Subscribed domain` に `example.com` を追加することで  `example.com` とそのサブドメインに対する証明書の発行状況をモニタリングすることができます。

![Imgur](https://imgur.com/9qGdHt0.png)

新しく証明書が発行されると、以下の通知が送られてきます。

![Imgur](https://imgur.com/oFRaZmF.png)

自組織 (あるいは個人)が所持するドメインへの証明書の発行状況をモニタリングすることで、意図していないドメインが公開されていることに気づくことができるかもしれません。

例えば、 `dev.example.com` や `stg.example.com` といったドメインへの証明書が発行されていた場合、開発/ステージング環境が公開されているかもしれません。

加えて、 Facebook の Certificate Transparency Monitoring のユニークな機能として、フィッシング検知機能があります。

この機能を使うと、タイポスクワッティングなドメイン (e.g. `exemple.com`)やその他の紛らわしいドメインへ証明書が発行されたことが通知されます。

![Imgur](https://imgur.com/EpwgOdH.png)

残念ながら、このフィッシング検知のために Facebook が使用しているアルゴリズムの詳細は公開されていません。

同じようなフィッシング検知を独自の基準で実施したい場合は、[crt.sh](https://crt.sh/) や [Certstream](https://certstream.calidog.io/) を使用すると便利でしょう。

## References

- [Introducing our Certificate Transparency Monitoring tool](https://www.facebook.com/notes/protect-the-graph/introducing-our-certificate-transparency-monitoring-tool/1811919779048165/)
- [Detecting phishing domains using Certificate Transparency](https://www.facebook.com/notes/protect-the-graph/detecting-phishing-domains-using-certificate-transparency/2037453483161459/)
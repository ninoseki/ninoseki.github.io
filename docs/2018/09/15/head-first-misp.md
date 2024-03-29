# Head First MISP - MISP 入門 -

## はじめに

 これは[MISP(Malware Information Sharing Platform)](http://www.misp-project.org/)の基本的な概念と操作をまとめた入門記事です。

## そもそも MISP とは

MISP はオープンソースの脅威情報共有プラットフォームです。
MISP を使うことで、脅威情報(怪しい URL やマルウェアのハッシュ値、サンプルなど)を効率的に組織内外に共有することができます。

![Imgur](https://i.imgur.com/pWxyt11.png)

OSS であり、コミュニティドリブンで開発されていますが、主となる開発母体はルクセンブルクのナショナル CSIRT である[CIRCL](https://www.circl.lu/)です。

CIRCL によれば 6,000 以上の組織が MISP を使用しています。

## Part 1. MISP の基本

まず下記の MISP の基本的なデータモデル・用語を解説します。

- Event
- Attribute
- Proposal
- Object
- Tag
- Taxonomy
- Galaxy

### Event(イベント)

イベントは MISP の最も基本的な要素です。

インシデントや(各種ベンダーやリサーチャーが公開した)OSINT レポートなどを 1 つのイベントとして作成し、管理します。

![Imgur](https://i.imgur.com/H9PnKLr.png)

イベントは継承(Extends)関係を持つことができます。
継承をする場合、イベント作成時に継承するイベントの ID または UUID を指定します。

### Attribute(アトリビュート)

アトリビュートはイベントに一対多で紐づく要素で、いわゆる IOC(Indicator of Compromise)のことです。IP/ドメイン/ハッシュ値などがこれに当たります。

例えば OSINT レポートの場合、そのレポートへのリンクや記事本文もアトリビュートとして扱うことができます。

![Imgur](https://i.imgur.com/TTD5Vjc.png)

### Proposal(提案)

作成されたイベントに対し、既存のアトリビュートの修正/新しいアトリビュートの追加などを"提案"をすることができます。

![Imgur](https://i.imgur.com/jut1Lwc.png)

提案が作成されると、そのイベントの作成者に通知が飛びます。
イベント作成者に提案が承認されると、その提案がイベントに反映されます。

### Object(オブジェクト)

イベントにオブジェクトを追加することができます。

オブジェクトとは、アトリビュートの組み合わせによって表現される特定の"もの"のことです。
`Yara`や`Tor-node`など、特定の"もの"をアトリビュートの組み合わせによって表現します。
具体的には、`Yara`は以下のアトリビュートによって構成されたオブジェクトになります。

![Imgur](https://i.imgur.com/ID4uwNw.png)

### Tag(タグ)

各イベントの関連付けをするためにタグが存在します。

[TLP](https://www.first.org/tlp/)をタグとして付与したり、特定のボットの名前をタグ付けしたりすることができます。

![Imgur](https://i.imgur.com/YYmmO3n.png)

例えば上記の例にある`Nymaim`タグをクリックすると、`Nymaim`とタグ付けされたイベントのみを表示することができます。

![Imgur](https://i.imgur.com/WncfXXt.png)

### Taxonomy(タクソノミー)

タクソノミーはタグのライブラリーのようなもので、複数のインスタンス/組織間で共通のタグを使うために使用されます。

タクソノミーは

- namespace (必須)
- predicate (必須)
- value (オプション)

の 3 つの要素で構成されます。

![Imgur](https://i.imgur.com/2NwnS9K.png)

### Galaxy(ギャラクシー)

ギャラクシーはタグ(タクソノミ −)を補完するためのものです。

ギャラクシーは Cluster(クラスター)という大きなオブジェクトを用いて、より複雑な関連付けを可能にします。

ギャラクシーは

- Galaxy
- Cluster
  - Element
  - Reference

の 4 つの要素で構成されます。

Galaxy の例:

![Imgur](https://i.imgur.com/Y5OVY16.png)

Cluster の例:

![Imgur](https://i.imgur.com/4YfQSVx.png)

具体的には以下のように使用されます。

![Imgur](https://i.imgur.com/1Ik2hsW.png)

![Imgur](https://i.imgur.com/ABZWrEO.png)

これにより、タグより複雑な関連を表現することができます。

## Part 2. MISP の基本操作

### Organization(組織)の作成方法

Note: 組織の作成が可能なのは"admin"(管理者)権限を持つユーザーのみです。

上部の"Administration"(管理) => "Add Organization"(組織を追加)をクリックすると、組織の作成画面に遷移します。

![Imgur](https://i.imgur.com/g31pTMR.png)

ここで各項目を入力することで、組織を作成することができます。

注意が必要なのは、UUID の項目です。UUID(Universally Unique Identifier)はその名の通り、一意である必要があります。
他の MISP インスタンスと同期をする際、UUID が衝突してしまうと、データの不整合が発生する可能性があります。

これを避けるためには、独自に(= 手動で)UUID を設定するのではなく、"Generate UUID"(UUID を生成)をクリックし、システム側に UUID を生成させましょう。

### User(ユーザー)の作成方法

上部の"Administration" => "Add User"(ユーザーを追加)をクリックすると、ユーザーの作成画面に遷移します。

ここで各項目を入力することで、ユーザーを作成することができます。

![Imgur](https://i.imgur.com/RKqXMnU.png)

ユーザーの"Role"(ロール)は以下から選択することができます。

- admin(管理者)
  - MISP インスタンスの管理者用のロール
- Org Admin(組織管理者)
  - 特定の組織の管理者用のロール、1 つの MISP インスタンス上に複数の組織が同居する際などに使用
- Publisher
- User
- Sync User(同期用ユーザー)
- Read Only

各ロールが持つ権限の詳細については、"Administartion" => "List Roles"(ロールの一覧)で確認することができます。

![Imgur](https://i.imgur.com/cL3KKF4.png)

### イベントの作成方法

左側の”Add Event”(イベントを追加)または上部の“Event Actions”(イベントアクション)をクリックすると、イベントの作成画面に遷移します。

![Imgur](https://i.imgur.com/iRwWpH2.png)

イベント作成時に重要となるのは"Distribution”(ディストリビューション)の設定です。
ディストリビューションは、イベントの公開範囲を定めるものです。

![Imgur](https://i.imgur.com/5AshOve.png)

- Your organization only(あなたの組織のみ)
  - 自分と同じ所属組織に属しているユーザーのみがこのイベントを閲覧することができます。
- This community only(このコミュニティのみ)
  - 同じコミュニティに属しているユーザーのみがこのイベントを閲覧することができます。
  - 同じコミュニティとは、同じ所属組織、同じ MISP インスタンス上に存在する組織、同期する別のインスタンス上に存在する組織を指します。
- Connected communities(接続されたコミュニティ)
  - 前述した”同期する別のインスタンス”をインスタンス A とします。Connected communities を選択するとインスタンス A と同期をする別のインスタンス上の組織もこのイベントを閲覧することができます。
  - つまり、2 ホップ先のインスタンス上の組織までイベントが閲覧可能になります。
- All communities(すべてのコミュニティ)
  - 2 ホップ先を超えて、接続するすべての MISP インタンス上の組織がこのイベントを閲覧することができます。
  - インスタンスからインスタンスへとイベントが propagete(伝播)していきます。

タグで設定できる TLP(RED/AMBER/GREEN/WHITE)とは、このディストリビューションの設定とは何の関係もないことに注意してください。
TLP:RED とタグ付けしたとしても、ディストリビューションが”All communites”なら、TLP のタグに関係なく伝播してしまいます。

### アトリビュートの作成方法

イベントの作成後、"Add Attribute"(アトリビュートを追加)をクリックするとアトリビュートを追加することができます。

![Imgur](https://i.imgur.com/P90HO8d.png)

カテゴリー、タイプを選び、それに該当する値を入力することでアトリビュートを追加することができます。

![Imgur](https://i.imgur.com/yJFiuo5.png)

ここでもイベントと同じようにディストリビューションを選択することができます。

イベントとアトリビュートで、異なるディストリビューションを設定した場合、どうなるでしょうか?
この場合、最も厳しいディストリビューションが適用されます。
例えば、イベントが"All communities"で、それに属するアトリビューションが"Your organization only"の場合、"Your organization only"が該当するアトリユートに適用されます。

カテゴリーとタイプを選択しながら値を入力していくのは、手間がかかる作業です。
これを効率化するため、MISP には"Freetext import"(フリーテキストインポート)という機能があります。
これを使用すると、フリーテキスト(自由記述のテキスト)から、自動的に IOC の抽出ができます。カテゴリーとタイプも自動的に選択されます。

![Imgur](https://i.imgur.com/f56BkoO.png)

![Imgur](https://i.imgur.com/RqakOIq.png)

この機能は、左側メニューの"Populate from..."をクリックし"Freetext Import"(フリーテキストインポート)を選択すると使用することができます。

### タグの追加方法

これを行うとタクソノミー(= タグ)をイベントとアトリビュートに追加することが可能になります。

イベントもアトリビュートも同じく、"Tags"欄にある+ボタンをクリックするとドロップダウンメニューからタグを追加することができます。

![Imgur](https://i.imgur.com/mhaGNd2.png)

![Imgur](https://i.imgur.com/hVf4uFS.png)

選択できるタグがない場合、自分でタグを追加するか、タクソノミーからタグを追加することができます。
"Event Actions" => "List Taxonomies"(タクソノミーの一覧)に遷移し、有効化したいタクソノミーの"Actions"欄にある+ボタンをクリックすると、そのタクソノミーが有効化され、タグとして使用可能になります。

![Imgur](https://i.imgur.com/iPcP9DC.png)

## Part 3. MISP インスタンス間の同期

MISP は MISP インスタンス間でイベント/アトリビューとを同期できる機能を持っています。

ここでは、インスタンス A とインスタンス B という 2 つの MISP インスタンスがあると仮定して話を進めます。

インスタンス B がインスタンス A と同期したい場合(インスタンス A 上のイベント/アトリビュートをインスタンス B 上に取得したい場合)はの流れは以下のようになります。

1. インスタンス A 上に同期用のアカウントを作成する
2. インスタンス B 上で、インスタンス A をサーバーを登録する
3. 2.で登録したサーバーとの同期

### 同期用アカウントの作成

まずインスタンス A の管理者にお願いして、同期用のユーザーを作成してもらいましょう。

同期専用のユーザーとして、余計な権限を持たせないために"Sync user"(同期用ユーザー)のロールを割り当てるのが良いでしょう。

![Imgur](https://i.imgur.com/e78UsM9.png)

ユーザーを作成すると、そのユーザー用の"Authkey"(認証キー)が作成されます。これを使用して同期を行います。

![Imgur](https://i.imgur.com/zNhvB3s.png)

### サーバーの登録

インスタンス B 上にて、上部の"Sync Actions"(同期アクション)のメニューから、"List Servers"(サーバーの一覧)をクリックすると、サーバーの一覧画面に遷移します。

左側にある"New Server"(新しいサーバー)をクリックすると、サーバーの新規作成画面に遷移します。

![Imgur](https://i.imgur.com/C2gibJK.png)

ここで、

- インスタンス A の Base URL
- インスタンス A の名前
- (先ほど作成した同期用ユーザーの)認証キー

を入力し、下部にあるオプションから(ここではとりあえず)"Pull"を選択し、"Submit"をクリックすると、サーバーが作成できます。

Note: "Push"にもチェックを入れると、インスタンス B からインスタンス A に対してイベントをプッシュすることができるようになります。

### サーバーとの同期

まず"Connection test"の"Run"ボタンをクリックし、インスタンス A のサーバーとのコネクションを確認しましょう。

![Imgur](https://i.imgur.com/tyh7n5m.png)

このようにコネクションの確認ができたら、インスタンス A からイベント/アトリビュートを取得してみましょう。

![Imgur](https://i.imgur.com/IbSoT0R.png)

サーバーの右側にある"Pull all"(すべてをプル)アイコンをクリックすると、バックグランドジョブが開始されます。

![Imgur](https://i.imgur.com/5WbvXnZ.png)

このバックグランドジョブの実行状況は"Admnistration" => "Jobs"から確認することができます。

![Imgur](https://i.imgur.com/9tKvhq1.png)

上記の手順はインスタンス上のすべての(インスタンス B への公開が許可された)イベントを取得する手順でした。

特定のイベントのみを取得したい場合はどうすればいいでしょうか?

この場合、サーバーの一覧画面で"Explore"アイコンをクリックしましょう。

![Imgur](https://i.imgur.com/o0oz3RF.png)

すると、インスタンス A 上のイベントの一覧が表示されます。ここで取得したいイベントの"Fetch the event"アイコンをクリックすると、特定のイベントのみを取得することができます。

![Imgur](https://i.imgur.com/gHrDrW5.png)

## Part 4. 自動化

MISP は REST API を提供しており、この API を使用して各種操作を自動化することができます。

詳細は[公式のドキュメント](https://www.circl.lu/doc/misp/automation/)をご参照ください。

また、この REST API 用に Python のライブラリー([PyMISP](https://github.com/MISP/PyMISP))が公開されています。これは以下のコマンドでインストールすることができます。

```bash
pip install pymisp
```

例えば特定のパラメーターのタイプを持つイベントを検索するためのスクリプトは以下のようになります。

```python
from pymisp import PyMISP
import argparse
import json

MISP_URL = 'https://YOUR_MISP_URL.com'
MISP_KEY = 'YOUR_MISP_API_KEY'


def init():
    return PyMISP(MISP_URL, MISP_KEY, True, 'json')


def search(m, url, controller, **kwargs):
    result = m.search(controller, **kwargs)
    print(json.dumps(result['response']))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Get all the events matching a value for a given param.')

    parser.add_argument("-p", "--param", required=True, help="Parameter to search (e.g. category, org, values, type_attribute, etc.)")
    parser.add_argument("-s", "--search", required=True,
                        help="String to search.")

    args = parser.parse_args()

    misp = init()
    kwargs = {args.param: args.search}
    controller = 'events'

    search(misp, MISP_URL, controller, **kwargs)
```

## 参考: MISP の構築方法

### 開発・検証用

公式で MISP の開発・検証用の Vagrantfile が提供されています。

- [MISP/misp-vagrant](https://github.com/MISP/misp-vagrant)

### プロダクション用

公式で MISP のインストール手順が紹介されています。

- https://github.com/MISP/MISP/tree/2.4/INSTALL

その他の選択肢として、公式からは Docker イメージ、AWS にデプロイするための AMI イメージ及び Ansible スクリプトが提供されています。

- [MISP/docker-misp](https://github.com/MISP/docker-misp)
- [MISP/misp-cloud](https://github.com/MISP/misp-cloud)
- [MISP/ansible](https://github.com/MISP/ansible)

また、公式ではありませんが、Ubuntu 16.04 / 18.04 に MISP を自動インストールするためのスクリプトが公開されています。

- [da667/AutoMISP](https://github.com/da667/AutoMISP)

## 参考: MISP i18n

MISP は[Crowdin](https://crowdin.com/)を使用して i18n を進めています。

- <https://crowdin.com/project/misp>

日本語化のルールは[ninoseki/MISP-japanization](https://github.com/ninoseki/MISP-japanization)にまとめられています。

ご興味ある方や誤字・誤記を見つけられた方は、日本語化にコントリビュートして見てください。

## References

この記事は下記を参考にして書かれました。

- <https://www.circl.lu/assets/files/misp-training/luxembourg2018/1-usage.pdf>
- <https://www.circl.lu/assets/files/misp-training/luxembourg2018/6-taxonomies.pdf>
- <https://www.circl.lu/assets/files/misp-training/3.4-MISP-Galaxies.pdf>
- <https://github.com/MISP/misp-taxonomies>
- <https://github.com/MISP/misp-galaxy>
- <https://www.circl.lu/doc/misp/>

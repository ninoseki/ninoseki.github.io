# A Recipe for Home Made NAS

いわゆる mini PC を NAS 化してみたので構築手順をまとめておく。

> [!NOTE]
> 自分は特に NAS や Samba に詳しいわけではない。。
> 本記事はあくまで自分用のメモだが、同じような環境を構築しようとしている方の参考になればと思って公開する。

## Objectives/Policies

- Mini PC を NAS として使えること。具体的には、NAS 上にあるファイルを他のデバイスで SMB 経由で閲覧できること。
- 複数の SSD をまとめて 1 つのストレージとして使えること。
  - これには RAID0, LVM 等のような論理ボリュームは使用しない。代わりに後述する [mergerfs](https://github.com/trapexit/mergerfs) を使うことにする。
- 自宅で基本的には自分一人が使うため、アクセス制御は設けないこととする。

## Hardware

- GMKtec NucBox G9 (Intel 150 12GB+64GB+2TB)
- WD Blue SN5000 (4TB)

NucBox G9 の 2TB SSD には Windows 11 がプリインストールされているが、これは消去し、2TB + 4TB の 6TB NAS として運用する。

## OS

NucBox G9 には Windows 11 と Ubuntu 24.10 のデュアルブートであるが、前述したように Windows 11 は削除し、Ubuntu のみを使用することにする。

> [!NOTE]
> ブート時に Windows が優先的に選択されるため、BIOS の設定で Ubuntu を優先するように設定変更が必要だ。

## Software

以下のソフトウェアをインストールした。

- [mergerfs](https://github.com/trapexit/mergerfs)
- Samba
- tmpreaper
- OpenSSH
- [Cockpit](https://cockpit-project.org/)

### mergerfs

mergerfs は面白いソリューションだ。

[FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace) を使い、複数のディレクトリを 1 つのディレクトリに結合することができる。

例えばこんな風に 2 つのディレクトリ(ドライブ)があるとする。

```bash
$ tree -L 2
.
├── disk1
│   ├── movies
│   ├── music
│   └── photos
└── disk2
    ├── etc
    └── movies
```

mergerfs を使うと、これらを例えば `storage` ディレクトリにまとめることができる。

```bash
$ tree -L 2
...
└── storage
    ├── etc
    ├── movies
    ├── music
    └── photos
```

- `storage`は disk1 と disk2 を合算した空き容量を持つ。
- データは disk1 と disk2 に分散されて保管される。

という特徴を持っている。

思うに、mergerfs は以下の点で優れている:

- 設定用意性: コマンドをぽちぽち実行すれば設定可能で、RAIDO0 のように BIOS レベルの設定が不要。
- 耐障害性: 例えば RAID0 の場合、1 つドライブが壊れれば全体が壊れてしまう (LVM の場合はどうなのか、不勉強でよく知らない)。mergerfs の場合、そのドライブ上にあるデータが壊れるだけで全体に影響することはない。
- 拡張容易性: ドライブが増えた場合も簡単に追加が可能 (ワイルドカードでドライブを指定しておけば良い)。

#### Installation

さて mergerfs のイントールには注意が必要だ。Ubuntu で `apt install mergerfs` すると mergerfs v2.33.5 がインストールされる。

現在(2025/02)の最新バージョンは v2.40.2 で、[公式ドキュメント](https://trapexit.github.io/mergerfs/)も当然ながら v2.40.2 向けの内容になっている。何故これが問題かというと、v2.33.5 と v2.40.2 の間には大きな乖離があり、最新の公式ドキュメントに書いてある内容は v2.33.5 には通じないためだ。過去のバージョンのドキュメントを探し出すことも可能だが、まあまあ面倒だ。

このため、今回は自分でビルドして最新版をインストールした。

```bash
apt install -y git

git clone https://github.com/trapexit/mergerfs.git
cd mergerfs
# 公式ドキュメントでは `sudo tools/install-build-pkgs`とあるが、これは間違っていて、buildtoolsを使うのが正しい
sudo buildtools/install-build-pkgs
make deb
sudo dpkg -i ../mergerfs_<version>_<arch>.deb
```

#### Configuration

mergerfs の設定は(比較的)簡単だ。

```bash
sudo mergerfs -o cache.files=off,dropcacheonclose=false,category.create=mfs /mnt/hdd0:/mnt/hdd1 /media
```

とすれば `/mnt/hdd0`, `/mnt/hdd1` を `/media` にまとめることができる。

この設定を永続化させたい場合、`/etc/fstab` に以下の内容を追加すれば良い。

```text
/mnt/hdd0:/mnt/hdd1 /media mergerfs cache.files=off,dropcacheonclose=false,category.create=mfs 0 0
```

fstab の設定を変更を反映させるには以下のコマンドを実行すれば良い。

```bash
sudo mount -a
sudo systemctl daemon-reload
```

なお、パフォーマンスチューニングに関しては公式ドキュメントの [Tweaking Performance](https://trapexit.github.io/mergerfs/performance/) を参照されたし。

#### References

- [Mergerfs – another good option to pool your SnapRAID disks](https://zackreed.me/mergerfs-another-good-option-to-pool-your-snapraid-disks/)
- [MergerFS を使った Chia の plot 管理](https://blog.misosi.ru/2021/05/16/organize-chia-plots-with-mergerfs/)
- [Perfect Media Server: mergerfs](https://perfectmediaserver.com/02-tech-stack/mergerfs/)
- [Using MergerFS to combine multiple hard drives into one unified media storage](https://fullmetalbrackets.com/blog/two-drives-mergerfs/)

> [!NOTE]
> 前述したように 最新版 (v2.40.x)とそれ以前では大きな差がある。上記のドキュメントのほとんどは v2.3x 向けに書かれていることに注意が必要だ。

### Samba

#### Installation

```bash
sudo apt install samba
```

#### Configuration

主に Apple (macOS, iOS)デバイスでこの NAS を使用するため、`/etc/samba/smb/conf` の `[global]` セクションに Mac 向けの設定を追加する。

```text
# https://wiki.samba.org/index.php/Configure_Samba_to_Work_Better_with_Mac_OS_X
vfs objects = fruit streams_xattr
fruit:metadata = stream
fruit:model = MacSamba
fruit:veto_appledouble = no
fruit:nfs_aces = no
fruit:wipe_intentionally_left_blank_rfork = yes
fruit:delete_empty_adfiles = yes
fruit:posix_rename = yes
```

また、`.DS_Store` ディレクトリと `._` ファイルの作成を抑止するために以下の設定を追加する。

```text
# https://github.com/Ellerhold/fs2es-indexer?tab=readme-ov-file#7-does-your-macs-finder-find-anything
veto files = /._*/.DS_Store/
delete veto files = yes
```

加えて、あまりよろしくないことは十十承知の上で、`guest account` に デフォルトユーザーである `gmk` を設定した。

```
guest account = gmk
```

原因を特定できなかったのだが、`guest account` を指定しなかった場合、mergerfs のディレクトリに SMB でアクセスするとエラー(`NT_STATUS_ACCESS_DENIED listing \*`)が発生してしまうためだ。

最後に、以下のように Samba share の設定を行った。guest に`/mnt/share` への書き込み・読み込みを許可し、ファイルを削除した際は `.recycle` に移動する。

```
[share]
path = /mnt/share/
writable = yes
read only = no
guest ok = yes
guest only = yes
vfs object = recycle
recycle:repository = .recycle
recycle:keeptree = yes
recycle:touch = yes
recycle:versions = yes
recycle:maxsize = 0
```

#### References

- [Configure Samba to Work Better with Mac OS X](https://wiki.samba.org/index.php/Configure_Samba_to_Work_Better_with_Mac_OS_X)
- [Ellerhold/fs2es-indexer](https://github.com/Ellerhold/fs2es-indexer)

### tmpreaper

定期的に特定のディレクトリ(今回の場合は `/mnt/share/.recycle`)配下のファイルを削除するために使用する。

#### Installation

```bash
sudo apt install tmpreaper
```

#### Configuration

`/etc/tmpreaper.conf` を以下のように更新した。

まずは `SHOWWARNING` をコメントアウトする。

```
# SHOWWARNING=true
```

そして以下の設定を追加した。これにより`/mnt/share/.recycle/.` 配下で 7 日間経過したファイルは自動的に削除される。

```
TMPREAPER_TIME=7d
TMPREAPER_DIRS='/mnt/share/.recycle/.'
```

### OpenSSH

母艦から SSH で操作するために導入した。

#### Installation

```bash
sudo apt install openssh-server
```

### Cockpit

[Cockpit](https://cockpit-project.org/) は Web ベースのサーバー管理ツールだ。パッとサーバーの状況を確認するために

#### Installation

```bash
sudo apt install cockpit
```

インストール後、 `0.0.0.0:9090` で Cockpit が起動する。

#### Configuration

Cockpit はデフォルトでは HTTP/HTTPS 両方を listen する。

HTTPS 対応のために証明書を管理するのは面倒なので、HTTP のみを使うことにする。このためには `/usr/lib/systemd/system/cockpit.service` の `ExecStart` を以下のように書き換えれば良い。

```
[Service]
...
ExecStart=/usr/lib/cockpit/cockpit-tls --no-tls
...
```

## Appendix: Automated All the Things

![img](https://farm2.staticflickr.com/1669/23635763270_91a98c0af6_z.jpg)

上記の設定を手動でやるのは面倒だし、もし何かトラブルがあって再度設定が必要になった場合、同じことを何回もやりたくはない。

このため、全てを [pyinfra](https://pyinfra.com/) を使って自動化することにした。

> Have you ever sat there while writing an Ansible playbook and thought to yourself "Gee, I know how to express what I want in in a programming language, such as Python, but this Domain Specific Language bolted on top of Jinja layered on top of YAML is sure getting me down", then this may be the talk for you. Welcome to pyinfra, where your inventories and playbooks look remarkably like Python code, mainly because they are (with some clarification around the "mainly").
>
> --- https://2023.pycon.org.au/program/BQXP78/

との主張に説得力を感じたためだ。

今回の設定に使用した pyinfra のコードは [ninoseki/homemade-nas](https://github.com/ninoseki/homemade-nas) に置いた。

## TODO

- SnapRAID を導入する
-

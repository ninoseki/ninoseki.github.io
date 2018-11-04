---
title: フィッシングウェブサイトはいかに検索除け対策をしているのか
toc: true
---

本稿では実際のフィッシングウェブサイトが採用している検索除け(クローラー対策)手法について紹介します。

## `.htaccess` による対策

まずは [.htaccess](http://httpd.apache.org/docs/trunk/howto/htaccess.html) による対策です。

### `allow` / `deny`  によるアクセス制御

特定の IP からのアクセスをブロックするためのブラックリストとして、.htaccess を使用するパターンがあります。

以下は AOL / Gmail / Dropbox / etc. のユーザーをターゲットにしたフィッシングウェブサイトで実施に使用されていた .htaccess ファイルの一部です。

```
<Files ~ "^.(htaccess|htpasswd)$">
deny from all
</Files>

order allow,deny
allow from all
deny from 209.85.32.23        # totaldomaindata (checkmark)
deny from 66.205.64.22
deny from 67.15.182.35
deny from 203.68.             # taiwan academic network
deny from 218.58.124.         # china jpg giftsite spammer
deny from 218.58.125.
deny from 62.194.7.           # NE spambot
deny from 85.17.6.            # netherlands
deny from 194.213.            # czech norway sweden etc
deny from 64.27.2.18          # SEO masked as SE
deny from 64.27.2.19          # SEO masked as SE
deny from 212.187.116.        # clown from Netherlands siphoning bible site
deny from 84.87.              # clown from Netherlands siphoning bible site
deny from 222.252.            # vietnam spammer
```

あるいは特定の IP からのアクセスのみを許可するホワイトリスト方式のパターンも存在します。

```
ErrorDocument 404 /
ErrorDocument 403 /

<LIMIT GET>
order deny,allow
deny from all

# whitelist <REDACTED>'s IP address
Allow from 154.
Allow from 95.110.
Allow from 205.200.143.122
Allow from 69.252.0.0/17
Allow from 69.240.0.0/12
Allow from 173.8.0.0/13
Allow from 162.17.0.0/16
Allow from 74.92.0.0/14
Allow from 198.0.240.0/20
Allow from 75.144.0.0/13
Allow from 70.88.0.0/14
```

### `HTTP_REFERER` / `HTTP_USER_AGENT` によるアクセス制御

以下は `16Shop` フィッシングキットが実際に使用してる`HTTP_REFERER` による対策の一部です。

PhishTank や Google 等からのクローリングを制御しようとしています。

```
RewriteCond %{HTTP_REFERER} google\.com [NC,OR]
RewriteCond %{HTTP_REFERER} facebook\.com [NC,OR]
RewriteCond %{HTTP_REFERER} yahoo\.com [NC,OR]
RewriteCond %{HTTP_REFERER} bing\.com [NC,OR]
RewriteCond %{HTTP_REFERER} msn\.com [NC,OR]
RewriteCond %{HTTP_REFERER} ask\.com [NC,OR]
RewriteCond %{HTTP_REFERER} excite\.com [NC,OR]
RewriteCond %{HTTP_REFERER} altavista\.com [NC,OR]
RewriteCond %{HTTP_REFERER} netscape\.com [NC,OR]
RewriteCond %{HTTP_REFERER} aol\.com [NC,OR]
RewriteCond %{HTTP_REFERER} hotbot\.com [NC,OR]
RewriteCond %{HTTP_REFERER} goto\.com [NC,OR]
RewriteCond %{HTTP_REFERER} lycos\.com [NC,OR]
RewriteCond %{HTTP_REFERER} metacrawler\.com [NC,OR]
RewriteCond %{HTTP_REFERER} phishtank\.com [NC,OR]
RewriteCond %{HTTP_REFERER} infoseek\.co\.jp [NC,OR]
RewriteCond %{HTTP_REFERER} mamma\.com [NC,OR]
RewriteCond %{HTTP_REFERER} alltheweb\.com [NC,OR]
RewriteCond %{HTTP_REFERER} ^http(s)?://(www\.)?http://safebrowsing-cache.google.com/.*$ [NC]
```

同じく `16Shop` フィッシングキットが実際に使用してる`HTTP_USER_AGENT` による対策の一部です。

```
RewriteCond %{HTTP_USER_AGENT} ^BlackWidow [OR]
RewriteCond %{HTTP_USER_AGENT} ^Bot\ mailto:craftbot@yahoo.com [OR]
RewriteCond %{HTTP_USER_AGENT} ^ChinaClaw [OR]
RewriteCond %{HTTP_USER_AGENT} ^Custo [OR]
RewriteCond %{HTTP_USER_AGENT} ^DISCo [OR]
RewriteCond %{HTTP_USER_AGENT} ^Download\ Demon [OR]
RewriteCond %{HTTP_USER_AGENT} ^eCatch [OR]
RewriteCond %{HTTP_USER_AGENT} ^EirGrabber [OR]
RewriteCond %{HTTP_USER_AGENT} ^EmailSiphon [OR]
RewriteCond %{HTTP_USER_AGENT} ^EmailWolf [OR]
RewriteCond %{HTTP_USER_AGENT} ^Express\ WebPictures [OR]
RewriteCond %{HTTP_USER_AGENT} ^ExtractorPro [OR]
RewriteCond %{HTTP_USER_AGENT} ^EyeNetIE [OR]
RewriteCond %{HTTP_USER_AGENT} ^FlashGet [OR]
RewriteCond %{HTTP_USER_AGENT} ^GetRight [OR]
RewriteCond %{HTTP_USER_AGENT} ^GetWeb! [OR]
RewriteCond %{HTTP_USER_AGENT} ^Go!Zilla [OR]
```

## `robots.txt` による対策

[robots.txt](https://support.google.com/webmasters/answer/6062608?hl=ja) によるクローリング対策も一般的です。

以下は、先ほど同じく `16Shop` フィッシングキットが実際に使用してる robots.txt になります。

```
User-agent: *
Disallow: /
Disallow: /cgi-bin/
Disallow: /account/
Disallow: /assets/
Disallow: /result/
Disallow: /security/
Disallow: /upload/
Disallow: /admin/
```

## スクリプト側での対策

これまで述べてきたようなアクセス制御をスクリプト(主に PHP)で行うパターンが存在します。以下に実例を2つ掲載します。

```php
<?php

$hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$blocked_words = array("above","google","softlayer","amazonaws","cyveillance","phishtank","dreamhost","netpilot","calyxinstitute","tor-exit", "msnbot","p3pwgdsn","netcraft","trendmicro", "ebay", "paypal", "torservers", "messagelabs", "sucuri.net", "crawler");
foreach($blocked_words as $word) {
    if (substr_count($hostname, $word) > 0) {
    header("HTTP/1.0 404 Not Found");
        die("<h1>404 Not Found</h1>The page that you have requested could not be found.");

    }
}
$bannedIP = array("^81.161.59.*", "^66.135.200.*", "^66.102.*.*", "^38.100.*.*", "^107.170.*.*", "^149.20.*.*", "^38.105.*.*", "^74.125.*.*",  "^66.150.14.*", "^54.176.*.*", "^38.100.*.*", "^184.173.*.*", "^66.249.*.*", "^128.242.*.*", "^72.14.192.*", "^208.65.144.*", "^74.125.*.*", "^209.85.128.*", "^216.239.32.*", "^74.125.*.*", "^207.126.144.*", "^173.194.*.*", "^64.233.160.*", "^72.14.192.*", "^66.102.*.*", "^64.18.*.*", "^194.52.68.*", "^194.72.238.*", "^62.116.207.*", "^212.50.193.*", "^69.65.*.*", "^50.7.*.*", "^131.212.*.*", "^46.116.*.* ", "^62.90.*.*", "^89.138.*.*", "^82.166.*.*", "^85.64.*.*", "^85.250.*.*", "^89.138.*.*", "^93.172.*.*", "^109.186.*.*", "^194.90.*.*", "^212.29.192.*", "^212.29.224.*", "^212.143.*.*", "^212.150.*.*", "^212.235.*.*", "^217.132.*.*", "^50.97.*.*", "^217.132.*.*", "^209.85.*.*", "^66.205.64.*", "^204.14.48.*", "^64.27.2.*", "^67.15.*.*", "^202.108.252.*", "^193.47.80.*", "^64.62.136.*", "^66.221.*.*", "^64.62.175.*", "^198.54.*.*", "^192.115.134.*", "^216.252.167.*", "^193.253.199.*", "^69.61.12.*", "^64.37.103.*", "^38.144.36.*", "^64.124.14.*", "^206.28.72.*", "^209.73.228.*", "^158.108.*.*", "^168.188.*.*", "^66.207.120.*", "^167.24.*.*", "^192.118.48.*", "^67.209.128.*", "^12.148.209.*", "^12.148.196.*", "^193.220.178.*", "68.65.53.71", "^198.25.*.*", "^64.106.213.*", "^91.103.66.*", "^208.91.115.*", "^199.30.228.*");
if(in_array($_SERVER['REMOTE_ADDR'],$bannedIP)) {
     header('HTTP/1.0 404 Not Found');
     exit();
} else {
     foreach($bannedIP as $ip) {
          if(preg_match('/' . $ip . '/',$_SERVER['REMOTE_ADDR'])){
               header('HTTP/1.0 404 Not Found');
               die("<h1>404 Not Found</h1>The page that you have requested could not be found.");
          }
     }
}
?>
```

```php
<?php

$hostname = gethostbyaddr($_SERVER['REMOTE_ADDR']);
$blocked_words = array("above","google","softlayer","amazonaws","cyveillance","phishtank","dreamhost","netpilot","calyxinstitute","tor-exit", "paypal");
foreach($blocked_words as $word) {
    if (substr_count($hostname, $word) > 0) {
    header("HTTP/1.0 404 Not Found");
        die("<h1>404 Not Found</h1>The page that you have requested could not be found.");

    }
}
$bannedIP = array("^66.102.*.*", "^38.100.*.*", "^107.170.*.*", "^149.20.*.*", "^38.105.*.*", "^74.125.*.*",  "^66.150.14.*", "^54.176.*.*", "^38.100.*.*", "^184.173.*.*", "^66.249.*.*", "^128.242.*.*", "^72.14.192.*", "^208.65.144.*", "^74.125.*.*", "^209.85.128.*", "^216.239.32.*", "^74.125.*.*", "^207.126.144.*", "^173.194.*.*", "^64.233.160.*", "^72.14.192.*", "^66.102.*.*", "^64.18.*.*", "^194.52.68.*", "^194.72.238.*", "^62.116.207.*", "^212.50.193.*", "^69.65.*.*", "^50.7.*.*", "^131.212.*.*", "^46.116.*.* ", "^62.90.*.*", "^89.138.*.*", "^82.166.*.*", "^85.64.*.*", "^85.250.*.*", "^89.138.*.*", "^93.172.*.*", "^109.186.*.*", "^194.90.*.*", "^212.29.192.*", "^212.29.224.*", "^212.143.*.*", "^212.150.*.*", "^212.235.*.*", "^217.132.*.*", "^50.97.*.*", "^217.132.*.*", "^209.85.*.*", "^66.205.64.*", "^204.14.48.*", "^64.27.2.*", "^67.15.*.*", "^202.108.252.*", "^193.47.80.*", "^64.62.136.*", "^66.221.*.*", "^64.62.175.*", "^198.54.*.*", "^192.115.134.*", "^216.252.167.*", "^193.253.199.*", "^69.61.12.*", "^64.37.103.*", "^38.144.36.*", "^64.124.14.*", "^206.28.72.*", "^209.73.228.*", "^158.108.*.*", "^168.188.*.*", "^66.207.120.*", "^167.24.*.*", "^192.118.48.*", "^67.209.128.*", "^12.148.209.*", "^12.148.196.*", "^193.220.178.*", "68.65.53.71", "^198.25.*.*", "^64.106.213.*");
if(in_array($_SERVER['REMOTE_ADDR'],$bannedIP)) {
     header('HTTP/1.0 404 Not Found');
     exit();
} else {
     foreach($bannedIP as $ip) {
          if(preg_match('/' . $ip . '/',$_SERVER['REMOTE_ADDR'])){
               header('HTTP/1.0 404 Not Found');
               die("<h1>404 Not Found</h1>The page that you have requested could not be found.");
          }
     }
}

if(strpos($_SERVER['HTTP_USER_AGENT'], 'google') or strpos($_SERVER['HTTP_USER_AGENT'], 'msnbot') or strpos($_SERVER['HTTP_USER_AGENT'], 'Yahoo! Slurp') or strpos($_SERVER['HTTP_USER_AGENT'], 'YahooSeeker') or strpos($_SERVER['HTTP_USER_AGENT'], 'Googlebot') or strpos($_SERVER['HTTP_USER_AGENT'], 'bingbot') or strpos($_SERVER['HTTP_USER_AGENT'], 'crawler') or strpos($_SERVER['HTTP_USER_AGENT'], 'PycURL') or strpos($_SERVER['HTTP_USER_AGENT'], 'facebookexternalhit') !== false) { header('HTTP/1.0 404 Not Found'); exit; }

?>
```

## 暗号化による Censys / PublicWWW / fofa.so 対策

[Censys](https://censys.io/) / [PublicWWW](https://publicwww.com) / [fofa.so](https://www.fofa.so/) など、彼らがクローリングした HTTP レスポンスの内容を調査することができる検索エンジンが存在します。

これらの検索エンジンで、フィッシングサイトの HTML に含まれる特徴的な文字列をキーにして検索することで、フィッシングサイトを発見することができます。

しかし、一部のフィッシングサイトでは、HTTP レスポンスの中身(= HTML)を暗号化することで、検索エンジンにクローリングされたとしてもその中身が容易に分析されないよう対策をしています。

具体的には、AES を使用して暗号化を行い、クライアントサイドの JS 側でそれを復号するという実装があります。以下に実例を2つ掲載します。

```php
function encrypt($buffer){

    $random = bin2hex(rand(0,2000));
    $key = sha1('0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz'.$random);
    $nBits = 256; //128,192,256

    $ciphertext = AesCtr::encrypt($buffer, $key, $nBits);

    return "<html><head><script src='app.js.php'></script>
<script>
var welcome=[\"$key\"];var johnson=(welcome[0])
var hello=[\"$ciphertext\"];var tiny=hello[0]
var anjay=[\"decrypt\",\"Ctr\"];var output=Aes[anjay[1]][anjay[0]](tiny,johnson,256)
var kontoru=[\"write\"];document[kontoru[0]](output)</script></head></html>";
}
ob_start("encrypt");
```

```php
function encrypt($buffer){

	$key = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz';
	$nBits = 256; //128,192,256

	$ciphertext = AesCtr::encrypt($buffer, $key, $nBits);

	return "<html><head><script src='assets/js/enc.js'></script><script>
var hea2p =
('$key');
var hea2t =
'$ciphertext';
var output = Aes.Ctr.decrypt(hea2t, hea2p, $nBits);
document.write(output)</script></head></html>";
}
ob_start("encrypt");
```

このようなスリプトによって暗号化された HTML の実例が以下になります。

![Imgur](https://i.imgur.com/LHf4tVQ.png)

この HTML は AOL のフィッシングサイトを表示します。

![Imgur](https://i.imgur.com/XJXhG9K.png)

ヘッドレスブラウザに対してはこのような暗号化は無意味ですが、Censys 等の検索エンジンはヘッドレスブラウザのように JS を解釈する機能を持たないため、有効な対策となりえます。

以上です。

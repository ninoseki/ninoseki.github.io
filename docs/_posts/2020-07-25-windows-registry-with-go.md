---
title: GoでWindowsのレジストリを操作する
date: 2020-07-25
---

# {{$page.title}}

<span style="color: #999;">{{$page.readingTime.text}}...</span>

ちょっとした仕事で、Windows のレジストリを操作する必要がありました。ざっくり言うと、特定のWindows端末上でレジストリの値を適当なものに書き換えるプロビジョニング用のパッケージを作成するというものでした。

普通ならPowerShell, VBScript or Batch filesを使うところでしょうが、今回はGoを使って見ることにしました。

## Goを使うメリット

PowerShell, VBScritpと比較してGoを使うメリットとしては、以下の2点が挙げられます。

- 開発しやすい(= IDEのサポートを受けやすい)
  - PowerShellの場合、language serverが提供されているため互角かもしれません
    - [PowerShell Language Support for Visual Studio Code](https://github.com/PowerShell/vscode-powershell)
- 静的型付けの恩恵によりバグを防ぎやすい

## Goを使うデメリット

一方、デメリットとして、PowerShell, VBScriptで記述されたスクリプトと比較すると、Goで生成されるバイナリはサイズが極めて大きい点が挙げられます。

例えば、以下のプログラムをWindows向けにビルドすると、生成されるバイナリのファイルサイズは約2MBになります。

```go
package main

import "fmt"

func main() {
	fmt.Println("hello world")
}
```

- ref.
  - [Why is my trivial program such a large binary?](https://golang.org/doc/faq#Why_is_my_trivial_program_such_a_large_binary)
  - [Why are my Go executable files so large?](https://www.cockroachlabs.com/blog/go-file-size/)

と言っても、2MB程度なら許容できると判断し、今回はGoを使用することにしました。

## Goでレジストリを読み書きする

GoではWindowsのレジストリを操作するライブラリが標準で提供されています。

- [sys: golang.org/x/sys/windows/registry](https://godoc.org/golang.org/x/sys/windows/registry)

Linux/Macの場合、これを使用するためにはgo getをする必要があります。

```bash
go get golang.org/x/sys/windows/registry
```

ファイルの読み書きと同じようなインターフェースでレジストリを読み書きすることができます。

```go
k, err := registry.OpenKey(registry.LOCAL_MACHINE, `SOFTWARE\Microsoft\Windows NT\CurrentVersion`, registry.QUERY_VALUE)
if err != nil {
	log.Fatal(err)
}
defer k.Close()

s, _, err := k.GetStringValue("SystemRoot")
if err != nil {
	log.Fatal(err)
}
fmt.Printf("Windows system root is %q\n", s)
```

さて、今回の場合はレジストリを操作する前提として以下の条件がありました。

- 特定のユーザー(仮にユーザーAとします)の`HKEY_CURRENT_USER`のサブキーに特定の値を設定する
- プロビジョニング用のプログラムはAdministratorにより実行される

つまり単純に`HKEY_CURRENT_USER`のサブキーに書き込みすればいい、ということにはなりません。(プログラムがAdministratorにより実行されるため)

ユーザーAの[Security Identifier(SID)](https://docs.microsoft.com/en-us/windows/win32/secauthz/security-identifiers?redirectedfrom=MSDN)を特定し、該当するSIDのサブキーを操作しなければいけません。

具体的には以下の手順が必要になります。

- `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`からSIDを特定する
- `HKEY_USERS\#{SID}\`のサブキーを操作する

実装例は下記の通りです。

```go
const profileListPath = "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList"

func getProfileListSubKeyNames() ([]string, error) {
	k, err := registry.OpenKey(registry.LOCAL_MACHINE, profileListPath, registry.ENUMERATE_SUB_KEYS)
	if err != nil {
		return nil, fmt.Errorf("unable to open registry key %q: %v", profileListPath, err)
	}
	defer k.Close()
	return k.ReadSubKeyNames(0)
}

func getProperSID() (string, error) {
	sids, err := getProfileListSubKeyNames()
	if err != nil {
		return "", err
	}

	for _, sid := range sids {
		path := profileListPath + "\\" + sid
		k, err := registry.OpenKey(registry.LOCAL_MACHINE, path, registry.READ)
		if err != nil {
			return "", fmt.Errorf("unable to open registry key %q: %v", path, err)
		}
		defer k.Close()

		// do filtering based on your conditions
		// the following is an example to get the SSID of a user whose name is "foo"
		v, _, err := k.GetStringValue("ProfileImagePath")
		if err != nil {
			continue
		}
		if strings.HasSuffix(v, "\\foo") {
			return sid, nil
		}
	}
	return "", fmt.Errorf("unable to find proper profile")
}
```

あとはSIDを元にレジストリを操作すればOKです。

```go
const registryPath = "Software\\Foo\\Bar\\Config"
const registryKeyName = "woweee"
const registryKeyValue = "zoweee"

sid, err := getProperSID()
if err != nil {
return err
}

path := sid + "\\" + registryPath
key, _, err := registry.CreateKey(registry.USERS, path, registry.ALL_ACCESS)
if err != nil {
return fmt.Errorf("unable to open registry key %q: %v", path, err)
}
defer key.Close()

if err = key.SetStringValue(registryKeyName, registryKeyValue); err != nil {
return fmt.Errorf("unable to write into registry value %q/%q: %v", path, registryKeyName, err)
}
```

- ref.
  - [How to edit HKEY_CURRENT_USER for another user](http://www.georgealmeida.com/2014/09/how-to-edit-hkey_current_user-for-another-user/)


上記の例では直接`registry`を使用しましたが、テストを容易にするために、`registry`をラップした方がいいでしょう。

```go
type registryKey interface {
	SetStringValue(name, value string) error
	DeleteValue(name string) error
	ReadValueNames(n int) ([]string, error)
	Close() error
}

var registryCreateKeyFunc = func(baseKey registry.Key, path string, access uint32) (registryKey, bool, error) {
	return registry.CreateKey(baseKey, path, access)
}

key, _, err := registryCreateKeyFunc(registry.LOCAL_MACHINE, "foo\\bar", registry.SET_VALUE)
```

こうすることにより、ダミーのレジストリキーを作成してテストをすることができます。

```go
type dummyRegistryKey struct {
	setStringValueError error
	setStringValueArgs  [][]string

	deleteValueFunc func(name string) error
	deleteValueArgs []string

	readValueNamesError  error
	readValueNamesReturn []string
	readValueNamesArgs   []int

	closed bool
}
```

- ref.
  - [kubernetes/pkg/kubelet/dockershim/docker_container_windows.go](https://github.com/kubernetes/kubernetes/blob/master/pkg/kubelet/dockershim/docker_container_windows.go#L93-L105)

テストまで完了したら、後はWindows用にプログラムをビルドすれば完成です。

```bash
# For Windows 64-bit x86
env GOOS=windows GOARCH=amd64 go build main.go
# For Windows 32-bit x86
env GOOS=windows GOARCH=386 go build main.go
```
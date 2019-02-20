## 事前準備

seleniumをインストールする。

```sh
$ pip3 install -r requirementes.txt
```

下記からchromedriverをダウンロードして、Applicationフォルダーに配置する。
https://sites.google.com/a/chromium.org/chromedriver/downloads

## 認証情報をenvchainでセットする

```sh
envchain --set JOBCAN JOBCANEMAIL
```
```sh
envchain --set JOBCAN JOBCANPASSWORD
```

## 実行方法

envchainで環境変数を呼び出して実行する

```sh
envchain JOBCAN python3 main.py
```

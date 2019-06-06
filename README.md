jobcan tools

===

ジョブカン用のCLIツール

## 事前準備

諸々ライブラリをインストールする。

```sh
$ pip3 install -r requirementes.txt
```

下記からchromedriverをダウンロードして、Applicationフォルダーに配置する。
https://sites.google.com/a/chromium.org/chromedriver/downloads

## 認証情報を.envにセットする

```sh
cp .env.sample .env
```

## 機能

--help でヘルプ表示

```sh
   python main.py --help
Usage: main.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  touch  打刻
```

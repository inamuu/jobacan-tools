jobacan-tools
===

ジョブカンをなんとかするやつです。

### なんで作ったか

- cli
  - 手元から色々できるようにゆるく作った。作り途中。出来ればWiFiオンで打刻させたい。

- scrap_gas
  - 打刻機を使って打刻をしていると結構な頻度でエラーになることが多く、画面上ではエラーになっていることがわかるけど忘れてしまうので翌日通知させるため。  
  - なんと全社対応を想定！(というより導入している)。   
  - Slack通知が前提でSlack通知の部分だけ加工すれば如何様にでも通知できると思う。

### 実行環境

- cli
  - 手元でPython3.x, ChromeDriverがいるのでちょっと敷居が高い。
  
- Scrap_gas
  - Google Apps Script

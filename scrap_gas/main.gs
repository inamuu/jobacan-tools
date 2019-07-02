function main() {
  //mainが呼び出されたらトリガーを削除する
  delTrigger();

  //通知は月〜金だけ
  var setTime = new Date();
  var weekDay = setTime.getDay()
  if (weekDay == 1 ||
      weekDay == 6) {
    return false
  }

  //ジョブカンから勤怠エラーになっているデータを取得
  var userList = checkBothErr()

  //承認申請を実施しているユーザーリスト
  var approvalArr = nonApprovalCheck()
  
  //Slackユーザーリスト取得
  var slack_token = ''
  var slack_team = ''
  var listurl = 'https://' + slack_team + '.slack.com/api/users.list?token=' + slack_token
  var listres = UrlFetchApp.fetch(listurl)
  var listjson = JSON.parse(listres.getContentText())

  //対象者に直接Slackで通知する
  for (var j = 0; j < userList.length; j++) {
    var userName = userList[j].replace(/\d{4}\/\d{2}\/\d{2}.*/, '')
    if (approvalArr.indexOf(userName) >= 0) {
      console.log(userName + ' 申請済み')
      continue
    }
     
    notifySlackUser(userList[j], listjson)
    console.log(userName + ' 未申請なので通知する')
  }
}

//デフォルトだと指定した時間からランダムで実行されるので、指定した時間に一回限りのトリガーをセットする
function setTrigger(){
  var setTime = new Date()
  setTime.setHours(10)
  setTime.setMinutes(00);
  ScriptApp.newTrigger('main').timeBased().at(setTime).create()
}

function delTrigger() {
  var triggers = ScriptApp.getProjectTriggers()
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "main") {
      ScriptApp.deleteTrigger(triggers[i])
    }
  }
}

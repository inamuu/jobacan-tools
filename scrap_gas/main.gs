function main() {
  //mainが呼び出されたらトリガーを削除する
  delTrigger();

  //通知は平日だけ
  var setTime = new Date();
  var weekDay = setTime.getDay();
  if (weekDay == 1 ||
      weekDay == 6) {
    return false
  }

  //ジョブカンから勤怠エラーになっているデータを取得
  var datalist = checkBothErr();

  //Slackユーザーリスト取得
  var slack_token = 'XXXXXX';
  var slack_team = 'XXXXXX';
  var listurl = 'https://' + slack_team + '.slack.com/api/users.list?token=' + slack_token;
  var listres = UrlFetchApp.fetch(listurl);
  var listjson = JSON.parse(listres.getContentText());

  //対象者に直接Slackで通知する
  for (var i = 0; i < datalist.length; i++) {
    var errdata = datalist[i];
    notifySlackUser(errdata, listjson);
  }
}

//デフォルトだと指定した時間からランダムで実行されるので、指定した時間に一回限りのトリガーをセットする
function setTrigger(){
  var setTime = new Date();
  setTime.setHours(12);
  setTime.setMinutes(00); 
  ScriptApp.newTrigger('main').timeBased().at(setTime).create();
}

function delTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "main") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

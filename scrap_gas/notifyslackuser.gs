function notifySlackUser(errdata, listjson) {
  var slack_token = ''
  var slack_team = ''
  var icon_emoji = ":jobcan:"
  var channel = ''

  if (errdata == null) {
    return
  }

  for each(var val in listjson["members"]) {
    //undefinedだとreplaceが失敗するので
    if (val["real_name"] !== undefined)　{
      var real_name = val["real_name"].replace(/\s/g, '')

      //real_name と errdataの前方一致でチェックして通知
      if(errdata.indexOf(real_name) === 0){
        Logger.log(val["id"])
        Logger.log(val["real_name"])
        var data = errdata
            .replace(real_name, '')
        　　　　　　　　//.replace(real_name, real_name + 'さん　')

        //送るパラメータの定義
        var payload = {
          "token" : slack_token,
          "text" : real_name + ' ' + data,
          "channel" : channel,
          "icon_emoji" : icon_emoji
        }

        var options = {
          "method" : "POST",
          "payload" : payload
        }
        console.log(val["id"] + ' ' + val["real_name"] + ' ' + data)
        UrlFetchApp.fetch("https://slack.com/api/chat.postMessage", options)
        Utilities.sleep(1000)
        return
      }
    }
  }
}

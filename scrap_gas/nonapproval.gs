function nonApprovalCheck() {
  var setTime = new Date()
  var thisYear = setTime.getFullYear()
  var thisMonth = setTime.getMonth()　+ 1
  var toDay = setTime.getDate()

  //未承認結果
  var options_c = login()
  var approvalList = new String()
  var groupid = '85'

  for ( var i = 1; i < 5; i++ ) {
    var checkUrl = "https://ssl.jobcan.jp/client/apploved/?searching=1&search_type=month&year=" + thisYear + "&month=" + thisMonth + "&fromYear=" + thisYear + "&fromMonth=" + thisMonth + "&fromDay=1&toYear=" + thisYear + " &toMonth=" + thisMonth + "&toDay=31&group_id=" + groupid + "&group_where_type=main&work_kind%5B%5D=0&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&name=&employee_id=&tags=&page=" + i
    response = UrlFetchApp.fetch(checkUrl, options_c)
    var content = response.getContentText("UTF-8")
    var dataRegexp = /<td rowspan="2" class="staff">([\s\S]*?)<\/td>/g
    var dataResult = content.match(dataRegexp);

    if ( dataResult == null ) {
       break 
    }
    
    var datalist = dataResult.toString()
        .replace(/<td rowspan="2" class="staff">/g, '')
        .replace(/<\/td>/g, '')
        .replace(/,計\d件の<br>打刻修正申請/g, '')
        .replace(/\s/g, '')
    
        approvalList += datalist
  }
  var approvalArr = approvalList.split(",")

  // 重複除外
  var results = approvalArr.filter(function (x, i, self) {
    return self.indexOf(x) === i;
  });
  return results
}

function checkBothErr() {

  var setTime = new Date()
  var thisYear = setTime.getFullYear()
  var thisMonth = setTime.getMonth() + 1
  var groupid = ""

  //検索結果
  var options_c = login()
  var searchUrl = "https://ssl.jobcan.jp/client/not-leave/?searching=1&search_type=month&year=" + thisYear + "&month=" + thisMonth + "&fromYear=" + thisYear + "&fromMonth=" + thisMonth +"&fromDay=1&toYear=" + thisYear + "&toMonth=" + thisMonth + "&toDay=31&group_id=" + groupid + "&group_where_type=main&work_kind%5B%5D=0&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&work_kind%5B%5D=-1&name=&employee_id=&tags=&error_type=both"

  response = UrlFetchApp.fetch(searchUrl, options_c)
  var content = response.getContentText("UTF-8")

  //ユーザー名,日付,内容のマッチ
  var dataRegexp = /(<td class="staff">([\s\S]*?)<\/td>|<td>(\d{4}\/\d{2}\/\d{2})<\/td>|<div tooltip="([\s\S]*?)<\/div>)/g
  var dataResult = content.match(dataRegexp)
  var datalist = dataResult.toString()
      .replace(/<td class="staff">/g, '')
      .replace(/" style="display:inline">/g, '')
      .replace(/<td>/g, '')
      .replace(/<\/td>/g, '')
      .replace(/<div tooltip="/g, '')
      .replace(/\s/g, '')
      .replace(/,/g, '')
      .replace(/要打刻/g, '')
      .replace(/<br>"tooltipAlign="left"style="display:inline">打刻漏れ・打刻間違い/g, '')
      .replace(/<br>/g, '')
      .split('</div>')
  return datalist
}

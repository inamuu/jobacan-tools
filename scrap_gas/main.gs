function main() {
    var options_c = login()
    var topUrl = "https://ssl.jobcan.jp/client/"
    response = UrlFetchApp.fetch(topUrl, options_c);
    var content = response.getContentText("UTF-8");
    Logger.log(content);
}


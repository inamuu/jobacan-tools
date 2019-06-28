function login() {
  var client_login_id = "";
  var LOGIN_URL = "https://ssl.jobcan.jp/login/client";
  var client_manager_login_id = "";
  var client_login_password = "";

  try {
    // HTTPリクエストのパラメータをobjectで設定
    // POSTで渡すフォームデータはpayloadで指定
    var options = {
      method: "post",
      followRedirects: false,
      contentType: "application/x-www-form-urlencoded",
      payload: {
        client_login_id: client_login_id,
        client_manager_login_id: client_manager_login_id,
        client_login_password: client_login_password,
        save_login_info: '0',
        login_type: '2',
        url: "https://ssl.jobcan.jp/client/"
      }
    };
    var response = UrlFetchApp.fetch(LOGIN_URL, options);

    // レスポンスヘッダーからcookieを取得
    var cookies = response.getHeaders()["Set-Cookie"];

    // ログインで認証されたcookieはヘッダーで使用
    var headers = { 'Cookie' : cookies };
    var options_c = {
      method : "get",
      headers : headers,
      followRedirects: true, //リダイレクトあり
    };
  } catch (e) {
    Logger.log('\n' + JSON.stringify(e, null, '  '));
  };
  return options_c;
}

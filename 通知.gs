function testbot(){
  // 対象となるスプレッドシートの情報を取得
  var sprsheet = SpreadsheetApp.openById("1OAyzJ_fe2ckLdimOytYrKlJaQZkKl-dzvx0ZYZ22Ox8");
  // 取得したスプレッドシートから、対象とするシート名を指定
  var objsheet = sprsheet.getSheetByName("notification");
  // 取得したシート名から、今回取得したいセルの場所を指定
  var range1 = objsheet.getRange('A2'); 
  var range2 = objsheet.getRange('B2'); 
  // セルから情報を取得
  var value1 = range1.getValue(); //セル情報を文字列で取得する
  var value2 = range2.getValue();

  // const values1 = objsheet.getRange(1, 3, objsheet.getLastRow() - 1).getValues();
  
  //botのURLを入れる
  var url = "https://chat.googleapis.com/v1/spaces/AAAAqyRFNhQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=wpACygvGZYY72SVyrlnORhBHsmK-3v28yiPpD2wxnIc%3D";
  var text1 =  value1  + value2 ;

  var payload = {
    "text" : text1
  }
  
  var json = JSON.stringify(payload); //エンコード
  
  var options = {
  "method" : "POST",
  "contentType" : 'application/json; charset=utf-8',
  "payload" : json
  }
  
  var response = UrlFetchApp.fetch(url, options);
}
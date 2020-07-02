function myFunction() {
  // 対象となるスプレッドシートの情報を取得
  var sprsheet = SpreadsheetApp.openById("1OAyzJ_fe2ckLdimOytYrKlJaQZkKl-dzvx0ZYZ22Ox8");
  // 取得したスプレッドシートから、対象とするシート名を指定
  var sheet = sprsheet.getSheetByName("notification");
  const lastRow = sheet.getLastRow();

  //
  

  var Calendar_Item = sprsheet.getSheetByName('Calendar_Item'); //確認用シートを取得
  var valuesA = sprsheet.getRange('A2:A12').getValues(); //検索範囲

  //手順2-3.労務費入力
  for(let i = 2; i <= 20; i++) {
    var KC1 = Calendar_Item.getRange(i, 1).getValue(); 　//ID上の名前
    var KC_Cost = Calendar_Item.getRange(i, 3).getValue(); //ID上の予定

    if(sheet.getRange(i, 1).getValue() === '' ){      
      console.log(i, "NO")　　　　　　　　　　　　　　　//空白行の時ログ出力(確認用)    
    }else if ( valuesA.flat().indexOf(KC1)!= -1) {
      var Col3 = valuesA.flat().indexOf(KC1); 　//KC(行)
      sheet.getRange(Col3+2, 2).setValue(KC_Cost); //時間入力        
    } else {
        }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  for(let i = 2; i <= lastRow; i++) {
    if(!sheet.getRange(i, 2).getValue()){ 
      console.log(sheet.getRange(i, 1).getValue());
      sheet.getRange(i, 2).setValue('なし');
    }
  }
}
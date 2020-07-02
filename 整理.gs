function delete_duplication(){
  //アクティブなシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  //「Calendar_ID」のシートをアクティブにして、シート情報をcalendarIdに取得
  var calendarId = sheet.setActiveSheet(sheet.getSheetByName("Calendar_ID"));
  //「Calendar_Item」のシートをアクティブにして、シート情報をcalendarItemに取得
  var calendarItem = sheet.setActiveSheet(sheet.getSheetByName("Calendar_Item"));
    var last_row = calendarItem.getLastRow();
  
    for(var i = 2; i < last_row; i++){
      var range = calendarItem.getRange("C"+ i);
      var value = range.getDisplayValue();
      if(value == "朝礼・終礼"){
        var start_row = i;
        var num_row = 1;
        calendarItem.deleteRows(start_row, num_row);
        i = i - 1;
      }
    }
  
  const lastRow = calendarItem.getLastRow();
  

  
  //整理後名前入力
  for(let i = 2; i <= lastRow; i++) {
    if(!calendarItem.getRange(i, 1).getValue()){ 
      //console.log(calendarItem.getRange(i, 1).getValue());
      
      var ID1 = calendarItem.getRange(i, 2).getValue();
      var valuesA = calendarId.getRange(1, 1, calendarId.getLastRow() - 0).getValues();
      var Col1 = valuesA.flat().indexOf(ID1); //就業時間の入力行検索
      var name = calendarId.getRange(Col1 + 1, 2).getValue();
      console.log(name)
      
      calendarItem.getRange(i, 1).setValue(name);
    }
  }
}


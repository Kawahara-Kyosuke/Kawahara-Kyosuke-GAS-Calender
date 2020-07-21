function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();//現在アクティブなスプレッドシートを取得
  var lists = ss.getSheetByName("Grメンバー"); //リストシート
  var count = ss.getSheetByName("集計"); //リストシート
  const lastRow = lists.getLastRow();
  for(let i = 2 ; i <= lastRow; i++) {
    var CALENDAR_ID = lists.getRange(i,3).getValue(); //カレンダーID
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);  
    const startTime = new Date('2020/06/22 16:00:00');
    const endTime = new Date('2020/06/22 17:00:00');    
    const events = calendar.getEvents(startTime, endTime);    
    const values = [];
    
    for(const event of events){
      const record = [
      event.getTitle(),
      event.getStartTime(),
      event.getEndTime(),
      event.getLocation(),
    ];
    values.push(record);
        
        //①列の先頭行から下方向に取得する
        var lastRow1 = count.getRange(1, 2).getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow();
        Logger.log(lastRow1); 
        
//        count.getRange(i, 1).setValue(ID);
        count.getRange(lastRow1+1, 2, values.length, values[0].length).setValues(values);
  }    

    ## test_1
  }
}

//対象の日付を範囲指定
//var date = '2020/06/25'; 
//アクティブなシートを取得
var sheet = SpreadsheetApp.getActiveSpreadsheet();

//「Calendar_ID」のシートをアクティブにして、シート情報をcalendarIdに取得
var calendarId = sheet.setActiveSheet(sheet.getSheetByName("Calendar_ID"));
//「Calendar_Item」のシートをアクティブにして、シート情報をcalendarItemに取得
var calendarItem = sheet.setActiveSheet(sheet.getSheetByName("Calendar_Item"));


function getId(){
  //現在の入力されてる値を初期化
  calendarItem.clear();
  //ヘッダ行に入る値を指定（誤って削除しても都度指定）
  calendarItem.getRange('A'+(1)).setValue('カレンダーID');
  calendarItem.getRange('B'+(1)).setValue('タイトル');
  calendarItem.getRange('C'+(1)).setValue('開始時刻');
  calendarItem.getRange('D'+(1)).setValue('終了時刻');
  calendarItem.getRange('E'+(1)).setValue('所要時間');
  calendarItem.getRange('F'+(1)).setValue('場所');
  
  //CalendarIDが入っている最終行を取得（固定）
  var lastR1 = calendarId.getLastRow();
  Logger.log("【lastR】：" + lastR1);
  
  //セットされているIDのリストを順番に取得してgetCalに引数として渡す
  for (var i = 1; i < lastR1 ; i++){
    //予定表が入っている最終行を取得（可変）
    var lastR2 = calendarItem.getLastRow();
    Logger.log("【lastR】：" + lastR2);

    //カレンダーIDを指定して、カレンダーを取得
    var calId = calendarId.getRange('A'+(i+1)).getValue(); 
    Logger.log('【calId】' + calId);
    getCal(calId,lastR2);
  }
}

function getCal(id,lastR) {
  Logger.log('【id】' + id);
  Logger.log('【lastR】' + lastR);
  
  var calendar = CalendarApp.getCalendarById(id);

 const startTime1 = new Date('2020/06/25 16:00:00');
  const endTime1 = new Date('2020/06/25 17:00:00');
  //getEventsで取得したいカレンダーの始まりと終わりを指定
  var events = calendar.getEvents(startTime1, endTime1);

  //eventsに入っている要素の数だけ実行
  for (var i = 0; i < events.length; i++) {
  Logger.log('events要素' + i + '目');
    if (events[i].isAllDayEvent()) {
    //終日イベントの場合はなにもしない
    } else {
    var title = events[i].getTitle();
    var startTime = events[i].getStartTime();
    var endTime = events[i].getEndTime();
    var duration = (endTime - startTime) /(1000*60)/(60);
    var detail = events[i].getDescription();
    var location = events[i].getLocation();

    //取得した値をスプレッドシートに反映
    calendarItem.getRange('A'+(lastR+1)).setValue(id);
    calendarItem.getRange('B'+(lastR+1)).setValue(title);
    calendarItem.getRange('C'+(lastR+1)).setValue(startTime).setNumberFormat('yyyy/mm/dd hh:mm');
    calendarItem.getRange('D'+(lastR+1)).setValue(endTime).setNumberFormat('yyyy/mm/dd hh:mm');
    calendarItem.getRange('E'+(lastR+1)).setValue(duration);
    calendarItem.getRange('F'+(lastR+1)).setValue(location);
    lastR = lastR + 1;
    }
  }
}
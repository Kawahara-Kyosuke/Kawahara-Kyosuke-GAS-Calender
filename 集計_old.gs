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
  calendarItem.getRange('B'+(1)).setValue('カレンダーID');
  calendarItem.getRange('C'+(1)).setValue('タイトル');
  calendarItem.getRange('D'+(1)).setValue('開始時刻');
  calendarItem.getRange('E'+(1)).setValue('終了時刻');
  calendarItem.getRange('F'+(1)).setValue('所要時間');
  calendarItem.getRange('G'+(1)).setValue('場所');
  
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

function getCalendarEvents() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();//現在アクティブなスプレッドシートを取得
  var lists = ss.getSheetByName("Grメンバー"); //リストシート
  var count = ss.getSheetByName("集計"); //リストシート

  const CALENDAR_ID = count.getRange('C2').getValue();
  
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);  
  const startTime = new Date('2020/06/25 16:00:00');
  const endTime = new Date('2020/06/25 17:00:00');
   
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
  }
 // SpreadsheetApp.getActiveSheet().getRange(2, 1).setValue(ID);
  count.getRange(2, 2, values.length, values[0].length).setValues(values);
  
}
function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data") ||
                SpreadsheetApp.getActiveSpreadsheet().insertSheet("Data");
  if (sheet.getLastRow() === 0) sheet.appendRow(["timestamp","type","username","data"]);
  sheet.appendRow([new Date(), data.type || "", data.username || "", JSON.stringify(data)]);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}
function doGet(){return ContentService.createTextOutput(JSON.stringify({ok:true,service:"Health Hub"})).setMimeType(ContentService.MimeType.JSON);}

const SHEET_NAME = 'TimeData';

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) sh.appendRow(['timestamp','type','user','game','start','end','minutes','date','bed','wake','sleepMinutes','goalMinutes','reminder']);
  return 'OK';
}

function doGet() { return json({ok:true, service:'HEALTH HUB backend'}); }

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.action === 'ai') return json({ok:true, answer: askGemini(body.question)});
    if (body.action === 'save') { saveRow(body.row || {}); return json({ok:true}); }
    return json({ok:false,error:'Unknown action'});
  } catch(err) { return json({ok:false,error:String(err)}); }
}

function saveRow(row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) setupSheet();
  sh.appendRow([new Date(),row.type||'',row.user||'',row.game||'',row.start||'',row.end||'',row.minutes||0,row.date||'',row.bed||'',row.wake||'',row.sleepMinutes||'',row.goalMinutes||'',row.reminder||'']);
}

function askGemini(question) {
  if (!question) throw new Error('กรุณาพิมพ์คำถาม');
  const key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
  if (!key) throw new Error('ยังไม่ได้ตั้ง GEMINI_API_KEY ใน Script Properties');
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(key);
  const prompt = `คุณคือ HEALTH HUB AI ผู้ช่วยภาษาไทย ตอบคำถามทั่วไปได้หลากหลายหัวข้อ ให้คำตอบชัดเจน เป็นมิตร และไม่แต่งข้อมูล หากเป็นเรื่องสุขภาพให้ข้อมูลทั่วไปและแนะนำพบผู้เชี่ยวชาญเมื่อมีสัญญาณอันตราย ห้ามอ้างว่าตัวเองเป็นแพทย์\n\nคำถามผู้ใช้:\n${question}`;
  const res = UrlFetchApp.fetch(url,{method:'post',contentType:'application/json',payload:JSON.stringify({contents:[{parts:[{text:prompt}]}]}),muteHttpExceptions:true});
  const code=res.getResponseCode(); const data=JSON.parse(res.getContentText()||'{}');
  if(code<200||code>=300) throw new Error(data.error?.message || 'Gemini API error');
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'ไม่พบคำตอบ';
}

function json(obj){return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);}

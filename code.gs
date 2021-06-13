function doGet(e) {
  if (!e.parameter.p) {
    return HtmlService.createHtmlOutputFromFile('main.html')
  }
  switch (e.parameter.p) {
    case "main": return HtmlService.createHtmlOutputFromFile('main.html')
    case "cencer": return HtmlService.createHtmlOutputFromFile('cc.html')
    case "confirm": return HtmlService.createHtmlOutputFromFile('cf.html')
    default: return HtmlService.createHtmlOutputFromFile('404.html')
  }
}

function getdata() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('manu')
  var rows = sheet.getDataRange().getValues()
  var datas = []
  var head = rows[0]
  for (var i = 1; i < rows.length; i++) {
    var temp = {}
    for (var j = 0; j < rows[i].length; j++) {
      temp[head[j]] = rows[i][j]
    }
    datas[i - 1] = temp
  }
  return datas
}

function cc(ID) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('list')
  var rows = sheet.getDataRange().getValues()
  var list = false
  var i = 0
  var s =""
  rows.forEach((e,j)=>{
    if(ID===e[0]){
      list=true
      i=j
      s=e[e.length-1]
    }
  })
  if(list){
    if(s==="รอยืนยัน"){
      sheet.deleteRow(i+1)
    }
    else{
      list=false
    }
  }
  return list
}
function cf(ID){
   var sheet = SpreadsheetApp.getActive().getSheetByName('list')
  var rows = sheet.getDataRange().getValues()
  var list = false
  var i = 0
  rows.forEach((e,j)=>{
    if(ID===e[0]){
      list=true
      i=j
    }
  })
  if(list){
    sheet.getRange(i+1,10).setValue("เรียบร้อยแล้ว")
  }
  return true
}

function savedata(name, price, tel, manu, quantity, lat, long) {
  var id = makeid(13)
  var sheet = SpreadsheetApp.getActive().getSheetByName('list')
  var date = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy hh:mm:ss")
  sheet.appendRow([id, name, price, tel, manu, quantity, date, lat, long, "รอยืนยัน"])
  return true
}


function makeid(length) {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}


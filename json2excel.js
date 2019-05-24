var json2xls = require('json2xls');
var saveAs = require('file-saver');
// excel's data will be exports, which you probably get it from server.
let json = 
    {"id":39,"title":"Aktualizacja danych","content":"Zaktualizowanie danych na kontach użytkowników Archiwum Państwowego w Gdyni - inny adres","relatedError":"","category":{"value":"Kategoria C"},"deadline":"2019-04-30","priority":{"label":"Średni","value":"MEDIUM"},"priorityString":"Średni","tasks":[{"id":72,"title":"Aktualizacja adresu dla pięciu użytkowników","status":"DONE","statusString":"Wykonana","attachments":[]}],"status":"TO_APPROVE","statusString":"Do aprobaty","orderedBy":{"id":2053,"firstName":"Mariusz","lastName":"Gmail2","login":"emailaddressmariuszklonowskigmailcomcnmariuszgmail2ouoddzialtestowyoar"},"totalTaskCount":1,"approvedTaskCount":0,"reports":[{"id":343,"workPeriodStart":"2019-05-09","workPeriodEnd":"2019-05-09","assignee":{"id":2052,"firstName":"Mariusz","lastName":"Global","login":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"},"reportStatus":"REJECTED","reportStatusString":"Odrzucony","details":{"systemStatus":{"label":"Stabilny","value":"STABLE"},"actions":[{"id":344,"description":"fdsa","infrastructureElement":"STATISTICS","infrastructureElementString":"Generowanie statystyk"},{"id":345,"description":"22","infrastructureElement":"APPLICATIONS","infrastructureElementString":"Wnioski"}],"tests":[{"id":346,"description":"fdsa","testResult":"POSITIVE","testResultString":"Pozytywny"},{"id":347,"description":"test","testResult":"NEGATIVE","testResultString":"Negatywny"}]}},{"id":348,"workPeriodStart":"2019-05-09","workPeriodEnd":"2019-05-23","assignee":{"id":2052,"firstName":"Mariusz","lastName":"Global","login":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"},"reportStatus":"PENDING","reportStatusString":"Oczekujący","details":{"systemStatus":{"label":"Niestabilny","value":"UNSTABLE"},"actions":[{"id":349,"description":"fdas","infrastructureElement":"APPLICATIONS","infrastructureElementString":"Wnioski"},{"id":350,"description":"fdsagf","infrastructureElement":"PACKAGES","infrastructureElementString":"Paczka archiwalna"},{"id":351,"description":"fdsa","infrastructureElement":"STATISTICS","infrastructureElementString":"Generowanie statystyk"}],"tests":[{"id":352,"description":"1dfsa","testResult":"POSITIVE","testResultString":"Pozytywny"},{"id":353,"description":"222","testResult":"POSITIVE","testResultString":"Pozytywny"}]}}],"attachments":[]};

// this will be export a excel and the file's name is user-info-data.xlsx
// the default file's name is excel.xlsx
var xls = json2xls(json);

function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

saveAs(new Blob([s2ab(xls)],{type:"application/octet-stream"}), 'test.xlsx');
console.log(xls);
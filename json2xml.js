

var translations = {
    "name": "Imie",
    "number": "Wiek",
    "city": "Miasto",
    "address":{
        "name":"Adres",
        "number":"Numer",
        "street":{
            "name":"Ulica",
            "happiness":"Zadowolenie",
            "population":{
                "name":"Populacja",
                "woman":"Kobiety",
                "man": "Mezczyzni",
            }
        },
    },
};


var json = {"id":39,"title":"Aktualizacja danych","content":"Zaktualizowanie danych </title> na kontach użytkowników Archiwum Państwowego w Gdyni - inny adres","relatedError":"","category":{"value":"Kategoria C"},"deadline":"2019-04-30","priority":{"label":"Średni","value":"MEDIUM"},"priorityString":"Średni","tasks":[{"id":72,"title":"Aktualizacja adresu dla pięciu użytkowników","status":"DONE","statusString":"Wykonana","attachments":[]}],"status":"TO_APPROVE","statusString":"Do aprobaty","orderedBy":{"id":2053,"firstName":"Mariusz","lastName":"Gmail2","login":"emailaddressmariuszklonowskigmailcomcnmariuszgmail2ouoddzialtestowyoar"},"totalTaskCount":1,"approvedTaskCount":0,"reports":[{"id":343,"workPeriodStart":"2019-05-09","workPeriodEnd":"2019-05-09","assignee":{"id":2052,"firstName":"Mariusz","lastName":"Global","login":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"},"reportStatus":"REJECTED","reportStatusString":"Odrzucony","details":{"systemStatus":{"label":"Stabilny","value":"STABLE"},"actions":[{"id":344,"description":"fdsa","infrastructureElement":"STATISTICS","infrastructureElementString":"Generowanie statystyk"},{"id":345,"description":"22","infrastructureElement":"APPLICATIONS","infrastructureElementString":"Wnioski"}],"tests":[{"id":346,"description":"fdsa","testResult":"POSITIVE","testResultString":"Pozytywny"},{"id":347,"description":"test","testResult":"NEGATIVE","testResultString":"Negatywny"}]}},{"id":348,"workPeriodStart":"2019-05-09","workPeriodEnd":"2019-05-23","assignee":{"id":2052,"firstName":"Mariusz","lastName":"Global","login":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"},"reportStatus":"PENDING","reportStatusString":"Oczekujący","details":{"systemStatus":{"label":"Niestabilny","value":"UNSTABLE"},"actions":[{"id":349,"description":"fdas","infrastructureElement":"APPLICATIONS","infrastructureElementString":"Wnioski"},{"id":350,"description":"fdsagf","infrastructureElement":"PACKAGES","infrastructureElementString":"Paczka archiwalna"},{"id":351,"description":"fdsa","infrastructureElement":"STATISTICS","infrastructureElementString":"Generowanie statystyk"}],"tests":[{"id":352,"description":"1dfsa","testResult":"POSITIVE","testResultString":"Pozytywny"},{"id":353,"description":"222","testResult":"POSITIVE","testResultString":"Pozytywny"}]}}],"attachments":[]};


xml = generateXmlFromJson(json, translations);

document.getElementById("result").innerHTML=xml;


function generateXmlFromJson(json, translations){
    translationsPoint = translations;
    var finalXML = "<root>";
    result = createXml(json);
    finalXML+="</root>";
    
    console.log(finalXML);
    return finalXML;


    function createXml(json, section){
        result = "";
        word = "";
        line="";
    
        jsonVariables = Object.keys(json);
                
        if(section){
            finalXML+="<"+section+">";
        }

        for(var prop in json){
            variable = json[prop];
            if(typeof variable === 'object' && variable !== null){
                word = prop;
                variable = json[prop];
                result = createXml(variable, word);
            } else {
                word = prop;
                variable = json[prop];
                variable = checkForSpecialChars(variable.toString());
                finalXML+= "<"+word+">"+variable+"</"+word+">";
            }
        }
    
        if(section){
            finalXML+="</"+section+">";
        }
    
        return result;
    }
    
    function checkForSpecialChars(string){
        string = string.replace(/<+/g,"&lt");
        string = string.replace(/>+/g,"&gt");
        string = string.replace(/\//g,"&#47");
        return string;
    }
}




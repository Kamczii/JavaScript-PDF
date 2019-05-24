
var json1 ={
   "date":"2019-05-10T15:44:09.738",
   "results":{
      "type":"JRWA",
      "success":false,
      "description":"JRWA - nie istnieje"
   },
   "verifiedBy":{
      "id":6,
      "firstName":"Telimena",
      "lastName":"Techniczna",
      "email":"telimenat@mail.com",
      "unitId":3000,
      "effectiveUnitId":4000,
      "unitName":"Jednostka Techniczna",
      "permissions":[

      ],
      "login":"telimena.techniczna"
   }
};

var json2 ={
   "id":39,
   "title":"Aktualizacja danych",
   "content":"Zaktualizowanie danych na kontach użytkowników Archiwum Państwowego w Gdyni - inny adres",
   "relatedError":"",
   "category":{
      "value":"Kategoria C"
   },
   "deadline":"2019-04-30",
   "priority":{
      "label":"Średni",
      "value":"MEDIUM"
   },
   "priorityString":"Średni",
   "tasks":[
      {
         "id":72,
         "title":"Aktualizacja adresu dla pięciu użytkowników",
         "status":"DONE",
         "statusString":"Wykonana",
         "attachments":[

         ]
      }
   ],
   "status":"TO_APPROVE",
   "statusString":"Do aprobaty",
   "orderedBy":{
      "id":2053,
      "firstName":"Mariusz",
      "lastName":"Gmail2",
      "login":"emailaddressmariuszklonowskigmailcomcnmariuszgmail2ouoddzialtestowyoar"
   },
   "totalTaskCount":1,
   "approvedTaskCount":0,
   "reports":[
      {
         "id":343,
         "workPeriodStart":"2019-05-09",
         "workPeriodEnd":"2019-05-09",
         "assignee":{
            "id":2052,
            "firstName":"Mariusz",
            "lastName":"Global",
            "login":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
         },
         "reportStatus":"REJECTED",
         "reportStatusString":"Odrzucony",
         "details":{
            "systemStatus":{
               "label":"Stabilny",
               "value":"STABLE"
            },
            "actions":[
               {
                  "id":344,
                  "description":"fdsa",
                  "infrastructureElement":"STATISTICS",
                  "infrastructureElementString":"Generowanie statystyk"
               },
               {
                  "id":345,
                  "description":"22",
                  "infrastructureElement":"APPLICATIONS",
                  "infrastructureElementString":"Wnioski"
               }
            ],
            "tests":[
               {
                  "id":346,
                  "description":"fdsa",
                  "testResult":"POSITIVE",
                  "testResultString":"Pozytywny"
               },
               {
                  "id":347,
                  "description":"test",
                  "testResult":"NEGATIVE",
                  "testResultString":"Negatywny"
               }
            ]
         }
      },
      {
         "id":348,
         "workPeriodStart":"2019-05-09",
         "workPeriodEnd":"2019-05-23",
         "assignee":{
            "id":2052,
            "firstName":"Mariusz",
            "lastName":"Global",
            "login":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
         },
         "reportStatus":"PENDING",
         "reportStatusString":"Oczekujący",
         "details":{
            "systemStatus":{
               "label":"Niestabilny",
               "value":"UNSTABLE"
            },
            "actions":[
               {
                  "id":349,
                  "description":"fdas",
                  "infrastructureElement":"APPLICATIONS",
                  "infrastructureElementString":"Wnioski"
               },
               {
                  "id":350,
                  "description":"fdsagf",
                  "infrastructureElement":"PACKAGES",
                  "infrastructureElementString":"Paczka archiwalna"
               },
               {
                  "id":351,
                  "description":"fdsa",
                  "infrastructureElement":"STATISTICS",
                  "infrastructureElementString":"Generowanie statystyk"
               }
            ],
            "tests":[
               {
                  "id":352,
                  "description":"1dfsa",
                  "testResult":"POSITIVE",
                  "testResultString":"Pozytywny"
               },
               {
                  "id":353,
                  "description":"222",
                  "testResult":"POSITIVE",
                  "testResultString":"Pozytywny"
               }
            ]
         }
      }
   ],
   "attachments":[

   ]
};

str = generateCSV(json2);

document.getElementById("result").innerHTML = str;


function generateCSV(json){
   
   jsonHeaders = [];
   return getProps(json);
   


   function getProps(json){
       headers = getHeaders(json, null,false);
       arrHeaders = [];
       headers= headers.slice(0,-1);
       result = headers.join() + ' \n';
       for(var h in headers){
           arrHeaders.push(headerToArray(headers[h]));
       }

       for(var h in arrHeaders){
           value = arrHeaders[h];
           variable = "";

           if(value.length==1){
               variable = json[value[0]];
           } else{
               arr = json;
               for(var i=0;i<value.length;i++){
                   arr = arr[value[i]];
               }
               variable = arr;
               console.log(variable);
           }
           result+=variable+",";
       }
       result = result.slice(0,-1);

       return result;
   }


   function checkForSpecialChars(string){
       string = string.replace(/"+/g,'""');
       return string;
   }


   function getHeaders(json,path, isArray){
       var result = "";
       var entryPath = path;
       
       for (var prop in json) {

           if(typeof json[prop] === 'object' && json[prop] !== null){
               isArrayIndex = false;

               if(json[prop].constructor === Array)
               {   
                   isArray=true;
               }
               else{
                   isArray=false;
               }
               if(path){
                  if(isNaN(prop))
                     path+="_"+prop;
               }
               else{
                   path = prop;
               }


               result+=getHeaders(json[prop],path,isArray);
               
               ind = path.lastIndexOf("_");
               path = path.substr(0,ind);
           }else{
              
               if(path){
                   result+=path+"_";
               }
               result+=prop+',';
           }

           
           
       }
       
       var arr = result.split(",");


       function checkIfStartsWithIndex(element){
          return element.charAt(0) != 1;
       }

       arr = arr.filter(checkIfStartsWithIndex);

       return arr;
   }

   function headerToArray(header){
       arr = header.split("_");
       return arr;
   }
}




// Each record (row of data) is to be located on a separate line, delimited by a line break. For example:

// aaa,bbb,ccc CRLF

// The last record in the file may or may not have an ending line break. For example:

// aaa,bbb,ccc CRLF
//    zzz,yyy,xxx

// There may be an optional header line appearing as the first line of the file with the same format as normal record lines. The header will contain names corresponding to the fields in the file and should contain the same number of fields as the records in the rest of the file. For example:

// field_name,field_name,field_name CRLF
//    aaa,bbb,ccc CRLF
//    zzz,yyy,xxx CRLF

// In the header and each record, there may be one or more fields, separated by commas. Each line should contain the same number of fields throughout the file. Spaces are considered part of a field and should not be ignored. The last field in the record must not be followed by a comma. For example:

// aaa,bbb,ccc

// Each field may or may not be enclosed in double quotes. If fields are not enclosed with double quotes, then double quotes may not appear inside the fields. For example:

// "aaa","bbb","ccc" CRLF
//    zzz,yyy,xxx

// Fields containing line breaks (CRLF), double quotes, and commas should be enclosed in double quotes. For example:

// "aaa","b CRLF
//    bb","ccc" CRLF
//    zzz,yyy,xxx

// If double quotes are used to enclose fields, then a double quote appearing inside a field must be escaped by preceding it with another double quote. For example:

// "aaa","b""bb","ccc"

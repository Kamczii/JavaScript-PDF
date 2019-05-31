var pdf = {};

//constants
var lineHeight = 5;
var margin = 15;
var replacer = "-";
var dFontSize=9;
var tFontSize = dFontSize;
var iFontSize = dFontSize*1.3;
var headerFontSize = 24;

pdf.warRepressionAndAfterWar = function(){
  doc = new jsPDF({orientation: 'landscape'});
  
  sectionSpacing = (doc.internal.pageSize.getWidth()-margin*2)/4;
  currentY = 0;
  doc.setFont('roboto');
  var t0 = performance.now();

  var json = {
    "id": 4851,
    "userIdentifier": "2019/05/29/069385",
    "createDate": "2019-05-29T15:40:02.61",
    "createdBy": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "wieslaw.kwerendzista@test.pl",
      "fullName": "Adam Archiwista"
    },
    "status": {
      "value": "DRAFT",
      "label": "Roboczy"
    },
    "applicant": {
      "type": {
        "value": "PRIVATE_USER",
        "label": "Użytkownik prywatny"
      },
      "postCode": "89-200",
      "city": "Szubin",
      "street": "Wiejska",
      "flatNumber": "Wiejska",
      "firstName": "Bartosz",
      "lastName": "Kubacki",
      "email": "bartosz.kubacki@primigenius.pl",
      "phone": "789789456"
    },
    "stateArchive": {
      "id": 2,
      "name": "AP Gliwice"
    },
    "queryType": {
      "value": "WAR_AND_POST_WAR_REPRESION",
      "label": "Represje wojenne i powojenne"
    },
    "queryPurpose": {
      "value": "INHERITANCE",
      "label": "Spadkowy"
    },
    "issuingType": {
      "value": "DIGITAL_COPY",
      "label": "Kopia cyfrowa"
    },
    "legalRule": {
      "value": "pokrewieństwo"
    },
    "subsititation": "ala ma kota",
    "attachments": [],
    "order": {
      "repression": {
        "repressedPersonList": [
          {
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "fatherName": "Bolesław",
            "bornDate": "2019-05-27",
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          }
        ],
        "repressionInfo": {
          "repressionType": {
            "id": 31,
            "value": "wysiedlenie"
          },
          "customInfo": "aaa"
        },
        "residenceAddressBeforeArrest": {
          "place": "Szubin",
          "community": "Abramów",
          "county": "będziński",
          "street": "Wiejskaddd",
          "houseNumber": "556",
          "flatNumber": "34"
        },
        "arrestAddress": {
          "place": "Szubin",
          "community": "Abramów",
          "county": "będziński",
          "street": "Wiejska",
          "houseNumber": "556",
          "flatNumber": "34"
        },
        "depositionAddessList": [
          {
            "place": "Warszawa",
            "community": "Aleksandrów",
            "county": "bełchatowski",
            "street": "qqq",
            "houseNumber": "ww2",
            "flatNumber": "3"
          }
        ],
        "registrationAddressAfterRelease": {
          "place": "Kołaczkowo",
          "community": "Aleksandrów Kujawski",
          "county": "białobrzeski",
          "street": "Mickiewicza",
          "houseNumber": "Mickiewicza",
          "flatNumber": "Mickiewicza",
          "date": "2019-05-22"
        },
        "customInfo": "ala ma dwa koty"
      }
    }
  };

  function displayOrder() {
    currentY = addPageIfContentToLong(currentY,30,doc);
    
    if(json.order === undefined) json.order = {};
    if(json.order.repression === undefined) json.order.repression = {};  
    if(json.order.repression.repressedPersonList === undefined) json.order.repression.repressedPersonList = [];
    if(json.order.repression.repressionInfo === undefined) json.order.repression.repressionInfo = {};
    if(json.order.repression.repressionInfo.repressionType === undefined) json.order.repression.repressionInfo.repressionType = {};
    if(json.order.repression.residenceAddressBeforeArrest === undefined) json.order.repression.residenceAddressBeforeArrest = {};
    if(json.order.repression.arrestAddress === undefined) json.order.repression.arrestAddress = {};
    if(json.order.repression.depositionAddessList === undefined) json.order.repression.depositionAddessList = [];
    if(json.order.repression.registrationAddressAfterRelease === undefined) json.order.repression.registrationAddressAfterRelease = {};

    createSubtitle("Przedmiot zamówienia",margin,currentY,dFontSize,doc);
    currentY+=lineHeight*1.5;

    var list1 = json.order.repression.repressedPersonList;
    var list2 = json.order.repression.depositionAddessList;
    var repression = json.order.repression;

    for(e in list1){
      currentY = addPageIfContentToLong(currentY,20,doc);
      s = list1[e];
      currentY = addPageIfContentToLong(currentY,5,doc);
      createSubtitle("Informacja o osobie represjonowanej",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      currentY = addPageIfContentToLong(currentY,5,doc);
      titleAndDetailDeprecated("Imię", s.firstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Nazwisko", s.lastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Imię ojca", s.fatherName, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      currentY = addPageIfContentToLong(currentY,5,doc);
      if(s.kinship === undefined) s.kinship = {};
      titleAndDetailDeprecated("Stopień pokrewieństwa wnioskodawcy", s.kinship.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
    }

    currentY+=lineHeight;
    currentY = addPageIfContentToLong(currentY,10,doc);
    createSubtitle("Informacja o charakterze represji",margin,currentY,dFontSize*0.9,doc);
    currentY+=lineHeight;
    currentY = addPageIfContentToLong(currentY,10,doc);
    currentY=titleAndDetailDeprecated("Charakter represji", repression.repressionInfo.repressionType.value, lineHeight, sectionSpacing*3,margin,currentY,tFontSize,iFontSize,doc,replacer);
    currentY = addPageIfContentToLong(currentY,10,doc);
    currentY=titleAndDetailDeprecated("Dodatkowe informacje", repression.repressionInfo.customInfo, lineHeight, sectionSpacing*3,margin,currentY,tFontSize,iFontSize,doc,replacer);
    
    currentY+=lineHeight;
    currentY = addPageIfContentToLong(currentY,10,doc);
    createSubtitle("Adres zamieszkania przed wysiedleniem/aresztowaniem",margin,currentY,dFontSize*0.9,doc);
    currentY+=lineHeight;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Miejscowość", repression.residenceAddressBeforeArrest.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Gmina", repression.residenceAddressBeforeArrest.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Powiat", repression.residenceAddressBeforeArrest.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight*2;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Ulica", repression.residenceAddressBeforeArrest.street, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Numer domu", repression.residenceAddressBeforeArrest.houseNumber, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Numer mieszkania", repression.residenceAddressBeforeArrest.flatNumber, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
    
    currentY+=lineHeight*3;
    currentY = addPageIfContentToLong(currentY,10,doc);
    createSubtitle("Miejsce zatrzymania/aresztowania",margin,currentY,dFontSize*0.9,doc);
    currentY+=lineHeight;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Taki jak adres zamieszkania", compareAddresses(repression.arrestAddress,repression.residenceAddressBeforeArrest) ? "TAK" : "NIE", lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight*2;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Miejscowość", repression.arrestAddress.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Gmina", repression.arrestAddress.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Powiat", repression.arrestAddress.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight*2;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Ulica", repression.arrestAddress.street, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Numer domu", repression.arrestAddress.houseNumber, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
    titleAndDetailDeprecated("Numer mieszkania", repression.arrestAddress.flatNumber, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight*2;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Data zatrzymania/aresztowania", repression.arrestAddress.date, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight*2;

    for(e in list2){
      currentY = addPageIfContentToLong(currentY,20,doc);
      s = list2[e];
      createSubtitle("Miejsce osadzenia/wysiedlenia",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      currentY = addPageIfContentToLong(currentY,10,doc);
      titleAndDetailDeprecated("Miejscowość", s.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Gmina", s.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Powiat", s.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      
      currentY+=lineHeight*2;
      currentY = addPageIfContentToLong(currentY,10,doc);
      titleAndDetailDeprecated("Ulica", s.street, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Numer domu", s.houseNumber, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Numer mieszkania", s.flatNumber, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
    }

    currentY+=lineHeight;
    currentY = addPageIfContentToLong(currentY,10,doc);
    createSubtitle("Miejsce zameldowania po uwolnieniu/powrocie do kraju",margin,currentY,dFontSize*0.9,doc);
    currentY+=lineHeight;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Miejscowość", repression.registrationAddressAfterRelease.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer),
    titleAndDetailDeprecated("Gmina", repression.registrationAddressAfterRelease.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer),
    titleAndDetailDeprecated("Powiat", repression.registrationAddressAfterRelease.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer),
    currentY+=lineHeight*2;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Ulica", repression.registrationAddressAfterRelease.street, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer),
    titleAndDetailDeprecated("Numer domu", repression.registrationAddressAfterRelease.houseNumber, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer),
    titleAndDetailDeprecated("Numer mieszkania", repression.registrationAddressAfterRelease.flatNumber, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer)
    currentY+=lineHeight*2;
    currentY = addPageIfContentToLong(currentY,10,doc);
    titleAndDetailDeprecated("Data uwolnienia/powrotu do kraju", repression.registrationAddressAfterRelease.date, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer)
  

    currentY+=lineHeight*2;
   
    currentY = addPageIfContentToLong(currentY,10,doc);
    currentY=titleAndDetailDeprecated("Informacje dodatkowe",repression.customInfo, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight;

    
  }

  generatePdfHeader("Wniosek o wykonanie kwerendy ID: ",json.userIdentifier,doc);
  currentY = margin*1.5;

  currentY = generateQueryHeader(json,doc,currentY,sectionSpacing);

  displayOrder();

  drawHorizontalBorder(margin,currentY,margin,doc);
  currentY+=lineHeight*2;
  

  generateHistoryTable(history,doc);

  

  var fetches = [];

  return Promise.all(fetches).then(() => {
    
    var t1 = performance.now();

    console.log("Finished in " + (t1 - t0) + " milliseconds.")
    return doc;
  });
}

pdf.notarialDeedResearch = function(){
  doc = new jsPDF({orientation: 'landscape'});
  sectionSpacing = (doc.internal.pageSize.getWidth()-margin*2)/4;
  currentY = 0;
  doc.setFont('roboto');
  var t0 = performance.now();


  var json = {
    "id": 4601,
    "userIdentifier": "2019/05/24/063518",
    "createDate": "2019-05-24T15:17:23.639",
    "createdBy": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "1",
      "fullName": "Adam Archiwista"
    },
    "status": {
      "value": "NEW",
      "label": "Nowy"
    },
    "applicant": {
      "type": {
        "value": "PRIVATE_USER",
        "label": "Użytkownik prywatny"
      },
      "postCode": "89-200",
      "city": "Szubin",
      "street": "Wiejska",
      "streetNumber": "887",
      "flatNumber": "96",
      "firstName": "Bartosz",
      "lastName": "Kubacki",
      "email": "bartosz.kubacki@primigenius.pl",
      "phone": "789789456"
    },
    "stateArchive": {
      "id": 2,
      "name": "AP Gliwice"
    },
    "queryType": {
      "value": "NOTARIAL_DEED_SEARCH",
      "label": "Poszukiwania aktu notarialnego"
    },
    "queryPurpose": {
      "value": "ESTABLISHMENT_OF_REGISTRY",
      "label": "Założenie księgi wieczystej"
    },
    "issuingType": {
      "value": "DIGITAL_COPY_PRINT",
      "label": "wydruk kopii cyfrowej (odbiór w archiwum)"
    },
    "legalRule": {
      "value": "pokrewieństwo"
    },
    "subsititation": "fsdfsdfsdfsdfsdfsd",
    "attachments": [],
    "order": {
      "notarialDeedResearch": {
        "notarialDeedList": [
          {
            "notaryFirstName": "Bartosz",
            "notaryLastName": "Kubacki",
            "repositoryNumber": "789456",
            "place": "Szubin",
            "createDate": "2019-05-07"
          }
        ],
        "notarialDeedSideList": [
          {
            "firstName": "Janusz",
            "role": {
              "value": "BUYER",
              "label": "kupujący"
            },
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          }
        ],
        "subject": "dom",
        "customInfo": "ala ma kota"
      }
    }
  };
  
  function displayOrder() {
    if(json.order === undefined) json.order = {};
    if(json.order.notarialDeedResearch === undefined) json.order.notarialDeedResearch = {};
    if(json.order.notarialDeedResearch.notarialDeedList === undefined) json.order.notarialDeedResearch.notarialDeedList = [];  
    if(json.order.notarialDeedResearch.notarialDeedSideList === undefined) json.order.notarialDeedResearch.notarialDeedSideList = [];

    currentY = addPageIfContentToLong(currentY,30,doc);
    createSubtitle("Przedmiot zamówienia",margin,currentY,dFontSize,doc);
    currentY+=lineHeight*1.5;

    var list1 = json.order.notarialDeedResearch.notarialDeedList;
    var list2 = json.order.notarialDeedResearch.notarialDeedSideList;

    for(e in list1){
      currentY = addPageIfContentToLong(currentY,20,doc);
      s = list1[e];
      createSubtitle("Akt notarialny",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      titleAndDetailDeprecated("Imię notariusza", s.notaryFirstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Nazwisko notariusza", s.notaryLastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Numer repozytorium", s.repositoryNumber, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      titleAndDetailDeprecated("Miejsowość sporządzenia aktu", s.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Data sporządzenia", getDateAndFormat(s.createDate), lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
    }
    currentY+=lineHeight;

    for(e in list2){
      currentY = addPageIfContentToLong(currentY,20,doc);
      s = list2[e];
      createSubtitle("Strona aktu",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      titleAndDetailDeprecated("Imię", s.firstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Nazwisko", s.lastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      if(s.role === undefined) s.role = {};
      titleAndDetailDeprecated("Rola", s.role.label, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      if(s.kinship === undefined) s.kinship = {};
      titleAndDetailDeprecated("Stopień pokrewieństwa", s.kinship.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
    }
    currentY+=lineHeight;
    currentY=titleAndDetailDeprecated("Przedmiot umowy (aktu)", json.order.notarialDeedResearch.subject, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight;
    currentY=titleAndDetailDeprecated("Informacje dodatkowe", json.order.notarialDeedResearch.customInfo, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight;
  }

  

  
  generatePdfHeader("Wniosek o wykonanie kwerendy ID: ",json.userIdentifier,doc);
  currentY = margin*1.5;
  
  currentY = generateQueryHeader(json,doc,currentY,sectionSpacing);

  displayOrder();

  drawHorizontalBorder(margin,currentY,margin,doc);
  currentY+=lineHeight*2;
  

  generateHistoryTable(history,doc);

  

  var fetches = [];

  return Promise.all(fetches).then(() => {
    
    var t1 = performance.now();

    console.log("Finished in " + (t1 - t0) + " milliseconds.")
    return doc;
  });
}

pdf.propSearch = function(){
  doc = new jsPDF({orientation: 'landscape'});
  sectionSpacing = (doc.internal.pageSize.getWidth()-margin*2)/4;
  doc.setFont('roboto');
  currentY = 0;
  var t0 = performance.now();

  var json = {
    "id": 4505,
    "userIdentifier": "2019/05/24/038842",
    "createDate": "2019-05-24T14:58:53.955",
    "createdBy": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "1",
      "fullName": "Adam Archiwista"
    },
    "status": {
      "value": "NEW",
      "label": "Nowy"
    },
    "applicant": {
      "type": {
        "value": "PRIVATE_USER",
        "label": "Użytkownik prywatny"
      },
      "postCode": "89-200",
      "city": "Szubin",
      "street": "Wiejska",
      "streetNumber": "58",
      "flatNumber": "554",
      "firstName": "Bartosz",
      "lastName": "Kubacki",
      "email": "bartosz.kubacki@primigenius.pl",
      "phone": "789789456"
    },
    "stateArchive": {
      "id": 2,
      "name": "AP Gliwice"
    },
    "queryType": {
      "value": "PROPERTY_RESEARCH",
      "label": "Poszukiwania własnościowe"
    },
    "queryPurpose": {
      "value": "ESTABLISHMENT_OF_REGISTRY",
      "label": "Założenie księgi wieczystej"
    },
    "issuingType": {
      "value": "DIGITAL_COPY",
      "label": "Kopia cyfrowa"
    },
    "legalRule": {
      "value": "praca naukowa"
    },
    "subsititation": "aaaaaaaaaaaaaa",
    "attachments": [],
    "order": {
      "propertyResearch": {
        "propertyOwnerList": [
          {
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "fatherName": "Bolesław",
            "bornDate": "2019-05-06",
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          }
        ],
        "propertyList": [
          {
            "place": "Szubin",
            "community": "Aleksandrów",
            "county": "brzeziński",
            "propertyNumber": "123321234",
            "purchaseContext": {
              "id": 23,
              "value": "sprzedaż"
            },
            "purchaseYear": 4545,
            "sellContext": {
              "id": 20,
              "value": "likwidacja serwitutów"
            },
            "sellYear": 8787
          }
        ]
      }
    }
  };
  
  
  function displayOrder() {
    
    if(json.order === undefined) json.order = {};
    if(json.order.propertyResearch === undefined) json.order.propertyResearch = {};
    if(json.order.propertyResearch.propertyOwnerList === undefined) json.order.propertyResearch.propertyOwnerList = [];  
    if(json.order.propertyResearch.propertyList === undefined) json.order.propertyResearch.propertyList = [];
    
    currentY = addPageIfContentToLong(currentY,30,doc);
    createSubtitle("Przedmiot zamówienia",margin,currentY,dFontSize,doc);
    currentY+=lineHeight*1.5;

    var list1 = json.order.propertyResearch.propertyOwnerList;
    var list2 = json.order.propertyResearch.propertyList;

    for(e in list1){
      currentY = addPageIfContentToLong(currentY,20,doc);
      s = list1[e];
      createSubtitle("Właściciel/współwłaściciel nieruchomości",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      titleAndDetailDeprecated("Imię", s.firstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Nazwisko", s.lastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Imię ojca", s.fatherName, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Data urodzenia", getDateAndFormat(s.bornDate), lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      if(s.kinship === undefined) s.kinship  = {};
      titleAndDetailDeprecated("Stopień pokrewieństwa dla wnioskodawcy", s.kinship.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
    }
    currentY+=lineHeight;

    for(e in list2){
      currentY = addPageIfContentToLong(currentY,20,doc);
      s = list2[e];
      createSubtitle("Określenie nieruchomości",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      titleAndDetailDeprecated("Miejscowość", s.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Gmina", s.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Powiat", s.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      titleAndDetailDeprecated("Numer hipoteczny nieruchomości lub księgi wieczystej", s.propertyNumber, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      if(s.purchaseContext === undefined) s.purchaseContext  = {};
      titleAndDetailDeprecated("Okoliczności nabycia nieruchomości", s.purchaseContext.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Rok nabycia", s.purchaseYear, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      if(s.sellContext === undefined) s.sellContext  = {};
      titleAndDetailDeprecated("Okoliczności zbycia nieruchomości", s.sellContext.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Rok zbycia", s.sellYear, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
    }
  }

  

  
  generatePdfHeader("Wniosek o wykonanie kwerendy ID: ",json.userIdentifier,doc);
  currentY = margin*1.5;
  
  currentY = generateQueryHeader(json,doc,currentY,sectionSpacing);

  displayOrder();

  drawHorizontalBorder(margin,currentY,margin,doc);
  currentY+=lineHeight*2;
  

  generateHistoryTable(history,doc);

  

  var fetches = [];

  return Promise.all(fetches).then(() => {
    
    var t1 = performance.now();

    console.log("Finished in " + (t1 - t0) + " milliseconds.")
    return doc;
  });
}

pdf.citizenshipConfirmation = function(){
  doc = new jsPDF({orientation: 'landscape'});
  sectionSpacing = (doc.internal.pageSize.getWidth()-margin*2)/4;
  doc.setFont('roboto');
  currentY = 0;
  var t0 = performance.now();

  var json = {
    "id": 4504,
    "userIdentifier": "2019/05/24/098735",
    "createDate": "2019-05-24T14:51:10.488",
    "createdBy": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "1",
      "fullName": "Adam Archiwista"
    },
    "status": {
      "value": "NEW",
      "label": "Nowy"
    },
    "applicant": {
      "type": {
        "value": "PRIVATE_USER",
        "label": "Użytkownik prywatny"
      },
      "postCode": "89-200",
      "city": "Szubin",
      "street": "Wiejska",
      "streetNumber": "22",
      "flatNumber": "K",
      "firstName": "Bartosz",
      "lastName": "Kubacki",
      "email": "bartosz.kubacki@primigenius.pl",
      "phone": "789789456"
    },
    "stateArchive": {
      "id": 2,
      "name": "AP Gliwice"
    },
    "queryType": {
      "value": "CONFIRMATION_OF_CITIZENSHIP",
      "label": "Potwierdzenie obywatelstwa"
    },
    "queryPurpose": {
      "value": "OBTAINING_POLISH_CARD",
      "label": "Uzyskanie Karty Polaka"
    },
    "issuingType": {
      "value": "DIGITAL_COPY",
      "label": "Kopia cyfrowa"
    },
    "legalRule": {
      "value": "praca naukowa"
    },
    "subsititation": "moje uzasadnienie",
    "attachments": [],
    "order": {
      "citizenshipConfirmation": {
        "personList": [
          {
            "period": {
              "from": "2019-05-14",
              "to": "2019-05-22"
            },
            "address": {
              "place": "Szubin",
              "community": "Aleksandrów Kujawski",
              "county": "białobrzeski",
              "street": "Wiejska",
              "houseNumber": "45",
              "flatNumber": "2"
            },
            "passportNumber": "pas 1222",
            "passportIssueDate": "2019-05-28",
            "leavingCountryInfo": "Polska",
            "leavingCountryDate": "2019-05-20",
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "fatherName": "Bolesław",
            "bornDate": "2019-05-21",
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          },
          {
            "period": {
              "from": "2019-05-14",
              "to": "2019-05-22"
            },
            "address": {
              "place": "Szubin",
              "community": "Aleksandrów Kujawski",
              "county": "białobrzeski",
              "street": "Wiejska",
              "houseNumber": "45",
              "flatNumber": "2"
            },
            "passportNumber": "pas 1222",
            "passportIssueDate": "2019-05-28",
            "leavingCountryInfo": "Polska",
            "leavingCountryDate": "2019-05-20",
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "fatherName": "Bolesław",
            "bornDate": "2019-05-21",
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          },
          {
            "period": {
              "from": "2019-05-14",
              "to": "2019-05-22"
            },
            "address": {
              "place": "Szubin",
              "community": "Aleksandrów Kujawski",
              "county": "białobrzeski",
              "street": "Wiejska",
              "houseNumber": "45",
              "flatNumber": "2"
            },
            "passportNumber": "pas 1222",
            "passportIssueDate": "2019-05-28",
            "leavingCountryInfo": "Polska",
            "leavingCountryDate": "2019-05-20",
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "fatherName": "Bolesław",
            "bornDate": "2019-05-21",
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          },

          {
            "passportNumber": "pas 1222",
            "passportIssueDate": "2019-05-28",
            "leavingCountryInfo": "Polska",
            "leavingCountryDate": "2019-05-20",
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "bornDate": "2019-05-21"
          }
        ],
        "additionalInfo": "to są informacje dodatkowe"
      }
    }
  };
  
  
  function displayOrder() {
    if(json.order === undefined) json.order = {};
    if(json.order.citizenshipConfirmation === undefined) json.order.citizenshipConfirmation = {};
    if(json.order.citizenshipConfirmation.personList === undefined) json.order.citizenshipConfirmation.personList = [];  
    for(e in json.order.citizenshipConfirmation.personList){
      el=json.order.citizenshipConfirmation.personList[e];
      if(el.period === undefined) el.period = {};
      if(el.address === undefined) el.address = {};
      if(el.kinship === undefined) el.kinship = {};
    }

    currentY = addPageIfContentToLong(currentY,30,doc);
    createSubtitle("Przedmiot zamówienia",margin,currentY,dFontSize,doc);
    currentY+=lineHeight*1.5;

    var list = json.order.citizenshipConfirmation.personList;
    for(e in list){
      currentY = addPageIfContentToLong(currentY,40,doc);
      s = list[e];
      createSubtitle("Potwierdzenie obywatelstwa dla",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      titleAndDetailDeprecated("Imię", s.firstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Nazwisko", s.lastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Imię ojca", s.fatherName, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Data urodzenia", getDateAndFormat(s.bornDate), lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      titleAndDetailDeprecated("Stopień pokrewieństwa dla wnioskodawcy", s.kinship.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      titleAndDetailDeprecated("Okres zameldowania/zamieszkania", getDateAndFormat(s.period.from)+'-'+getDateAndFormat(s.period.to), lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*3;
      createSubtitle("Miejsce zamieszkania",margin,currentY,dFontSize*0.9,doc);
      currentY+=lineHeight;
      titleAndDetailDeprecated("Miejscowość", s.address.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Gmina", s.address.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Powiat", s.address.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      titleAndDetailDeprecated("Ulica", s.address.street, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Numer domu", s.address.houseNumber, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Numer mieszkania", s.address.flatNumber, lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      titleAndDetailDeprecated("Numer paszportu", s.passportNumber, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      titleAndDetailDeprecated("Data wydania paszportu", getDateAndFormat(s.passportIssueDate), lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY+=lineHeight*2;
      titleAndDetailDeprecated("Data wyjazdu z kraju",getDateAndFormat(s.leavingCountryDate), lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
      currentY=titleAndDetailDeprecated("Okoliczności wyjazdu z kraju", s.leavingCountryInfo, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
      drawHorizontalBorder(margin,currentY,margin,doc);
      currentY+=lineHeight*2;
    }

    currentY = addPageIfContentToLong(currentY,10,doc);
    currentY=titleAndDetailDeprecated("Informacje dodatkowe",  json.order.citizenshipConfirmation.additionalInfo, lineHeight, sectionSpacing*4,margin,currentY,tFontSize,iFontSize,doc,replacer);
    currentY+=lineHeight;
  }

  generatePdfHeader("Wniosek o wykonanie kwerendy ID: ",json.userIdentifier,doc);
  currentY = margin*1.5;
  
  currentY = generateQueryHeader(json,doc,currentY,sectionSpacing);

  displayOrder();

  drawHorizontalBorder(margin,currentY,margin,doc);
  currentY+=lineHeight*2;
  

  generateHistoryTable(history,doc);

  var fetches = [];

  return Promise.all(fetches).then(() => {
    
    var t1 = performance.now();

    console.log("Finished in " + (t1 - t0) + " milliseconds.")
    return doc;
  });
}

pdf.regConfirmation = function(){
  doc = new jsPDF({orientation: 'landscape'});
  sectionSpacing = (doc.internal.pageSize.getWidth()-margin*2)/4;
  doc.setFont('roboto');
  currentY = 0;
  var t0 = performance.now();

  var json ={
    "id": 4503,
    "userIdentifier": "2019/05/24/020661",
    "createDate": "2019-05-24T14:43:39.89",
    "createdBy": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "1",
      "fullName": "Adam Archiwista"
    },
    "status": {
      "value": "NEW",
      "label": "Nowy"
    },
    "applicant": {
      "type": {
        "value": "PRIVATE_USER",
        "label": "Użytkownik prywatny"
      },
      "postCode": "89-200",
      "city": "Szubin",
      "street": "K, 22",
      "streetNumber": "22",
      "flatNumber": "K",
      "firstName": "Bartosz",
      "lastName": "Kubacki",
      "email": "bartosz.kubacki@primigenius.pl",
      "phone": "789789456"
    },
    "stateArchive": {
      "id": 2,
      "name": "AP Gliwice"
    },
    "queryType": {
      "value": "CONFIRMATION_OF_REGISTRATION",
      "label": "Potwierdzenie zameldowania"
    },
    "queryPurpose": {
      "value": "INHERITANCE",
      "label": "Spadkowy"
    },
    "issuingType": {
      "value": "AUTHENTICATED_COPY",
      "label": "uwierzytelniona kopia (odbiór w archiwum)"
    },
    "legalRule": {
      "value": "praca naukowa"
    },
    "subsititation": "ala ma kota",
    "attachments": [
      {
        "fileName": "S3+eyJpZCI6NDUwMywiYXR0SWQiOjI4MDQsIm9yaWdpbmFsRmlsZU5hbWUiOiJwb2RwaXNfanMueG1sIn0=",
        "originalFileName": "podpis_js.xml"
      }
    ],
    "order": {
      "registrationConfirmation": {
        "registrationConfirmationList": [
          {
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "fatherName": "Bolesław",
            "bornDate": "2019-05-22",
            "place": "Szubin",
            "community": "Aleksandrów Łódzki",
            "county": "białobrzeski",
            "street": "Wawelska",
            "houseNumber": "45",
            "flatNumber": "K",
            "faith": "takie tam",
            "parish": "Szubin",
            "other": "bla bla bla ",
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          }
        ]
      }
    }
  };

  function displayOrder(){
    if(json.order === undefined) json.order = {};
    if(json.order.registrationConfirmation === undefined) json.order.registrationConfirmation = {};
    if(json.order.registrationConfirmation.registrationConfirmationList === undefined) json.order.registrationConfirmation.registrationConfirmationList = [];  
    for(e in json.order.registrationConfirmation.registrationConfirmationList){
      el=json.order.registrationConfirmation.registrationConfirmationList[e];
      if(el.kinship === undefined) el.kinship = {};
    }

    currentY = addPageIfContentToLong(currentY,30,doc);
    createSubtitle("Przedmiot zamówienia",margin,currentY,dFontSize,doc);
    currentY+=lineHeight*1.5;

      var list = json.order.registrationConfirmation.registrationConfirmationList;
      for(e in list){
        currentY = addPageIfContentToLong(currentY,40,doc);
        s = list[e];
        createSubtitle("Potwierdzenie",margin,currentY,dFontSize*0.9,doc);
        currentY+=lineHeight;
        titleAndDetailDeprecated("Imię", s.firstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Nazwisko", s.lastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Imię ojca", s.fatherName.toString(), lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Data urodzenia", getDateAndFormat(s.bornDate), lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Miejscowość", s.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Gmina", s.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Powiat", s.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Ulica", s.street, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Numer domu", s.houseNumber, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Numer mieszkania", s.flatNumber, lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Wyznanie", s.faith, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Parafia", s.parish, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        currentY=titleAndDetailDeprecated("Informacje dot. pochodzenia, zawodu etc.", s.other, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        
        currentY=titleAndDetailDeprecated("Stopień pokrewieństwa dla wnioskodawcy", s.kinship.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        drawHorizontalBorder(margin,currentY,margin,doc);
        currentY+=lineHeight*2;
      }
  }


  
  generatePdfHeader("Wniosek o wykonanie kwerendy ID: ",json.userIdentifier,doc);
  currentY = margin*1.5;
  
  currentY = generateQueryHeader(json,doc,currentY,sectionSpacing);

  displayOrder();
  
  generateHistoryTable(history,doc);

  

  var fetches = [];

  return Promise.all(fetches).then(() => {
    
    var t1 = performance.now();

    console.log("Finished in " + (t1 - t0) + " milliseconds.")
    return doc;
  });
}

pdf.civilRegistry = function(){
  doc = new jsPDF({orientation: 'landscape'});
  sectionSpacing = (doc.internal.pageSize.getWidth()-margin*2)/4;
  doc.setFont('roboto');
  currentY = 0;
  var t0 = performance.now();
  
  var json ={
    "id": 4502,
    "userIdentifier": "2019/05/24/097281",
    "createDate": "2019-05-24T14:37:08.939",
    "createdBy": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "1",
      "fullName": "Adam Archiwista"
    },
    "status": {
      "value": "NEW",
      "label": "Nowy"
    },
    "applicant": {
      "type": {
        "value": "PRIVATE_USER",
        "label": "Użytkownik prywatny"
      },
      "postCode": "89-200",
      "city": "Szubin",
      "street": "Wiejska",
      "streetNumber": "22",
      "flatNumber": "K",
      "firstName": "Bartosz",
      "lastName": "Kubacki",
      "email": "bartosz.kubacki@primigenius.pl",
      "phone": "789789456"
    },
    "stateArchive": {
      "id": 2,
      "name": "AP Gliwice"
    },
    "queryType": {
      "value": "CIVIL_REGISTRY",
      "label": "W aktach stanu cywilnego"
    },
    "queryPurpose": {
      "value": "COMPENSATION_OF_BUG_RIVER_PROPERTY",
      "label": "Rekompensata za mienie zabużańskie"
    },
    "issuingType": {
      "value": "DIGITAL_COPY_PRINT",
      "label": "wydruk kopii cyfrowej (odbiór w archiwum)"
    },
    "legalRule": {
      "value": "pokrewieństwo"
    },
    "subsititation": "ala ma kota",
    "attachments": [
      {
        "fileName": "S3+eyJpZCI6NDUwMiwiYXR0SWQiOjI4MDMsIm9yaWdpbmFsRmlsZU5hbWUiOiJCdWxrIEFpcnRpbWUgVHJhbnNmZXIgMTMudHh0In0=",
        "originalFileName": "Bulk Airtime Transfer 13.txt"
      }
    ],
    "order": {
      "civilRegistry": {
        "civilRegistryList": [
          {
            "registryType": {
              "id": 40,
              "value": "akt urodzenia"
            },
            "firstName": "Bartosz",
            "lastName": "Kubacki",
            "year": 1599,
            "number": "1233/4444",
            "place": "Warszawa",
            "community": "Szubin",
            "county": "nakielski",
            "faith": "jakieś tam",
            "parish": "Szubin",
            "kinship": {
              "id": 16,
              "value": "rodzic"
            }
          }
        ]
      }
    }
  };
  
  function displayOrder(){
    if(json.order === undefined) json.order = {};
    if(json.order.civilRegistry === undefined) json.order.civilRegistry = {};
    if(json.order.civilRegistry.civilRegistryList === undefined) json.order.civilRegistry.civilRegistryList = [];  
    for(e in json.order.civilRegistry.civilRegistryList){
      el=json.order.civilRegistry.civilRegistryList[e];
      if(el.kinship === undefined) el.kinship = {};
      if(el.registryType === undefined) el.registryType = {};
    }

    currentY = addPageIfContentToLong(currentY,30,doc);
      if(currentY == 0)
        currentY = margin;
    createSubtitle("Przedmiot zamówienia",margin,currentY,dFontSize,doc);
    currentY+=lineHeight*1.5;
    createSubtitle("Akt stanu cywilnego",margin,currentY,dFontSize*.9,doc);
    currentY+=lineHeight*1.5;
    var list = json.order.civilRegistry.civilRegistryList;
      for(e in list){
        currentY = addPageIfContentToLong(currentY,40,doc);
        s = list[e];
        titleAndDetailDeprecated("Rodzaj akt", s.registryType.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Imię", s.firstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Nazwisko", s.lastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Rok", s.year.toString(), lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Numer aktu", s.number, lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Miejsce zdarzenia", s.place, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Gmina", s.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Powiat", s.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Wyznanie", s.faith, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Parafia", s.parish, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Stopień pokrewieństwa", s.kinship.value, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*3;
        createSubtitle("Zakres przedmiotowy poszukiwań",margin,currentY,dFontSize*0.9,doc);
        currentY+=lineHeight;
        currentY=titleAndDetailDeprecated("Fakty i zdarzenia, których mają dotyczyć poszukiwania", "Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. Brak w jsonie. ", lineHeight, sectionSpacing*4,margin,currentY,tFontSize,iFontSize,doc,replacer);
        drawHorizontalBorder(margin,currentY,margin,doc);
        currentY+=lineHeight*2;
      }
  }

  doc.setFont('roboto');
  var t0 = performance.now();

  
  generatePdfHeader("Wniosek o wykonanie kwerendy ID: ",json.userIdentifier,doc);
  currentY = margin*1.5;
  
  currentY = generateQueryHeader(json,doc,currentY,sectionSpacing);

  displayOrder();
  
  generateHistoryTable(history,doc);

  

  var fetches = [];

  return Promise.all(fetches).then(() => {
    
    var t1 = performance.now();

    console.log("Finished in " + (t1 - t0) + " milliseconds.")
    return doc;
  });
}

pdf.applicationForQuery = function(){
  doc = new jsPDF({orientation: 'landscape'});
  sectionSpacing = (doc.internal.pageSize.getWidth()-margin*2)/4;
  doc.setFont('roboto');
  currentY = 0;
  var t0 = performance.now();

  var json1 = {
    "id": 4501,
    "userIdentifier": "2019/05/24/049930",
    "createDate": "2019-05-24T02:12:54.497",
    "createdBy": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "1",
      "fullName": "Adam Archiwista"
    },
    "assignee": {
      "id": 2,
      "firstName": "Adam",
      "lastName": "Archiwista",
      "email": "a@a.pl",
      "unitId": 2,
      "effectiveUnitId": 2,
      "unitName": "NDAP",
      "login": "1",
      "fullName": "Adam Archiwista"
    },
    "caseId": "TO JEST ZNAK SPRAWY",
    "executionDate": "2020-01-01",
    "status": {
      "value": "NEW",
      "label": "Nowy"
    },
    "applicant": {
      "type": {
        "value": "PRIVATE_USER",
        "label": "Użytkownik prywatny"
      },
      "postCode": "89-200",
      "city": "Szubin",
      "street": "Wiejska",
      "streetNumber": "22",
      "flatNumber": "",
      "firstName": "Bartosz",
      "lastName": "testowy", 
      "email": "bartosz.kubacki@primigenius.pl",
      "phone": "789789456"
    },
    "stateArchive": {
      "id": 2,
      "name": "AP Gliwice"
    },
    "queryType": {
      "value": "GENEALOGICAL_RESEARCH",
      "label": "Poszukiwania genealogiczne"
    },
    "queryPurpose": {
      "value": "CONFIRMATION_OF_PL_CITIZENSHIP",
      "label": "Potwierdzenie obywatelstwa polskiego"
    },
    "legalRule": {
      "value": "pokrewieństwo"
    },
    "subsititation": "to jest uzasadnienie zamównienia",
    "attachments": [
      {
        "fileName": "S3+eyJpZCI6NDUwMSwiYXR0SWQiOjI4MDEsIm9yaWdpbmFsRmlsZU5hbWUiOiJjb3JlLmxvZy0xODEzMTQ1LnR4dCJ9",
        "originalFileName": "core.log-1813145.txt"
      },
      {
        "fileName": "S3+eyJpZCI6NDUwMSwiYXR0SWQiOjI4MDIsIm9yaWdpbmFsRmlsZU5hbWUiOiJjb3JlLmxvZy0xODEzMTYzLnR4dCJ9",
        "originalFileName": "core.log-1813163.txt"
      }
    ],
    "order": {
      "genealogicalResearch": {
        "searchedPersonList": [
          {
            "firstName": "Jan",
            "lastName": "Jankowski",
            "fatherName": "Wiesław",
            "bornDate": "2019-05-01",
            "residencePlace": "Żnin",
            "community": "Żnin",
            "county": "żniński",
            "faith": "takie tam",
            "parish": "Szubin",
            "kinship": "matka",
            "other": "kowal"
          }
        ],
        "searchPeriodList": [
          {
            "from": "2019-05-06",
            "to": "2019-05-23"
          }
        ],
        "searchFactList": [
          {
            "value": "Mateusz Morawiecki mówił dziś o zbiorniku retencyjnMateusz Morawiecki mówił dziś o zbiorniku retencyjnMateusz Morawiecki mówił dziś o zbiorniku retencyjnMateusz Morawiecki mówił dziś o zbiorniku retencyjnMateusz Morawiecki mówił dziś o zbiorniku retencyjnMateusz Morawiecki mówił dziś o zbiorniku retencyjnym w Krakowie. Szybko zarzucono mu kłamstwo. Mateusz Morawiecki mówił dziś o zbiorniku retencyjnym w Krakowie. Szybko zarzucono mu kłamstwo. Mateusz Morawiecki mówił dziś o zbiorniku retencyjnym w Krakowie. Szybko zarzucono mu kłamstwo. Mateusz Morawiecki mówił dziś o zbiorniku retencyjnym w Krakowie. Szybko zarzucono mu kłamstwo. Mateusz Morawiecki mówił dziś o zbiorniku retencyjnym w Krakowie. Szybko zarzucono mu kłamstwo. Mateusz Morawiecki mówił dziś o zbiorniku retencyjnym w Krakowie. Szybko zarzucono mu kłamstwo."
          }
        ]
      }
    }
  }

  var json = {};
  
  doc.setFont('roboto');
  var t0 = performance.now();

  

  function displayOrder(){

    if(json.order === undefined) json.order = {};
    if(json.order.genealogicalResearch === undefined) json.order.genealogicalResearch = {};
    if(json.order.genealogicalResearch.searchedPersonList === undefined) json.order.genealogicalResearch.searchedPersonList = [];  
    if(json.order.genealogicalResearch.searchPeriodList === undefined) json.order.genealogicalResearch.searchPeriodList = []; 
    if(json.order.genealogicalResearch.searchFactList === undefined) json.order.genealogicalResearch.searchFactList = []; 

      var genealogicalResearch = json.order.genealogicalResearch;
      var searchPersonList = genealogicalResearch.searchedPersonList;
      var searchPeriodList = genealogicalResearch.searchPeriodList;
      var searchFactList = genealogicalResearch.searchFactList;
      
      for(e in searchPersonList){
        currentY = addPageIfContentToLong(currentY,40,doc);
        if(currentY == 0)
          currentY = margin;
        s = searchPersonList[e];
        createSubtitle("Poszukiwana osoba",margin,currentY,dFontSize*0.9,doc);
        currentY+=lineHeight;
        titleAndDetailDeprecated("Imię", s.firstName, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Nazwisko", s.lastName, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Imię ojca", s.fatherName, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Data urodzenia", getDateAndFormat(s.bornDate), lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Miejsce zamieszkania", s.residencePlace, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Gmina", s.community, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Powiat", s.county, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Wyznanie", s.faith, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Parafia", s.parish, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
        titleAndDetailDeprecated("Stopień pokrewieństwa", s.kinship, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        titleAndDetailDeprecated("Informacje dot. pochodzenia, zawodu etc.", s.other, lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
      }

      currentY+=lineHeight;

      for(e in searchPeriodList){
        currentY = addPageIfContentToLong(currentY,20,doc);
        s = searchPeriodList[e];
        createSubtitle("Okres poszukiwania",margin,currentY,dFontSize*0.9,doc);
        currentY+=lineHeight;
        titleAndDetailDeprecated("Daty graniczne", getDateAndFormat(s.from)+' - '+getDateAndFormat(s.to) , lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
        currentY+=lineHeight*2;
      }

      currentY+=lineHeight;

      for(e in searchFactList){
        
        s = searchFactList[e];

        lines = doc.splitTextToSize(s.value,sectionSpacing*4).length;

        currentY = addPageIfContentToLong(currentY,20,doc);
        
        y1 = currentY;
        createSubtitle("Zakres przedmiotowy poszukiwań",margin,currentY,dFontSize*0.9,doc);
        currentY+=lineHeight;
        currentY = titleAndDetailDeprecated("Fakty i zdarzenia, których mają dotyczyć poszukiwania", s.value, lineHeight, sectionSpacing*4,margin,currentY,tFontSize,iFontSize,doc,replacer);
        
        currentY+=lineHeight*2;
      }
      
  }

  

  generatePdfHeader("Wniosek o wykonanie kwerendy ID: ",json.userIdentifier,doc);
  currentY = margin*1.5;

  
  
  currentY = generateQueryHeader(json,doc,currentY,sectionSpacing);

  displayOrder();

  drawHorizontalBorder(margin,currentY,margin,doc);
  currentY+=lineHeight*2;
  

  generateHistoryTable(history,doc);



  var fetches = [];

  return Promise.all(fetches).then(() => {
    
    var t1 = performance.now();

    console.log("Finished in " + (t1 - t0) + " milliseconds.")
    return doc;
  });
}

pdf.autoVerificationReports = function(){
  doc = new jsPDF();
  var raport = {  
    "date":"2019-05-10T15:44:09.738",
    "results":[  
       {  
          "type":"CONTENT_LIST",
          "success":false,
          "description":"Spis zdawczo-odbiorczy - nie istnieje"
       }
    ],
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

  sectionSpacing = 45;
  margin = 15;
  lineHeight = 5;
  currentY = 0;

  tFontSize = 12;
  iFontSize = 14;

  doc.setFont('roboto');
    var t0 = performance.now();

  doc.setFontSize(14);
  createRectWithText("Raporty z automatycznej weryfikacji wniosku o przekazanie materiałów archiwalnych", margin/2,margin/2,195,12,doc, COLORS.BASIC);
  doc.setFontSize(12);

  currentY+=margin+lineHeight*5;

  titleAndDetailDeprecated("Data",getDateAndTime(raport.date), lineHeight,sectionSpacing*2,margin,currentY,tFontSize,iFontSize,doc);

  currentY+=lineHeight*3;
  titleAndDetailDeprecated("Weryfikator",raport.verifiedBy.firstName+' '+raport.verifiedBy.lastName,lineHeight,sectionSpacing*2,margin,currentY,tFontSize,iFontSize,doc);
  titleAndDetailDeprecated("Nazwa jednostki",raport.verifiedBy.unitName,lineHeight,sectionSpacing*2,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc);
  

  currentY+=lineHeight*4;

  doc.autoTable({
    startY: currentY,
    head: [
        ["Typ","Opis","Wynik"]
    ],
    margin: {left:margin/2},
    body: [[autoVerificationReportsTypeEnum[raport.results[0].type], raport.results[0].description , (raport.results[0].success) ? 'Powodzenie' : 'Niepowodzenie']],
    styles: {font: 'roboto',halign:'left'},
    headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC},
    columnStyles: {
      0: {cellWidth: 50},
      1: {cellWidth: 115},
      2: {cellWidth: 30}
    }
});

var fetches = [];
    return Promise.all(fetches).then(() => {
        // console.log(content); doc.setFontSize(25);


        // if(logs.content.length>0){
        //     // content.map((row) => {
        //     //     tableBody = verificationRaport1.errors;
        //     //     console.log(tableBody);
        //     //     colFields.map((field) => {
        //     //         tableBody.push(row[field]);
        //     //     });
        //     //     table.push(tableBody);
        //     // });
            
        //     //generateTable(EndingY);
        // }
        
        var t1 = performance.now();
        // console.log(doc.output('datauristring'));
        console.log("Finished in " + (t1 - t0) + " milliseconds.")
        return doc;
    });

}

pdf.orderDetails = function(){
  var details = {"id":297,"title":"nowe zlecenie","content":"tresc","relatedError":"1234","category":{"value":"Kategoria B"},"deadline":"2019-05-07","priority":{"label":"Średni","value":"MEDIUM"},"priorityString":"Średni","tasks":[{"id":358,"title":"czynność 1","status":"ORDERED","statusString":"Zlecona","attachments":[{"id":359,"referenceType":"S3","referenceTypeString":"S3","originalFileName":"nginix.png","fileName":"S3+eyJlcnJJZCI6MzU4LCJhdHRJZCI6MzU5LCJvcmlnaW5hbEZpbGVOYW1lIjoibmdpbml4LnBuZyJ9"},{"id":360,"referenceType":"S3","referenceTypeString":"S3","originalFileName":"VPN2.png","fileName":"S3+eyJlcnJJZCI6MzU4LCJhdHRJZCI6MzYwLCJvcmlnaW5hbEZpbGVOYW1lIjoiVlBOMi5wbmcifQ\u003d\u003d"}]},{"id":361,"title":"czynność dwa","status":"ORDERED","statusString":"Zlecona","attachments":[{"id":362,"referenceType":"S3","referenceTypeString":"S3","originalFileName":"Authentication external.png","fileName":"S3+eyJlcnJJZCI6MzYxLCJhdHRJZCI6MzYyLCJvcmlnaW5hbEZpbGVOYW1lIjoiQXV0aGVudGljYXRpb24gZXh0ZXJuYWwucG5nIn0\u003d"},{"id":363,"referenceType":"S3","referenceTypeString":"S3","originalFileName":"Authentication internal.png","fileName":"S3+eyJlcnJJZCI6MzYxLCJhdHRJZCI6MzYzLCJvcmlnaW5hbEZpbGVOYW1lIjoiQXV0aGVudGljYXRpb24gaW50ZXJuYWwucG5nIn0\u003d"}]}],"status":"TO_APPROVE","statusString":"Do aprobaty","orderedBy":{"id":2053,"firstName":"Mariusz","lastName":"Gmail2","login":"emailaddressmariuszklonowskigmailcomcnmariuszgmail2ouoddzialtestowyoar"},"totalTaskCount":2,"approvedTaskCount":0,"reports":[{"id":337,"workPeriodStart":"2019-05-07","workPeriodEnd":"2019-05-07","assignee":{"id":2606,"firstName":"maj_2","lastName":"test","login":"emailaddresstestersb4gmailcomcnmaj2testouoddzialtestowyoarchiwumtestow"},"reportStatus":"PENDING","reportStatusString":"Oczekujący","details":{"systemStatus":{"label":"Niestabilny","value":"UNSTABLE"},"actions":[{"id":338,"description":"1"}],"tests":[{"id":339,"description":"1"}]}}],"attachments":[{"id":356,"referenceType":"S3","referenceTypeString":"S3","originalFileName":"Export_import.docx","fileName":"S3+eyJlcnJJZCI6Mjk3LCJhdHRJZCI6MzU2LCJvcmlnaW5hbEZpbGVOYW1lIjoiRXhwb3J0X2ltcG9ydC5kb2N4In0\u003d"},{"id":357,"referenceType":"S3","referenceTypeString":"S3","originalFileName":"VPN.png","fileName":"S3+eyJlcnJJZCI6Mjk3LCJhdHRJZCI6MzU3LCJvcmlnaW5hbEZpbGVOYW1lIjoiVlBOLnBuZyJ9"}]};
  var lineHeight = 6;
  var margin = 15;
  var EndingY = 10;
  var sectionSpacing = 56;
  var titleSize = 14;
  var infoSize = 16;
  var pageHeight = 210;
  var workHistory = {
      "content":[
         {
            "id":693,
            "createDate":"2019-05-09T14:48:57",
            "userId":2052,
            "userLogin":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto",
            "userFirstName":"Mariusz",
            "userLastName":"Global",
            "userSystem":"System dla pracownika NDAP",
            "referenceType":"WORK_ORDER",
            "referenceId":297,
            "referenceStatus":"",
            "details":"",
            "eventTypeText":"Aktualizacja zlecenia"
         },
         {
            "id":692,
            "createDate":"2019-05-09T14:48:00",
            "userId":2052,
            "userLogin":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto",
            "userFirstName":"Mariusz",
            "userLastName":"Global",
            "userSystem":"System dla pracownika NDAP",
            "referenceType":"WORK_ORDER",
            "referenceId":297,
            "referenceStatus":"",
            "details":"",
            "eventTypeText":"Aktualizacja zlecenia"
         },
         {
            "id":690,
            "createDate":"2019-05-09T13:48:58",
            "userId":2052,
            "userLogin":"emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto",
            "userFirstName":"Mariusz",
            "userLastName":"Global",
            "userSystem":"System dla pracownika NDAP",
            "referenceType":"WORK_ORDER",
            "referenceId":297,
            "referenceStatus":"",
            "details":"",
            "eventTypeText":"Aktualizacja zlecenia"
         },
         {
            "id":669,
            "createDate":"2019-05-07T12:34:38",
            "userId":2606,
            "userLogin":"emailaddresstestersb4gmailcomcnmaj2testouoddzialtestowyoarchiwumtestow",
            "userFirstName":"maj_2",
            "userLastName":"test",
            "userSystem":"System dla pracownika NDAP",
            "referenceType":"WORK_ORDER",
            "referenceId":297,
            "referenceStatus":"",
            "eventType":"ORDER_REPORT_CREATE",
            "details":"",
            "eventTypeText":"Wprowadzenie danych raportu"
         },
         {
            "id":668,
            "createDate":"2019-05-07T12:34:22",
            "userId":2606,
            "userLogin":"emailaddresstestersb4gmailcomcnmaj2testouoddzialtestowyoarchiwumtestow",
            "userFirstName":"maj_2",
            "userLastName":"test",
            "userSystem":"System dla pracownika NDAP",
            "referenceType":"WORK_ORDER",
            "referenceId":297,
            "referenceStatus":"",
            "details":"",
            "eventTypeText":"Podjęcie zlecenia"
         },
         {
            "id":607,
            "createDate":"2019-05-07T06:45:17",
            "userId":2053,
            "userLogin":"emailaddressmariuszklonowskigmailcomcnmariuszgmail2ouoddzialtestowyoar",
            "userFirstName":"Mariusz",
            "userLastName":"Gmail2",
            "userSystem":"System dla pracownika NDAP",
            "referenceType":"WORK_ORDER",
            "referenceId":297,
            "referenceStatus":"",
            "eventType":"ORDER_CREATE",
            "details":"",
            "eventTypeText":"Dodanie zlecenia"
         }
      ],
      "totalElements":6
   };
  var raports = {
      "id": 39,
      "title": "Aktualizacja danych",
      "content": "Zaktualizowanie danych na kontach użytkowników Archiwum Państwowego w Gdyni - inny adres",
      "relatedError": "",
      "category": {
        "value": "Kategoria C"
      },
      "deadline": "2019-04-30",
      "priority": {
        "label": "Średni",
        "value": "MEDIUM"
      },
      "priorityString": "Średni",
      "tasks": [
        {
          "id": 72,
          "title": "Aktualizacja adresu dla pięciu użytkowników",
          "status": "DONE",
          "statusString": "Wykonana",
          "attachments": []
        }
      ],
      "status": "TO_APPROVE",
      "statusString": "Do aprobaty",
      "orderedBy": {
        "id": 2053,
        "firstName": "Mariusz",
        "lastName": "Gmail2",
        "login": "emailaddressmariuszklonowskigmailcomcnmariuszgmail2ouoddzialtestowyoar"
      },
      "totalTaskCount": 1,
      "approvedTaskCount": 0,
      "reports": [
        {
          "id": 343,
          "workPeriodStart": "2019-05-09",
          "workPeriodEnd": "2019-05-09",
          "assignee": {
            "id": 2052,
            "firstName": "Mariusz",
            "lastName": "Global",
            "login": "emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
          },
          "reportStatus": "REJECTED",
          "reportStatusString": "Odrzucony",
          "details": {
            "systemStatus": {
              "label": "Stabilny",
              "value": "STABLE"
            },
            "actions": [
              {
                "id": 344,
                "description": "fdsa",
                "infrastructureElement": "STATISTICS",
                "infrastructureElementString": "Generowanie statystyk"
              },
              {
                "id": 345,
                "description": "22",
                "infrastructureElement": "APPLICATIONS",
                "infrastructureElementString": "Wnioski"
              },
              {
                  "id": 344,
                  "description": "fdsa",
                  "infrastructureElement": "STATISTICS",
                  "infrastructureElementString": "Generowanie statystyk"
                },
                {
                  "id": 345,
                  "description": "22",
                  "infrastructureElement": "APPLICATIONS",
                  "infrastructureElementString": "Wnioski"
                },
                {
                  "id": 344,
                  "description": "fdsa",
                  "infrastructureElement": "STATISTICS",
                  "infrastructureElementString": "Generowanie statystyk"
                },
                {
                  "id": 345,
                  "description": "22",
                  "infrastructureElement": "APPLICATIONS",
                  "infrastructureElementString": "Wnioski"
                },
                {
                  "id": 344,
                  "description": "fdsa",
                  "infrastructureElement": "STATISTICS",
                  "infrastructureElementString": "Generowanie statystyk"
                },
                {
                  "id": 345,
                  "description": "22",
                  "infrastructureElement": "APPLICATIONS",
                  "infrastructureElementString": "Wnioski"
                },
                {
                  "id": 344,
                  "description": "fdsa",
                  "infrastructureElement": "STATISTICS",
                  "infrastructureElementString": "Generowanie statystyk"
                },
                {
                  "id": 345,
                  "description": "22",
                  "infrastructureElement": "APPLICATIONS",
                  "infrastructureElementString": "Wnioski"
                },
                {
                  "id": 344,
                  "description": "fdsa",
                  "infrastructureElement": "STATISTICS",
                  "infrastructureElementString": "Generowanie statystyk"
                },
                {
                  "id": 345,
                  "description": "22",
                  "infrastructureElement": "APPLICATIONS",
                  "infrastructureElementString": "Wnioski"
                },
                {
                  "id": 344,
                  "description": "fdsa",
                  "infrastructureElement": "STATISTICS",
                  "infrastructureElementString": "Generowanie statystyk"
                },
                {
                  "id": 345,
                  "description": "22",
                  "infrastructureElement": "APPLICATIONS",
                  "infrastructureElementString": "Wnioski"
                }
            ],
            "tests": [
              {
                "id": 346,
                "description": "fdsa",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              },
              {
                "id": 347,
                "description": "test",
                "testResult": "NEGATIVE",
                "testResultString": "Negatywny"
              },
              {
                  "id": 346,
                  "description": "fdsa",
                  "testResult": "POSITIVE",
                  "testResultString": "Pozytywny"
                },
                {
                  "id": 347,
                  "description": "test",
                  "testResult": "NEGATIVE",
                  "testResultString": "Negatywny"
                },
                {
                  "id": 346,
                  "description": "fdsa",
                  "testResult": "POSITIVE",
                  "testResultString": "Pozytywny"
                },
                {
                  "id": 347,
                  "description": "test",
                  "testResult": "NEGATIVE",
                  "testResultString": "Negatywny"
                },
                {
                  "id": 346,
                  "description": "fdsa",
                  "testResult": "POSITIVE",
                  "testResultString": "Pozytywny"
                },
                {
                  "id": 347,
                  "description": "test",
                  "testResult": "NEGATIVE",
                  "testResultString": "Negatywny"
                },{
                  "id": 346,
                  "description": "fdsa",
                  "testResult": "POSITIVE",
                  "testResultString": "Pozytywny"
                },
                {
                  "id": 347,
                  "description": "test",
                  "testResult": "NEGATIVE",
                  "testResultString": "Negatywny"
                },{
                  "id": 346,
                  "description": "fdsa",
                  "testResult": "POSITIVE",
                  "testResultString": "Pozytywny"
                },
                {
                  "id": 347,
                  "description": "test",
                  "testResult": "NEGATIVE",
                  "testResultString": "Negatywny"
                }
            ]
          }
        },
        {
          "id": 348,
          "workPeriodStart": "2019-05-09",
          "workPeriodEnd": "2019-05-23",
          "assignee": {
            "id": 2052,
            "firstName": "Mariusz",
            "lastName": "Global",
            "login": "emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
          },
          "reportStatus": "PENDING",
          "reportStatusString": "Oczekujący",
          "details": {
            "systemStatus": {
              "label": "Niestabilny",
              "value": "UNSTABLE"
            },
            "actions": [
              {
                "id": 349,
                "description": "fdas",
                "infrastructureElement": "APPLICATIONS",
                "infrastructureElementString": "Wnioski"
              },
              {
                "id": 350,
                "description": "fdsagf",
                "infrastructureElement": "PACKAGES",
                "infrastructureElementString": "Paczka archiwalna"
              },
              {
                "id": 351,
                "description": "fdsa",
                "infrastructureElement": "STATISTICS",
                "infrastructureElementString": "Generowanie statystyk"
              }
            ],
            "tests": [
              {
                "id": 352,
                "description": "1dfsa",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              },
              {
                "id": 353,
                "description": "222",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              }
            ]
          }
        },
        {
          "id": 348,
          "workPeriodStart": "2019-05-09",
          "workPeriodEnd": "2019-05-23",
          "assignee": {
            "id": 2052,
            "firstName": "Mariusz",
            "lastName": "Global",
            "login": "emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
          },
          "reportStatus": "PENDING",
          "reportStatusString": "Oczekujący",
          "details": {
            "systemStatus": {
              "label": "Niestabilny",
              "value": "UNSTABLE"
            },
            "actions": [
              {
                "id": 349,
                "description": "fdas",
                "infrastructureElement": "APPLICATIONS",
                "infrastructureElementString": "Wnioski"
              },
              {
                "id": 350,
                "description": "fdsagf",
                "infrastructureElement": "PACKAGES",
                "infrastructureElementString": "Paczka archiwalna"
              },
              {
                "id": 351,
                "description": "fdsa",
                "infrastructureElement": "STATISTICS",
                "infrastructureElementString": "Generowanie statystyk"
              }
            ],
            "tests": [
              {
                "id": 352,
                "description": "1dfsa",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              },
              {
                "id": 353,
                "description": "222",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              }
            ]
          }
        },
        {
          "id": 348,
          "workPeriodStart": "2019-05-09",
          "workPeriodEnd": "2019-05-23",
          "assignee": {
            "id": 2052,
            "firstName": "Mariusz",
            "lastName": "Global",
            "login": "emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
          },
          "reportStatus": "PENDING",
          "reportStatusString": "Oczekujący",
          "details": {
            "systemStatus": {
              "label": "Niestabilny",
              "value": "UNSTABLE"
            },
            "actions": [
              {
                "id": 349,
                "description": "fdas",
                "infrastructureElement": "APPLICATIONS",
                "infrastructureElementString": "Wnioski"
              },
              {
                "id": 350,
                "description": "fdsagf",
                "infrastructureElement": "PACKAGES",
                "infrastructureElementString": "Paczka archiwalna"
              },
              {
                "id": 351,
                "description": "fdsa",
                "infrastructureElement": "STATISTICS",
                "infrastructureElementString": "Generowanie statystyk"
              }
            ],
            "tests": [
              {
                "id": 352,
                "description": "1dfsa",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              },
              {
                "id": 353,
                "description": "222",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              }
            ]
          }
        },
        {
          "id": 348,
          "workPeriodStart": "2019-05-09",
          "workPeriodEnd": "2019-05-23",
          "assignee": {
            "id": 2052,
            "firstName": "Mariusz",
            "lastName": "Global",
            "login": "emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
          },
          "reportStatus": "PENDING",
          "reportStatusString": "Oczekujący",
          "details": {
            "systemStatus": {
              "label": "Niestabilny",
              "value": "UNSTABLE"
            },
            "actions": [
              {
                "id": 349,
                "description": "fdas",
                "infrastructureElement": "APPLICATIONS",
                "infrastructureElementString": "Wnioski"
              },
              {
                "id": 350,
                "description": "fdsagf",
                "infrastructureElement": "PACKAGES",
                "infrastructureElementString": "Paczka archiwalna"
              },
              {
                "id": 351,
                "description": "fdsa",
                "infrastructureElement": "STATISTICS",
                "infrastructureElementString": "Generowanie statystyk"
              }
            ],
            "tests": [
              {
                "id": 352,
                "description": "1dfsa",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              },
              {
                "id": 353,
                "description": "222",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              }
            ]
          }
        },
        {
          "id": 348,
          "workPeriodStart": "2019-05-09",
          "workPeriodEnd": "2019-05-23",
          "assignee": {
            "id": 2052,
            "firstName": "Mariusz",
            "lastName": "Global",
            "login": "emailaddressmariuszklonowskiprimigeniusplcnmariuszglobalouoddzialtesto"
          },
          "reportStatus": "PENDING",
          "reportStatusString": "Oczekujący",
          "details": {
            "systemStatus": {
              "label": "Niestabilny",
              "value": "UNSTABLE"
            },
            "actions": [
              {
                "id": 349,
                "description": "fdas",
                "infrastructureElement": "APPLICATIONS",
                "infrastructureElementString": "Wnioski"
              },
              {
                "id": 350,
                "description": "fdsagf",
                "infrastructureElement": "PACKAGES",
                "infrastructureElementString": "Paczka archiwalna"
              },
              {
                "id": 351,
                "description": "fdsa",
                "infrastructureElement": "STATISTICS",
                "infrastructureElementString": "Generowanie statystyk"
              }
            ],
            "tests": [
              {
                "id": 352,
                "description": "1dfsa",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              },
              {
                "id": 353,
                "description": "222",
                "testResult": "POSITIVE",
                "testResultString": "Pozytywny"
              }
            ]
          }
        }
      ],
      "attachments": []
    };

  var orderDetails = ["Treść zlecenia","Załączniki"];
  var actionHeaders = ["Nazwa czynności", "Status", "Załączniki"];
  var workHistoryHeaders = ["Data modyfikacji","Autor zmiany","Operacja","Status","Komentarz"];

  function tasksToArray(){
      let arr = new Array();
      let content = details.tasks;
      let contentLength = content.length;
      
      for(var i=0; i < contentLength ; i++){
          let con = content[i];
          arr.push([con.title, con.statusString, attachmentsToString(con.attachments) ]);
      }
      return arr;
  }
  
  function attachmentsToString(attachments, doc){
      let arr = new Array();
      let content =  attachments;
      let contentLength = content.length;
      
      for(var i=0; i < contentLength ; i++){
          let con = content[i];
          arr.push([con.originalFileName]);
      }
      
      return arr.join('\n');
      
  }

  function historyToArray(){
      let arr = new Array();
      let content = workHistory.content;
      let contentLength = content.length;
      
      for(var i=0; i < contentLength ; i++){
          let con = content[i];
          arr.push([getDateAndTime(con.createDate), con.userFirstName+' '+con.userLastName, con.eventTypeText ]);
      }
      return arr;
  }

  function actionsToArray(reportIndex){
      let arr = new Array();
      let content = raports.reports[reportIndex].details.actions;
      let contentLength = content.length;
      
      for(var i=0; i < contentLength ; i++){
          let con = content[i];
          arr.push([con.description,con.infrastructureElementString ]);
      }
      return arr;
  }

  function testsToArray(reportIndex){
      let arr = new Array();
      let content = raports.reports[reportIndex].details.tests;
      let contentLength = content.length;
      
      for(var i=0; i < contentLength ; i++){
          let con = content[i];
          arr.push([con.description,con.testResultString ]);
      }
      return arr;
  }

  
  function createWorkingRaports(reports,x,y, doc){

  length = reports.length;

  var taskHeaders = ["Wykonana czynność","Element infrastruktury"];
  var testsHeaders = ["Opis testu","Wynik testu"];

  for(var i=0; i<length; i++){


      r = reports[i];

      y = addPageIfContentToLong(y,titleSize+infoSize,doc);

      y+=lineHeight*3;

      titleAndDetailDeprecated("Osoba odpowiedzialna",r.assignee.firstName+' '+r.assignee.lastName, lineHeight, sectionSpacing, x, y, titleSize, infoSize, doc);
      titleAndDetailDeprecated("Stan systemu po wdrożeniu zmiany",r.details.systemStatus.label, lineHeight, sectionSpacing, x+sectionSpacing, y, titleSize, infoSize, doc);
      titleAndDetailDeprecated("Termin przeprowadzenia prac",r.workPeriodStart+' - '+r.workPeriodEnd, lineHeight, sectionSpacing*1.5, x+sectionSpacing*3, y, titleSize, infoSize, doc);

      
      y = addPageIfContentToLong(y,65,doc);

      y+=lineHeight*4;
      doc.text("Wykonane czynności", margin, y+lineHeight);
      doc.text("Testy", margin*2+sectionSpacing*2, y+lineHeight);

      y+=lineHeight*2;

      page =  doc.internal.getCurrentPageInfo().pageNumber;

      doc.autoTable({
          startY: y,
          head: [
              taskHeaders
          ],
          tableWidth: sectionSpacing*2,
          margin: {left:margin},
          body: actionsToArray(i),
          styles: {font: 'roboto',halign:'left'},
          columnStyles: {
              0: {cellWidth: sectionSpacing},
              1: {cellWidth: sectionSpacing}
            },
          headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC},
      });

      table1Y = doc.autoTable.previous.finalY;

      if(page != doc.internal.getCurrentPageInfo().pageNumber)
          doc.setPage(page);

      doc.autoTable({
          startY: y,
          head: [
              testsHeaders
          ],
          tableWidth: sectionSpacing*2,
          margin: {left:margin*2+sectionSpacing*2},
          body: testsToArray(i),
          styles: {font: 'roboto'},
          columnStyles: {
              0: {cellWidth: sectionSpacing},
              1: {cellWidth: sectionSpacing}
            },
          headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC},
      });

      table2Y = doc.autoTable.previous.finalY;

      y=Math.max(table1Y,table2Y);

      y+=lineHeight*4;
      drawHorizontalBorder(margin,y,margin,doc);

  }
  
}

  var doc = new jsPDF({
      orientation: 'landscape'
  });
  doc.setFont('roboto');
  var t0 = performance.now();

  doc.setFontSize(20);
  createRectWithText( "Szczegóły zlecenia ID: "+details.id, 10, 10, 90,16,doc);
  doc.setFontSize(12);

  EndingY+=lineHeight*3;

  titleAndDetailDeprecated("Tytuł zlecenia", details.title,lineHeight, 50, margin,EndingY+=lineHeight*2, titleSize ,infoSize, doc);
  titleAndDetailDeprecated("Priorytet",details.title,lineHeight, 50, margin+sectionSpacing*2,EndingY, titleSize, infoSize, doc);
  titleAndDetailDeprecated("Kategoria zlecenia",details.title,lineHeight, 50, margin+sectionSpacing*3,EndingY, titleSize, infoSize, doc);

  titleAndDetailDeprecated("Status",details.statusString , lineHeight, 50, margin,EndingY+=lineHeight*3, titleSize, infoSize, doc);
  titleAndDetailDeprecated("Priorytet",details.priorityString , lineHeight, 50, margin+sectionSpacing,EndingY, titleSize, infoSize, doc);
  titleAndDetailDeprecated("Termin wykonania", getDateAndTime(details.deadline) , lineHeight, 50, margin+sectionSpacing*2,EndingY, titleSize, infoSize, doc);
  titleAndDetailDeprecated("Powiązany błąd, zgłoszony przez użytkownika", checkExistValue(details.relatedError), lineHeight, 50, margin+sectionSpacing*3,EndingY, titleSize, infoSize, doc);

  titleAndDetailDeprecated("Zlecone przez", details.orderedBy.firstName+' '+details.orderedBy.lastName , lineHeight, 50, margin,EndingY+=lineHeight*3, titleSize, infoSize, doc);

  createRectWithText( "Szczegóły zlecenia", 10, EndingY+=lineHeight*3, 70,12,doc,COLORS.DARK_GRAY);
  EndingY+=lineHeight/2;

  doc.autoTable({
      startY: EndingY+=12,
      head: [
          orderDetails
      ],
      margin: {left:margin},
      body: [[details.content, attachmentsToString(details.attachments, doc)]],
      styles: {font: 'roboto',halign:'left'},
      headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC}
  });

  EndingY = doc.autoTable.previous.finalY;

  createRectWithText( "Czynności", 10, EndingY+=lineHeight*3, 70,12,doc,COLORS.DARK_GRAY);
  EndingY+=lineHeight/2;

  doc.autoTable({
      startY: EndingY+=12,
      head: [
          actionHeaders
      ],
      margin: {left:margin},
      body: tasksToArray(),
      styles: {font: 'roboto',halign:'left'},
      headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC}
  });

  EndingY = doc.autoTable.previous.finalY;

  createRectWithText( "Historia prac", 10, EndingY+=lineHeight*3, 70,12,doc,COLORS.DARK_GRAY);
  EndingY+=lineHeight/2;

  doc.autoTable({
      startY: EndingY+=12,
      head: [
          workHistoryHeaders
      ],
      margin: {left:margin},
      body: historyToArray(),
      styles: {font: 'roboto',halign:'left'},
      headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC}
  });

  EndingY = doc.autoTable.previous.finalY;

  createRectWithText( "Raport z wykonanych prac", 10, EndingY+=lineHeight*3, 70,12,doc,COLORS.DARK_GRAY);

  EndingY+=lineHeight/2;

  EndingY+=12;

  createWorkingRaports(raports.reports,margin,EndingY,doc);

  doc.text("footer",margin,EndingY*4);

  var fetches = [];

  return Promise.all(fetches).then(() => {
      
      var t1 = performance.now();
      console.log("Finished in " + (t1 - t0) + " milliseconds.")
      return doc;
  });
}

pdf.logsList = function () {
    //lista
    var lineHeight = 5;
    margin = 15;
    var EndingY = 0;
    var doc = new jsPDF();
    doc.setFont('roboto');
    
    var t0 = performance.now();

    var colHeaders = ['ID', 'Data aktywności','Użytkownik','Akcja','System'];

    var logs = {
        "content": [{
            "id": 19,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka_3.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 18,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku correctCheckSumForPaczka_5_tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 17,
            "createDate": "2019-05-07T09:42:16",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Stworzenie paczki archiwalnej do wniosku",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 16,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 15,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 14,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka_3.tar.xades do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 13,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku correctCheckSumForPaczka_5_tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 12,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Stworzenie paczki archiwalnej do wniosku",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 11,
            "createDate": "2019-05-06T10:46:43",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "status": "Wniosek utworzony"
            },
            "details": "",
            "eventTypeText": "Złożenie wniosku"
        }, {
            "id": 10,
            "createDate": "2019-03-14T15:33:12",
            "user": {
                "id": 1,
                "login": "jan@kowalski.pl",
                "firstName": "Jan",
                "lastName": "Kowalski",
                "system": "NDAP",
                "label": "Jan Kowalski"
            },
            "reference": {
                "type": "DICTIONARY",
                "id": 120,
                "status": "C"
            },
            "eventType": "ORDER_ADD_ACTIVITY",
            "details": "zlecenie zostalo zmienione- supcio!",
            "eventTypeText": "Dodanie czynności do zlecenia ID: 120"
        },{
            "id": 19,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka_3.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 18,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku correctCheckSumForPaczka_5_tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 17,
            "createDate": "2019-05-07T09:42:16",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Stworzenie paczki archiwalnej do wniosku",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 16,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 15,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 14,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka_3.tar.xades do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 13,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku correctCheckSumForPaczka_5_tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 12,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Stworzenie paczki archiwalnej do wniosku",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 11,
            "createDate": "2019-05-06T10:46:43",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "status": "Wniosek utworzony"
            },
            "details": "",
            "eventTypeText": "Złożenie wniosku"
        }, {
            "id": 10,
            "createDate": "2019-03-14T15:33:12",
            "user": {
                "id": 1,
                "login": "jan@kowalski.pl",
                "firstName": "Jan",
                "lastName": "Kowalski",
                "system": "NDAP",
                "label": "Jan Kowalski"
            },
            "reference": {
                "type": "DICTIONARY",
                "id": 120,
                "status": "C"
            },
            "eventType": "ORDER_ADD_ACTIVITY",
            "details": "zlecenie zostalo zmienione- supcio!",
            "eventTypeText": "Dodanie czynności do zlecenia ID: 120"
        },
        {
            "id": 19,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka_3.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 18,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku correctCheckSumForPaczka_5_tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 17,
            "createDate": "2019-05-07T09:42:16",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Stworzenie paczki archiwalnej do wniosku",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 16,
            "createDate": "2019-05-07T09:42:17",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 94,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 94"
        }, {
            "id": 15,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka.tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 14,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku paczka_3.tar.xades do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 13,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Dodanie pliku correctCheckSumForPaczka_5_tar do paczki archiwalnej",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 12,
            "createDate": "2019-05-06T11:03:49",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "id": 92,
                "status": ""
            },
            "eventType": "ARCH_PACKAGE_INCLUDE",
            "details": "Stworzenie paczki archiwalnej do wniosku",
            "eventTypeText": "Włączenie paczki archiwalnej / materiałów archiwalnych ID: 92"
        }, {
            "id": 11,
            "createDate": "2019-05-06T10:46:43",
            "user": {
                "id": 1003,
                "login": "ptestowy1@adres.pl",
                "firstName": "Paweł",
                "lastName": "Testowy",
                "system": "NDAP",
                "label": "Paweł Testowy"
            },
            "reference": {
                "status": "Wniosek utworzony"
            },
            "details": "",
            "eventTypeText": "Złożenie wniosku"
        }, {
            "id": 10,
            "createDate": "2019-03-14T15:33:12",
            "user": {
                "id": 1,
                "login": "jan@kowalski.pl",
                "firstName": "Jan",
                "lastName": "Kowalski",
                "system": "NDAP",
                "label": "Jan Kowalski"
            },
            "reference": {
                "type": "DICTIONARY",
                "id": 120,
                "status": "C"
            },
            "eventType": "ORDER_ADD_ACTIVITY",
            "details": "zlecenie zostalo zmienione- supcio!",
            "eventTypeText": "Dodanie czynności do zlecenia ID: 120"
        },
    ],
        "totalElements": 19
    }

    function generateTable(y){
        doc.autoTable({
            startY: EndingY,
            head: [
                colHeaders
            ],
            body: logsToArray(),
            styles: {font: 'roboto',halign:'left'},
            headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC}
        });
    }
    
    function logsToArray(){
        let arr = new Array();
        let content = logs.content;
        let contentLength = content.length;
        
        for(var i=0; i < contentLength ; i++){
            let con = content[i];
            arr.push([con.id,getDateAndTime(con.createDate), con.user.firstName+" "+con.user.lastName,con.eventTypeText,con.user.system]);
        }
        return arr;
    }

    doc.setFontSize(20);
    createRectWithText("Lista logów", 10, EndingY+=10, 100,16,doc);
    doc.setFontSize(12);

    EndingY+=lineHeight*5;

    doc.text("Liczba: "+logs.totalElements,margin, EndingY)
    EndingY+= lineHeight*2;
    
    content = [];

    var fetches = [];

    // for(index = 0; index < 500; index++){
    //     fetches.push(
    //         fetch('http://10.0.1.117:81/table')
    //             .then(function(response) {
    //                 return response.json();
    //             })
    //             .then(function(myJson) {
    //                 content = content.concat(myJson);
    //             })
    //     );
    // }


    return Promise.all(fetches).then(() => {
        // console.log(content); doc.setFontSize(25);


        if(logs.content.length>0){
            content.map((row) => {
                tableBody = verificationRaport1.errors;
                console.log(tableBody);
                colFields.map((field) => {
                    tableBody.push(row[field]);
                });
                table.push(tableBody);
            });
            
            generateTable(EndingY);
        }
        
        var t1 = performance.now();
        // console.log(doc.output('datauristring'));
        console.log("Finished in " + (t1 - t0) + " milliseconds.")
        return doc;
    });
};

pdf.autoverificatbasicion = function () {
    //Weryfikacja
    var lineHeight = 5;
    margin = 15;
    var EndingY = 0;
    var doc = new jsPDF();
    doc.setFont('roboto');
    
    var t0 = performance.now();

    var colFields = ['id', 'errorMsg'];
    var colHeaders = ['Id', 'Opis błędu'];

    var verificationRaport1 = {
        "id": 2452,
        "validationType": "CHECKSUM_VALIDATION",
        "success": false,
        "errors": [
          {
            "id": 2452,
            "errorMsg": "Skrót z pliku nie zgadzą się z obliczonym skrótem dla paczki archiwalnej."
          }
        ]
      }

    var verificationRaport = {
            "id": 2453,
            "validationType": "CHECKSUM_VALIDATION",
            "success": true,
            "errors": []
     }



    function displayLongString(string, x, y, lineLength){
        var words = doc.splitTextToSize(string, lineLength);  
        for(var i=0;i<words.length; i++){
            doc.text(words[i], x, y);
            y+=lineHeight;
        }
        return y;
     }

    function generateTable(y){
        doc.autoTable({
            startY: y,
            head: [
                colHeaders
            ],
            body: errorsToArray(),
            styles: {font: 'roboto',halign:'left'},
            headStyles: {fontStyle: 'roboto',fillColor: COLORS.BASIC}
        });
    }
    
    function errorsToArray(){
        let arr = new Array();
        let content = verificationRaport1.errors;
        let contentLength = content.length;
        
        for(var i=0; i < contentLength ; i++){
            let con = content[i];
            arr.push([con.id,con.errorMsg]);
        }
        return arr;
    }

    function titleAndDetailDeprecated(title, detail, lineHeight, x, y, tFontSize, dFontSize){
        doc.setFontSize(tFontSize);
        doc.text(title, x, y);
        doc.setFontSize(dFontSize);
        return displayLongString(detail, x, y+lineHeight);
    }

    doc.setFontSize(20);
    createRectWithText( "Raport z autoweryfikacji: "+verificationRaport1.id, 10, EndingY+=10, 100,16,doc);
    doc.setFontSize(12);
    
    EndingY+= lineHeight*6;

    titleAndDetailDeprecated("Typ walidacji",verificationRaport1.validationType , lineHeight , margin, EndingY,16,10);
    
    EndingY = titleAndDetailDeprecated("Status", (verificationRaport1.success ? 'Poprawny' : 'Niepoprawny') , lineHeight , margin+60, EndingY,16,10);
    
    content = [];

    var fetches = [];

    // for(index = 0; index < 500; index++){
    //     fetches.push(
    //         fetch('http://10.0.1.117:81/table')
    //             .then(function(response) {
    //                 return response.json();
    //             })
    //             .then(function(myJson) {
    //                 content = content.concat(myJson);
    //             })
    //     );
    // }


    return Promise.all(fetches).then(() => {
        // console.log(content); doc.setFontSize(25);


        if(verificationRaport1.errors.length>0){
            content.map((row) => {
                tableBody = verificationRaport1.errors;
                console.log(tableBody);
                colFields.map((field) => {
                    tableBody.push(row[field]);
                });
                table.push(tableBody);
            });
            
            generateTable(EndingY);
        }
        
        var t1 = performance.now();
        // console.log(doc.output('datauristring'));
        console.log("Finished in " + (t1 - t0) + " milliseconds.")
        return doc;
    });
};

pdf.error = function () {

    var lineHeight = 5;
    var raportEndingY;
    var doc = new jsPDF();
    doc.setFont('roboto');
    
    var t0 = performance.now();

    var colFields = ['createDate', 'userFirstName', 'eventTypeText'];
    var colHeaders = ['Data modyfikacji', 'Nazwa użytkownika', 'Opis zdarzenia'];

    var error = {
    	"id": 139,
    	"title": "Strona sie źle wyswietla na moim telefonie",
    	"content": "No Użytkownik comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. ",
    	"category": "Ogólne",
    	"subcategory": "Podkategoria-Ogólne-1",
    	"createdDate": "2019-04-15T11:42:37.591",
    	"createdBy": {
    		"id": 2000,
    		"firstName": "Admin",
    		"lastName": "Globalny",
    		"login": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt"
    	},
    	"status": "REDIRECTED",
    	"statusLabel": "Przekazane",
    	"attachments": [{
    			"id": 140,
    			"fileName": "S3+eyJlcnJJZCI6MTM5LCJhdHRJZCI6MTQwLCJvcmlnaW5hbEZpbGVOYW1lIjoiZG9ja2VyUmVhZE1lLnR4dCJ9",
    			"originalFileName": "dockerReadMe.txt"
    		},
    		{
    			"id": 141,
    			"fileName": "S3+eyJlcnJJZCI6MTM5LCJhdHRJZCI6MTQxLCJvcmlnaW5hbEZpbGVOYW1lIjoiY29yZS5sb2ctMTgxMzE0NS50eHQifQ==",
    			"originalFileName": "core.log-1813145.txt"
    		}
    	],
    	"assignedToCurrentUser": false,
    	"createdByCurrentUser": true
    }
    
    var reportData = {
        generatedBy: "Jan Kowalski",
        dateFrom: "01-01-2019",
        dateTo: "10-01-2019",
        date: "15-01-2019",
    }

    function displayLongString(string, x, y, lineLength){
        var words = doc.splitTextToSize(string, lineLength);  
        for(var i=0;i<words.length; i++){
            doc.text(words[i], x, y);
            y+=lineHeight;
        }
        return y;
     }

    function generateTable(y){
        doc.autoTable({
            startY: y,
            head: [
                colHeaders
            ],
            body: table,
            styles: {font: 'roboto'},
            headStyles: {fontStyle: 'roboto'}
        });

        //doc.table(15, y, table, colHeaders);
    }
    
    doc.text('Raport z bledu: ' + error.id, 105, lineHeight*5, null, null, 'center');
    doc.setFontSize(8);
    doc.text('Kategoria: ' + error.category, 15, lineHeight*8);
    doc.text('Podategoria: ' + error.subcategory, 15, lineHeight*9);
    doc.text('Kto zglosil: ' + error.createdBy.firstName + ' ' + error.createdBy.lastName, 15, lineHeight*10);
    doc.text('Status bledu: ' + error.statusLabel, 15, 55);
    doc.text('Kto zglosil: ' + error.createdBy.firstName + ' ' + error.createdBy.lastName, 15, lineHeight*12);
    doc.text('Tytuł bledu: ' + error.title, 105, lineHeight*14, {align: 'center'});
    raportEndingY = displayLongString('Opis bledu: ' + error.content, 15, lineHeight*16, 150, raportEndingY);
    
    doc.text('Wygenerowany przez: ' + reportData.generatedBy , 195, lineHeight*8, null, null, 'right');
    doc.text('Data wygenerowania: ' + reportData.date , 195, lineHeight*9, null, null, 'right');
    doc.text('Przypisane do: ' + (reportData.assignee ? reportData.assignee.firstName + reportData.assignee.lastName : 'nieprzypisany') , 195, lineHeight*12, null, null, 'right');
    
    
    content = [];

    var fetches = [];

    // for(index = 0; index < 500; index++){
    //     fetches.push(
    //         fetch('http://10.0.1.117:81/table')
    //             .then(function(response) {
    //                 return response.json();
    //             })
    //             .then(function(myJson) {
    //                 content = content.concat(myJson);
    //             })
    //     );
    // }

    table = [["k","k","k"],["k","k","k"]];

    return Promise.all(fetches).then(() => {
        // console.log(content); doc.setFontSize(25);
        content.map((row) => {
            tableBody = [];
            colFields.map((field) => {
                tableBody.push(row[field]);
            });
            table.push(tableBody);
        });
        generateTable(raportEndingY);
        var t1 = performance.now();
        // console.log(doc.output('datauristring'));
        console.log("Finished in " + (t1 - t0) + " milliseconds.")
        return doc;
    });
};

pdf.errorDetails = function () {
    var tFontSize = 15;
    var dFontSize = 12;
    var sectionSpacing = 60;
    var lineHeight = 5;
    var margin = 15;
    var EndingY = 0;
    var doc = new jsPDF({
        orientation: 'landscape'
    });
    doc.setFont('roboto');
    
    var t0 = performance.now();

    var history = {
        "content": [
        {
        "id": 18,
        "createDate": "2019-04-15T11:45:16",
        "userId": 2000,
        "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
        "userFirstName": "Admin",
        "userLastName": "Globalny",
        "userSystem": "System dla pracownika NDAP",
        "referenceType": "ERROR",
        "referenceId": 139,
        "referenceStatus": "",
        "eventType": "ERROR_STATUS_CHANGE",
        "eventTypeText": "Zmiana statusu błędu"
        },
        {
        "id": 17,
        "createDate": "2019-04-15T11:42:37",
        "userId": 2000,
        "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
        "userFirstName": "Admin",
        "userLastName": "Globalny",
        "userSystem": "System dla pracownika NDAP",
        "referenceType": "ERROR",
        "referenceId": 139,
        "referenceStatus": "",
        "eventType": "ERROR_CREATE",
        "details": " Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz. Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz. Komentarz Komentarz Komentarz.",
        "eventTypeText": "Zgłoszenie błędu"
        },
        {
            "id": 18,
            "createDate": "2019-04-15T11:45:16",
            "userId": 2000,
            "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
            "userFirstName": "Admin",
            "userLastName": "Globalny",
            "userSystem": "System dla pracownika NDAP",
            "referenceType": "ERROR",
            "referenceId": 139,
            "referenceStatus": "",
            "eventType": "ERROR_STATUS_CHANGE",
            "eventTypeText": "Zmiana statusu błędu"
            },
            {
            "id": 17,
            "createDate": "2019-04-15T11:42:37",
            "userId": 2000,
            "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
            "userFirstName": "Admin",
            "userLastName": "Globalny",
            "userSystem": "System dla pracownika NDAP",
            "referenceType": "ERROR",
            "referenceId": 139,
            "referenceStatus": "",
            "eventType": "ERROR_CREATE",
            "details": "",
            "eventTypeText": "Zgłoszenie błędu"
            },
            {
                "id": 18,
                "createDate": "2019-04-15T11:45:16",
                "userId": 2000,
                "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
                "userFirstName": "Admin",
                "userLastName": "Globalny",
                "userSystem": "System dla pracownika NDAP",
                "referenceType": "ERROR",
                "referenceId": 139,
                "referenceStatus": "",
                "eventType": "ERROR_STATUS_CHANGE",
                "eventTypeText": "Zmiana statusu błędu"
                },
                {
                "id": 17,
                "createDate": "2019-04-15T11:42:37",
                "userId": 2000,
                "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
                "userFirstName": "Admin",
                "userLastName": "Globalny",
                "userSystem": "System dla pracownika NDAP",
                "referenceType": "ERROR",
                "referenceId": 139,
                "referenceStatus": "",
                "eventType": "ERROR_CREATE",
                "details": "",
                "eventTypeText": "Zgłoszenie błędu"
                }
        ],
        "totalElements": 2
        };
    
    var details = {
        "id": 139,
        "title": "Strona źle się wyświetla na moim telefonie.",
        "content": "Na telefonie nie widzę filtrów do wyszukiwania i cała strona jest nieczytelna. Mój telefon to Samsung Galaxy S8.Na telefonie nie widzę filtrów do wyszukiwania i cała strona jest nieczytelna. Mój telefon to Samsung Galaxy S8.Na telefonie nie widzę filtrów do wyszukiwania i cała strona jest nieczytelna. Mój telefon to Samsung Galaxy S8.Na telefonie nie widzę filtrów do wyszukiwania i cała strona jest nieczytelna. Mój telefon to Samsung Galaxy S8.Na telefonie nie widzę filtrów do wyszukiwania i cała strona jest nieczytelna. Mój telefon to Samsung Galaxy S8.Na telefonie nie widzę filtrów do wyszukiwania i cała strona jest nieczytelna. Mój telefon to Samsung Galaxy S8.",
        "category": "Ogólne",
        "subcategory": "Podkategoria-Ogólne-1",	
        "createdDate": "2019-04-15T11:42:37.591",
        "createdBy": {
        "id": 2000,
        "firstName": "Admin",
        "lastName": "Globalny",
        "login": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt"
        },
        "status": "REDIRECTED",
        "statusLabel": "Przekazane",
        "attachments": [
        {
        "id": 140,
        "fileName": "S3+eyJlcnJJZCI6MTM5LCJhdHRJZCI6MTQwLCJvcmlnaW5hbEZpbGVOYW1lIjoiZG9ja2VyUmVhZE1lLnR4dCJ9",
        "originalFileName": "dockerReadMe.txt"
        },
        {
        "id": 141,
        "fileName": "S3+eyJlcnJJZCI6MTM5LCJhdHRJZCI6MTQxLCJvcmlnaW5hbEZpbGVOYW1lIjoiY29yZS5sb2ctMTgxMzE0NS50eHQifQ==",
        "originalFileName": "core.log-1813145.txt"
        }
        ],
        "assignedToCurrentUser": false,
        "createdByCurrentUser": true
        }

    var files = [["readme.txt"],["doc.x"]];
    
    
    var colFields = ['createDate', 'userFirstName', 'eventTypeText'];
    var colHeaders = ['Data modyfikacji', "Autor zmiany", 'Operacja','Komentarz'];
    
    var fileHeaders = ['Nazwa pliku']

    function historyToTableData(){
        let arr = new Array();
        let content = history.content;
        let contentLength = content.length;
        
        for(var i=0; i < contentLength ; i++){
            let con = content[i];
            arr.push([getDateAndTime(con.createDate),con.userFirstName+' '+con.userLastName,con.eventTypeText, con.details])
        }
        return arr;
    }

    function generateTable(y){
        doc.autoTable({
            startY: y,
            head: [
                colHeaders
            ],
            headStyles: {
      fillColor: COLORS.BASIC
    },
            margin: {left:margin},
            columnStyles:{
                0: {cellWidth: 30},
                1: {cellWidth: 30},
                2: {cellWidth: 45},
                3: {cellWidth: 150},
              },
            body: historyToTableData(),
            styles: {font: 'roboto'}
        });
    }


    doc.setFontSize(24);
    createRectWithText('Szczegóły błędu: ' + details.id, margin/2, EndingY+=margin/2,90,20,doc);

    EndingY+=lineHeight*6;

    titleAndDetailDeprecated('Kategoria', details.category, lineHeight,sectionSpacing, margin, EndingY,tFontSize,dFontSize,doc);

    titleAndDetailDeprecated('Podategoria', details.subcategory, lineHeight, sectionSpacing, margin*12, EndingY, tFontSize, dFontSize,doc);

    EndingY+=lineHeight*3;

    titleAndDetailDeprecated('Kto zgłosił',details.createdBy.firstName+' '+details.createdBy.lastName, lineHeight, sectionSpacing, margin, EndingY, tFontSize, dFontSize,doc);

    titleAndDetailDeprecated('Data zgłoszenia', getDateAndTime(details.createdDate), lineHeight, sectionSpacing, margin*6, EndingY, tFontSize, dFontSize,doc);

    titleAndDetailDeprecated('Status błędu' , errorOrderStatusEnum[details.status], lineHeight, sectionSpacing, margin*12, EndingY, tFontSize, dFontSize,doc);

    EndingY+=lineHeight*3;

    titleAndDetailDeprecated('Przypisane do' , (details.assignee ? details.assignee.firstName +' '+ details.assignee.lastName: 'nieprzypisany'), lineHeight, sectionSpacing*2, margin, EndingY, tFontSize, dFontSize,doc);

    EndingY+=lineHeight*4;
    EndingY = titleAndDetailDeprecated('Tytuł błędu', details.title, lineHeight, sectionSpacing, margin, EndingY, tFontSize, dFontSize,doc);
    EndingY+=lineHeight/2;
    EndingY = titleAndDetailDeprecated('Opis błędu', details.content, lineHeight, 277,margin, EndingY,tFontSize,dFontSize,doc);


    EndingY+=lineHeight;

    doc.autoTable({
        startY: EndingY,
        startX: margin,
        tableWidth: 'wrap',
        head: [
            fileHeaders
        ],
        headStyles: {
          fillColor: COLORS.BASIC
        },
        body: files,
        margin: {left:margin},
        styles: {font: 'roboto',
                fontSize: tFontSize},
                theme: 'grid'
    });

    EndingY = doc.previousAutoTable.finalY;
    

    EndingY = addPageIfContentToLong(EndingY, 42+lineHeight*2, doc);

    EndingY += lineHeight*2;
    doc.setFontSize(tFontSize);
    createRectWithText("Historia zmian",margin/2,EndingY,sectionSpacing,12,doc,COLORS.DARK_GRAY);
    
    EndingY+=12+lineHeight;

    
    content = [];

    var fetches = [];

    // for(index = 0; index < 500; index++){
    //     fetches.push(
    //         fetch('http://10.0.1.117:81/table')
    //             .then(function(response) {
    //                 return response.json();
    //             })
    //             .then(function(myJson) {
    //                 content = content.concat(myJson);
    //             })
    //     );
    // }

    table = [];

    return Promise.all(fetches).then(() => {
        // console.log(content); doc.setFontSize(25);
        content.map((row) => {
            tableBody = [];
            colFields.map((field) => {
                tableBody.push(row[field]);
            });
            table.push(tableBody);
        });
        
        generateTable(EndingY);
        var t1 = performance.now();
        // console.log(doc.output('datauristring'));
        console.log("Finished in " + (t1 - t0) + " milliseconds.")
        return doc;
    });
};




//helper functions
function generateQueryHeader(json,doc,currentY,sectionSpacing){

  if(json.assignee === undefined)
    json.assignee = {};
  if(json.applicant === undefined)
    json.applicant = {};  
  if(json.applicant.type === undefined)
    json.applicant.type = {};
  if(json.stateArchive === undefined)
    json.stateArchive = {};
  if(json.status === undefined)
    json.status = {};
  if(json.queryType === undefined)
    json.queryType = {};
  if(json.queryPurpose === undefined)
    json.queryPurpose = {};
  if(json.issuingType === undefined)
    json.issuingType = {};
  if(json.legalRule === undefined)
    json.legalRule = {};

  titleAndDetailDeprecated("Status", json.status.label, lineHeight, sectionSpacing/2,margin,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Data wykonania", getDateAndFormat(json.executionDate), lineHeight, sectionSpacing/2,margin+sectionSpacing/2,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Znak sprawy", json.caseId, lineHeight, sectionSpacing,margin+sectionSpacing,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Przypisany pracownik", getFullName(json.assignee.firstName,json.assignee.lastName), lineHeight, sectionSpacing,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Data utworzenia", getDateAndFormat(json.createDate), lineHeight, sectionSpacing,margin+sectionSpacing*3,currentY,tFontSize,iFontSize,doc,replacer);

  currentY = margin*2.5;
  createRectWithText( "Szczegóły zamówienia", margin, currentY, 60,10,doc,COLORS.DARK_GRAY);
  currentY+=lineHeight*3.5;

  createSubtitle("Dane wnioskodawcy",margin,currentY,dFontSize,doc);
  createSubtitle("Adres zamieszkania",margin+sectionSpacing*2,currentY,dFontSize,doc);
  currentY+=lineHeight*1.5;
  titleAndDetailDeprecated("Typ wnioskodawcy", json.applicant.type.label, lineHeight, sectionSpacing*1.25,margin,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Imię i nazwisko", getFullName(json.applicant.firstName,json.applicant.lastName), lineHeight, sectionSpacing,margin+sectionSpacing*1.25,currentY,tFontSize,iFontSize,doc,replacer);

  titleAndDetailDeprecated("Miasto", json.applicant.city, lineHeight, sectionSpacing*0.7,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Kod-pocztowy", json.applicant.postCode, lineHeight, sectionSpacing,margin+sectionSpacing*2.7,currentY,tFontSize,iFontSize,doc,replacer);
  currentY+=lineHeight*2.5;
  titleAndDetailDeprecated("E-mail", json.applicant.email, lineHeight, sectionSpacing*1.25,margin,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Telefon", json.applicant.phone, lineHeight, sectionSpacing,margin+sectionSpacing*1.25,currentY,tFontSize,iFontSize,doc,replacer);

  
  titleAndDetailDeprecated("Ulica", json.applicant.street, lineHeight, sectionSpacing*0.7,margin+sectionSpacing*2,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Nr. domu", json.applicant.streetNumber, lineHeight, sectionSpacing/2,margin+sectionSpacing*2.7,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Nr. mieszkania", json.applicant.flatNumber, lineHeight, sectionSpacing/2,margin+sectionSpacing*3.2,currentY,tFontSize,iFontSize,doc,replacer);

  currentY+=lineHeight*3;
  drawHorizontalBorder(margin,currentY,margin,doc);
  currentY+=lineHeight*2;
  createSubtitle("Dane kwerendy",margin,currentY,dFontSize,doc);

  currentY+=lineHeight*1.5;
  titleAndDetailDeprecated("Archiwum państwowe", json.stateArchive.name, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Podstawa prawna", json.legalRule.value, lineHeight, sectionSpacing*1.5,margin+sectionSpacing*2.7,currentY,tFontSize,iFontSize,doc,replacer);

  currentY+=lineHeight*2.5;
  titleAndDetailDeprecated("Rodzaj kwerendy", json.queryType.label, lineHeight, sectionSpacing,margin,currentY,tFontSize,iFontSize,doc,replacer);
  titleAndDetailDeprecated("Uzasadnienie zamówienia", json.subsititation, lineHeight, sectionSpacing*1.5,margin+sectionSpacing*2.7,currentY,tFontSize,iFontSize,doc,replacer);
  currentY+=lineHeight*3;
  y=currentY;
  currentY = displayLongString("Kwerenda w archiwum państwowym przeprowadzana jest w całym zasobie archiwalnym niezależnie od postaci przechowywanych materiałów archiwalnych.",margin, currentY,sectionSpacing*2.5,lineHeight,doc);
  
  doc.autoTable({
    startY: y-lineHeight,
    tableWidth: sectionSpacing,
    head: [
        ['Dokumenty']
    ],
    body: getOriginalFileNames(),
    margin: {left:margin+sectionSpacing*2.7},
    headStyles: {
      fillColor: COLORS.BASIC
    },
    styles: {font: 'roboto',
            fontSize: tFontSize,
            halign: 'center'}
  });

  currentY = doc.autoTable.previous.finalY;
  currentY+=lineHeight*2;
  titleAndDetailDeprecated("Cel kwerendy", json.queryPurpose.label, lineHeight, sectionSpacing*2.5,margin,currentY,tFontSize,iFontSize,doc,replacer);
  currentY+=lineHeight*3;

  currentY = addPageIfContentToLong(currentY,5,doc);
  createSubtitle("Sposób wydania aktu",margin,currentY,dFontSize,doc);
  currentY+=lineHeight;
  displayLongString(json.issuingType.label,margin,currentY,sectionSpacing*4,lineHeight,doc);
  currentY+=lineHeight*1.5;
  drawHorizontalBorder(margin,currentY,margin,doc);
  currentY+=lineHeight*2;

  return currentY;
  function getOriginalFileNames(){
    files = json.attachments;
    let arr = new Array();
    let content = json.attachments || [];
    let contentLength = content.length;
      
      for(var i=0; i < contentLength ; i++){
          let con = content[i];
          arr.push([con.originalFileName]);
      }

      return arr;
  }
}

function generateHistoryTable(history,doc){
  var colHeaders = ['Data modyfikacji', "Autor zmiany", 'Operacja','Komentarz'];
  var history = {
    "content": [
    {
    "id": 18,
    "createDate": "2019-04-15T11:45:16",
    "userId": 2000,
    "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
    "userFirstName": "Admin",
    "userLastName": "Globalny",
    "userSystem": "System dla pracownika NDAP",
    "referenceType": "ERROR",
    "referenceId": 139,
    "referenceStatus": "",
    "eventType": "ERROR_STATUS_CHANGE",
    "eventTypeText": "Zmiana statusu błędu"
    },
    {
    "id": 17,
    "createDate": "2019-04-15T11:42:37",
    "userId": 2000,
    "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
    "userFirstName": "Admin",
    "userLastName": "Globalny",
    "userSystem": "System dla pracownika NDAP",
    "referenceType": "ERROR",
    "referenceId": 139,
    "referenceStatus": "",
    "eventType": "ERROR_CREATE",
    "details": " Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz. Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz Komentarz. Komentarz Komentarz Komentarz.",
    "eventTypeText": "Zgłoszenie błędu"
    },
    {
        "id": 18,
        "createDate": "2019-04-15T11:45:16",
        "userId": 2000,
        "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
        "userFirstName": "Admin",
        "userLastName": "Globalny",
        "userSystem": "System dla pracownika NDAP",
        "referenceType": "ERROR",
        "referenceId": 139,
        "referenceStatus": "",
        "eventType": "ERROR_STATUS_CHANGE",
        "eventTypeText": "Zmiana statusu błędu"
        },
        {
        "id": 17,
        "createDate": "2019-04-15T11:42:37",
        "userId": 2000,
        "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
        "userFirstName": "Admin",
        "userLastName": "Globalny",
        "userSystem": "System dla pracownika NDAP",
        "referenceType": "ERROR",
        "referenceId": 139,
        "referenceStatus": "",
        "eventType": "ERROR_CREATE",
        "details": "",
        "eventTypeText": "Zgłoszenie błędu"
        },
        {
            "id": 18,
            "createDate": "2019-04-15T11:45:16",
            "userId": 2000,
            "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
            "userFirstName": "Admin",
            "userLastName": "Globalny",
            "userSystem": "System dla pracownika NDAP",
            "referenceType": "ERROR",
            "referenceId": 139,
            "referenceStatus": "",
            "eventType": "ERROR_STATUS_CHANGE",
            "eventTypeText": "Zmiana statusu błędu"
            },
            {
            "id": 17,
            "createDate": "2019-04-15T11:42:37",
            "userId": 2000,
            "userLogin": "emailaddressaglobalny1adresplcnadminglobalnyouoddzialtestowyoarchiwumt",
            "userFirstName": "Admin",
            "userLastName": "Globalny",
            "userSystem": "System dla pracownika NDAP",
            "referenceType": "ERROR",
            "referenceId": 139,
            "referenceStatus": "",
            "eventType": "ERROR_CREATE",
            "details": "",
            "eventTypeText": "Zgłoszenie błędu"
            }
    ],
    "totalElements": 2
    };
    function historyToTableData(){
      let arr = new Array();
      let content = history.content;
      let contentLength = content.length;
      
      for(var i=0; i < contentLength ; i++){
          let con = content[i];
          arr.push([getDateAndTime(con.createDate),con.userFirstName+' '+con.userLastName,con.eventTypeText, con.details])
      }
      return arr;
  }

  currentY = addPageIfContentToLong(currentY,20,doc);
        if(currentY == 0)
          currentY = margin;
  createRectWithText( "Historia", margin, currentY, 40,10,doc,COLORS.DARK_GRAY);
  currentY+=lineHeight*3.5;

  doc.autoTable({
    startY: currentY,
    head: [
        colHeaders
    ],
    margin: {left:margin},
    headStyles: {
      fillColor: COLORS.BASIC
    },
    columnStyles:{
        0: {cellWidth: 30},
        1: {cellWidth: 30},
        2: {cellWidth: 40},
        3: {cellWidth: 150},
      },
    body: historyToTableData(),
    styles: {font: 'roboto'}
});
}

function generatePdfHeader(content,variable,doc){
  doc.setFontSize(headerFontSize);
  if(variable===undefined)
    variable = replacer;
  doc.text(content+variable,margin,margin);
  doc.setFontSize(dFontSize);
}

function addZeroBeforeDate(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getDateAndTime(dateString){
    let date = new Date(dateString);
    return addZeroBeforeDate(date.getDate())+'/'+addZeroBeforeDate(date.getMonth()+1)+'/'+addZeroBeforeDate(date.getFullYear())+ ' ' +addZeroBeforeDate(date.getHours())+':'+addZeroBeforeDate(date.getMinutes());
}

function getDateAndFormat(dateString){
    if(dateString !== undefined){
      let date = new Date(dateString);
      return addZeroBeforeDate(date.getDate())+'/'+addZeroBeforeDate(date.getMonth()+1)+'/'+addZeroBeforeDate(date.getFullYear());
    }else
      return replacer;
}

function getFullName(firstName,lastName){
  if(firstName!==undefined && lastName !==undefined)
    return firstName+' '+lastName;
  else
    return replacer;
}

function displayLongString(string, x, y, lineLength, lineHeight, doc){

    if(string != "" && string !== undefined){
      var words = doc.splitTextToSize(string, lineLength);  
      for(var i=0;i<words.length; i++){
          y = addPageIfContentToLong(y,lineHeight,doc);
          y == 0 ? y=lineHeight : y = y;
          
          doc.text(words[i], x, y);
          y+=lineHeight;
      }
    } else
       doc.text(replacer, x, y);
    return y;
}

function titleAndDetailDeprecated(title, detail, lineHeight, lineLength, x, y, tFontSize, dFontSize, document, replacer){
if(detail === undefined)
  detail = replacer;
  
doc.setFontSize(tFontSize);
doc.text(title, x, y);
doc.setFontSize(dFontSize);

return displayLongString(detail.toString(), x, y+lineHeight, lineLength, lineHeight, document);
}

function titleAndDetail(title, detail,x,y,doc){
  if(detail === undefined || detail == "")
    detail = replacer;
  doc.setFontSize(tFontSize);
  doc.text(title, x, y);
  doc.setFontSize(dFontSize);

  return displayLongString(detail.toString(), x, y+lineHeight, lineLength, lineHeight, document);
}

function checkExistValue(val){
  if(val == "" || val == null){
      return replacer;
  } else
      return val
}

function createRectWithText(text, x,y,w,h, doc, color){
    if(color == null){
      color = COLORS.BASIC;
    }
    doc.setFillColor(color);
    doc.rect(x, y, w,h,'F');
    doc.setTextColor(1,1,1,1);
    doc.text(text, x+w/2, y+(h/5)*3.3, 'center');
    doc.setTextColor(0,0,0);
}

function createSubtitle(text,x,y,fontSize,doc){
  doc.setFontSize(fontSize*1.7);
  doc.setFont("Roboto-Bold");
  doc.text(text,x,y);
  doc.setFont("roboto");
  doc.setFontSize(fontSize);
}

function drawCircleWithText(text,x,y,r,doc,color){
  if(color == null){
    color = COLORS.BASIC;
  }
  doc.setFillColor(color);
  doc.circle(x,y,r,'F');
  doc.setTextColor(1,1,1,1);
  doc.text(text,x,y+(r/5)*1.5,'center');
  doc.setTextColor(0,0,0);
}

function drawHorizontalBorder(x,y,margin,doc,color){
    w = doc.internal.pageSize.getWidth()-margin*2;
    h=0.5;
    if(color == null){
      color = COLORS.LIGHT;
    }
    doc.setFillColor(color);
    doc.rect(x,y,w,h,'F');
}

function addPageIfContentToLong(y,contentHeight, doc) {
  pageHeight= doc.internal.pageSize.height;
    if(y+contentHeight>=pageHeight)
        {
            doc.addPage();
            return margin;
        }
    return y;
}

function createRow(tableOfSections){
  return Math.max.apply(null,tableOfSections);
}

function compareAddresses(ad1,ad2){
  return _.isEqual(ad1,ad2);
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

//enums
const errorOrderStatusEnum = {
    PENDING: "Nie podjęte", // nowe zgloszenia
    RECEIVED: "Podjęte", // zgloszenia w trakcie rozwiazywania przez lokalnego
    REDIRECTED: "Przekazane", // zgloszenia przekazane do globalnego
    REDIRECTED_TECH: "Przekazane do technicznego", // zgloszenia przekazane do technicznego
    REDIRECTED_SOLVED: "Przekazane/Rozwiązane", // zgloszenia rozwiazane przez globalnego
    SOLVED: "Rozwiązane", // zgloszenia rozwiazane, przekazane do weryfikacji
    CLOSED: "Zamknięte", // zgloszenia z potwierdzonym rozwiazaniem
    TO_FIX: "Do poprawy", // zgloszenia z odrzuconym rozwiazaniem
    CANCELLED: "Anulowane", // zgloszenia odrzucone jako niezasadne
    ON_HOLD: "Zamrożone" // zgloszenia niemozliwe do wykonania w danym momencie
};

const autoVerificationReportsTypeEnum = {
  JRWA: "jrwa",
  SIGNATURE: "Sygnatura",
  CONTENT_LIST: "Lista zawartości"
};

const COLORS = {
  BLUE: "#2980ba",
  BASIC: "3B3D3C",
  LIGHT: "#E8E8E8",
  RED: "#db1818"
}
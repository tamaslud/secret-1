"use strict";
/*
- A `js/main.js` fájlban dolgozz!
- Írj egy olyan függvénykifejezést, amely paraméterként egy string-eket tartalmazó tömböt kap (inputellenőrzést nem kell végezni), és __visszaad__ egy HTML-template-et (string)! 
- A függvény neve `generateList` legyen!
- A HTML-template egy lista, amelynek a listaelemei a kapott tömb értékeit tartalmazzák.
*/

/*const generateList = (strArr) => {
  return (
    "<ul>" +
    strArr.forEach((str) => {
      "<li>" + str + "</li>";
    }) +
    "</ul>"
  );
};*/

// 1. megoldás - ismert tömbelemszám

const generateList = (stringArr) => {
  return `<ul>
              <li>${stringArr[0]}</li>
              <li>${stringArr[1]}</li>
              <li>${stringArr[2]}</li>
          </ul>`;
};

// 2. megoldás - tömb
/*
  let listItems = [];
  
  const generateList = (stringArr) => {
    stringArr.forEach((string) => {
      listItems.push(`<li>${string}</li>`);
    });
  
    return `<ul>${listItems.forEach((li) => li)}</ul>`;
  };*/

// 3. megoldás - template string

/*let templateString = "<ul>";
  
  const generateList = (stringArr) => {
    stringArr.forEach((string) => {
      templateString += `<li>${string}</li>`;
    });
    templateString += "</ul>";
  
    return templateString;
  };*/

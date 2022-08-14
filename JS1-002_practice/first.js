"use strict";
/*
- Írj egy olyan függvénykifejezést, amely paraméterként vár egy egész számokat tartalmazó tömböt! (Inputellenőrzést nem kell végezni.)
- A függvény neve `brutto` legyen!
- A függvény szorozza meg a tömbelemek értékét 1.27-tel, majd pedig 
__térjen vissza__ az elemek egész számra kerekített összegével!
*/

const brutto = (numArray) => {
  return Math.round(
    numArray.map((num) => num * 1.27).reduce((acc, cur) => (acc += cur))
  );
};

/*const brutto = (numArray) => {
    const tempArr = numArray.map((num) => num * 1.27); // [1.27,2.54,...]
    const sum = tempArr.reduce((acc, cur) => (acc += cur)); // 12.5889
    const roundedSum = Math.round(sum); // 13
  
    return roundedSum;
    
  };*/

/*const brutto = (numArray) => {
    let arr127 = [];
    numArray.forEach((num) => {
      arr127.push(num * 1.27);
    });
  };*/

/*const brutto = (intArr) => {
    return Math.round(
      intArr.map((el) => el * 1.27).reduce((acc, cur) => (acc += cur))
    );
  };
  */

"use strict";

// For ciklus megoldás
/*const findMinAge = ([...people]) => {
  const peoplee = [...people];
  let min = peoplee[0];
  for (let i = 0; i < peoplee.length; i += 1) {
    if (peoplee[i] < min) {
      min = peoplee[i];
    }
  }

  return min;
};*/

// Foreach megoldás
/*
const findMinAge = (people) => {
  let min = people[0];
  people.forEach((item) => {
    item > min ? (min = item) : {};
  });

  return min;
};*/
//const testArr = [2, 1, 78, 31, 7, 27, 0];

//console.log(Math.min(...testArr));

// Reduce megoldás
/*
const findMinAge = (people) => {
  return people.reduce((prev, cur) => (prev < cur ? prev : cur));
};

console.log(findMinAge(testArr));*/
//-------------------------------------------------------

const testArr2 = [
  { name: "a1", age: 20 },
  { name: "a2", age: 50 },
  { name: "a3", age: 10 },
  { name: "a4", age: 70 },
];

const findMinAge = (people = [{ name: "b", age: 33 }]) => {
  let min = people[0].age;
  let youngestName = "";
  people.forEach((person) => {
    if (person.age < min) {
      console.log(min);
      min = person.age;
      youngestName = person.name;
    }
  });
  return youngestName;
};

console.log(findMinAge(testArr2));

//----------------------------------------------
const travellers = {
  names: ["jane", "john", "jack"],
  ages: [30, 40, 50],
  pets: ["dog", "cat", "fish"],
};

const objectObj = {
  key1: { name: "Jane", age: 20 },
  key2: { name: "Jack", age: 25 },
  key3: { name: "John", age: 30 },
};

for (const values of Object.values(objectObj)) {
  console.log(values.name);
}

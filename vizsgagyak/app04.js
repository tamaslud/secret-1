"use strict";

const getYearDiff = (date) => {
  const now = new Date();

  return now.getFullYear() - date.getFullYear();
};

console.log(getYearDiff(new Date("08/31/2011")));
console.log(new Date("2011/08/31/22:12"));
console.log(new Date("08/21/2022").getDay());

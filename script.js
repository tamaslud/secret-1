"use strict";

const HU = {
  date(date) {
    return new Intl.DateTimeFormat("hu-HU").format(date);
  },
  currency(value) {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
    }).format(value);
  },
  list(stringArr) {
    const lastEl = stringArr.pop();
    return stringArr.join(", ").concat(` és ${lastEl}`);
  },
};

/*-----------------------------------------*/

const objectConverter = {
  arrayToMap(array) {
    const arrMap = new Map([]);
    array.forEach((val, i) => arrMap.set(i, val));
    return arrMap;
  },
  arrayToSet(array) {
    return new Set(array);
  },
  setToMap(set) {
    const setMap = new Map([]);
    Array.from(set).forEach((val, i) => setMap.set(i, val));
    return setMap;
  },
  setToArray(set) {
    return Array.from(set); // [...set]
  },
  mapToArray(map) {
    const mapArray = [];
    map.forEach((value) => {
      mapArray.push(value);
    });
    return mapArray;
  },
  mapToSet(map) {
    const mapSet = new Set();
    map.forEach((value) => mapSet.add(value));
    return mapSet;
  },
};

/*-----------------------------------------*/

const customDateFormats = (date) => {
  const shorty = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const lengthy = new Intl.DateTimeFormat("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return {
    short: shorty,
    long: lengthy,
  };
};

"use strict";

// 1. gyakorlat
// Kiválogatja és visszaadja az adott városban élő felhasználókat.

const selectUsersByCity = (users, city) => {
  return users.filter((user) => {
    user.city === city;
  });
};

// Kiválasztja és visszaadja az adott id-jű felhasználót.
const selectUserById = (users, id) => {
  return users.find((user) => user.id === id);
};

// Visszaadja azokat a felhasználókat, akiknek az házszám
// range-ébe beleesik a paraméterként kapott házszám

const selectUsersBySpecificStreetNumber = (users, param) => {
  return users.forEach((user) => {
    let validArray = [];
    const higherNum = Number(
      user.streetNumber.slice(user.streetNumber.indexOf("-") + 1)
    );
    const lowerNum = Number(
      user.streetNumber.slice(0, user.streetNumber.indexOf("-"))
    );

    higherNum > param && lowerNum < param ? validArray.push(user) : null;
    return validArray;
  });
};

//CRUD példa Firebase-el

import { validator } from "./validation.js";

const url = `https://animals-68cb4-default-rtdb.europe-west1.firebasedatabase.app/animals`;
const userObject = {};

let editButtons;
let deleteButtons;
let saveButtons;
let cancelButtons;
let isValid = false;
const addButton = document.querySelector(".btn__add");
const commonNameInput = document.querySelector(".common");
const latinNameInput = document.querySelector(".latin");

const modalWindow = document.querySelector(".modal");
const container = document.querySelector(".container");
const modalHeader = document.querySelector(".alert__type");
const modalContent = document.querySelector(".content");

let animalData = [];

/*const options = {
  method: "PUT", // 'DELETE', 'GET', 'POST'
  body: JSON.stringify(userObject), // csak akkor kell ha van kifejezetten küldött adat
  headers: {
    "Content-Type": "application/json",
  },
  mode: "no-cors",
};*/

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(`Something went wrong fetching your data: ${err.message}`);
  }
};

const logDataTable = async () => {
  const data = await fetchData(`${url}.json`);
  for (const key in data) {
    animalData.push({
      uniqueKey: key,
      id: data[key].id,
      name_common: data[key].animal_common,
      name_latin: data[key].animal_latin,
    });
  }

  animalData.forEach((oddAnimal, i) => {
    const tr = document.createElement("tr");
    document.querySelector("tbody").appendChild(tr);
    const animalTemplate = `<td>${oddAnimal.id}</td><td>${oddAnimal.name_common}</td><td>${oddAnimal.name_latin}</td><td><div class="btnGroup btn-group"><button class="btn btn-success btn__edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button class=" btn btn-danger btn__del"><i class="fa fa-minus-square-o" aria-hidden="true"></i></button><button class=" btn btn-info btn__save" style='display: none'><i class="fa fa-hdd-o" aria-hidden="true"></i></button><button class=" btn btn-secondary btn__cancel" style='display: none'><i class="fa fa-ban" aria-hidden="true"></i></button></div></td>`;
    tr.insertAdjacentHTML("afterbegin", animalTemplate);

    deleteButtons = document.querySelectorAll(".btn__del");
    editButtons = document.querySelectorAll(".btn__edit");
    saveButtons = document.querySelectorAll(".btn__save");
    cancelButtons = document.querySelectorAll(".btn__cancel");

    addEventListeners(i);
  });
};

logDataTable();

const addEventListeners = (index) => {
  const activeRow =
    editButtons[index].parentElement.parentElement.parentElement;

  const activeID = activeRow.children[0].innerHTML;

  let commonNameToEdit = activeRow.children[1].innerHTML;
  let latinNameToEdit = activeRow.children[2].innerHTML;

  editButtons[index].addEventListener("click", () => {
    editButtons[index].style.display = "none";
    deleteButtons[index].style.display = "none";
    saveButtons[index].style.display = "inline-block";
    cancelButtons[index].style.display = "inline-block";
    addButton.disabled = true;

    editButtons.forEach((button, i) => {
      button.disabled = true;
      deleteButtons[i].disabled = true;
    });

    commonNameInput.value = commonNameToEdit;
    latinNameInput.value = latinNameToEdit;
  });

  cancelButtons[index].addEventListener("click", () => {
    resetbuttons(index);
    addButton.disabled = false;
  });

  deleteButtons[index].addEventListener("click", () => {
    isValid = true;
    // Kiválasztom az aktív sort
    const activeRow =
      deleteButtons[index].parentElement.parentElement.parentElement;
    // Kitörlöm a sort a DOM-ból
    activeRow.remove();
    // Elküldöm a delete requestet a szerver felé
    fetchData(`${url}/${animalData[index].uniqueKey}.json`, {
      method: "DELETE",
    });
    // Lokálisan a segéd tömbömből is törlöm a sort
    animalData = animalData.filter((animal) => !(animal.id === index));

    alertMessage("Deleted User", "User was successfully deleted.");
  });

  saveButtons[index].addEventListener("click", () => {
    const editedCommonName = commonNameInput.value;
    const editedlatinName = latinNameInput.value;

    commonNameToEdit = editedCommonName;
    latinNameToEdit = editedlatinName;

    isValid = validator(editedCommonName, editedlatinName, isValid);

    if (isValid) {
      const editedAnimalObject = animalData.find(
        (animal) => animal.id == activeID
      );

      const uniqueKeyToUpdate = editedAnimalObject.uniqueKey;

      delete editedAnimalObject.uniqueKey;

      editedAnimalObject["name_common"] = editedCommonName;
      editedAnimalObject["name_latin"] = editedlatinName;

      fetch(`${url}/${uniqueKeyToUpdate}.json`, {
        method: "PUT",
        body: JSON.stringify(editedAnimalObject),
        headers: {
          "Content-Type": "application/json",
        },
      });

      resetbuttons(index);
      addButton.disabled = false;
      alertMessage("Edit User", "User was successfully updated.");
    } else {
      alertMessage("Error", "Input fields could not be validated.");
    }
  });
};

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const commonName = commonNameInput.value;
  const latinName = latinNameInput.value;

  //const uniqueKey = `-MCZ${Math.floor(Math.random() * 10 ** 16)}`;
  let maxId = 0;

  animalData.forEach((animal) => {
    if (animal.id > maxId) {
      maxId = animal.id;
    }
  });

  isValid = validator(commonName, latinName, isValid);

  if (isValid) {
    const newAnimalObject = {
      animal_common: commonName,
      animal_latin: latinName,
      id: maxId + 1,
    };

    // Új animal hozzáadása a lokális animalData tömbhöz
    animalData.push(newAnimalObject);

    // Új animal hozzáadása az adatbázishoz
    fetchData(`${url}.json`, {
      method: "POST",
      body: JSON.stringify(newAnimalObject),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alertMessage("New User", "New user was successfully created.");
    window.scrollTo({ top: 50000, behavior: "smooth" });
  } else {
    alertMessage("Error", "Input fields could not be validated.");
  }

  // Új animal hozzáadása a DOM-hoz
  const tr = document.createElement("tr");
  document.querySelector("tbody").appendChild(tr);
  const newAnimalTemplate = `<td>${
    maxId + 1
  }</td><td>${commonName}</td><td>${latinName}</td><td><div class="btnGroup"><button class="btn__edit">Edit</button><button class="btn__del">Del</button><button class="btn__save" style='display: none'>Save</button><button class="btn__cancel" style='display: none'>Cancel</button></div></td>`;
  tr.insertAdjacentHTML("afterbegin", newAnimalTemplate);

  deleteButtons = document.querySelectorAll(".btn__del");
  editButtons = document.querySelectorAll(".btn__edit");
  saveButtons = document.querySelectorAll(".btn__save");
  cancelButtons = document.querySelectorAll(".btn__cancel");
});

const resetbuttons = (index) => {
  editButtons[index].style.display = "inline-block";
  deleteButtons[index].style.display = "inline-block";
  saveButtons[index].style.display = "none";
  cancelButtons[index].style.display = "none";
  commonNameInput.value = "";
  latinNameInput.value = "";

  editButtons.forEach((button, i) => {
    button.disabled = false;
    deleteButtons[i].disabled = false;
  });
};

const alertMessage = (type, message) => {
  modalWindow.style.display = "flex";
  modalHeader.innerHTML = type;
  modalContent.innerHTML = message;

  isValid
    ? (container.style.border = "2px solid green")
    : (container.style.border = "2px solid red");

  setTimeout(() => {
    clearTimeout();
    modalWindow.style.display = "none";
  }, 5000);
};

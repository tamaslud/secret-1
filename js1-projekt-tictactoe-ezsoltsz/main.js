"use strict";

let matrix = [];
let stepCount = 0;
const cols = 3;
const rows = 3;
let mark = "X";
const displayPlayer = document.querySelector(".display__player");

const initState = () => {
  matrix = new Array(rows);
  for (let i = 0; i < rows; i++) matrix[i] = new Array(cols);

  for (let j = 0; j < rows; j++)
    for (let k = 0; k < cols; k++) matrix[j][k] = null;
};

const changedMatrixValue = (element) => {
  const row = parseInt(element.dataset.row, 10);
  const cell = parseInt(element.dataset.cell, 10);
  matrix[row][cell] = element.innerHTML;
};

const deleteSigns = () => {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
};
const increaseCounter = () => {
  stepCount++;
};
const modifyCell = (element) => {
  element.innerHTML = mark;
  element.removeEventListener("click", handleClick);
};

const setMark = () => {
  if (mark === "X") {
    mark = "0";
    displayPlayer.innerHTML = "Player 0 turn";
  } else {
    mark = "X";
    displayPlayer.innerHTML = "Player X turn";
  }
};
const handleClick = (event) => {
  increaseCounter();
  modifyCell(event.target);
  setMark();
  changedMatrixValue(event.target);
  checkWinner();
};
const addClickListener = () => {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleClick);
  }
};
const removeAllClickListeners = () => {
  const cells = document.querySelectorAll(".cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", handleClick);
  }
};
const checkValues = (array) =>
  array
    .map(
      (row) =>
        row.every((item) => item === "X") || row.every((item) => item === "0")
    )
    .indexOf(true) !== -1;

const checkColumnValues = () =>
  checkValues(matrix.map((array, i) => array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
  checkValues([
    matrix.map((array, i) => matrix[i][i]),
    matrix.map((array, i) => matrix[i][matrix[i].length - i - 1]),
  ]);
const checkWinner = () => {
  console.log(checkColumnValues());
  console.log(checkDiagonalValues());
  if (checkValues(matrix) || checkColumnValues() || checkDiagonalValues())
    endGame();
};
const setMessage = (message) => {
  const messageBox = document.querySelector(".message");
  messageBox.innerHTML = message;
};
const startGame = () => {
  initState();
  addClickListener();
  newGame();
};
const endGame = () => {
  setMessage("The winner is Player " + (mark === "X" ? "O" : "X") + ".");
  removeAllClickListeners();
};
const newGame = () => {
  let button = document.querySelector("#reset");

  button.addEventListener("click", () => {
    initState();
    addClickListener();
    deleteSigns();
    setMessage("Playing...");
    setMark();
  });
};
startGame();

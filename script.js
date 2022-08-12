parseInt("20", 10);

let stepCount = 0;
let mark = "x";

const deleteSigns = () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
};

const increaseCounter = () => {
  stepCount++;
};

const modifyCell = (element) => {
  element.innerHTML = mark;
  element.removeEventListener("click", handleClick);
};

const setMark = () => {
  mark === "x" ? (mark = "O") : (mark = "x");
};

const handleClick = (event) => {
  increaseCounter();
  modifyCell(event.target);
  setMark();
  changeMatrixValue(event.target);
  checkWinner();
};

const addClickListener = () => {
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
};

const removeAllClickListeners = () => {
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
};

const checkValues = (array) =>
  array
    .map((row) => {
      row.every((cell) => cell.innerHTML === "x");
    })
    .indexOf(true) !== -1;
/*
    Ha true-t kapunk visza adott sorra, akkor 
    annak indexét vizsgálva nem kaphatunk -1-et.
    Azaz az elem benne van a tömbben.
    */

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  //cell.style.display = 'none'
  cell.classList.add("hide");

  cell.classList.remove("hide");
});

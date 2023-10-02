const addBtn = document.getElementById("add");
const editBtn = document.getElementsByClassName("edit");
const removeBtn = document.getElementsByClassName("remove");
const listElement = document.getElementById("list");
const inputField = document.getElementById("input");
const doneElement = document.getElementById("done");
let finishedCounter = 0;
let totalCounter = 0;

doneElement.innerHTML = `There is no Task!`;

addBtn.addEventListener("click", () => {
  if (inputField.value == "") {
    alert("Input field can not be empty!");
  } else {
    let userInput = inputField.value;
    inputField.value = "";
    totalCounter++;
    finishedTasksCounter(finishedCounter, totalCounter);
    let newTask = document.createElement("input");
    newTask.classList.add("task");
    newTask.setAttribute("readOnly", true);
    newTask.value = userInput;
    newTask.addEventListener("click", (e) => {
      if (
        e.target.style.textDecoration == "line-through" &&
        e.target.nextSibling.firstChild.innerHTML == "Edit"
      ) {
        e.target.style.textDecoration = "none";
        finishedCounter--;
        finishedTasksCounter(finishedCounter, totalCounter);
      } else if (e.target.nextSibling.firstChild.innerHTML == "Edit") {
        e.target.style.textDecoration = "line-through";
        finishedCounter++;
        finishedTasksCounter(finishedCounter, totalCounter);
      }
    });

    let newEditBtn = document.createElement("button");
    newEditBtn.classList.add("edit");
    newEditBtn.innerHTML = "Edit";
    newEditBtn.addEventListener("click", (e) => {
      let parent = e.target.parentElement;
      let siblingTask = parent.previousSibling;
      if (e.target.innerHTML == "Edit") {
        e.target.innerHTML = "Save";
        siblingTask.readOnly = false;
        siblingTask.style.backgroundColor = "#f9ca24";
        siblingTask.valu = siblingTask.value;
      } else {
        e.target.innerHTML = "Edit";
        siblingTask.readOnly = true;
        siblingTask.style.backgroundColor = "#ffbe76";
      }
    });

    var newRemoveBtn = document.createElement("button");
    newRemoveBtn.classList.add("remove");
    newRemoveBtn.innerHTML = "Remove";
    newRemoveBtn.addEventListener("click", (e) => {
      totalCounter--;
      if (newTask.style.textDecoration == "line-through") {
        finishedCounter--;
      }
      var parentAction = e.target.parentElement;
      var parentItem = parentAction.parentElement;
      parentItem.remove();
      finishedTasksCounter(finishedCounter, totalCounter);
    });

    var newActions = document.createElement("div");
    newActions.classList.add("actions");

    var newItem = document.createElement("div");
    newItem.classList.add("inner-container");

    newActions.appendChild(newEditBtn);
    newActions.appendChild(newRemoveBtn);

    newItem.appendChild(newTask);
    newItem.appendChild(newActions);

    listElement.appendChild(newItem);
  }
});

function finishedTasksCounter(x, y) {
  if (y == 0) {
    doneElement.innerHTML = `There is no Task`;
  } else if (x == 0 && y == 1) {
    doneElement.innerHTML = `Your task is not done!`;
  } else if (x == 0 && y > 1) {
    doneElement.innerHTML = `None of your ${y} tasks are done!`;
  } else if (x == 1 && y == 1) {
    doneElement.innerHTML = `Your task is done!`;
  } else if (x == 1 && y > 1) {
    doneElement.innerHTML = `Only one of your ${y} tasks is done`;
  } else if (x > 1 && y > 1) {
    doneElement.innerHTML = `${x} tasks from ${y} tasks are done`;
  }
}

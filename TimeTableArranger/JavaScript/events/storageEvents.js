import { saveTable, loadTable, deleteTable, getTables } from "../store.js";
import { loadSubjectTable, loadTimeTable } from "../dom.js";

export function initStorageEvents(timeTableBody, subjectTableBody) {
  const tableSelect = document.getElementById("table-select");
  const saveForm = document.getElementById("save-form");
  const getForm = document.getElementById("get-form");
  const deleteBtn = document.getElementById("delete-btn");

  // Name of the table we loaded.
  let currentTableName = null;
  let savedTables = getTables();

  // Get saved tables for select menu.
  Object.keys(savedTables).forEach(name => {
    const option = document.createElement("option");
    option.innerText = name;
    tableSelect.appendChild(option);
  });

  // Save a table to localstorage
  saveForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name").trim();

    if (!name) return alert("Adj nevet az órarendnek!");
    if (savedTables[name]) return alert("Már létezik ilyen nevű órarend!");

    const subjectTableArray = [];
    const timeTableArray = [];
    // Puts the inner text of table cells in in an array. 
    for(let row of subjectTableBody.children) {
        subjectTableArray.push(row.firstElementChild.innerText);
    }

    // Puts inner text of the table cells in a 2D array.
    for(let i = 0; i < timeTableBody.children.length; i++) {
        const row = timeTableBody.children[i];
        timeTableArray[i] = [];
        for(let j = 0; j < row.children.length; j++) {
            const cell = row.children[j]; 
            timeTableArray[i][j] = cell.innerText;
        }
    }

    saveTable(name, subjectTableArray, timeTableArray);
    alert("Órarend elmentve!");
    location.reload();
  });

  
  // Fetches table from localstorage.
  getForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("table");
    const { tableArrays } = loadTable(name);

    currentTableName = name;
    
    loadSubjectTable(subjectTableBody, tableArrays["subjectTableArray"]);
    loadTimeTable(timeTableBody, tableArrays["timeTableArray"]);
  });

  // Deletes the current table from the localstorage.
  deleteBtn.addEventListener("click", () => {
    if (!currentTableName)
      return;
    deleteTable(currentTableName);
    alert("Órarend törölve!");
    location.reload();
  });
}

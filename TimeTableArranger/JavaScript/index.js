import { initEventListeners } from "./events.js";
import { createSubjectTable, createTimeTable, loadSubjectTable, loadTimeTable } from "./dom.js";
import { deletTable, getTables, loadTable, saveTable } from "./store.js";

// This makes sure that the code runs only after the DOM has loaded, so we don't try to accidentally access an element that doesn't exist yet, but it's not needed, if we place the script at the end of the body tag, I just put it here to make sure everything works fine.
window.document.addEventListener("DOMContentLoaded", () => {
    // The name of the tabel currently in use.
    let currentTableName = null;

    // The table containing the subjects.
    const subjectTable = document.getElementById("subjects-table");
    
    // The timetable
    const timeTable = document.getElementById("time-table");
    
    // Creating the table data for both tables.
    createSubjectTable(subjectTable);
    createTimeTable(timeTable);

    // The table body inside the subjects table.
    const subjectTableBody = subjectTable.lastElementChild;
    
    // The table body inside the timetable.
    const timeTableBody = timeTable.lastElementChild;

    // Add event listeners to tables.
    initEventListeners(timeTableBody, subjectTableBody);
    /*
        Saving functionality for our tables.
    */
    // The select tag used for selecting the saved tables from the localstorage.
    const tableSelect = document.getElementById("table-select");
    
    // Get saved tables for select menu.
    let savedTables = getTables();
    for(let name of Object.keys(savedTables)) {
        const selectOption = document.createElement("option");
        selectOption.innerText = name;
        tableSelect.appendChild(selectOption);
    }

    // Save a table to localstorage
    const saveForm = document.getElementById("save-form");
    saveForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Using the form data we get the name field.
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");

        // Ensures we don't try to make duplicate names.
        const nameExists = Object.keys(savedTables).includes(name);
        if(nameExists) {
            console.error("Name is already taken");
            return;
        }

        // Ensures that the saved table won't have an empty name.
        if(!name.trim()) {
            console.error("Empty name is not acceptable");
            return;
        }

        const subjectTabelArray = [];
        const timeTableArray = [];

        // Puts the inner text of table cells in in an array. 
        for(let row of subjectTableBody.children) {
            subjectTabelArray.push(row.firstElementChild.innerText);
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
      
        // Saves the table to the localstorage.
        saveTable(name, subjectTabelArray, timeTableArray);

        window.location.reload();
    
    });

    // Fetches table from localstorage.
    const getForm = document.getElementById("get-form")
    getForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("table");
        const { tableName, tableArrays } = loadTable(name);
        currentTableName = name;
        
        const subjectTableArray = tableArrays["subjectTableArray"];
        const timeTableArray = tableArrays["timeTableArray"];

        console.log(tableName);
        console.log(subjectTableArray);
        console.log(timeTableArray);
        
        loadSubjectTable(subjectTableBody, subjectTableArray);
        loadTimeTable(timeTableBody, timeTableArray);
    })


    const deleteBtn = document.getElementById("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        if(currentTableName == null)
            return;
        deletTable(currentTableName);

        document.location.reload();
    });
});

    /*
        // Saved table names currently among the select options.
        let savedTableNames = Object.keys(savedTables);
        
        // Refetches the tables from the localstorage.
        savedTables = getTables();
        
        // Iterates through the current tables.
        for(let name of Object.keys(savedTables)) {
            // Checks if there is a new table, if there is, it gets added to the select options.
            if(!savedTableNames.includes(name)) {
                const selectOption = document.createElement("option");
                selectOption.innerText = name;
                tableSelect.appendChild(selectOption);
            }
        }

        // Resets the input fields of the form.
        e.target.reset();
        */
import { subjects, weekDays } from "./dummyData.js";

// Creates the head of the timetable
function createTableHead(head) {
    // Creates a row element.
    const row = document.createElement('tr');

    // Creates a cell element and sets its properties.
    const cell = document.createElement("th");
    cell.innerText = "Idő";
    
    // Appends the cell to the row element.
    row.appendChild(cell);
    
    // Iterates through the weekdays and appends them to the row.
    weekDays.map(day => {
        const cell = document.createElement("th");
        cell.innerText = day;
        row.appendChild(cell);
    });
    
    // Appends the row to the table head element.
    head.appendChild(row);

}

// Creates the body of the timetable.
function createTableBody(body) {
    // This for loop creates the table rows from 8 to 16 O'clock 
    for(let i = 8; i <= 16; i++) {

        // Creates a row element.
        const row = document.createElement('tr');
        // This for loop fills each row with a cell for each day we have in the timetable.
        for(let j = 0; j <= weekDays.length; j++) {
            // Creates a cell element.
            const cell = document.createElement('td');
            
            // If cell has the index 0, then it will contain the time, else it will be empty and is set to be draggable. 
            if(j === 0) {
                cell.innerText = `${i}:00`;
                cell.setAttribute("time-field", "true");
            } else {
                cell.draggable = true;
            }
            row.appendChild(cell);
                
        }

        // Appends the row to the table body element.
        body.appendChild(row);
    }
}

// Creates the content of the timetable.
function createTimeTable(table) {
    // We get the child elements of the table and load the matching data for them.
    const head = table.firstElementChild;
    const body = table.lastElementChild;
    createTableHead(head);
    createTableBody(body);
 
}

// Creates the content of the timetable.
function createSubjectTable(table) {
    // Gets the body of the subject table.
    const body = table.lastElementChild;

    // Iterates through the subjects array and creates a row and cell for each subject.
    subjects.map((subject) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.setAttribute("isDeletable", "true");
        cell.textContent = subject;
        cell.draggable = true;
        row.appendChild(cell);
        body.appendChild(row);
    });
}

function loadSubjectTable(subjectTableBody, subjectTableArray) {
    // Removes the current rows from the subject table.
    while(subjectTableBody.firstElementChild) {
        subjectTableBody.removeChild(subjectTableBody.lastElementChild);
    }

    /*
    * Checks if subjectTableArray at index 0 is the placeholder or not.
    * If yes, then it creates the place-holder
    * Else it loops through the array and puts the subjects in the table.
    */
    if(!subjects.includes(subjectTableArray[0])) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        row.setAttribute("place-holder", "true");
        cell.colSpan = 1;
        cell.innerText = subjectTableArray[0];
        cell.style.textAlign = "center";
        cell.style.color = "hsl(0, 0%, 50%)";
        row.appendChild(cell);
        subjectTableBody.appendChild(row);
    } else {
        for(let i = 0; i < subjectTableArray.length; i++) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            
            cell.innerText = subjectTableArray[i];
            cell.draggable = true;
            cell.setAttribute("isDeletable", "true");
            row.appendChild(cell);
            subjectTableBody.appendChild(row);
        }
    }
}

// Loads the selected timetable from the localstorage. 
function loadTimeTable(timeTableBody, timeTableArray) {
    // Deletes the current rows from the table
    while(timeTableBody.firstElementChild) {
        timeTableBody.removeChild(timeTableBody.lastElementChild);
    }

    // Adds the table rows and columns to match the 2D array we got from the localstorage.
    for(let i = 0; i < timeTableArray.length; i++) {
        const row = document.createElement("tr");
        for(let j = 0; j < timeTableArray[i].length; j++) {
            const cell = document.createElement("td");
            cell.innerText = timeTableArray[i][j];
            if(j === 0) {
                cell.setAttribute("time-field", "true");
            } else {
                cell.draggable = true;
            }
            row.appendChild(cell);
        }
        timeTableBody.appendChild(row);
    }
}

// If there are no more subjects in the subject table, then this adds a placeholder to ensure we can sill put the subjects back.
function addSubjectTablePlaceholder(subjectTableBody) {
    if (subjectTableBody.children.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        row.setAttribute("place-holder", "true");
        cell.colSpan = 1;
        cell.innerText = "Húzd ide a tárgyat";
        cell.style.textAlign = "center";
        cell.style.color = "hsl(0, 0%, 50%)";
        row.appendChild(cell);
        subjectTableBody.appendChild(row);
    }
}

// Makes sure that the placeholder only appears when the subject table has not subjects.
function removeSubjectTablePlaceholder(subjectTableBody) {
    // If there is two children of the subject table and one of them is the placholder, it deletes the placeholder.
    if(subjectTableBody.children.length == 2 && subjectTableBody.firstElementChild.hasAttribute("place-holder"))
        subjectTableBody.removeChild(subjectTableBody.firstElementChild);
}

// Would create notification boxes, we would use to replace window alerts.
function showNotification() {
    // TODO
}

export {
    createTimeTable,
    createSubjectTable,
    loadSubjectTable,
    loadTimeTable,
    addSubjectTablePlaceholder,
    removeSubjectTablePlaceholder
}
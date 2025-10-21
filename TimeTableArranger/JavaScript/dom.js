import { subjects, weekDays } from "./dummyData.js";

// Creates the head of the timetable
function createTableHead(head) {
    const headerRow = document.createElement('tr');
    
    headerRow.innerHTML = "<th style='width: 2rem;'>Idő</th>";
    head.appendChild(headerRow);
    weekDays.map(d => {
        headerRow
        .innerHTML += `
            <th style='width: 20%'>${d}</th>
            `
    })
}

// Creates the body of the timetable
function createTableBody(body) {
    // This for loop creates the table rows from 8 to 16 O'clock 
    for(let i = 8; i <= 16; i++) {
        const tableRow = document.createElement('tr');
        // This for loop feels each row with a "td" tag for each day we have in the timetable.
        for(let j = 0; j <= weekDays.length; j++) {
            const tableData = document.createElement('td');
            if(j === 0) {
                tableData.textContent = `${i}:00`;
                tableData.classList.add("align-top");
            } else {
                tableData.draggable = true;
            }
            tableRow.appendChild(tableData);
                
        }
        body.appendChild(tableRow);
    }
}

// Creates the content of the timetable
function createTimeTable(table) {
    const tableHead = table.firstElementChild;
    const tableBody = table.lastElementChild;
    createTableHead(tableHead);
    createTableBody(tableBody);
 
}

// Fills and unordered list with list items containing subjects.
function createSubjectTable(table) {
    const tableBody = table.lastElementChild;
    subjects.map((s, i) => {
        const tableRow = document.createElement('tr');
        const tableData = document.createElement('td');
        tableData.setAttribute("isDeletable", "true");
        tableData.textContent = s;
        tableData.draggable = true;
        tableRow.appendChild(tableData);
        tableBody.appendChild(tableRow)
    });
}

export { createTimeTable, createSubjectTable }
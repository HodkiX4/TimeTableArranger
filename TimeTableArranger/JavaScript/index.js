import { subjects, weekDays } from "./dummyData.js";

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

// Creates the content of the timetable
function createTimeTable(table) {
    const tableHead = table.firstElementChild;
    const tableBody = table.lastElementChild;
    createTableHead(tableHead);
    createTableBody(tableBody);
 
}

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

// This makes sure that the code runs only after the DOM has loaded, so we don't try to accidentally access an element that doesn't exist yet, but it's not needed, if we place the script at the end of the body tag, I just put it here to make sure everything works fine.
window.document.addEventListener("DOMContentLoaded", () => {
    const subjectTable = document.getElementById("subjects-table");
    const timeTable = document.getElementById("time-table");
    createSubjectTable(subjectTable);
    createTimeTable(timeTable);

    const subjectTableBody = subjectTable.lastElementChild;
    const timeTableBody = timeTable.lastElementChild;
    if(subjectTableBody === null || timeTableBody === null) {
        return;
    }

    let dragElement = null;

    timeTableBody.addEventListener("dragstart", (e) => {
        dragElement = e.target.closest("td");
    });

    timeTableBody.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    timeTableBody.addEventListener("drop", (e) => {
        const tableData = e.target.closest("td");
        if(tableData.innerText === "") {
            tableData.innerText = dragElement.innerText;
            if(dragElement.hasAttribute("isDeletable")) {
                const dragElementParent = dragElement.parentElement;
                subjectTableBody.removeChild(dragElementParent);
            } else {
                dragElement.innerText = "";
            }
        } else {
                let swapperElement = dragElement.innerText;
                dragElement.innerText = e.target.innerText;
                tableData.innerText = swapperElement;
        }
    });

    subjectTableBody.addEventListener("dragstart", (e) => {
        const tableData = e.target.closest("td");
        if(!tableData) return;
        dragElement = tableData;
    });

    subjectTableBody.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    subjectTableBody.addEventListener("drop", (e) => {
        e.preventDefault();

        const tableRow = document.createElement("tr");
        const tableData = document.createElement("td");
        tableData.draggable = true;
        tableData.setAttribute("isDeletable", "true");
        tableData.innerText = dragElement.innerText;
        tableRow.appendChild(tableData);
        subjectTableBody.appendChild(tableRow);

        if(!dragElement.hasAttribute("isDeletable")) {
            dragElement.innerText = "";
        }
    });
});
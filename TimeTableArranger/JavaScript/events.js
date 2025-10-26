import { addSubjectTablePlaceholder, removeSubjectTablePlaceholder } from "./dom.js";

// The element we are currently dragging with our mouse.
let dragElement = null;

// The body of the subject table.
let subjectTableBody = null;

// The body of the timetable.
let timeTableBody = null;

// The drop event will only work, if we prevent the default behavior of the drag over event.
function dragOverEvent(e) {
    e.preventDefault();
}

// Selects the drag element on drag start.
function timeTableDragStartEvent(e) {
    dragElement = e.target.closest("td");
}


function timeTableDropEvent(e) {
    // Selects the closest cell to the mouse on drag start.
    const cell = e.target.closest("td");
    
    // Makes it so we can't replace fields containing time data.
    if(cell.hasAttribute("time-field")) {
        return;
    }
    // If its empty then it sets it to the inner text of the cell, otherwise it swaps the content of the cells.
    if(cell.innerText === "") {
        cell.innerText = dragElement.innerText;

        // If we are pulling it from the subjects table, then we want it to be deleted from the subjects table, if we pull it from another cell of the timetable, then we just set the inner text to empty.
        if(dragElement.hasAttribute("isDeletable")) {
            const dragElementParent = dragElement.parentElement;
            subjectTableBody.removeChild(dragElementParent);

        } else {
            dragElement.innerText = "";
        }
    } else {
            let swapperElement = dragElement.innerText;
            
            const confirmSwap = window.confirm(`Cserélni szeretnéd a ${dragElement.innerText} és ${cell.innerText} óra időpontját?`)
            
            if(confirmSwap) {
                dragElement.innerText = cell.innerText;
                cell.innerText = swapperElement;
            } else {
                return;
            }
    }
    window.alert(`A ${cell.innerText} órát sikeresen elhelyezted`);
    
    addSubjectTablePlaceholder(subjectTableBody);
}

function subjectTableDragStartEvent(e) {
    // Selects the closest cell to the mouse on drag start.
    const cell = e.target.closest("td");
    if(!cell) return;
    dragElement = cell;
}

function subjectTableDropEvent(e) {
    e.preventDefault();

    // If it comes from the subject table, we return, otherwise it would duplicate. 
    if (dragElement && dragElement.closest("tbody") === subjectTableBody) {
        return;
    }
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.draggable = true;
    cell.setAttribute("isDeletable", "true");
    cell.innerText = dragElement.innerText;
    row.appendChild(cell);

    subjectTableBody.appendChild(row);
    if(!dragElement.hasAttribute("isDeletable")) {
        dragElement.innerText = "";
    }

    removeSubjectTablePlaceholder(subjectTableBody);
}

export function initEventListeners(ttB, stB) {
    timeTableBody = ttB;
    subjectTableBody = stB;
    
    if(subjectTableBody === null || timeTableBody === null) {
        return;
    }
    
    subjectTableBody.addEventListener("dragstart", subjectTableDragStartEvent);
    subjectTableBody.addEventListener("dragover", dragOverEvent);
    subjectTableBody.addEventListener("drop", subjectTableDropEvent);

    timeTableBody.addEventListener("dragstart", timeTableDragStartEvent);
    timeTableBody.addEventListener("dragover", dragOverEvent);
    timeTableBody.addEventListener("drop", timeTableDropEvent);
}
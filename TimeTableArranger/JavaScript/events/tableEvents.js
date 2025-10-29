import { addSubjectTablePlaceholder, removeSubjectTablePlaceholder } from "../dom.js";

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
    const cell = e.target.closest("td");

    // Makes it so you can't drag an empty cell.
    if(!cell || cell.innerText === "") {
        e.preventDefault();
        return;
    }

    dragElement = cell;
}



function timeTableDropEvent(e) {
    // Selects the closest cell to the mouse on drag start.
    const cell = e.target.closest("td");
    
    // Makes it so we can't replace fields containing time data or replace the cell with its self.
    if(cell.hasAttribute("time-field") || cell === dragElement) {
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
        window.alert(`A ${cell.innerText} órát sikeresen elhelyezted`);
    } else {
            // A variable that is used to help swap the value of two table cells. 
            let swapperElement = dragElement.innerText;
            
            // Returns a boolean based on out answer
            const confirmSwap = window.confirm(`Cserélni szeretnéd a ${dragElement.innerText} és ${cell.innerText} óra időpontját?`)
            
            // If we click yes it swaps the two table cells otherwise it returns from the function.
            if(confirmSwap) {
                dragElement.innerText = cell.innerText;
                cell.innerText = swapperElement;
            } else {
                return;
            }
    }
    
    // Without it, if the subjects table is empty you can't pull back subjects anymore.
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
    if (dragElement && (dragElement.closest("tbody") === subjectTableBody)) {
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

export function initTableEvents(ttB, stB) {
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
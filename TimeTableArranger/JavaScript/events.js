let dragElement = null;
let subjectTableBody = null;
let timeTableBody = null;

function dragOverEvent(e) {
    e.preventDefault();
}

function timeTableDragStartEvent(e) {
    dragElement = e.target.closest("td");
}

function timeTableDropEvent(e) {
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
}

function subjectTableDragStartEvent(e) {
    const tableData = e.target.closest("td");
    if(!tableData) return;
    dragElement = tableData;
}

function subjectTableDropEvent(e) {
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
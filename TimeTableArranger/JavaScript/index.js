import { initEventListeners } from "./events.js";
import { createSubjectTable, createTimeTable } from "./dom.js";


// This makes sure that the code runs only after the DOM has loaded, so we don't try to accidentally access an element that doesn't exist yet, but it's not needed, if we place the script at the end of the body tag, I just put it here to make sure everything works fine.
window.document.addEventListener("DOMContentLoaded", () => {
    const subjectTable = document.getElementById("subjects-table");
    const timeTable = document.getElementById("time-table");
    createSubjectTable(subjectTable);
    createTimeTable(timeTable);

    const subjectTableBody = subjectTable.lastElementChild;
    const timeTableBody = timeTable.lastElementChild;

    initEventListeners(timeTableBody, subjectTableBody);
});
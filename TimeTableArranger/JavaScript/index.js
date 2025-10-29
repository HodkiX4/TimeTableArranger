import { createSubjectTable, createTimeTable } from "./dom.js";
import { initTableEvents } from "./events/tableEvents.js";
import { initStorageEvents } from "./events/storageEvents.js";

// This makes sure that the code runs only after the DOM has loaded, so we don't try to accidentally access an element that doesn't exist yet, but it's not needed, if we place the script at the end of the body tag, I just put it here to make sure everything works fine.
window.document.addEventListener("DOMContentLoaded", () => {

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
    initTableEvents(timeTableBody, subjectTableBody);
    
    // Add event listeners to forms and buttons.
    initStorageEvents(timeTableBody, subjectTableBody);

});
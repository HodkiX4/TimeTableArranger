// Returns our tables object from the localstorage.
const getTables = () => JSON.parse(localStorage.getItem("tables")) || {}


// Saves a new table to the localstorage.
function saveTable(name, subjectTableArray, timeTableArray) {
    const tables = getTables();

    // Adds the arrays to the tables object with the key "name".
    tables[name] = { subjectTableArray, timeTableArray };   
    
    // Saves the updated tables to the localstorage.
    localStorage.setItem("tables", JSON.stringify(tables));
}


function loadTable(name) {
    const tables = getTables();


    let tableName = null;
    // The array we user for storing the two table arrays.
    let tableArrays = [];

    // Iterates through the object entries and tries to fined the one with the given name.
    for(let [key, value] of Object.entries(tables)) {
        if(key === name) {
            tableName = name;
            tableArrays = value;
            break;
        }
    }

    // If table is null by this point, it means it's not stored.
    if(!tableName) {
        return;
    }

    // Returns the data of our timetable.
    return { tableName, tableArrays }
}

// Deletes a table from the localstorage.
function deleteTable(name) {
    const tables = getTables();
    // If the table with the given name exists, then we delete it and save the updated tables object to the localstorage.
    if(tables[name]) {
        delete tables[name];
        localStorage.setItem("tables", JSON.stringify(tables));
    }
}

export {
    getTables,
    saveTable,
    loadTable,
    deleteTable
}
function saveTable(name, subjectTableArray, timeTableArray) {
    const tables = JSON.parse(localStorage.getItem("tables")) || {};

    tables[name] = { subjectTableArray, timeTableArray };   
    
    localStorage.setItem("tables", JSON.stringify(tables));
}

function getTables() {
    const tables = JSON.parse(localStorage.getItem("tables")) || {};
    
    return tables;
}
function loadTable(name) {
    const tables = JSON.parse(localStorage.getItem("tables"));
    let tableName = null;
    let tableArrays = [];
    for(let [key, value] of Object.entries(tables)) {
        if(key === name) {
            tableName = name;
            tableArrays = value;
            break;
        }
    }
    if(!tableName) {
        console.error("No such table");
        return;
    }
    return { tableName, tableArrays }
}

function deletTable(name) {
    const tables = JSON.parse(localStorage.getItem("tables"));
    if(tables[name]) {
        delete tables[name];
        localStorage.setItem("tables", JSON.stringify(tables));
        console.log("Table deleted");
    } else {
        console.warn("No table to delete");
    }

}

export {
    getTables,
    saveTable,
    loadTable,
    deletTable
}
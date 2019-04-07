function createTableFromJSON(queryresult,container) {
//function createTableFromJSON(queryresult) {
    // EXTRACT VALUE FOR HTML HEADER.
    console.log("Creating table...");
//    var JSONqueryresult = JSON.stringify(queryresult)
    var JSONqueryresult = JSON.parse(queryresult)
//    console.log(JSONqueryresult);
    console.log(JSONqueryresult.length);
    var count = Object.keys(JSONqueryresult).length;
    console.log(count);
//    console.log(JSONqueryresult.size);
//    console.log(Object.keys(JSONqueryresult).size);
    var col = [];
    for (var i = 0; i < JSONqueryresult.length; i++) {
        for (var key in JSONqueryresult[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1); // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th"); // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < JSONqueryresult.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = JSONqueryresult[i][col[j]];
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    console.log("Container name: " + container);
    var divContainer = document.getElementById(container);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

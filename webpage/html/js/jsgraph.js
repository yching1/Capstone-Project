function addData(data) {
	for (var i = 0; i < data.length; i++) {
		dataPoints.push({
			x: new Date(data[i].date),
			y: data[i].units
		});
	}
	chart.render();

}

function createGraphFromJSON(queryresult,container) {
    console.log("Creating graph...");
    var JSONqueryresult = JSON.parse(queryresult);
    console.log(JSONqueryresult.length);
    var count = Object.keys(JSONqueryresult).length;
    console.log(count);
    var col = [];
    for (var i = 0; i < JSONqueryresult.length; i++) {
        for (var key in JSONqueryresult[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    // CREATE DYNAMIC GRAPH.
    var graph = document.createElement("graph");
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

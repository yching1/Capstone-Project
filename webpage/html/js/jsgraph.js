function createGraphFromJSON(queryresult,container,varx,agraphtype) {
    console.log("Creating graph...");
    var JSONqueryresult = JSON.parse(queryresult);
    console.log(JSONqueryresult.length);
    var count = Object.keys(JSONqueryresult).length;
    console.log(count);
    var col = [];
    var idxvarx;
    for (var i = 0; i < JSONqueryresult.length; i++) {
        for (var key in JSONqueryresult[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
                if (key === varx) {
                    idxvarx = i;
                }
            }
        }
    }

    var graphtype = "";
    var data = [];
    var adatum = {};
    var datapoints = [];
    var adatapoint = {};

    graphtype = agraphtype;
    for (var i = 0; i < col.length; i++) {
        if (col[i] === varx) {
            //do nothing;
        } else {
            adatapoint.length = 0;
            adatum.length = 0;
            for (var j = 0; j < JSONqueryresult.length; j++) {
                console.log(JSONqueryresult[j][col[i]]);
                adatapoint = {
                    x: JSONqueryresult[j][col[idxvarx]],
                    y: JSONqueryresult[j][col[i]]
                };
                datapoints.push(adatapoint);
//                console.log("datapoints: %0", datapoints);
                console.log(JSON.stringify(datapoints));
            }
            datum = {
                name: col[i],
		type: graphtype,
//		yValueFormatString: "#0.## °C",
		showInLegend: true,
		dataPoints: datapoints
            };
            console.log(datum);
            data.push(datum);
//            console.log("data: %0", data);
            console.log(JSON.stringify(data));
        }
    }


    // CREATE DYNAMIC GRAPH.
    var table = document.createElement("table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1); // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
        if (col[i] === varx) {
          var th = document.createElement("th"); // TABLE HEADER.
          th.innerHTML = col[i];
          tr.appendChild(th);
        }
    }
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < JSONqueryresult.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            if (col[j] === varx) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = JSONqueryresult[i][col[j]];
            }
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    console.log("Container name: " + container);
    var divContainer = document.getElementById(container);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

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
    var adatum = [];
    var alldatasets = [];
    var adataset = {};
    graphtype = agraphtype;
    var xlabels = [];

    var chartColors15 = [
        'rgba(0, 0, 0, 1)', 
        'rgba(0, 73, 73, 1)',
        'rgba(0, 146, 146, 1)',
        'rgba(255, 109, 182, 1)',
        'rgba(73, 0, 146, 1)',
        'rgba(0, 109, 219, 1)',
        'rgba(182, 109, 255, 1)',
        'rgba(109, 182, 255, 1)',
        'rgba(255, 182, 119, 1)',
        'rgba(182, 219, 255, 1)',
        'rgba(146, 0, 0, 1)',
        'rgba(146, 73, 0, 1)',
        'rgba(219, 209, 0, 1)',
        'rgba(36, 255, 36, 1)',
        'rgba(255, 255, 109, 1)'
    ];
    var chartColors6 = [
        'rgba(255, 255, 255, 1)', //white
        'rgba(0, 0, 0, 1)', //black
        'rgba(255, 127, 0, 1)', //orange
        'rgba(255, 255, 0, 1)', //yellow
        'rgba(0, 0, 255, 1)', //blue
        'rgba(127, 127, 127, 1)' //grey
    ];

    coloridx = -1;

    // Populate dataset for the graphs
    for (var i = 0; i < col.length; i++) {
        adatapoint.length = 0;
        adatum.length = 0;
        for (var j = 0; j < JSONqueryresult.length; j++) {
            if (col[i] === varx) {
                // The X values are stored as xlabels
                xlabels.push(JSONqueryresult[j][col[i]])
            } else { 
                // data: [y0,y1,...];
                console.log("adatum: %0: ", JSONqueryresult[j][col[i]]);
                adatum.push(JSONqueryresult[j][col[i]]);
            }
        }  
        if (col[i] === varx) {
        } else {
            coloridx += 1;
            if (coloridx > 14) {
                coloridx = 0;
            }
            // data structure for each Y-variable
            adataset = {
                label: col[i],
		backgroundColor: chartColors15[coloridx],
                borderColor: 'rgba(255,255,255,1)',
                borderWidth: 1,
		data: adatum
            };
            console.log(adataset);
            alldatasets.push(adataset);
            console.log(JSON.stringify(alldatasets));
        }
    }
    var chartData = {
        labels: xlabels,
        datasets: alldatasets        
    };

    var myChart = {
        type: graphtype.
        data: chartData,
        options: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };

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

    var graphic = document.createElement("agraph");

}

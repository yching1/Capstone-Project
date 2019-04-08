// PREPARE DATA FOR GRAPH

function addData(data) {
	for (var i = 0; i < data.length; i++) {
		dataPoints.push({
			x: new Date(data[i].date),
			y: data[i].units
		});
	}
	chart.render();

}

function buildgraph(queryresult,varx) {
    console.log("Preparing variables for graph...");
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

    let dropdown = document.getElementById('varx');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');

    for (let i = 0; i < count; i++) {
      option = document.createElement('option');
      option.text = col[i]
      option.value = col[i];
      dropdown.add(option);
    }
    defaultOption.text = col[0];
    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
}

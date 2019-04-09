function freequery(querylabel, queryoutput, tableoutput, varx, graphtype) {
  var querytxt, querytxtJSON, xmlhttp; 
  var responseText;
//  querytxt = document.getElementById(querylabel).value;
  querytxt = querylabel;

  genquery(querytxt, function(responseText) {

//    console.log('ResponseText: ' + responseText);
//    console.log('ResponseText length: ' + responseText.length);
    if (responseText.length <=3) {
      document.getElementById(queryoutput).innerHTML = "<i>Query returned empty.</i>";
    } else {
      document.getElementById(queryoutput).innerHTML = responseText;
      theresult = responseText;
      JSONtheresult = JSON.stringify(theresult);
      createTableFromJSON(theresult,tableoutput);
//      createGraphFromJSON(theresult,graphoutput);
      buildgraph(theresult,varx,graphtype);
    }
  });
  return false;
}




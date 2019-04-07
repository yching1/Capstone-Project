function freequery(querylabel, queryoutput, tableoutput) {
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
    }
  });
  return false;
}




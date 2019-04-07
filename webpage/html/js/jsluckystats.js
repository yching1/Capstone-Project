function luckystats() {
  var querytxt, querytxtJSON, xmlhttp; 
  var lucky = [];
  var responseText;

  lucky.push(document.getElementById("lucky1").value);
  lucky.push(document.getElementById("lucky2").value);
  lucky.push(document.getElementById("lucky3").value);
  lucky.push(document.getElementById("lucky4").value);
  lucky.push(document.getElementById("lucky5").value);
  lucky.sort(function(a, b){return a-b});

  document.getElementById("luckysorted").innerHTML = "This is your sequence in sorted order: <br><table><tr><td>" + lucky[0] + "-" + lucky[1] + "-" + lucky[2] + "-" + lucky[3] + "-" + lucky[4] + "</td></tr></table>"
  querytxt = "SELECT * from MassCashTbl where ordseq = '" + lucky[0] + "-" + lucky[1] + "-" + lucky[2] + "-" + lucky[3] + "-" + lucky[4] + "';"

  document.getElementById("thequery").innerHTML = "This is the query for your search: <br><table><tr><td>" + querytxt + "</td></tr></table>"

  genquery(querytxt, function(responseText) { 

    console.log('ResponseText: ' + responseText);
    console.log('ResponseText length: ' + responseText.length);
    if (responseText.length <=3) {
      document.getElementById("wasitdrawn").innerHTML = "<i>Such number combination never won a prize... <b> Until now... </b></i>";
    } else {
      theresult = responseText;
      JSONtheresult = JSON.stringify(theresult);
      createTableFromJSON(theresult,"wasitdrawn");
    }
  });
  return false;
}


function genquery(querytxt, cb) {

  var querytxtJSON, xmlhttp; 

  console.log('Received query: ' + querytxt);
  querytxtJSON = JSON.stringify(querytxt);
  // Returns successful data submission message when the entered information is stored in database.
  if (querytxt == '') {
    alert("Please input the query");
  } else if (querytxt.toLowerCase().includes("insert")) {
    alert("Invalid word in query: INSERT");
  } else if (querytxt.toLowerCase().includes("grant")) { 
    alert("Invalid word in query: GRANT");
  } else if (querytxt.toLowerCase().includes("create")) {
    alert("Invalid word in query: CREATE");
  } else {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log('Query response: ' + this.responseText);
        console.log('Query response size: ' + this.responseText.length);
//        return (this.responseText);
        if( typeof cb === 'function' )
          cb(xmlhttp.responseText);
      }
    }
    xmlhttp.open("POST", "php/freequery.php?querytxt=" + querytxtJSON, true);
    xmlhttp.send();	
  }
//  return false;
}


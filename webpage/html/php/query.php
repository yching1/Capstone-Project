<?php include "/var/www/inc/dbinfo.inc";

  header("Content-Type: application/json; charset=UTF-8");

  $querytxt = json_decode($_GET["querytxt"], false);

  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();
  $database = mysqli_select_db($connection, DB_DATABASE);

  $result = mysqli_query($connection, $querytxt); 

  $rows = array();
  while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
  }

  echo json_encode($rows);
  mysqli_free_result($result);
  mysqli_close($connection);

?>


<?php
header( "Access-Control-Allow-Origin: *");


/*
 * Get Params
 */

$startTime = "";
$endTime = "";


$startTimeSQL = " ";
$endTimeSQL = " ";

$startTime = $_GET["startTime"];
$endTime = $_GET["endTime"];


if ( !empty($startTime)) {
    $startTimeSQL = " pubdate > date (\"$startTime\") ";
}
if ( !empty($endTime)) {
    $endTimeSQL = "date (\"$endTime\") ";
}

/* End of file filename.php */
$host="host=127.0.0.1" ;
$port="port=5432" ;
$dbname="dbname=news" ;
$credentials="user=carwest password=123qwe!@#QWE" ;
$db=pg_connect( "$host $port $dbname $credentials" );
if (!$db){
    echo "Error : unable to connect";
}else { //echo "Opened database success";
}

$query='SELECT * from locations limit 100' ;
$result=pg_query($query) or die( 'Query failed:'.pg_last_error() );
$ans_stack=array();
echo "[";
while ( $ro=pg_fetch_object($result) )
{
    //array_push( $ans_stack, $ro ); //echo $ro;
    echo json_encode($ro);
    echo ",";
}
echo "{}]";
pg_free_result($result);
pg_close( $db );
?>

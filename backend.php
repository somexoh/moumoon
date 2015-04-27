<?php
/* End of file filename.php */
$host       = "host=127.0.0.1";
$port       = "port=5432";
$dbname     = "dbname=news";
$credentials= "user=carwest password=123qwe!@#QWE";

$db = pg_connect( "$host $port $dbname $credentials" );
if (!$db){
    echo "Error : unable to connect";
}else {
    //echo "Opened database success";
}

$query = 'SELECT * from baidurss limit 10';
$result = pg_query($query) or die( 'Query failed:'.pg_last_error() );

$ans_stack = array();

echo "[";
while ( $ro = pg_fetch_object($result) ){
    //array_push( $ans_stack, $ro );
    //echo $ro;
    echo json_encode($ro);
    echo ",";
}
echo "{}]";

pg_free_result($result); 
pg_close( $db );
?>


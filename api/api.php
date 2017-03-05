# Your RESTFUL API
<?php

$dbconn = pg_connect("host=localhost port=5432 dbname=a2 user=postgres password=master");
$querry = "INSERT INTO user(name,email,numGamesPlayed,lastLogin) as values(bob,bob@gmail,2,yesterday);";
//pg_prepare($dbconn,"new_entry",$querry);
pg_query($dbconn,$querry);
echo "hello";

function fethch($email){



}













?>

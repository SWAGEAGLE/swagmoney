<?php

	header('Content-Type: application/json');
	$dbconn = pg_connect("host=localhost port=5432 dbname=postgres user=postgres password=master");
	//pg_prepare($dbconn,"alias","INSERT INTO test(name,email,numGamesPlayed,lastLogin) values($1,$2,$3,$4);");
	//pg_execute($dbconn, "alias", array("bob", "bob@mail", 3, "yesterday"));

	//pg_query($dbconn, "INSERT INTO test(fname, lname, username, passwd, email, numgamesplayed, lastlogin) values ('Bob', 'Smith', 'bobby', 'bob', 'bob@example.com', 0, null);");
	//echo "hello";
	$method = $_SERVER['REQUEST_METHOD'];
	parse_str(file_get_contents('php://input'), $input); 
	$reply = array();
    switch ($method) {
  		case 'GET':
  			getUserInfo();
			break;
 	    case 'PUT': # new item
			break;
  		case 'POST': # update to existing item
  			register();
			break;
  		case 'DELETE':
			 break;
	}



	function getUserInfo(){
		global $dbconn;
		if(isset($_REQUEST['user']) && isset($_REQUEST['pass'])){
			$user = $_REQUEST['user'];
			$pass = $_REQUEST['pass'];
			pg_prepare($dbconn, 'verify', 'SELECT * from test where username = $1 and passwd = $2 ;');
			$result = pg_execute($dbconn,'verify',array($user,$pass));
			$status = (pg_num_rows($result) == 0? 'fail':'ok');
			$reply = array();
			//querry for the user name and database
			$reply['status'] = $status;
			if($status === 'ok'){
				$info = pg_fetch_row($result);
				$reply['firstname'] = $info[0];
				$reply['lastname'] = $info[1];
				$reply['username'] = $info[2];
				$reply['email'] = $info[4];
				$reply['gamesplayed'] = $info[5];
				$reply['score'] = $info[6];

			}
			print json_encode($reply);
		}
	}

	function register(){
		global $dbconn; 
		if(isset($_REQUEST['fname'])
		    && isset($_REQUEST['lname']) 
			&&isset($_REQUEST['username'])
		    && isset($_REQUEST['passwd']) 
			&& isset($_REQUEST['email'])){
			$fname = $_REQUEST['fname'];
			$lname = $_REQUEST['lname'];
			$username = $_REQUEST['username'];
			$passwd =$_REQUEST['passwd'];
			$email = $_REQUEST['email'];
			pg_prepare($dbconn,"register","INSERT INTO test(fname,lname,username,passwd,email,numgamesplayed, score, lastlogin) values($1,$2,$3,$4,$5,0,1,null) ;");
			$result = pg_execute($dbconn,"register",array($fname,$lname,$username,$passwd,$email));
		}
	}

	function replace(){
		global $dbconn;
		if(isset($_REQUEST['username'])){
			
			
		}

	}
?>

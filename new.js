function toggleLogin(setup,start){
	$(document).ready(
    	$('#log').click(function(e){
            if (logValidate() != false){
	        	e.preventDefault();	
	        	let username = $('#uname').val();
	        	let pass = $('#psw').val();
	        	profile(username,pass,setup,start);
	        	fun(username,pass,setup,start);
	        	challenge(username);
	        	requests(username);
	        	logout();
			}
		}))	
	//FROM THE FROM FRONTPAGE TO REGISTER
   	 $(document).ready(
    	$('#reg').click(function(e){
    		showHideLog(setup,start);
        	e.preventDefault();
        	$('#login').hide()
        	$('#register').show()

    }))

}
// show/hide login at registration page
function showHideLog(setup,start){
	// go back to login (back button)
	$(document).ready(
    	$('#backLog').click(function(e){
        	e.preventDefault();
        	$('#register').hide()
        	$('#login').show()
    }))

    // go to game (next button)
    $(document).ready(
    	$('#toGame').click(function(e){
        	e.preventDefault();
            if (regValidate() != false){
	        	//new
	        	registerRequest();
	            $('#register').hide()
	            setup();
	            start();
	            $('#game').show();
	            profile($('#usernameREG').val(),$('#passwdREG').val(),setup,start);
	        }
    }))
}
function logValidate(){
	if ($('#uname').val()== ""){
		alert( "Please provide your username!" );
        $('#uname').focus();
        return false;
	}

	if (document.logForm.psw.value == ""){
		alert( "Please provide your password!" );
        document.logForm.psw.focus() ;
        return false;
	}
}
function regValidate(){

	if ($('#fnameREG').val() == ""){
		alert( "Please provide your first name!" );
        $('#fnameREG').focus() ;
        return false;
	}

	if ($('#lnameREG').val() == ""){
		alert( "Please provide your last name!" );
        $('#lname').focus() ;
        return false;
	}

	if ($('#usernameREG').val() == ""){
		alert( "Please provide your username!" );
        $('#usernameREG').focus() ;
        return false;
	}

	if ($("#passwdREG").val() == ""){
		alert( "Please provide your password!" );
        $("#passwdREG").focus() ;
        return false;
	}

	if ($("#emailREG").val() == ""){
		alert( "Please provide your email!" );
        $("#emailREG").focus() ;
        return false;
	}

}


function registerRequest(){
	var params = { 
	method: "PUT", 
	url: "api/api.php", 
	data: { "fname": $("#fnameREG").val() , "lname" : $("#lnameREG").val(), "username" : $("#usernameREG").val(),
			"passwd" : $("#passwdREG").val(), "email" : $("#emailREG").val() } 
	};
	$.ajax(params);
	$('#welcomeLog').text('Welcome, '+$("#usernameREG").val());
	challenge($("#usernameREG").val());
}

var fun = function login(user,pass,setup,start){
	$.getJSON("api/api.php", {user: user,pass: pass},
	function(data){
	if(data['status'] == 'ok'){
	    $('#login').hide();
	    setup();
	    start();
	    $('#game').show();
	    $('#welcomeLog').text('Welcome, '+data['username']);
	}
		
    })
    .fail(function(jqXHR, textStatus, errorThrown) { alert('Invalid username/password'); })

}
function profUpdate(fname,lname,user,oldpasswd,newpasswd,email){
	var params = { 
		method: "POST", 
		url: "api/api.php", 
		dateType: 'json',
		async: false,
		success: function(data){
			console.log(true);
		},
		error: function(jqXHR, exception){
			var msg = '';
        	if (jqXHR.status === 403){
        		alert('Incorrect old password');
        	}
		},
		data: {"fname": fname,"lname": lname, "user": user, "oldpasswd": oldpasswd, "newpasswd": newpasswd, "email": email} 
	};
	return $.ajax(params);
}

function setScores(){
	$.getJSON("api/api.php", {highscores: null},
	function(data){
		var table = document.getElementById("highscores");
		var i;
		for (i=0; i<data.length;i++){
		    var row = table.insertRow(i+1);
		    var cell1 = row.insertCell(0);
		    var cell2 = row.insertCell(1);
		    cell1.innerHTML = data[i][0];
		    cell2.innerHTML = data[i][1];
		}
    })
}

function profile(username,password,setup,start){
	$(document).ready(
    	$('#profile').click(function(e){
        	e.preventDefault();
        	$('#game').hide();
        	$('#prof').show();
        	$.getJSON("api/api.php", {user: username, pass:password},
				function(data){
					document.getElementById('oldPasswd').value='';
					document.getElementById('newPasswd').value='';
        			document.getElementById('mfname').value=data['firstname'];
        			document.getElementById('mlname').value=data['lastname'];
        			document.getElementById('memail').value=data['email'];
        		})
    }))

    // go back to game (back button)
	$(document).ready(
    	$('#backGame').click(function(e){
        	e.preventDefault();
        	$('#prof').hide();
        	$('#game').show();
    }))

    // go to game (next button)
    $(document).ready(
    	$('#toGame2').click(function(e){
        	e.preventDefault();
	        	//new
	        	let fname = $('#mfname').val();
	        	let lname = $('#mlname').val();
	        	let uname = username;
	        	let opass = $('#oldPasswd').val();
		        let npass = $('#newPasswd').val();
		        let email = $('#memail').val();
	        	profUpdate(fname,lname,uname,opass,npass,email).done(function(data){
	        		if (data=true){
	        			$('#prof').hide();
        				$('#game').show();
	        		}
	        	})
    }))
}
function challenge(user){
	$(document).ready(
    	$('#sendChal').click(function(e){
    		e.preventDefault();
    		//var dataobj={challenger: user, opponent: $("#chal").val()};
    		var params = { 
					method: "PUT", 
					url: "api/api.php", 
					data: {challenger: user, opponent: $("#chal").val()}
				};

			$.ajax(params).done(alert("hi"));
    	}))
}

function requests(user){
	$.getJSON("api/api.php", {user: user},
		function(data){
			var i;
			for (i=0; i<data.length;i++){
				var new1=document.getElementById('rightSide');
				new1.innerHTML+='<label>USERNAME: '+data[i][0]+" SCORE:"+data[i][1]+'</label><br>';
				new1.innerHTML+='<button type="submit" id="'+data[i][0]+i+'">Accept</button>';
				new1.innerHTML+='<button type="submit" id="decline">Decline</button>';
			}	
		})
}
var startTime;
function display(){
	// later record end time
    var endTime = new Date();

    // time difference in ms
    var timeDiff = endTime - startTime;

    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff % 60);
    $("#score").text("SCORE: "+seconds);
    setTimeout(display, 1000);
}
function score() {
	// for the example we start counting at Start
	startTime = new Date();
  	setTimeout(display, 1000);
}
function clickset(){




}

function logout(){
	$(document).ready(
    	$('#logout').click(function(e){
        	e.preventDefault();
        	$('#game').hide();
        	$('#login').show();
        	document.getElementById('uname').value='';
			document.getElementById('psw').value='';
        }))
}
function toggleLogin(setup,start){
	$(document).ready(
    	$('#log').click(function(e){
            if (logValidate() != false){
	        	//new
	        	//let username = $('#uname').val();
	        	//let password = $('#psw').val();
	        	//putAccountDetails(username,password);
	        	let username = $('#uname').val();
	        	let pass = $('#psw').val();
				$.getJSON("api/api.php",
					{user: username, pass: pass}, 
					function(data){
					if(data['status'] == 'ok'){
						alert('heee');
	            		$('#login').hide();
	            		setup();
	            		start();
	            		$('#game').show();
	             	}
	             	alert('letsgo');
    				})
			}
		}))	

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
	        }
    }))
}
function logValidate(){
	
	if (document.logForm.uname.value == ""){
		alert( "Please provide your username!" );
        document.logForm.uname.focus() ;
        return false;
	}

	if (document.logForm.psw.value == ""){
		alert( "Please provide your password!" );
        document.logForm.psw.focus() ;
        return false;
	}
}
function regValidate(){

	if (document.regForm.fname.value == ""){
		alert( "Please provide your first name!" );
        document.regForm.fname.focus() ;
        return false;
	}

	if (document.regForm.lname.value == ""){
		alert( "Please provide your last name!" );
        document.regForm.lname.focus() ;
        return false;
	}

	if (document.regForm.regUname.value == ""){
		alert( "Please provide your username!" );
        document.regForm.regUname.focus() ;
        return false;
	}

	if (document.regForm.regPsw.value == ""){
		alert( "Please provide your password!" );
        document.regForm.regPsw.focus() ;
        return false;
	}

	if (document.regForm.email.value == ""){
		alert( "Please provide your email!" );
        document.regForm.email.focus() ;
        return false;
	}

}


function registerRequest(){
	var params = { 
	method: "POST", 
	url: "api/api.php", 
	data: { "fname": $("#fname").val() , "lname" : $("#lname").val(), "username" : $("#username").val(),
			"passwd" : $("#passwd").val(), "email" : $("#email").val() } 
	};
	$.ajax(params);

}

function toggleLogin(setup,start){
	$(document).ready(
    	$('#log').click(function(e){
        	e.preventDefault();
            if (logValidate() != false){
	        	//new
	            $('#login').hide();
	            setup();
	            start();
	            $('#game').show();
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


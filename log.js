function showHide(form) {   
    var serial = $(form).serialize();  
    $.post(form.action, serial, function(){  
        $('#game').show();  
    });  
};

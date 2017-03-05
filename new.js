function toggleLogin(setup,start){
                $(document).ready(
                    $('#test').click(function(e){
                        e.preventDefault();
                        //new
                        $('#login').hide();
                        setup();
                        start();
                        $('#game').show();
                    }))
}
  


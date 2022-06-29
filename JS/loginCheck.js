$(document).ready(function(){
    $('#loginbutton').click(function () {
        var user= $('#username').val();
        var pass= $('#password').val();

        $.get('/checkacc', {name: user, pas:pass}, function (result) {
            $('#error').css('color', 'red');
            if(result.username == user) {
                // $('#username').css('background-color', 'red');
                $('#error').text('Username already exists');
                // $('#registerbutton').css('background-color', 'red')
                // $('#registerbutton').prop('disabled', true);
            }
            else{
                // $('#username').css('background-color', '#E3E3E3');
                $('#error').text('');
                // $('#registerbutton').css('background-color',' #4CAF50')
                // $('#registerbutton').prop('disabled', false);
            }
        });
    });
});
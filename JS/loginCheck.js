$(document).ready(function(){
    $('#loginbutton').click(function () {
        var user= $('#username').val();
        var pass= $('#password').val();

        $.get('/checkacc', {name: user, pas:pass}, function (result) {
            $('#error').css('color', 'red');
            if(result.username == user) {
                $('#error').text('Username already exists');
            }
            else{
                $('#error').text('');
            }
        });
    });
});
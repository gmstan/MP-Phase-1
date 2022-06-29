$(document).ready(function(){
    $('#username').keyup(function () {
        // your code here
        var user= $('#username').val();
        $.get('/checkuser', {name: user}, function (result) {
            $('#error').css('color', 'red');
            if(result.username == user) {
                $('#username').css('background-color', 'red');
                $('#error').text('Username already exists');
                $('#registerbutton').css('background-color', 'red')
                $('#registerbutton').prop('disabled', true);
            }
            else{
                $('#username').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#registerbutton').css('background-color',' #4CAF50')
                $('#registerbutton').prop('disabled', false);
            }
         });
     });
});
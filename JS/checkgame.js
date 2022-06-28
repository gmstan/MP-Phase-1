$(document).ready(function(){
    $('#title').keyup(function () {
        // your code here
        var title= $('#title').val();
        $.get('/checkgame', {gametitle: title}, function (result) {
            $('#error').css('color', 'red');
            let checker = false;
            
            for(let counter = 0; counter < result.libgames.length; counter++){
                if (result.libgames[counter].title == title){
                    checker = true
                    break
                }
            }
            console.log(checker)
            if(checker == true) {
                $('#title').css('background-color', 'red');
                $('#error').text('Game already exists');
                $('#save').css('background-color', 'red')
                $('#save').prop('disabled', true);
            }
            else{
                $('#title').css('background-color', '#E3E3E3');
                $('#error').text('');
                $('#save').css('background-color','#1ba099');
                $('#save').prop('disabled', false);
            }
         });
     });
});
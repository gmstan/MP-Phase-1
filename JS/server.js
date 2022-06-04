const express = require('express');
const app= new express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '\\' + 'index.html');
});

// app.get('.login',(req,res)=>{
//     res.sendFile(__dirname + '\\' + 'index.html');
// });


app.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    res.send('Username: ${username} Password: ${passwod}');
});

var server = app.listen(3000,function(){
    console.log('On Port 3000');
});
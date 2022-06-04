const express = require('express');
const app= express();

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '../HTML/index.html');
});

app.get('.login',(req,res)=>{
    res.sendFile(__dirname + '../HTML//index.html');
});



app.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    res.send('Username: ${username} Password: ${passwod}');
});


app.listen(3000,()=>console.log('On Port 3000'));
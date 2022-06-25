
// const express = require('express');
// const app= new express();

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/gamelib',
// {useNewURLParser: true, useUnifiedTopology: true});

// //File Uploads
// const fileUpload = require('express-fileupload');

// //post init
// const Game = require("./database/models/Game");
// const path=  require('path');

// //Init data and stat folder
// app.use(exprtess.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));
// app.use(fileUpload());


// // const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended:false}));

// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + '\\' + 'index.html');
// });

// // app.get('.login',(req,res)=>{
// //     res.sendFile(__dirname + '\\' + 'index.html');
// // });


// app.post('/login',(req,res)=>{
//     let username = req.body.username;
//     let password = req.body.password;
//     res.send('Username: ${username} Password: ${passwod}');
// });

// var server = app.listen(3000,function(){
//     console.log('On Port 3000');
// });


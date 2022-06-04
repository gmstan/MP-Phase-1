const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Account = require('./database/models/account');

mongoose.connect('mongodb://localhost/AccountDB');

app.set('view-engine', 'ejs');
app.set('views','./HTML/views');
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.render('index.ejs')

})
app.get('/register', (req, res)=>{
    res.render('registration.ejs')
})
app.post('/login-post', (req, res)=>{

});
app.post('/register-post', (req, res)=>{
    

        //const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // code here for adding to the database
        Account.create(req.body, (error, account)=>{
                console.log(req.body)
                res.redirect('/')
            }
        )
        // Account.create({
        //     username : 'Colonel',
        //     pass : '12345',
        // }), (error, account)=>{
        //     console.log(req.body)
        // }
   
})

app.listen(3000)
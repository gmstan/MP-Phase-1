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
app.post('/register-post', async(req, res)=>{

        try{
             const hashedPassword = await bcrypt.hash(req.body.pass, 10)
           

            // code here for adding to the database
            Account.create({
                    username: req.body.username,
                    pass: hashedPassword,
                },
                    (error, account)=>{
                        console.log(error, account);
                        
            })
            res.redirect('/');    
        }
        catch{
            res.redirect('/register');
        }
      
})

app.listen(3000)
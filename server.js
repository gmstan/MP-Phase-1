

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const flash = require('express-flash')
const session = require('express-session');
const hbs = require("hbs");

const Account = require('./database/models/account');


mongoose.connect('mongodb://localhost/AccountDB');

app.set('view-engine', 'hbs');
app.set('views','./HTML/views');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
// Flash
app.use(flash());

// Global messages vars
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   next();
// });
app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: false
}))
// app.use(passport.initialize())
// app.use(passport.session())

app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.render('index.hbs')

})
app.get('/register', (req, res)=>{
    res.render('registration.hbs')
})
app.post('/login-post', (req, res)=>{
   Account.findOne({username : req.body.username}, (err, user)=>{
       if (err){
           console.log(err)
       }
       else{
           if(user){
               bcrypt.compare(req.body.pass, user.pass, (err, result)=>{
                    if (result){
                        req.session.user = user._id;
                        req.session.name = user.username;
                        console.log("Hello, " + req.body.username);
                    }
                    else{
                        console.log("username or password did not match")
                    }
               })
                
           }
           else{
               console.log("Username or password did not match")
           }
       }
   })
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
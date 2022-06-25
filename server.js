const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const flash = require('express-flash')
const session = require('express-session');
const hbs = require("hbs");
const Account = require('./database/models/account');
const fileUpload = require('express-fileupload');
const path = require('path')
//const bodyparser = require('body-parser')

acc = ""
mongoose.connect('mongodb://localhost/AccountDB',{useNewURLParser: true, useUnifiedTopology: true});

app.set('view-engine', 'hbs');
app.set('views','./HTML/views');

app.use(express.urlencoded({extended : true}));
app.use(express.json());
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended: true}))

// Flash
app.use(flash());


app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(__dirname));
app.use(fileUpload())

app.get('/log-out', (req, res)=>{
    req.session.user = "";
    req.session.name = "";
    res.render('index.hbs');
})

app.get('/view-profile', (req,res)=>{
    res.render('profile.hbs', {
        name: acc,
    });
})

app.get('/', (req,reqs) =>{
    res.render('index.hbs');
})

app.get('/register', (req, res)=>{
    res.render('registration.hbs')
})

app.get('/profile-register', (req, res)=>{
    
    res.render('profile-regis.hbs', {
        name: acc,  
    })
})

app.post('/register-details', (req,res)=>{
    const image = req.files.picture
    image.mv(path.resolve(__dirname,'Images/profpics',image.name), (err)=>{
        Account.findOne({username : acc},(err, user)=>{
            if(err){
                console.log(err)
            }
            else{
                if(!user){
                    console.log("no user exists")
                }
                else{
                    
                    if (image.name){
                        user.picture =  "Images/profpics/" + image.name
                    }
                    if(req.body.description){
                        user.description = req.body.description
                    }
                    if(req.body.birthday){
                        user.birthday = req.body.birthday
                    }
                    user.save((err, updatedUser)=>{
                        if (err){
                            console.log(err)
                        }
                        else{
                            //res.send(updatedUser)
                            res.redirect('/')
                        }
                    })
                }
                
            }
        });
       
      });


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
                        res.render("home.hbs");
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
           

            //check if username exists
            // Account.findOne({username : req.body.user},(err,result)=>{
            //     if(!result)
            //     {
            //         // put create here

            //     }

            //     else
            //         console.log.appl("Account with Username already exists");

            // })


            // code here for adding to the database
            Account.create({
                    username: req.body.username,
                    pass: hashedPassword,
                },
                    (error, account)=>{
                        //console.log(error, account);
                        
            })
            acc = req.body.username
            res.redirect('/profile-register')    
        }
        catch{
            res.redirect('/register');
        }
      
});



app.post('/game-direct', async(req,res)=>{
    // try{
    //     //find one (game name)
    //     if(found)
    //         res.render('game.hbs',{//game found})
    // }
    // catch{
    //     res.render('/');
    // }
});

app.get('/addGame',(req,res)=>{

//     res.findOne(//gameTitle,(err,game)=>{
//         if(game)
//         {
//             res.render('game.hbs',game);
//         }
//         else
//             res.render('/');
//     })

});

app.listen(3000)
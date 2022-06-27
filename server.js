const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const flash = require('express-flash')
const session = require('express-session');
const hbs = require("hbs");
const Account = require('./database/models/account');
const Game = require('./database/models/game');
const fileUpload = require('express-fileupload');
const path = require('path')

var Game1;
//const bodyparser = require('body-parser')
var currgame;
acc = ""
mongoose.connect('mongodb://0.0.0.0/AccountDB',{useNewURLParser: true, useUnifiedTopology: true});


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
app.get('/edit-details', (req, res)=>{
    //get details
    Account.findOne({username:acc}, (err, user)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("edit-prof.hbs",{
                name: user.username,
                image: user.picture,
                desc:user.description,
                birth: user.birthday
            });
        }
    })
})
app.post('/save-edit', async(req, res)=>{
    console.log(req.body.newname)
    console.log(req.body.newpass)
    try{
        const hash = await bcrypt.hash(req.body.newpass, 10);
        Account.findOne({username:acc}, (err, origuser)=>{
            if(err){
                console.log(err)
            }
            else{
                if(origuser){
                    Account.findOne({username:req.body.newname}, (err, user)=>{
                        if(err){
            
                        }
                        else{
                            if(!user || origuser.username == req.body.newname){//ensure username is not a duplicate except if it is equal to current username then disregard
                                origuser.username = req.body.newname;
                                const image = req.files.picture;
                                tempname = 'Images/profpics/' + image.name;
                                if(image.name != origuser.picture){// image not same with current
                                    origuser.picture = tempname;
                                    image.mv(path.resolve(__dirname,'Images/profpics',image.name), (err)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                    });
                                }
                                origuser.description = req.body.description;
                                origuser.birthday = req.body.birthday;
                                origuser.pass = hash;
                                origuser.save((err, updatedUser)=>{
                                    if (err){
                                        console.log(err)
                                    }
                                    else{
                                        //res.send(updatedUser)
                                        res.redirect('/')
                                    }
                                })
                            }
                            else{
                                res.redirect('/save-edit');
                            }
                        }
                    })
                }
            }
           
        })
            
    }
    catch{
        res.redirect('/save-edit');
    }
   
    
  
})
app.get('/delete-profile', (req, res)=>{
    Account.deleteOne({username:acc}, (err, user)=>{
        if (err){
            console.log(err)
        }
        else{
            res.redirect('/');
        }
       
    })
})

app.get('/view-profile', (req,res)=>{
    // retrieve info from db
    console.log(acc);
    Account.findOne({username:acc}, (err, user)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('profile.hbs', {
                name: user.username,
                image: user.picture,
                description: user.description,
                birthday: user.birthday,
                gameNo: user.games,
            });
        }
    })
})

app.get('/', (req,res) =>{
    res.render('index.hbs');
})

app.get('/register', (req, res)=>{
    res.render('registration.hbs')
})

app.get('/home', (req, res)=>{
    Account.findOne({username : acc}, (err, user) => {
        res.render('home.hbs', {display: user.libgames});
    })
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
                        acc = user.username;
                        console.log("Hello, " + req.body.username);
                        res.redirect("/home");
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
                    games: 0,
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
<<<<<<< Updated upstream

app.get('/get-game', async(req,res)=>{
        Game1 = req.query.word;
=======
app.get('/get-game', (req,res)=>{
    currgame = req.query.word
})
app.get('/game-direct', async(req,res)=>{
    Account.findOne({username: acc}).exec(function(err, user){
        if(err){

        }
        else{
            counter = 0
            for(let i = 0; i < user.libgames.length; i++){
                if(user.libgames[i].title == currgame){
                    counter = i
                    break
                }
            }
            res.render("game.hbs",{
                title : user.libgames[counter].title,
                image: user.libgames[counter].image2,
                description: user.libgames[counter].description,
                genre: user.libgames[counter].genre,
            })
        }
    }) 
       
   
    
    //game found})
>>>>>>> Stashed changes
});

app.get('/view-game', (req,res) =>{
    res.render('game.hbs', {Game1});
});

app.get('/add',(req,res)=>{
    res.render('add-game.hbs')
});

app.post('/add-game',(req,res)=>{

    const image1 = req.files.image1
    const image2 = req.files.image2

    image2.mv(path.resolve(__dirname,'Images/GAMES PHOTOS',image2.name), (err)=>{
        // if (image2.name){
        //     var image2 =  "Images/GAMES PHOTOS/" + image2.name
        // }
    });
    image1.mv(path.resolve(__dirname,'Images/GAMES PHOTOS',image1.name), (err)=>{
        // if (image1.name){
        //     var image1 =  "Images/GAMES PHOTOS/" + image1.name
        // }
    });

        var newgame = {
            title: req.body.title,
            image1: "Images/GAMES PHOTOS/" + image1.name,
            image2: "Images/GAMES PHOTOS/" + image2.name,
            description: req.body.description,
            genre: req.body.genre,
        }
        
        Account.findOneAndUpdate({username: acc},
            {$push:{libgames: newgame}},
            function(err,success){
                if(err){
                    console.log("error");
                }
                else{
                    console.log("good");
                    res.render('home.hbs');
                }
            }
            )     

        // Game.create({
        //     ...req.body,
        //     image1:"Images/GAMES PHOTOS/" + image1.name,
        //     image2:"Images/GAMES PHOTOS/" + image2.name
        // },(error,post) =>{
        //     res.render('home.hbs');
        // });

});

app.listen(3000)
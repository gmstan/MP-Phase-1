const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const flash = require('express-flash')
const session = require('express-session');
const hbs = require("hbs");
const Account = require('./database/models/account');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

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
                                try{
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
                                }
                                catch{
                                    tempname = 'Images/profpics/default.jpg'
                                    origuser.picture = tempname;
                                }
                                if (!(user.picture == "Images/profpics/default.jpg"))
                                {
                                    fs.unlink(user.picture, (err) => {
                                        if (err){
                                            console.log(err);
                                        }
                                        console.log("file deleted");
                                    })
                                }
                                origuser.description = req.body.description;
                                origuser.birthday = req.body.birthday;
                                origuser.pass = hash;
                                origuser.save((err, updatedUser)=>{
                                    if (err){
                                        console.log(err)
                                    }
                                    else{
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
    Account.findOne({username:acc}, (err, user) => {
        if(fs.existsSync(user.picture))
        {
            if (!(user.picture == "Images/profpics/default.jpg"))
            {
                fs.unlink(user.picture, (err) => {
                    if (err){
                        console.log(err);
                    }
                    console.log("file deleted");
                })
            }
        }
    })

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
                gameNo: user.libgames.length,
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
    try{
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
                                res.redirect('/')
                            }
                        })
                    }
                }
            });
        });
    }
    catch{
        Account.findOne({username : acc},(err, user)=>{
            if(err){
                console.log(err)
            }
            else{
                if(!user){
                    console.log("no user exists")
                }
                else{
                    user.picture =  "Images/profpics/default.jpg"
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
                            res.redirect('/')
                        }
                    })
                }
            }
        });
    }
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
                       res.render("index.hbs", {
                        errormsg : "Invalid Credentials",
                       })
                    }
               })
           }
           else{
            res.render("index.hbs", {
                errormsg : "Invalid Credentials",
               })
           }
       }
   })
 });
app.get('/checkuser', (req, res)=>{
    Account.findOne({username: req.query.name}, function(err, result){
        res.send(result)
    })
})
app.get('/checkacc', (req, res)=>{
    Account.findOne({username: req.query.name,pass:req.query.pas}, function(err, result){
        res.send(result)
    })
})
app.get('/checkgame', (req, res)=>{
    Account.findOne({username:acc}, function(err, user){
       res.send(user)
    })
})
app.post('/register-post', async(req, res)=>{
        try{
            const hashedPassword = await bcrypt.hash(req.body.pass, 10)
           
            //check if username exists
            Account.findOne({username : req.body.username},(err,result)=>{
                if(!result)
                {
                    // put create here
                    Account.create({
                        username: req.body.username,
                        pass: hashedPassword,
                        games: 0,
                    },
                        (error, account)=>{
                    })
                    acc = req.body.username
                    res.redirect('/profile-register')
                }
                else
                {
                    res.redirect('/register');
                }
            })
        }
        catch{
            res.redirect('/register');
        }
      
});

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
});

app.get('/add',(req,res)=>{
    res.render('add-game.hbs')
});

app.post('/add-game',(req,res)=>{
    
    Account.findOne({username:acc}, (err,user) => {
        

        
            const image1 = req.files.image1
            const image2 = req.files.image2
        
            image2.mv(path.resolve(__dirname,'Images/GAMES PHOTOS',image2.name), (err)=>{
            });
            image1.mv(path.resolve(__dirname,'Images/GAMES PHOTOS',image1.name), (err)=>{
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
                    }
                }
            )     
        
        res.redirect('/home');
    })   
});

app.get('/go-search',(req,res)=>
{
    res.render('search.hbs');
});

app.get('/search',(req,res)=>{
    Account.findOne({username: acc}).exec(function(err, user){
        if(err){
    
        }
        else{
            counter = -1;
            for(let i = 0; i < user.libgames.length; i++){
                if(user.libgames[i].title == req.query.searchvalue){
                    counter = i;
                    break;
                }
            }
            if(counter!=-1)
            {
                res.render("game.hbs",{
                    title : user.libgames[counter].title,
                    image: user.libgames[counter].image2,
                    description: user.libgames[counter].description,
                    genre: user.libgames[counter].genre,
                })
            }
            else
            {
                res.render('search.hbs',{
                    msg : "Game does not exist",
                })
            }         
        }
    }) 
});

app.post('/delete-game', (req, res)=>{
    Account.findOne({username:acc}, (err, user)=>{
        if (err){
            console.log(err)
        }
        else{
            counter = 0
            for(let i = 0; i < user.libgames.length; i++)
            {
                if(user.libgames[i].title == currgame){
                    counter = i 
                    break
                }
            }

            var newgame = {
                title : user.libgames[counter].title,
                image1 : user.libgames[counter].image1,
                image2 : user.libgames[counter].image2,
                description : user.libgames[counter].description,
                genre : user.libgames[counter].genre
            }
            
            if(fs.existsSync(user.libgames[counter].image1))
            {
                fs.unlink(user.libgames[counter].image1, (err) => {
                    if (err){
                        console.log(err);
                    }
                    console.log("File Deleted");
                })
            }

            if(fs.existsSync(user.libgames[counter].image2))
            {
                fs.unlink(user.libgames[counter].image2, (err) => {
                    if (err){
                        console.log(err);
                    }
                    console.log("File Deleted");
                })
            }

            Account.findOneAndUpdate({username: acc},
                {$pull:{libgames: newgame}},
                function(err,success){
                    if(err){
                        console.log("error");
                    }
                    else{
                        res.redirect('/home');
                    }
                }
                ) 
        }
        })
})

app.listen(3000)
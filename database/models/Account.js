const mongoose = require('mongoose')
// const Game = require("./game.js");

const Game = new mongoose.Schema({
    title: String,
    image1: String,
    image2: String,
    description: String,
    genre: String,
    // rating: String,
    // review: String
})

const AccSchema = new mongoose.Schema({
    username : String,
    pass : String,
    picture: String,
    description: String,
    birthday: String,
    // games: String,
    balance: String,
    // libgames: {
    //     type: Game,
    //     default: []
    // }
    libgames: [{title: String,
        image1: String,
        image2: String,
        description: String,
        genre: String,}]
    // games : 

})

const Account = mongoose.model('Account', AccSchema)
module.exports = Account;
const mongoose = require('mongoose')
// const Game = require("./game.js");

const Game = new mongoose.Schema({
    title: String,
    image1: String,
    image2: String,
    description: String,
    genre: String,
})

const AccSchema = new mongoose.Schema({
    username : String,
    pass : String,
    picture: String,
    description: String,
    birthday: String,
    balance: String,
    libgames: [{title: String,
        image1: String,
        image2: String,
        description: String,
        genre: String,}]
})

const Account = mongoose.model('Account', AccSchema)
module.exports = Account;
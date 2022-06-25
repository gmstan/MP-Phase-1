const mongoose = require('mongoose')
const Game = require("./game.js");
const AccSchema = new mongoose.Schema({
    username : String,
    pass : String,
    picture: String,
    description: String,
    birthday: String,
    games: String,
    balance: String,
    //libGames: [Game.PostSchema],
})

const Account = mongoose.model('Account', AccSchema)
module.exports = Account;
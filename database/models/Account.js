const mongoose = require('mongoose')
const Game = require("./game.js");

// const Game = new mongoose.Schema({
//     title: String,
//     image: String,
//     description: String,
//     genre: String
// })

const AccSchema = new mongoose.Schema({
    username : String,
    pass : String,
    picture: String,
    description: String,
    birthday: String,
    games: String,
    balance: String,
    libgames: {
        type: Game,
        default: []
    }
})

const Account = mongoose.model('Account', AccSchema)
module.exports = Account;
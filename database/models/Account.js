const mongoose = require('mongoose')

const AccSchema = new mongoose.Schema({
    username : String,
    pass : String,
    picture: String,
    description: String,
    birthday: String,
    games: String,
    balance: String
    // add birthday etc..

})

const Account = mongoose.model('Account', AccSchema)
module.exports = Account;
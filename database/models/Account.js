const mongoose = require('mongoose')

const AccSchema = new mongoose.Schema({
    username : String,
    pass : String,

    // add birthday etc..

})

const Account = mongoose.model('Account', AccSchema)
module.exports = Account;
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    //content
    title: String,
    image: String,
    description: String,
    genre: String,
    rating: String, //integer?
    review: String
});

const Game = mongoose.model('Game',PostSchema);

module.exports = Game;
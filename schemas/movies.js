const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: {type: String, required: true},
    director: {type: String, required: true},
    rating: {type: Number, required: false},
    duration: {type: Number, required: true}
});

const Movies = mongoose.model('movies', movieSchema);

module.exports = Movies;
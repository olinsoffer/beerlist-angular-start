const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: String,
    comment: String
});

const beerSchema = new Schema({
    name: String,
    style: String,
    image_url: String,
    abv: Number,
    ratings: [Number],
    reviews: [reviewSchema]
});


let _getSum = function(total, num) {
    return total + num;
};

beerSchema.methods.calcAvr = function() {
    let total = this.ratings.reduce(_getSum);
    let result = total / this.ratings.length;
    return result;
};

const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempSchema = new Schema({
    min: Number,
    max: Number,
    range: String,
    outlook: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('temp', tempSchema);

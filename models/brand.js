const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Brand = new Schema({
    ref_id: {
        type: Number,
        require: true,
        unique: true,
    },
    brand_name: {
        type: String,
        require: true,
        unique: true
    }
});
module.exports = mongoose.model('Brands', Brand);
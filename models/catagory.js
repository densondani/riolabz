const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    ref_id: {
        type: String,
        require: true,
        unique: true,
    },
    category_name: {
        type: String,
        require: true,
        unique: true
    }
});
module.exports = mongoose.model('Categorys', Category);
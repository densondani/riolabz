const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
    ref_id: {
        type: String,
        require: true,
        unique: true
    },
    item: {
        type: String,
        require: true,
        unique: true
    },
    cat_ref_id: {
        type: String,
    },
    brand_ref_id: {
        type: String,
    },
    category_name: {
        type: String,
    },
    brand_name: {
        type: String,
    },
    description: {
        type: String,
        require: true,
    },
    pack_size: {
        type: String,
        require: true,
    },
    pur_price: {
        type: Number,
        require: true,
    },
    mrp: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('Products', Products);
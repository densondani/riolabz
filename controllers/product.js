require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = new express.Router();
const Product = require('../models/products');
const Category = require('../models/catagory');
const Brand = require('../models/brand');

app.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/category', function (req, res) {
    const newCategory = new Category({
        ref_id: req.body.ref_id,
        category_name: req.body.category_name
    });
    newCategory.save(function (err, saved) {
        if (err) {
            res.status(200).send({
                status: false,
                message: err,
            });
        } else {
            res.status(200).send({
                status: true,
                message: saved,
            });
        }
    });
});

router.post('/brand', function (req, res) {
    const newBrand = new Brand({
        ref_id: req.body.ref_id,
        brand_name: req.body.brand_name
    });
    newBrand.save(function (err, saved) {
        if (err) {
            res.status(200).send({
                status: false,
                message: err,
            });
        } else {
            res.status(200).send({
                status: true,
                message: saved,
            });
        }
    });
});

router.post('/:cid/:bid', function (req, res) {
    Category.findOne({ ref_id: req.params.cid }, function (err, catData) {
        Brand.findOne({ ref_id: req.params.bid }, function (err, brandData) {
            const newProducts = new Product({
                ref_id: req.body.ref_id,
                item: req.body.item,
                description: req.body.description,
                category_name: catData.category_name,
                brand_name: brandData.brand_name,
                cat_ref_id: catData.ref_id,
                brand_ref_id: brandData.ref_id,
                pack_size: req.body.pack_size,
                pur_price: req.body.pur_price,
                mrp: req.body.mrp,
            });
            newProducts.save(function (err, saved) {
                if (err) {
                    res.status(200).send({
                        status: false,
                        message: err,
                    });
                } else {
                    res.status(200).send({
                        status: true,
                        message: saved,
                    });
                }
            });
        });
    });
});

router.put('/editprice/:prodName', function (req, res) {
    Product.findOne({ item: req.params.prodName }, function (err, prodData) {
        if (!prodData) {
            res.status(200).send({
                status: true,
                message: 'No Data Found',
            });
        } else {
            if (req.body.pur_price || req.body.mrp) {
                prodData.pur_price = req.body.pur_price,
                prodData.mrp = req.body.mrp
            }
            prodData.save(function (err, saved) {
                if (err) {
                    res.status(200).send({
                        status: false,
                        message: err,
                    });
                } else {
                    res.status(200).send({
                        status: true,
                        message: saved,
                    });
                }
            });
        }
    });
});
router.get('/getproduct/:categoryname/:brandname', async function (req, res) {
    Category.findOne({ category_name: req.params.categoryname }, function (errr, catData) {
        Brand.findOne({ brand_name: req.params.brandname }, function (err, brandData) {
            console.log(brandData)
            if (!catData || !brandData) {
                res.status(200).send({
                    status: false,
                    message: 'Category and brand is not match or No data found',
                });
            } else {
                Product.findOne({ cat_ref_id: catData.ref_id, brand_ref_id: brandData.ref_id }, function (error, prodData) {
                    if (error) {
                        res.status(200).send({
                            status: false,
                            message: 'Category and brand is not match',
                        });
                    } else {
                        res.status(200).send({
                            status: true,
                            message: prodData,
                        });
                    }
                });
            }
        });
    });
});
module.exports = router;
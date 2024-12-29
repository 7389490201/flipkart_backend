const express = require("express");
const router = express.Router();    
const Product = require("../models/product.Model");
const shortid = require("shortid");
const multer = require("multer");
const path = require("path");
const { default: slugify } = require("slugify");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "../uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage });

router.post("/product/create", upload.array("productPicture"), (req, res) => {  
    const { name, price, description, category, quantity, } = req.body;
    const productPicture = req.files.map(file => {
        return { img: file.filename }
    });
    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        description: description,
        productPicture: productPicture,
        category: category,
        quantity: quantity,
        createdBy: req.user.id
    });
    product.save().then((product) => {
        res.status(201).json({ product });
    }).catch(err => {
        res.status(400).json({ err });
    });
});


module.exports = router;
const express = require("express");
const router = express.Router();
const { createCategory, getCategory } = require("../controllers/category.Controller");
const { requireSignIn, adminMiddleware } = require("../middleware");
const shortid = require("shortid");
const multer = require("multer");
const path = require("path");
const slugify = require("slugify")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "./uploads"))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage });

router.post("/category/create",requireSignIn,adminMiddleware,upload.single("categoryPicture"),createCategory)
router.get("/category/get",getCategory)

module.exports=router;
const express = require('express');
const router = express.Router();
//const { } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
const multer = require('multer');   
const shortid = require('shortid');
const path = require('path');


//single file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {     //set the destination
      cb(null, path.join(path.dirname(__dirname), 'uploads') ) // it gives the parent directory of a path (src)
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)      //generate some random combination of alpha-numbers
    }
})
const upload = multer({ storage}); // uploading files in this destination






router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct );
//router.get('/category/getcategory', getCategories );





module.exports = router;
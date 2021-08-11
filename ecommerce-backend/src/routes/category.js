const express = require('express');


const { addCategory, getCategories} = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const router = express.Router();

const shortid = require('shortid');
const path = require('path');
const multer = require('multer');  

//single file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {     //set the destination
      cb(null, path.join(path.dirname(__dirname), 'uploads')); // it gives the parent directory of a path (src)
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname);      //generate some random combination of alpha-numbers
    },
});

const upload = multer({ storage}); //upload sigle file categoryImage

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory );
router.get('/category/getcategory', getCategories );





module.exports = router;
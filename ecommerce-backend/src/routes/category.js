const express = require('express');

const router = express.Router();
const { addCategory, getCategories} = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');



router.post('/category/create', requireSignin, adminMiddleware, addCategory );
router.get('/category/getcategory', getCategories );





module.exports = router;
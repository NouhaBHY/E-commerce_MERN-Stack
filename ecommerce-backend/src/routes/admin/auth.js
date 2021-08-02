const express = require('express');
const { signup, signin, requireSignin } = require('../../controller/admin/auth');//automatiquement importer
const router = express.Router();

router.post('/admin/signup', signup);
router.post('/admin/signin', signin);



module.exports = router;//exporting this router
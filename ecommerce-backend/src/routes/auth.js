const express = require('express');
const { signup } = require('../controller/auth');//automatiquement importer
const router = express.Router();

router.post('/', signup);
router.post('/signin', (req, res) => { });
module.exports = router;//exporting this router
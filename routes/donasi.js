const express = require('express');
const router = express.Router();
const donasiHandler = require('../controllers/donasiControllers');
const verifytoken = require('../middleware/verifiytoken');


router.get('/donasi/:id', donasiHandler.Getdonasi);
router.get('/berita', donasiHandler.GetBerita);
router.get('/donasibyuser', verifytoken, donasiHandler.Getdonasibyuser);

module.exports = router;
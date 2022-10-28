const express = require('express');
const router = express.Router();
const lastdonasiHandler = require('../controllers/lastDonatControllers');
const verifytoken = require('../middleware/verifiytoken');


router.get('/', lastdonasiHandler.lastdonasi);


module.exports = router;
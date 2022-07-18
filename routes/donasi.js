const express       = require('express');
const router        = express.Router();
const donasiHandler   = require('../controllers/donasiControllers');


router.get('/', donasiHandler.Getdonasi);


module.exports = router;
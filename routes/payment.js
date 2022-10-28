const express       = require('express');
const router        = express.Router();
const bankHandler   = require('../controllers/paymentControllers');


router.get('/banks', bankHandler.banklist);
router.post('/createvirtual', bankHandler.createvirtual);
router.post('/callvirtual', bankHandler.callbackvirtual);
router.post('/callvirtualexp', bankHandler.callbackvirtualexp);
router.get('/virtual', bankHandler.virtual);
router.get('/invoice', bankHandler.invoice);

module.exports = router;
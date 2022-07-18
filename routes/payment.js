const express       = require('express');
const router        = express.Router();
const bankHandler   = require('../controllers/paymentControllers');


router.get('/banks', bankHandler.banklist);

router.get('/paymentdonasi', bankHandler.paymentdonasi);
router.get('/paymentgetbyid', bankHandler.paymentbyid);
router.post('/createvirtual', bankHandler.createvirtual);
router.post('/callvirtual', bankHandler.callbackvirtual);
router.get('/virtual', bankHandler.virtual);
router.get('/invoice', bankHandler.invoice);

module.exports = router;
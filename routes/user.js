const express = require('express');
const router = express.Router();
const userHandler = require('../controllers/userControllers');
const verifytoken = require('../middleware/verifiytoken');


router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.get('/profile', verifytoken, userHandler.getprofile);
router.post('/updateprofile', verifytoken, userHandler.updateprofile);
router.post('/updatepotoprofile', verifytoken, userHandler.updateFotoprofile);


module.exports = router;
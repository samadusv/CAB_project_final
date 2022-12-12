
const express = require('express');
const pc = require('../controllers/passengerController');
const router = express.Router();

router.get('/register',pc.register);
router.post('/register',pc.registerPost);

router.get('/login',pc.login);
router.post('/login',pc.loginpost);


router.get('/passenger',pc.passengerDetail);
router.get('/update',pc.updatePassenger);
router.get('/logout',pc.logout);



router.post('/update',pc.updatePassengerPost);
router.get('/delete',pc.delete);


module.exports = router;




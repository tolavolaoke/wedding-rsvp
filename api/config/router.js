var express = require('express');
var router = express.Router();
var guestController = require('../controllers/guest.controller');

router.post('/guests', guestController.createGuest);

module.exports = router;

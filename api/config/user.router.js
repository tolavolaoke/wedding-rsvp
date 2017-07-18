var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');


router.post('/verify', userController.verifyToken);

module.exports = router;

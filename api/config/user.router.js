var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');


router.get('/verify/:idToken', userController.verifyToken);

module.exports = router;

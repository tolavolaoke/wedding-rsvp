var express = require('express');
var router = express.Router();
var albumController = require('../controllers/album.controller');

router.post('/photos', albumController.uploadPhotos);

module.exports = router;

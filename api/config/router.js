var express = require('express');
var router = express.Router();
var guestController = require('../controllers/guest.controller');

router.post('/guests', guestController.createGuest);
router.delete('/guests/:guestId', guestController.deleteGuest);
router.get('/guests/:guestId', guestController.getGuest);
router.patch('/guests/:guestId', guestController.updateGuest);



router.get('/guestbook', guestController.getAll);

// router.get('/guests/:uid', guestController.getSingleUser);

module.exports = router;

var Guest = require('../models/guest.model');

function createGuest(req, res) {
  var guest = new Guest(req.body);
  console.log(guest);
  guest.save(function(err) {
    if (err) {
      return res.json(err);
    } else {
      return res.json({ guest: guest});
    }
  });

}


module.exports = {
  createGuest: createGuest
};

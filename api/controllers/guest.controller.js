var Guest = require('../models/guest.model');

function createGuest(req, res) {
  Guest.create(req.body, function(err) {
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json({Guest});
    }
  });

}


module.exports = {
  createGuest: createGuest
};

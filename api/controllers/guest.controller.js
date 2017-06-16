var Guest = require('../models/guest.model');
var Err   = require('../utilities/badRequestHandler');

function getSingleUser (req, res) {
  var uid = req && req.params && req.params.uid;
  if(!uid) return Err.missingParams(req, ['uid']);

  // if (req.user.user_id !== process.env.Admin) {
  if (req.user.user_id !== uid) {
    return Err.unauthorizedReq(res);
  }
  // }

  Guest
    .findOne({ uid: uid})
    .exec(function (err, user) {
      if (err) return Err.recordNotFound(res, err.message);
      res.json(user);
    });
}

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
  createGuest: createGuest,
  getSingleUser: getSingleUser
};

var Guest = require('../models/guest.model');
// var Err   = require('../utilities/badRequestHandler');

// function getSingleUser (req, res) {
//   var uid = req && req.params && req.params.uid;
//   if(!uid) return Err.missingParams(req, ['uid']);
//
//   // if (req.user.user_id !== process.env.Admin) {
//   if (req.user.user_id !== uid) {
//     return Err.unauthorizedReq(res);
//   }
// }

//LOOK AT THIS FOR ADMIN PURPOSE
// function getAll(req, res) {
//   var adminUid = process.env.Admin;
//   Guest.find(function(err, guests){
//     console.log(adminUid, 'adminUid');
//     if (err || req.param.id !== adminUid ) {
//       return res.json(err);
//     } else {
//       return res.status(200).json(guests);
//     }
//   });
// }


function getAll(req, res) {
  Guest.find(function(err, guests){
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json(guests);
    }
  });
}

function createGuest(req, res) {
  Guest.create(req.body, function(err) {
    if (err) {
      return res.json(err, 'went wrong here');
    } else {
      return res.status(200).json({Guest});
    }
  });
}

function deleteGuest(req, res) {
  var guestId = req.params.guestId;
  Guest.deleteOne({ _id: guestId }, function(err) {
    if (err) {
      return res.json(err, 'Could not find guest to delete');
    } else {
      return res.status(200).json({Guest});
    }
  });
}


module.exports = {
  createGuest: createGuest,
  deleteGuest: deleteGuest,
  getAll: getAll
  // getSingleUser: getSingleUser
};

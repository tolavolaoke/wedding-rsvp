var Guest = require('../models/guest.model');

function getAll(req, res) {
  Guest.find(function(err, guests){
    if (err) {
      return res.json(err);
    } else {
      return res.status(200).json(guests);
    }
  });
}

function getGuest(req, res) {
  var guestId = req.params.guestId;

  Guest.findOne({ _id: guestId}, function(err, guests){
    if (err) {
      return res.json(err,'could not retrieve this guest');
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
function updateGuest(req, res) {
  var guestId = req.params.guestId;
  var updatedGuest = req.body;
  Guest.findOneAndUpdate({ _id: guestId }, updatedGuest, function(err) {
    if (err) {
      return res.json(err, 'Could not existing guest to update');
    } else {
      return res.status(200).json(updateGuest);
    }
  });
}


module.exports = {
  createGuest: createGuest,
  deleteGuest: deleteGuest,
  getAll: getAll,
  getGuest: getGuest,
  updateGuest: updateGuest
  // getSingleUser: getSingleUser
};

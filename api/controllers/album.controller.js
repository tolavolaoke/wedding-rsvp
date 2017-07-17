var Photo = require('../models/album.model');

function uploadPhotos(req, res) {
  var urls = req.body;
  var requestPromises = [];
  urls.forEach(function(url) {
    var photo = { url };
    requestPromises.push(storePhotoURL(photo));
  });
  Promise.all(requestPromises).then(
    function(urls) {
      return res.status(200).json(urls);
    }
  ).catch(
    function(error){
      return res.json(error);
    }
  );
}

function storePhotoURL(photo) {
  return new Promise(function(resolve, reject) {
    Photo.create(photo, function(error) {
      if(error) {
        reject(error);
      }
      resolve(photo);
    });
  });
}



module.exports = {
  uploadPhotos: uploadPhotos
};

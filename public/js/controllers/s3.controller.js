function S3Controller() {
  var controller = this;

  controller.uploadImage = function() {
    console.log('uploaded image:', controller.images);
  };

  function init() {
    controller.image = '';
  }
  init();
}

angular
  .module('wedding-rsvp')
  .controller('S3Controller', S3Controller);

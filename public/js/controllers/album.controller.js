function AlbumController(AlbumFactory) {
  var controller = this;

  controller.getAllPhotos = function() {
    AlbumFactory.getAllPhotos().then(
      function(success) {
        console.log('got photos', success.data);
        controller.photos = success.data;
      },
      function(error) {
        console.warn('could not get photos', error);
      }
    );
  };

  function init() {
    controller.photos = [];
  }
  init();
}

AlbumController.$inject = ['AlbumFactory'];

angular
  .module('wedding-rsvp')
  .controller('AlbumController', AlbumController);

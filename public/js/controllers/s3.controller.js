function S3Controller(S3Factory) {
  var controller = this;

  controller.uploadImages = function() {
    controller.imagesArray = controller.images.map(function(image) {
      return {
        name: image.name,
        type: image.type
      };
    });
    S3Factory.getSignedRequests(controller.imagesArray[0]).then(
      function success(success) {
        console.log('Successfully got signed requests', success.data);
        uploadToBucket(controller.images[0], success.data.signedRequest, success.data.url);
      },
      function error(error) {
        console.warn('Error getting signed requests', error);
      }
    );
  };

  function uploadToBucket(file, signedRequest) {
    // Here we make the XHR request to s3 to upload the images
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.send(file);
  }

  function init() {
    controller.imagesArray = [];
  }
  init();
}

S3Controller.$inject = ['S3Factory'];

angular
  .module('wedding-rsvp')
  .controller('S3Controller', S3Controller);

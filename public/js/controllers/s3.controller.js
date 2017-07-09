function S3Controller(S3Factory) {
  var controller = this;

  controller.uploadImages = function() {
    controller.imagesArray = controller.images.map(function(image) {
      return {
        'file-name': image.name,
        'file-type': image.type
      };
    });
    S3Factory.getSignedRequests(controller.imagesArray).then(
      function success(success) {
        console.log('Successfully got signed requests', success.data);
        for(var i = 0; i < controller.images.length; i++) {
          uploadToBucket(controller.images[i], success.data[i].signedRequest, success.data[i].url);
        }

      },
      function error(error) {
        console.warn('Error getting signed requests', error);
      }
    );
  };

  function uploadToBucket(file, signedRequest, url) {
    // Here we make the XHR request to s3 to upload the images
    console.log(file, signedRequest, url);
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

function S3Controller(S3Factory) {
  var controller = this;

  controller.uploadImages = function() {
    controller.images.forEach(function(image) {
      S3Factory.getSignedRequests(image).then(
        function success(success) {
          console.log('Successfully got signed requests', success.data);
          uploadToBucket(image, success.data.signedRequest);
        },
        function error(error) {
          console.warn('Error getting signed requests', error);
        }
      );
    });
  };

  function uploadToBucket(file, signedRequest) {
    // Here we make the XHR request to s3 to upload the images
    console.log(signedRequest);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.send(file);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          controller.background = `https://s3.amazonaws.com/wedding-rsvp-app-photos/${file.name}`;
          console.log('uploaded image', controller.background);
        } else {
          console.log('Could not upload file.');
        }
      }
    };
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

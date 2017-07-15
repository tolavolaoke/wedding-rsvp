function S3Controller(S3Factory) {
  var controller = this;

  // Get a signed request from aws s3 using the aws-sdk in the back-end
  controller.uploadImages = function() {
    controller.images.forEach(function(file) {
      S3Factory.getSignedRequests(file).then(
        function success(success) {
          console.log('Successfully got signed requests', success.data);
          uploadToBucket(file, success.data.signedRequest);
        },
        function error(error) {
          console.warn('Error getting signed requests', error);
        }
      );
    });
  };

  // Using the signed request returned from the back-end, make XHR request to s3 to upload the files
  function uploadToBucket(file, signedRequest) {
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

}

S3Controller.$inject = ['S3Factory'];

angular
  .module('wedding-rsvp')
  .controller('S3Controller', S3Controller);

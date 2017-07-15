function S3Controller(S3Factory) {
  var controller = this;

  // Get a signed request from aws s3 using the aws-sdk in the back-end
  controller.uploadImages = function() {
    controller.images.forEach(function(file) {
      S3Factory.getSignedRequests(file).then(
        function success(success) {
          const signedRequest = success.data.signedRequest;
          file.url = success.data.url;

          uploadToBucket(file, signedRequest).then(
            function(url) {
              console.log('url from promise return', url);
              console.log(controller.images);
            }).catch(
              function(error) {
                console.warn(error);
              });
        },
        function error(error) {
          console.warn('Error getting signed requests', error);
        }
      );
    });
  };

  // Using the signed request returned from the back-end, make XHR request to s3 to upload the files
  function uploadToBucket(file, signedRequest) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onload = function() {
        if(xhr.status === 200){
          resolve(file.url);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = function() {
        reject(xhr.statusText);
      };
      xhr.send(file);
    });
  }


  function init() {
  }
  init();

}

S3Controller.$inject = ['S3Factory'];

angular
  .module('wedding-rsvp')
  .controller('S3Controller', S3Controller);

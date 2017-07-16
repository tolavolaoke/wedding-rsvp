function S3Controller(S3Factory) {
  var controller = this;

  controller.uploadImages = function() {
    var requestPromises = [];
    controller.images.forEach(function(file) {
      requestPromises.push(uploadToS3(file));
    });
    Promise.all(requestPromises).then(
      function(urls) {
        console.log('uploaded images:', urls);
      }).catch(
      function(error) {
        console.log(error);
      });
  };

  // Get a signed request from aws s3 using the aws-sdk in the back-end
  // Using the signed request returned from the back-end, make XHR request to s3 to upload the files
  function uploadToS3(file) {
    return new Promise(function(resolve, reject) {
      S3Factory.getSignedRequests(file).then(
        function success(success) {
          const url = success.data.url;
          const signedRequest = success.data.signedRequest;
          console.log(signedRequest);

          var xhr = new XMLHttpRequest();
          xhr.open('PUT', signedRequest);
          xhr.onload = function() {
            if(xhr.status === 200){
              resolve(url);
            } else {
              reject(xhr.statusText);
            }
          };
          xhr.onerror = function() {
            reject(xhr.statusText);
          };
          xhr.send(file);
        },
        function error(error) {
          reject(error);
        }
        );
    });
  }


  function init() {
    controller.previews = [];
  }
  init();

}

S3Controller.$inject = ['S3Factory'];

angular
  .module('wedding-rsvp')
  .controller('S3Controller', S3Controller);

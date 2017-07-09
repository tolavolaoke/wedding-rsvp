function S3Factory($http) {
  return {
    getSignedRequests: function(images) {
      console.log('images object in factory', images);
      return $http({
        method: 'POST',
        url: '/images',
        data: images
      });
    }
  };
}

angular
  .module('wedding-rsvp')
  .factory('S3Factory', S3Factory);

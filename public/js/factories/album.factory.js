function AlbumFactory($http) {
  return {
    uploadPhotoURLs: function(urls) {
      return $http({
        method: 'POST',
        url: '/photos',
        data: urls
      });
    }
  };
}

angular
  .module('wedding-rsvp')
  .factory('AlbumFactory', AlbumFactory);

function UserFactory($http) {
  return {
    verifyToken: function(idToken) {
      return $http({
        method: 'POST',
        url: '/verify',
        data: idToken
      });
    }
  };
}

angular
  .module('wedding-rsvp')
  .factory('UserFactory', UserFactory);

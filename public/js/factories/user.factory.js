function UserFactory($http) {
  return {
    verifyToken: function(idToken) {
      return $http({
        method: 'GET',
        url: `/verify/${idToken}`,
        data: idToken
      });
    }
  };
}

angular
  .module('wedding-rsvp')
  .factory('UserFactory', UserFactory);

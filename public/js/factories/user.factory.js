function UserFactory($http) {
  return {
    getPermissions: function(idToken) {
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

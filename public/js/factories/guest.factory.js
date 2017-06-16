function GuestFactory ($http) {
  return {
    createGuest: function(newGuest) {
      return $http({
        method: 'POST',
        url: '/guests',
        data: newGuest
      });
    },
    getSingleUser: function(uid) {
      return $http({
        method: 'GET',
        url: `/guests/${uid}`,
        data: uid
      });
    }
  };
}


GuestFactory.$inject = ['$http'];
angular
  .module('wedding-rsvp')
  .factory('GuestFactory', GuestFactory);

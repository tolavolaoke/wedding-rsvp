function GuestFactory ($http) {
  return {
    createGuest: function(newGuest) {
      return $http({
        method: 'POST',
        url: '/guests',
        data: newGuest
      });
    },
  
    deleteGuest: function(guestId) {
      return $http({
        method: 'DELETE',
        url: `/guests/${guestId}`
      });
    },

  //   getSingleUser: function(uid) {
  //     return $http({
  //       method: 'GET',
  //       url: `/guests/${uid}`,
  //       data: uid
  //     });
  //   }
  // };
    getAll: function() {
      return $http({
        method: 'GET',
        url: '/guestbook'
      });
    }
  };





}


GuestFactory.$inject = ['$http'];
angular
  .module('wedding-rsvp')
  .factory('GuestFactory', GuestFactory);

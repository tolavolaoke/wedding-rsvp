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
    getGuest: function(guestId) {
      return $http({
        method: 'GET',
        url: `/guests/${guestId}`
      });
    },
    updateGuest: function(updatedGuest, updatedGuestId) {
      return $http({
        method: 'PATCH',
        url: `/guests/${updatedGuest.id}`,
        data: {
          updatedGuest,
          updatedGuestId
        }
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

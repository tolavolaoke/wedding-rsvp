function GuestFactory ($http) {
  return {
      createGuest: function()
  };
}

angular
  .module('wedding-rsvp')
  .factory('GuestFactory', GuestFactory);

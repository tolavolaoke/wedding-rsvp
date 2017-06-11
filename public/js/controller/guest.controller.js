function GuestController(GuestFactory) {
  var controller = this;

  controller.AddGuest = function() {
    GuestFactory.createGuest(controller.newGuest);
  };
}


angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);

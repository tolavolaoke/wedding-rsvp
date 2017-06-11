function GuestController(GuestFactory) {
  var controller = this;

  controller.AddGuest = function() {
    GuestFactory.createGuest(controller.newGuest).then(
            function sucess(response) {
              console.log('Created new Guest:', response);
            },
            function error(error) {
              console.warn('Error creating Guest:', error);
            }
          );
  };

  function init() {
    console.log(controller, 'guestController');
    controller.extraGuestsOptions = [0, 1 , 2];
    controller.newGuest = {};
    console.log(controller.newGuest);
  }
  init();
}



angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);

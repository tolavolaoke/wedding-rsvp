function GuestController(GuestFactory, $stateParams) {
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

  controller.getSingleUser = function() {
    var uid = $stateParams.uid;
    GuestFactory.getSingleUser(uid).then(
      function success(success) {
        console.log('Success getting single guest');
        controller.guest = success.data;
      },
      function error(error) {
        console.warn('Could not get single guest', error);
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

GuestController.$inject = ['GuestFactory', '$stateParams'];


angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);

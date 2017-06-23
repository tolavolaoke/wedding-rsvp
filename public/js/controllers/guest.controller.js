
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

  // controller.getSingleUser = function() {
  //   var uid = $stateParams.uid;
  //   GuestFactory.getSingleUser(uid).then(
  //     function success(success) {
  //       console.log('Success getting single guest');
  //       controller.guest = success.data;
  //     },
  //     function error(error) {
  //       console.warn('Could not get single guest', error);
  //     }
  //   );
  // };
  // controller.getAll = function() {
  //   var adminUid = $stateParams.id;
  //   GuestFactory.getAll(adminUid).then(
  //   function success (response) {
  //     controller.guests = response.data;
  //     console.log('Got guests', controller.getAll);
  //     console.log(controller.guests);
  //   }, function err(err) {
  //     console.warn('Could not get guests', err);
  //   }
  //  );
  // };


  function init() {
    controller.extraGuestsOptions = [0, 1 , 2];
    controller.eventOptions = ['Traditional Wedding', 'White Wedding', 'Both'];
    controller.newGuest = {};
    controller.guests = [];
    console.log(controller.newGuest);



    GuestFactory.getAll($stateParams).then(
      function success (response) {
        controller.guests = response.data;
        console.log('Got guests', controller.getAll);
        console.log(controller.guests);
      }, function err(err) {
      console.warn('Could not get guests', err);
    }
     );


  }
  init();
}

GuestController.$inject = ['GuestFactory', '$stateParams'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);

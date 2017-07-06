
function GuestController(GuestFactory, $stateParams, $state) {
  var controller = this;




  controller.editGuest = function(personId) {
    controller.editingId = personId;
  };


//****************************GET GUEST***********************************//
  controller.getGuest= function(guestId){
    console.log(guestId);

    if (guestId) {
      GuestFactory.getGuest(guestId).then(
        function success(success) {
          controller.guestDetails = success.data;
        },
        function error(error) {
          console.warn('Error getting guest:', error.message);
        }
      );
    }
  };



  controller.getAll = function() {
    GuestFactory.getAll($stateParams).then(
      function success (response) {
        controller.guests = response.data;
        console.log('Got guests', controller.guests);
      },
      function err(err) {
        console.warn('Could not get guests', err);
      }
     );
  };



//****************************ADD GUEST***********************************//

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

//**************************DELETE GUEST***********************************//

  controller.deleteGuest = function(guestId) {
    console.log(guestId);

    GuestFactory.deleteGuest(guestId).then(
      function sucess(response) {
        $state.reload();
        console.log('deleted guest:', response);
      },
      function error(error) {
        console.warn('Error deleting guest:', error);
      }
   );
  };

//**************************UPDATE GUEST***********************************//
  controller.updateGuest = function (guest) {
    console.log(guest);
    console.log('update reporting for duty sir');
    controller.updatedGuest = guest;
    var guestId = controller.editingId;

    GuestFactory.updateGuest(controller.updatedGuest, guestId).then(
      function success() {
        $state.reload();
      },
      function error(error) {
        console.warn('Error updating guest:', error);
      }
    );
  };


  //**************************ORDER BY HEADERS***********************************//

  controller.orderBy = function(header) {
    if(controller.headerSort === header) {
      controller.headerSort = '-' + header;
    } else {
      controller.headerSort = header;
    }
  };


//**************************INITIALISE***********************************//
  function init() {
    controller.extraGuestsOptions = [1 , 2];
    controller.eventOptions = ['Traditional Wedding', 'White Wedding', 'Both'];
    controller.newGuest = {};
    controller.guests = [];
    controller.guestDetails = {};
    controller.updatedGuest = {};

  }
  init();
}
//********************************************************************//


GuestController.$inject = ['GuestFactory', '$stateParams', '$state'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);

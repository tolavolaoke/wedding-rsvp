
function GuestController(GuestFactory, $stateParams, $state) {
  var controller = this;


//****************************GET GUEST***********************************//
  controller.getGuest= function(guestId){
    console.log(guestId);

    if (guestId) {
      GuestFactory.getGuest(guestId).then(
        function success(success) {
          controller.guestDetails = success.data;
          initialiseUpdatedGuest(success.data.guest);
        },
        function error(error) {
          console.warn('Error getting course:', error.message);
        }
      );
    }
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
      console.log('deleted guest:', response);
    },
    function error(error) {
      console.warn('Error creating Guest:', error);
    }
   );
  };


//**************************UPDATE GUEST***********************************//
  controller.updateGuest = function () {
    GuestFactory.updateGuest(controller.updatedGuest).then(
      function success() {
        $state.go('edit');
      },
      function error(error) {
        console.warn('Error updating guest:', error);
      }
    );
  };

  function initialiseUpdatedGuest(currentGuest) {
    controller.updatedGuest = {};
    controller.updatedGuest.name = currentGuest.firstName;
    controller.updatedGuest.extraGuests = currentGuest.extraGuests;
    controller.updatedGuest.attendingEvents = currentGuest.attendingEvents;
  }

  //**************************GUESTBOOK IMAGES***********************************//

  controller.randomImages = function() {
    controller.images = [
      'http://www.clker.com/cliparts/E/A/G/s/T/j/wedding-cake-with-topper-md.png',
      'http://icons.iconarchive.com/icons/icons-land/vista-love/256/Wedding-Car-Back-icon.png',
      'https://img0.etsystatic.com/108/0/10598554/il_340x270.1017022734_76sg.jpg',
      'http://www.clker.com/cliparts/b/u/q/6/S/D/groom-hi.png',
      'http://www.clipartlord.com/wp-content/uploads/2016/07/church14.png'
    ];

    var i;
    for(i = 0; i < controller.images.length; i++) {
      return controller.images[i];
    }
  };




//**************************INITIALISE***********************************//
  function init() {
    controller.extraGuestsOptions = [0, 1 , 2];
    controller.eventOptions = ['Traditional Wedding', 'White Wedding', 'Both'];
    controller.newGuest = {};
    controller.guests = [];
    controller.guestDetails = {};


//**************************ALL GUEST*********************************//

    GuestFactory.getAll($stateParams).then(
      function success (response) {
        controller.guests = response.data;
        console.log('Got guests', controller.guests);
      },
      function err(err) {
        console.warn('Could not get guests', err);
      }
     );



  }
  init();
}
//********************************************************************//


GuestController.$inject = ['GuestFactory', '$stateParams', '$state'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);


function GuestController(GuestFactory, $stateParams, $state) {
  var controller = this;


//****************************GET GUEST***********************************//
  controller.getGuest= function(guestId){
    console.log(guestId);

    if (guestId) {
      GuestFactory.getGuest(guestId).then(
        function success(success) {
          controller.guestDetails = success.data;
          // initialiseUpdatedGuest(success.data.guest);

        },
        function error(error) {
          console.warn('Error getting course:', error.message);
        }
      );
    }
  };


  // function initialiseUpdatedGuest(currentGuest) {
  //   controller.updatedGuest = {};
  //   console.log(controller.updatedGuest);
  //   // controller.updatedGuest.id = currentGuest.id;
  //   controller.updatedGuest.name = currentGuest.firstName;
  //   controller.updatedGuest.extraGuests = currentGuest.extraGuests;
  //   controller.updatedGuest.attendingEvents = currentGuest.attendingEvents;
  // }

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
  controller.updateGuest = function (guestId) {
    controller.selectedGuest._id = $stateParams.guestId;
    GuestFactory.updateGuest(controller.selectedGuest, guestId).then(
      function success() {
        $state.reload();
      },
      function error(error) {
        console.warn('Error updating guest:', error);
      }
    );
  };

  controller.selectGuest = function(guest) {
    controller.selectedGuest = guest;
    controller.isEditFormVisible = true;
  };

  //**************************GUESTBOOK IMAGES***********************************//

  controller.randomiseImages = function() {
    // for(var i = 0; i < controller.images.length; i++) {
    //   return controller.images[i];
    // }
    var currentIndex = controller.images.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

    // And swap it with the current element.
      temporaryValue = controller.images[currentIndex];
      controller.images[currentIndex] = controller.images[randomIndex];
      controller.images[randomIndex] = temporaryValue;
    }
    return controller.images;
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




//**************************INITIALISE***********************************//
  function init() {
    controller.extraGuestsOptions = [1 , 2];
    controller.eventOptions = ['Traditional Wedding', 'White Wedding', 'Both'];
    controller.newGuest = {};
    controller.guests = [];
    // controller.guestDetails = {};
    controller.isEditFormVisible = false;
    controller.images = [
      'http://www.clker.com/cliparts/E/A/G/s/T/j/wedding-cake-with-topper-md.png',
      'http://icons.iconarchive.com/icons/icons-land/vista-love/256/Wedding-Car-Back-icon.png',
      'https://img0.etsystatic.com/108/0/10598554/il_340x270.1017022734_76sg.jpg',
      'http://www.clker.com/cliparts/b/u/q/6/S/D/groom-hi.png',
      'http://www.clipartlord.com/wp-content/uploads/2016/07/church14.png'
    ];
    controller.randomiseImages();


//**************************ALL GUEST*********************************//


  }
  init();
}
//********************************************************************//


GuestController.$inject = ['GuestFactory', '$stateParams', '$state'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);


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
    controller.guestDetails = {};
    controller.updatedGuest = {};
    // controller.isEditFormVisible = false;
    // controller.randomiseImages();
    controller.newField = {};
    controller.editing = false;



//**************************ALL GUEST*********************************//


  }
  init();
}
//********************************************************************//


GuestController.$inject = ['GuestFactory', '$stateParams', '$state'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);

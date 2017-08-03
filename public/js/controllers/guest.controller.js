function GuestController(GuestFactory, $stateParams, $state) {
  var controller = this;


  controller.editGuest = function(person) {
    controller.updatedGuest = person;
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

  controller.changePage = function(page) {
    controller.upper = page * 10;
    controller.lower = (page - 1) * 10;
  };


  controller.getAll = function() {
    GuestFactory.getAll($stateParams).then(
      function success (response) {
        controller.guests = response.data;

        controller.countTotalGuests = controller.guests.length;

        controller.totalExtraGuests = controller.guests.reduce(function(sum, guest){
          return sum += guest.extraGuests;
        }, 0);

        controller.tradtionalEventGuests = controller.guests.forEach(function(guest){
          if(guest.attendingEvents === controller.eventOptions[0]){
            controller.traditionalGuests.push(guest);
          }
          var total = controller.traditionalGuests.reduce(function(sum, guest){
            return sum += guest.extraGuests;
          }, 0);
          controller.traditionalGuestsTotal = total + controller.traditionalGuests.length;
          return controller.traditionalGuestsTotal;
        });

        controller.whiteWeddingEventGuests = controller.guests.forEach(function(guest){
          if(guest.attendingEvents === controller.eventOptions[1]){
            controller.whiteWeddingGuests.push(guest);
          }
          var total = controller.whiteWeddingGuests.reduce(function(sum, guest){
            return sum += guest.extraGuests;
          }, 0);
          controller.whiteWeddingGuestsTotal = total + controller.whiteWeddingGuests.length;
          return controller.whiteWeddingGuestsTotal;
        });

        controller.bothEvent = controller.guests.forEach(function(guest){
          if(guest.attendingEvents === controller.eventOptions[2]){
            controller.bothEventGuests.push(guest);
          }
          var total = controller.bothEventGuests.reduce(function(sum, guest){
            return sum += guest.extraGuests;
          }, 0);
          controller.bothEventGuestsTotal = total + controller.bothEventGuests.length;
          return controller.bothEventGuestsTotal;
        });



        createPagesArray(controller.guests);
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
              $state.reload();
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
  controller.updateGuest = function (updatedGuest) {
    console.log(updatedGuest);
    console.log('update reporting for duty sir');
    var guestId = updatedGuest._id;

    GuestFactory.updateGuest(updatedGuest, guestId).then(
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

  controller.changePage = function(page) {
    controller.lower = (page * 10) - 10;
    controller.upper = page * 10;
    controller.enableEdit();
  };

  controller.disableEdit = function() {
    controller.isEditDisabled = true;
  };
  controller.enableEdit = function() {
    controller.isEditDisabled = false;
  };

  function createPagesArray(guests) {
    var pages = Math.ceil(guests.length/10);
    for(var i = 1; i <= pages; i++) {
      controller.pageNumbers.push(i);
    }
  }

  controller.openModal= function(person) {
    controller.modalShown = !controller.modalShown;
    console.log(person);
    controller.deletingPerson = person;
  };


  controller.confirmGuest = function() {
    controller.addGuestModal = !controller.addGuestModal;
  };


//**************************INITIALISE***********************************//
  function init() {
    controller.extraGuestsOptions = [1 , 2];
    controller.eventOptions = ['Traditional Wedding', 'White Wedding', 'Both'];
    controller.newGuest = {};
    controller.guests = [];
    controller.guestDetails = {};
    controller.pageNumbers = [];
    controller.lower = 0;
    controller.upper = 10;
    controller.isEditDisabled = false;
    controller.traditionalGuests = [];
    controller.whiteWeddingGuests = [];
    controller.bothEventGuests = [];
  }
  init();
}
//********************************************************************//


GuestController.$inject = ['GuestFactory', '$stateParams', '$state'];

angular
  .module('wedding-rsvp')
  .controller('GuestController', GuestController);

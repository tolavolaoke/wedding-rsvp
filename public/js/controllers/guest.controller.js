
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
    return controller.images[i];
  };




  function init() {
    controller.extraGuestsOptions = [0, 1 , 2];
    controller.eventOptions = ['Traditional Wedding', 'White Wedding', 'Both'];
    controller.newGuest = {};
    controller.guests = [];
    console.log(controller.randomImages(), 'here');



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

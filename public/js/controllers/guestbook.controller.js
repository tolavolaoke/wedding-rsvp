function GuestBookController(GuestBookFactory, $stateParams, $state) {
  var controller = this;



  function init(){

  }
  init();

}

GuestBookController.$inject = ['GuestBookFactory', '$stateParams','state'];

angular
.module('wedding-rsvp')
.controller('GuestBookController', GuestBookController);

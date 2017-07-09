function GuestBookController(GuestBookFactory, $stateParams) {
  var controller = this;

  controller.addPost = function(){
    console.log('im here');
    GuestBookFactory.createPost(controller.newPost).then(
        function success(response) {
          console.log('Created new post', response);
        },
        function error(err) {
          console.warn('error creating post', err);
        }
      );
  };

  controller.getAllPost = function() {
    console.log('getallPosts triggered');
    GuestBookFactory.getAllPost($stateParams).then(
      function success (response) {
        console.log(response);
        controller.posts= response.data;
        console.log('Got posts', controller.posts);
      },
      function err(err) {
        console.warn('Could not get posts', err);
      }
     );
  };


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }






  function init(){
    controller.newPost = {};
    controller.posts = [];
    controller.arr = [
      'http://ulatbambu.com/images/tux-clip-art-16.png',
      'https://s-media-cache-ak0.pinimg.com/736x/89/ea/36/89ea36a4ff52c1500db77ca81aea482b--car-magnets-wedding-pictures.jpg',
      'https://bellabridesmaids.com/wp-content/uploads/2017/02/unspecified-1.png'];
    controller.shufflearr = shuffle(controller.arr);
  }

  init();

}

GuestBookController.$inject = ['GuestBookFactory', '$stateParams'];

angular
.module('wedding-rsvp')
.controller('GuestBookController', GuestBookController);

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


  function init(){
    controller.newPost = {};
    controller.posts = [];
  }

  init();

}

GuestBookController.$inject = ['GuestBookFactory', '$stateParams'];

angular
.module('wedding-rsvp')
.controller('GuestBookController', GuestBookController);

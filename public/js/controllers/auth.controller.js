function AuthController($state, AuthFactory, UserFactory) {
  var controller = this;

  controller.signIn = () => {
    controller.error = null;
    AuthFactory.$signInWithEmailAndPassword(controller.email, controller.password).then(
      () => {
        resetCredentials();
        controller.isAdmin = false;
        $state.go('welcome');
      },
      (error) => {
        controller.error = error;
        console.warn('could not log in with email and password:', error);
        resetCredentials();
      }
    );
  };

  controller.getPermissions = function() {
    AuthFactory.$getAuth().getIdToken(true).then(function(idToken) {
      UserFactory.getPermissions(idToken).then(
        function(success) {
          console.log(success.data);
          controller.isAdmin = success.data.isAdmin;
        },
        function(err) {
          console.warn('could not get permissions', err);
        }
      );
    }).catch(function(error) {
      console.warn('could not get token:', error);
    });
  };

  controller.signOut = () => {
    AuthFactory.$signOut();
    $state.go('login');
  };

  function resetCredentials() {
    controller.email = null;
    controller.password = null;
  }

  function init() {
    controller.user = null;
    controller.error = null;
    controller.email = '';
    controller.password = '';
    AuthFactory.$onAuthStateChanged((user) => {
      controller.user = user;
    });
  }

  init();
}
AuthController.$inject = ['$state', 'AuthFactory', 'UserFactory'];

angular
  .module('wedding-rsvp')
  .controller('AuthController', AuthController);

function AuthController($state, AuthFactory, UserFactory) {
  var controller = this;

  controller.signIn = () => {
    controller.error = null;
    AuthFactory.$signInWithEmailAndPassword(controller.email, controller.password).then(
      (user) => {
        resetCredentials();
        user.getIdToken(true).then(function(idToken) {
          const token = { idToken };
          console.log('token', token);
          UserFactory.verifyToken(token).then(
            function(permissions) {
              console.log('got permissions', permissions);
            },
            function(err) {
              console.warn('could not get permissions', err);
            }
          );
        }).catch(function(error) {
          console.warn('could not get token:', error);
        });
        $state.go('welcome');
      },
      (error) => {
        controller.error = error;
        console.warn('could not log in with email and password:', error);
        resetCredentials();
      }
    );
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
      console.log('auth state changed: user:', user);
      controller.user = user;
    });
  }

  init();
}
AuthController.$inject = ['$state', 'AuthFactory', 'UserFactory'];

angular
  .module('wedding-rsvp')
  .controller('AuthController', AuthController);

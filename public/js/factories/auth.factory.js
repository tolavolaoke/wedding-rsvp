/* global firebase */

function AuthRun() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyDEde69vwrXHzZCfw5gsEcc-nr9kVAZTWM',
    authDomain: 'wedding-rsvp-yafiimo.firebaseapp.com',
    databaseURL: 'https://wedding-rsvp-yafiimo.firebaseio.com',
    projectId: 'wedding-rsvp-yafiimo',
    storageBucket: 'wedding-rsvp-yafiimo.appspot.com',
    messagingSenderId: '1063289276260'
  };
  firebase.initializeApp(config);
}
function AuthFactory($firebaseAuth) {
  return $firebaseAuth();
}
AuthFactory.$inject = ['$firebaseAuth'];

angular
.module('wedding-rsvp')
.run(AuthRun)
.factory('AuthFactory', AuthFactory);

function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '../states/login.html'
    })
    .state('auth-required', {
      url: '/authrequired',
      templateUrl: '../states/auth-required.html'
    })
    .state('welcome', {
      url: '/welcome',
      templateUrl: '../states/welcome.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('our-story', {
      url: '/our-story',
      templateUrl: '../states/our-story.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('photos', {
      url: '/photos',
      templateUrl: '../states/photos.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('wedding-details', {
      url: '/wedding-details',
      templateUrl: '../states/wedding-details.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('rsvp', {
      url: '/rsvp',
      templateUrl: '../states/rsvp.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('contact-us', {
      url: '/contact-us',
      templateUrl: '../states/contact-us.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('guests', {
      url: '/guests',
      templateUrl: '../states/rsvp.html',
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    });

  $urlRouterProvider.otherwise('/login')
}

function AuthCatcher($rootScope, $state) {
  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    if (error === 'AUTH_REQUIRED') {
      $state.go('auth-required');
    }
  });
}

MainRouter.inject = ['$stateProvider', '$urlRouterProvider'];
AuthCatcher.$inject = ['$rootScope', '$state'];

angular
  .module('wedding-rsvp', ['ui.router','firebase'])
  .config(MainRouter)
  .run(AuthCatcher);

function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      views: {
        '': { templateUrl: '../states/login.html' },
        'navbar@login': { templateUrl: '../states/partials/navbar.html' }
      }
    })
    .state('admin', {
      url: '/admin',
      views: {
        '': { templateUrl: '../states/admin.html' },
        'navbar@admin': { templateUrl: '../states/partials/navbar.html' },
        'edit@admin': { templateUrl: '../states/partials/_guest.edit.html' }
      },
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('auth-required', {
      url: '/authrequired',
      templateUrl: '../states/auth-required.html'
    })
    .state('welcome', {
      url: '/welcome',
      views: {
        '': { templateUrl: '../states/welcome.html' },
        'navbar@welcome': { templateUrl: '../states/partials/navbar.html' }
      },
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
      views: {
        '': { templateUrl: '../states/our-story.html' },
        'navbar@our-story': { templateUrl: '../states/partials/navbar.html' }
      },
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('gallery', {
      url: '/gallery',
      views: {
        '': { templateUrl: '../states/gallery.html' },
        'navbar@gallery': { templateUrl: '../states/partials/navbar.html' }
      },
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    })
    .state('guestbook', {
      url: '/guestbook',
      views: {
        '': { templateUrl: '../states/guestbook.html' },
        'navbar@gallery': { templateUrl: '../states/partials/navbar.html' }
      },
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
      views: {
        '': { templateUrl: '../states/wedding-details.html' },
        'navbar@wedding-details': { templateUrl: '../states/partials/navbar.html' }
      },
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
      views: {
        '': { templateUrl: '../states/rsvp.html' },
        'navbar@rsvp': { templateUrl: '../states/partials/navbar.html' }
      },
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
      views: {
        '': { templateUrl: '../states/contact-us.html' },
        'navbar@contact-us': { templateUrl: '../states/partials/navbar.html' }
      },
      resolve: {
        currentAuth: [
          'AuthFactory',
          (AuthFactory) => {
            return AuthFactory.$requireSignIn();
          }
        ]
      }
    });

  $urlRouterProvider.otherwise('/login');

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

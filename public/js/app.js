function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../states/home.html'
    })
    .state('guests', {
      url: '/guests',
      templateUrl: '../states/rsvp.html'
    });

  $urlRouterProvider.otherwise('/');

}
MainRouter.inject = ['$stateProvider', '$urlRouterProvider'];

angular
  .module('wedding-rsvp', ['ui.router'])
  .config(MainRouter);

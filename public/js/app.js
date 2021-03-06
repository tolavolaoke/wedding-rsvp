function MainRouter($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../states/home.html'
    });

  $urlRouterProvider.otherwise('/')

}

MainRouter.inject = ['$stateProvider', '$urlRouterProvider'];

angular.module('wedding-rsvp', ['ui.router'])
  .config(MainRouter);

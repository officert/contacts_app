angular.module('app').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$provide',
  '$httpProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $provide, $httpProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $urlRouterProvider.when('', '/home');

    $stateProvider
      .state('app', {
        url: '/',
        template: '<ui-view>',
        controller: [
          '$scope',
          'appState',
          function($scope, appState) {
            $scope.appReady = true;
          }
        ],
        resolve: {
          appState: [
            '$q',
            function($q) {
              var deferred = $q.defer();

              document.addEventListener('deviceready', function() {

                deferred.resolve({
                  ready: true
                });
              }, true);

              return deferred.promise;
            }
          ]
        }
      })
      .state('app.home', {
        url: 'home',
        templateUrl: 'app/components/home/home.html',
        controller: 'homeCtrl'
      });
  }
]);

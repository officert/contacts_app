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
            '$ionicPlatform',
            function($q, $ionicPlatform) {
              var deferred = $q.defer();

              document.addEventListener('deviceready', function() {
                alert('got 2 here');

                deferred.resolve({
                  ready: true
                });
              }, true);

              // $ionicPlatform.ready(function() {
              //   alert('got 2 here');

              //   deferred.resolve({
              //     ready: true
              //   });
              // });

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

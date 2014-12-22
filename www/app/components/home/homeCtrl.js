angular.module('app').controller('homeCtrl', [
  '$scope',
  'contactsService',
  '$ionicLoading',
  '$timeout',
  function($scope, contactsService, $ionicLoading, $timeout) {
    'use strict';

    $ionicLoading.show();

    contactsService.find('').then(function success(contacts) {
      $scope.contacts = _.sortBy(contacts, 'name.familyName');
      $timeout(function() {
        $ionicLoading.hide();
      }, 1000);
    }, function(error) {
      $scope.alert('There was an error getting your contacts');
      $ionicLoading.hide();
    });
  }
]);

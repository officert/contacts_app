angular.module('app').controller('homeCtrl', [
  '$scope',
  'contactsService',
  'geolocationService',
  function($scope, contactsService, geolocationService) {
    'use strict';

    contactsService.find('tim').then(function success(contact) {
      alert(contact);
    }, function(error) {
      alert(error);
    });

    // contactsService.create({
    //   name: 'Tim Officer',
    //   displayName: 'Tim',
    //   phoneNumbers: ['6033599135']
    // }).then(function success(contact) {
    //   alert(contact);
    // }, function error(error) {
    //   alert(error);
    // });
  }
]);

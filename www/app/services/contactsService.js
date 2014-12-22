angular.module('app').factory('contactsService', [
  '$window',
  '$q',
  function($window, $q) {

    var ALLOWED_KEYS = ['displayName', 'nickname', 'phoneNumbers', 'emails', 'addresses', 'ims', 'organizations', 'birthday', 'note', 'photos', 'categories', 'urls'];
    var NAME_ALLOWED_KEYS = ['givenName', 'familyName'];

    var ContactsService = function() {};

    ContactsService.prototype.create = function(data) {
      if (!data) throw new Error('data is required');

      var dataKeys = _.keys(data);

      _.each(dataKeys, function(key) {
        if (!_.contains(ALLOWED_KEYS, key)) {
          delete data[key];
        };
      });

      var deferred = $q.defer();

      var contact = navigator.contacts.create();
      var contactName = new ContactName();
      contact.name = contactName;

      _.extend(contact, data);

      contact.save(function success(_contact) {
        deferred.resolve(_contact);
      }, function error(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    ContactsService.prototype.find = function(filter) {
      var deferred = $q.defer();

      var options = new ContactFindOptions();
      options.filter = filter;
      options.multiple = true;

      var fields = ['*'];

      navigator.contacts.find(fields, function(contacts) {
        deferred.resolve(contacts);
      }, function(error) {
        deferred.reject(error);
      }, options);

      return deferred.promise;
    };

    return new ContactsService();
  }
]);

define([
  'angular'
], function (angular) {
  'use strict';

  var WithFilter = function () {
    return function (collection, prop) {
      var filtered = [];

      if (!prop) {
        return collection;
      }

      angular.forEach(collection, function (item, key) {
        if (item.hasOwnProperty(prop) && item[prop]) {
          filtered.push(item);
        }
      });

      return filtered;
    }
  };

  return WithFilter;
});

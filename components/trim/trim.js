define([
  'angular',
  './trim-filter'
], function (angular, TrimFilter) {
  'use strict';

  var trim = angular.module('currently.trim', []);

  trim.filter('trim', TrimFilter);

  return trim;
});

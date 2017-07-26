define([
  'angular',
  './with-filter'
], function (angular, WithFilter) {
  'use strict';

  var withModule = angular.module('currently.with', []);

  withModule.filter('with', WithFilter);

  return withModule;
});

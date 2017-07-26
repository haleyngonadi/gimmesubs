define([
  'angular',
  './backdrop-service'
], function (angular, BackdropService) {
  'use strict';

  var backdrop = angular.module('currently.backdrop', []);

  backdrop.service('$backdrop', BackdropService);

  return backdrop;
});

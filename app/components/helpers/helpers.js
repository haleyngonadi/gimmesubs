define([
  'angular',
  './helpers-service'
], function (angular, HelpersService) {
  'use strict';

  var helpers = angular.module('currently.helpers', []);

  helpers.service('$helpers', HelpersService);

  return helpers;
});

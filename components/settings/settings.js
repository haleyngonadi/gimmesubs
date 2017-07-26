define([
  'angular',
  './settings-service',
], function (angular, SettingsService) {
  'use strict';

  var settings = angular.module('currently.settings', []);

  settings.service('$settings', SettingsService);

  return settings;
});

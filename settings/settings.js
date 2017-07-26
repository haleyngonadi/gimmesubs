define([
  'angular',
  './settings-controller'
], function (angular, SettingsController) {
  'use strict';

  var settings = angular.module('app.tab.settings', []);

  settings.controller('SettingsController', SettingsController);

  settings.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/settings', {
      templateUrl: 'app/settings/settings.html',
      controller: 'SettingsController'
    });
  }]);

  return settings;
});

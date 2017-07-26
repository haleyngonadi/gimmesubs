define([
  'angular',
  './action-sheet-service',
  './action-sheet-directive'
], function (angular, ActionSheetService, ActionSheetDirective) {
  'use strict';

  var actionSheet = angular.module('currently.actionSheet', []);

  actionSheet.factory('$actionSheet', ActionSheetService);
  actionSheet.directive('actionSheet', ActionSheetDirective);

  return actionSheet;
});

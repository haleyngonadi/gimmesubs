define([
  'angular',
  './reading-list-controller'
], function (angular, ReadingListController) {
  'use strict';

  var readingList = angular.module('app.tab.readingList', []);

  readingList.controller('ReadingListController', ReadingListController);

  readingList.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/reading-list', {
      templateUrl: 'app/reading-list/reading-list.html',
      controller: 'ReadingListController'
    });
  }]);

  return readingList;
});

define([
  'angular',
  './series-controller'
], function (angular, SeriesController) {
  'use strict';


  var series = angular.module('app.tab.series', []);

  series.controller('SeriesController', SeriesController);

  series.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/series', {
      templateUrl: 'app/series/series.html',
      controller: 'SeriesController'
    });
  }]);

  return series;
});




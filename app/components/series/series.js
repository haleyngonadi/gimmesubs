define([
  'angular',
  './series-service',
], function (angular, SeriesService) {
  'use strict';

  var series = angular.module('currently.series', []);

  series.service('$series', SeriesService);

  return series;
});

define([
  'angular',
  './active-route-directive',
  './tab-bar-directive'
], function (angular, ActiveRouteDirective, TabBarDirective) {
  'use strict';

  var tabBar = angular.module('currently.tabBar', []);

  tabBar.directive('activeRoute', ActiveRouteDirective);
  tabBar.directive('tabBar', TabBarDirective);

  return tabBar;
});


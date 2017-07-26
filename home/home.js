define([
  'angular',
  './home-controller'
], function (angular, HomeController) {
  'use strict';


  var home = angular.module('app.tab.home', []);

  home.controller('HomeController', HomeController);

  home.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    });
  }]);

  return home;
});




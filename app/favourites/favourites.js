define([
  'angular',
  './favourites-controller'
], function (angular, FavouritesController) {
  'use strict';

  var favourites = angular.module('app.tab.favourites', []);

  favourites.controller('FavouritesController', FavouritesController);

  favourites.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/favourites', {
      templateUrl: 'app/favourites/favourites.html',
      controller: 'FavouritesController'
    });
  }]);

  return favourites;
});

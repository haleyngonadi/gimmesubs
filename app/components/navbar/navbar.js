define([
  'angular',
  './navbar-controller'
], function (angular, NavbarController) {
  'use strict';

  var navbar = angular.module('currently.navbar', []);

  navbar.controller('NavbarController', NavbarController);

  return navbar;
});

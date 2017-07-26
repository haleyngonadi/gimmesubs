define([
  'angular',
  'angular-route',
  'angular-sanitize',
  'angular-moment',
    'angular-animate',
  //'dirPagination/dirPagination',
  'components/action-sheet/action-sheet',
  'components/backdrop/backdrop',
  'components/constants/constants',
  'components/feed/feed',
  'components/helpers/helpers',
  'components/modal/modal',
  'components/navbar/navbar',
  'components/notification/notification',
  'components/settings/settings',
  'components/social-share/social-share',
  'components/tab-bar/tab-bar',
  'components/trim/trim',
  'components/with/with',
  'home/home',
  'series/series',
  'reading-list/reading-list',
  'favourites/favourites',
  'settings/settings'
], function (angular) {
  'use strict';

  var app = angular.module('Currently', [
    'ngRoute',
    'ngSanitize',
    'ngAnimate',
    'angularMoment',
    'app.constants',
    'currently.actionSheet',
    'currently.backdrop',
    'currently.feed',
    'currently.helpers',
    'currently.modal',
    'currently.navbar',
    'currently.notification',
    'currently.settings',
    'currently.socialShare',
    'currently.tabBar',
    'currently.trim',
    'currently.with',
    'app.tab.home',
    'app.tab.readingList',
    'app.tab.favourites',
    'app.tab.settings',
    'app.tab.series',
    //'dirPagination.dirPagination'
  ]);

  app.config([
    '$routeProvider',
    '$compileProvider',
    '$locationProvider',
  function ($routeProvider, $compileProvider, $locationProvider) {
  	$locationProvider.hashPrefix('');
    $routeProvider.otherwise({
      redirectTo: '/home'
    });

 	
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|chrome-extension):|data:image\//);
  }]);

  return app;
});

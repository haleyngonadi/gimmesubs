define([
  'angular',
  'components/constants/constants',
  'components/feed/feed',
  'components/helpers/helpers',
  'components/notification/notification',
  'components/settings/settings',
  'components/series/series'
], function (angular) {
  'use strict';

  var bgApp = angular.module('CurrentlyBackground', [
    'app.constants',
    'currently.feed',
    'currently.helpers',
    'currently.notification',
    'currently.settings',
    'currently.series'
  ]);

  return bgApp;
});

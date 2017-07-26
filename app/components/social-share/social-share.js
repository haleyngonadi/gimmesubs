define([
  'angular',
  './social-share-service'
], function (angular, SocialShareService) {
  'use strict';

  var socialShare = angular.module('currently.socialShare', []);

  socialShare.service('$socialShare', SocialShareService);

  return socialShare;
});

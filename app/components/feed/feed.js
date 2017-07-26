define([
  'angular',
  './feed-service',
  './feed-directive'
], function (angular, FeedService, FeedDirective) {
  'use strict';

  var feed = angular.module('currently.feed', []);

  feed.factory('$feed', FeedService);
  feed.directive('feed', FeedDirective);

  return feed;
});


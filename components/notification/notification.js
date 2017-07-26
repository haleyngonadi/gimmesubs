define([
  'angular',
  './notification-service',
], function (angular, NotificationService) {
  'use strict';

  var notification = angular.module('currently.notification', []);

  notification.service('$notification', NotificationService);

  return notification;
});

define([
  'angular',
  'lodash',
], function (angular, _) {
  'use strict';

  var NotificationService = function ($q, $settings, $helpers, config, partnerConfig) {
    var notificationOptions = {
      type: 'basic',
      title: partnerConfig.name,
      iconUrl: '../partner/img/128.png'
    };

    this.getNotifications = function () {
      var deferred = $q.defer();

      chrome.storage.local.get(config.storage.notifications, function (notification) {
        deferred.resolve(notification[config.storage.notifications] || {});
      });

      return deferred.promise;
    };

    this.setNotification = function (type, id, content) {
      var deferred = $q.defer(),
          notificationsObj = {};

      this.getNotifications().then(function (notifications) {
        notifications[type] = {
          id: id,
          content: content
        };

        notificationsObj[config.storage.notifications] = notifications;

        chrome.storage.local.set(notificationsObj, function () {
          deferred.resolve();
        });
      });

      return deferred.promise;
    };

    this.showNotification = function (type, message) {
      var deferred = $q.defer(),
          options = _.cloneDeep(notificationOptions);

      options.message = message;

      this.getNotifications().then(function (notifications) {
        if (notifications[type] && notifications[type].id) {
          chrome.notifications.clear(notifications[type].id, angular.noop);
        }

        chrome.notifications.create('', options, function (id) {
          deferred.resolve(id);
        });
      });

      return deferred.promise;
    };

    this.setBadge = function (type, count) {
      var badgeText = (type === 'count') ? $helpers.abbreviateNumber(count, 1).toString() : '•';

      chrome.browserAction.setBadgeText({
        text: badgeText
      });
    };

    this.clearBadge = function () {
      chrome.browserAction.setBadgeText({
        text: ''
      });
    };

    this.notify = function (message, feedItem, feed) {
      var deferred = $q.defer(),
          unreadCount = _.filter(feed, function (item) {
            return !item.read
          }).length,
          that = this;

      $settings.getSettings().then(function (settings) {
        if (settings.badgeIcon) {
          that.setBadge(settings.badgeStyle, unreadCount);
        }

        if (settings.desktopNotifications) {
          that.showNotification('newStory', message).then(function (id) {
            that.setNotification('newStory', id, feedItem);
          });
        }

        deferred.resolve();
      });

      return deferred.promise;
    };
  };

  return [
    '$q',
    '$settings',
    '$helpers',
    'config',
    'partnerConfig',
    NotificationService
  ];
});

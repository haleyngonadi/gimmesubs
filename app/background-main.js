(function (window, document) {
  'use strict';

  window.notificationsQueue = [],
  window.alarmsQueue = [],
  window.forceUpdate = false;



  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'update' || details.reason === 'install') {
      forceUpdate = true;
    }
  });

  chrome.alarms.onAlarm.addListener(function (alarm) {
    alarmsQueue.push(alarm);
  });



  chrome.notifications.onClicked.addListener(function (id) {
    notificationsQueue.push({
      id: id,
      type: 'visitLink'
    });
  });

  // Tell Angular that we're bootstrapping manually.
  window.name = 'NG_DEFER_BOOTSTRAP!';

  // Enable CSP (Content Security Policy) support.
  document.getElementsByTagName('html')[0].setAttribute('ng-csp', '');
}(window, document));

require([
  'angular',
  'lodash',
  'background'
], function (angular, _, bgApp) {
  bgApp.run([
    '$window',
    '$rootScope',
    '$timeout',
    '$settings',
    '$feed',
    '$notification',
    '$helpers',
    'config',
  function ($window, $rootScope, $timeout, $settings, $feed, $notification, $helpers, config) {
    var $scope = $rootScope.$new(),
        timer;



    $scope.forceUpdate = false;
    $scope.notifications = [];
    $scope.alarms = [];


    $scope.$watch('forceUpdate', function (oldValue, newValue) {
      if (newValue === true) {
        $settings.getFeedsFromExtension().then(function () {
          $settings.setFeedSubscriptions().then(function () {
            $feed.updateNewsFeed();
          });
        });
      }
    });

    $scope.$watchCollection('notifications', function () {
      while ($scope.notifications.length) {
        var notification = $scope.notifications.pop();

        $notification.getNotifications().then(function (notifications) {
          var item;

          if (notifications.newStory.id === notification.id) {
            item = notifications.newStory.content;
          } else {
            return;
          }

          if (notification.type === 'visitLink') {
            chrome.tabs.create({ url: $helpers.urlAddUtmCampaign(item.link) });
            chrome.notifications.clear(notification.id, angular.noop);
          }
        });
      }
    });

    $scope.$watchCollection('alarms', function () {
      while ($scope.alarms.length) {
        var alarm = $scope.alarms.pop();

        switch (alarm.name) {
          case config.alarms.update.name:
            $feed.updateNewsFeed();
            break;
        }
      }
    });

    $scope.continuousDigest = function () {
      timer = $timeout(function () {
        $scope.continuousDigest();
      }, 500);
    };

    $scope.cancelContinuousDigest = function () {
      $timeout.cancel(timer);
    };

    $scope.$apply(function ($scope) {
      $scope.forceUpdate = $window.forceUpdate;
      $scope.notifications = $window.notificationsQueue;
      $scope.alarms = $window.alarmsQueue;
    });

    // Keep running $digest whilst the background page is open.
    $scope.continuousDigest();

    chrome.alarms.getAll(function (alarms) {
      _.forEach(config.alarms, function (v, k, l) {
        var alarmExists = _.find(alarms, function (alarm) {
          return (alarm.name === k && Date.now() < alarm.scheduledTime);
        });

        if (_.isPlainObject(alarmExists)) {
          return;
        }

        chrome.alarms.create(l[k].name, {
          periodInMinutes: l[k].period
        });
      });
    });

    chrome.runtime.onSuspend.addListener(function () {
      $scope.cancelContinuousDigest();
    });
  }]);

  angular.bootstrap(document, [bgApp.name]);
  angular.resumeBootstrap();
});

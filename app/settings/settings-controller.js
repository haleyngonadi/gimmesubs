define(function () {
  'use strict';

  var SettingsController = function ($q, $scope, $settings, $actionSheet) {

    console.log('hello');
     $settings.getFeedsFromExtension();

    var services = {
      feeds: $settings.getFeeds(),
      settings: $settings.getSettings()
    };

    $q.all(services).then(function (services) {
      $scope.settings = services.settings;
      $scope.feeds = services.feeds;
    });

    $scope.toggleAllSubscriptions = function (subscribed) {
      $scope.feeds.forEach(function (feed) {
        feed.subscribed = subscribed;
      });

      $scope.updateSubscriptions();
    }

    $scope.updateSettings = function () {
      $settings.addSetting($scope.settings);
    };

      $scope.updateFeeds = function () {
      console.log('hi');
      $settings.getFeedsFromExtension();
    };

    $scope.updateSubscriptions = function () {
      $settings.setFeeds($scope.feeds);
    };

    $scope.bulkEditSubscriptions = function () {

      $actionSheet.show({
        titleText: 'Select subscribed feeds',
        buttons: [
          { text: 'All', selectAll: true },
          { text: 'None', selectAll: false }
        ],
        buttonClicked: function (i) {
          if (this.buttons[i].selectAll) {
            $scope.toggleAllSubscriptions(true);
          } else {
            $scope.toggleAllSubscriptions(false);
          }

          return true;
        },
        cancelText: 'Cancel'
      });
    };
  };

  return [
    '$q',
    '$scope',
    '$settings',
    '$actionSheet',
    SettingsController
  ];
});

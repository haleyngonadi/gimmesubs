define(function () {
  'use strict';

  var SettingsController = function ($q, $scope, $settings, $actionSheet, $mdDialog) {

     $settings.getFeedsFromExtension();
         var alert;


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

       $scope.changeCaptions = function(ev) {
          var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('I\'m a cat person');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };


      $scope.updateFeeds = function () {
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
    '$mdDialog', 
    SettingsController
  ];
});

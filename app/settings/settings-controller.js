define(function () {
  'use strict';

  var SettingsController = function ($q, $scope, $settings, $mdDialog) {

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
             $mdDialog.show({
      templateUrl: '../dialogs/captions.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen,
      controller: function DialogController($scope, $mdDialog, $settings, $filter) {

        var self = this;

            $scope.closeDialog = function() {
              $mdDialog.hide();
            };



                $scope.avatarData = [{
                  'id': 1,
        title: 'avatar 1',
        value: '#000'
      },{
        'id': 2,
        title: 'avatar 2',
        value: '#FF0'
      },{
        'id': 3,
        title: 'avatar 3',
        value: '#dc1432'
    }];

    $scope.selectedId = 2;
        $scope.selectedUser = function() {
      return $filter('filter')($scope.avatarData, { id: $scope.selectedId })[0].value;
    };





          }
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };


      $scope.updateFeeds = function () {
      $settings.getFeedsFromExtension();
    };

    $scope.updateSubscriptions = function () {
      $settings.setFeeds($scope.feeds);
    };


  };

  return [
    '$q',
    '$scope',
    '$settings',
    '$mdDialog', 
    SettingsController
  ];
});

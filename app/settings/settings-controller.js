define(function () {
  'use strict';

  var SettingsController = function ($q, $scope, $settings, $mdDialog, $mdBottomSheet, $mdToast) {

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
      console.log('Settings saved');
      $settings.addSetting($scope.settings);
    };


  $scope.showListBottomSheet = function() {
    $mdBottomSheet.show({
      templateUrl: 'dialogs/bottom-sheet-list-template.html',
      controller: function ListBottomSheetCtrl($scope, $mdBottomSheet, $mdToast) {

          $scope.items = [
    { name: 'Share'},
    { name: 'Upload'},
    { name: 'Copy' },
    { name: 'Print this page'},
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);

  };

      }
    }).then(function(clickedItem) {
            $scope.settings.subLang = clickedItem['name'];
             $settings.addSetting($scope.settings);



    }).catch(function(error) {
      // User clicked outside or hit escape
    });
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


 $scope.sizes = [
          "Arial",
          "Montserrat",
          "Oswald",
          "Arvo",
          "Playfair Display",
          "Sacramento"

      ];





                $scope.avatarData = [{
                  id: 1,
        title: 'Black',
        value: '#000',
        class: 'radio-black'
      },{
        id: 2,
        title: 'Blue',
        value: '#2892D7',
        class: 'radio-blue'

      },{
        id: 3,
        title: 'Red',
        value: '#DA2C38',
        class: 'radio-red'

    },

    {
        id: 4,
        title: 'Yellow',
        value: '#E6AF2E',
        class: 'radio-yellow'

    },


    {
        id: 5,
        title: 'Green',
        value: '#9AE19D',
        class: 'radio-green'

    }



    ];



                $scope.colorData = [

    {
                id: 1,
        title: 'White',
        value: '#fff',
        class: 'radio-white'
      },



                {


                  id: 1,
        title: 'Black',
        value: '#000',
        class: 'radio-black'
      },{
        id: 2,
        title: 'Blue',
        value: '#2892D7',
        class: 'radio-blue'

      },{
        id: 3,
        title: 'Red',
        value: '#DA2C38',
        class: 'radio-red'

    },

    {
        id: 4,
        title: 'Yellow',
        value: '#E6AF2E',
        class: 'radio-yellow'

    },


    {
        id: 5,
        title: 'Green',
        value: '#9AE19D',
        class: 'radio-green'

    }



    ];


        var services = {
      settings: $settings.getCaption()
    };

    $q.all(services).then(function (services) {
      $scope.settings = services.settings;
    });





        $scope.updateCaptions = function () {
                $settings.editCaption($scope.settings);

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
    '$mdBottomSheet',
    '$mdToast',
    SettingsController
  ];
});

define(function () {
  'use strict';

  var HomeController = function ($scope, $q, $settings, $modal, $location, partnerConfig, notifications) {


    $scope.offset = 0;






        $scope.showNotify = function(ev) {
            chrome.extension.sendMessage({
            type: "hideimages"
        });

        }


            $scope.geoBlocked = function(ev) {
            chrome.extension.sendMessage({
            type: "geoblocked"
        });}

                 $scope.getDuration = function(ev) {
            chrome.extension.sendMessage({
            type: "getduration"
        });

    

        }


          //     notifications.showError({
        //     message: 'Oops! Something bad just happened! (hides faster)',
        //     hideDelay: 1500, //ms
        //     hide: true //bool
        // });
    // $scope.welcomeModal;
    // $settings.getFeedsFromExtension();
  

    // $q.all(services).then(function (services) {
    //   var closeModal = function ($event) {
    //     $settings.addSetting({ showWelcomeModal: false });

    //     return $scope.welcomeModal.hide();
    //   };

    //   var followLink = function ($event) {
    //     $event.preventDefault();

    //     closeModal().then(function () {
    //       $location.url(angular.element($event.srcElement).attr('href'));
    //     });
    //   };

    //   if (services.settings.showWelcomeModal) {
    //     $scope.welcomeModal = $modal({
    //       templateUrl: 'app/home/welcome-modal.html'
    //     });

    //     $scope.welcomeModal.show({
    //       name: partnerConfig.name,
    //       closeModal: closeModal,
    //       followLink: followLink
    //     });
    //   }
    // });
  };

  return [
    '$scope',
    '$q',
    '$settings',
    '$modal',
    '$location',
    'partnerConfig',
    'notifications',
    HomeController
  ];
});

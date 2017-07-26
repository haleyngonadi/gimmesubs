define(function () {
  'use strict';

  var HomeController = function ($scope, $q, $settings, $modal, $location, partnerConfig) {
    var services = {
      settings: $settings.getSettings()
    };

    $scope.offset = 0;
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
    HomeController
  ];
});

define(function () {
  'use strict';

  var SeriesController = function ($q, $scope,$modal, $location, $series) {

  	    $scope.offset = 0;
  	         $series.getShowsFromExtension();


  	         var services = {
      series: $series.getFeeds(),
      shows: $series.getSeries()
    };

    $q.all(services).then(function (services) {
      $scope.series = services.series;
      $scope.shows = services.shows;
    });

 	var closeModal = function ($event) {

        return $scope.welcomeModal.hide();
      };

      var followLink = function ($event) {
        $event.preventDefault();

        closeModal().then(function () {
          $location.url(angular.element($event.srcElement).attr('href'));
        });
      };

      $scope.viewShow = function () {
      	       $scope.welcomeModal;

      	       console.log($scope);

    	$scope.welcomeModal = $modal({
          templateUrl: 'app/series/welcome-modal.html'
        });

      $scope.welcomeModal.show({
          name: $scope.cardTitle,
          closeModal: closeModal,
          followLink: followLink
        });
    };


    $scope.updateSubscriptions = function () {
      $series.setFeeds($scope.shows);
    };


  };

  return [
  	'$q',
    '$scope',
     '$modal',
     '$location',
     '$series',
    SeriesController
  ];
});

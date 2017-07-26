define(function () {
  'use strict';

  var SeriesController = function ($scope) {
    $scope.offset = 0;
  };

  return [
    '$scope',
    SeriesController
  ];
});

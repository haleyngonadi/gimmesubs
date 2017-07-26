define(function () {
  'use strict';

  var FavouritesController = function ($scope) {
    $scope.offset = 0;
  };

  return [
    '$scope',
    FavouritesController
  ];
});

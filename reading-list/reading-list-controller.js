define(function () {
  'use strict';

  var ReadingListController = function ($scope) {
    $scope.offset = 0;
  };

  return [
    '$scope',
    ReadingListController
  ];
});

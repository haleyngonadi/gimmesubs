define(function () {
  'use strict';

  var ModalDirective = function () {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<div class="modal" ng-transclude></div>',
      link: function ($scope, $element) {
        $scope.$on('$destroy', function () {
          $element.remove();
        });
      }
    };
  };

  return [ModalDirective];
});

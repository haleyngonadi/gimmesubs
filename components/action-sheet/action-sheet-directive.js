define(function () {
  'use strict';

  var ActionSheetDirective = function ($document, $backdrop) {
    return {
      restrict: 'E',
      scope: true,
      replace: true,
      template: '<div class="action-sheet-wrapper">' +
                  '<div class="action-sheet">' +
                    '<div class="action-sheet-group">' +
                      '<div class="action-sheet-title" ng-if="titleText" ng-bind-html="titleText"></div>' +
                      '<button class="button button-default button-block" ng-click="buttonClicked($index)" ng-repeat="button in buttons" ng-bind-html="button.text"></button>' +
                    '</div>' +
                    '<div class="action-sheet-group" ng-if="destructiveText">' +
                      '<button class="button button-default button-block destructive" ng-click="destructiveButtonClicked()" ng-bind-html="destructiveText"></button>' +
                    '</div>' +
                    '<div class="action-sheet-group" ng-if="cancelText">' +
                      '<button class="button button-default button-block" ng-click="cancel()" ng-bind-html="cancelText"></button>' +
                    '</div>' +
                  '</div>' +
                '</div>',
      // templateUrl: 'app/components/action-sheet/action-sheet.html',
      link: function ($scope, $element) {
        var backdropClick = function (e) {
          $scope.cancel();
          $scope.$apply();
        };

        $scope.$on('$destroy', function () {
          $element.remove();
          $backdrop.element.off('click', backdropClick);
        });

        $backdrop.element.on('click', backdropClick);
      }
    };
  };

  return [
    '$document',
    '$backdrop',
    ActionSheetDirective
  ];
});

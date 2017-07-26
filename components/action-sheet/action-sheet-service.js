define([
  'angular'
], function (angular) {
  'use strict';

  var ActionSheetService = function ($rootScope, $document, $compile, $backdrop, $animate, $timeout) {
    return {
      show: function (options) {
        var $scope = $rootScope.$new(true),
            sheet;

        angular.extend($scope, {
          cancel: angular.noop,
          buttonClicked: angular.noop,
          destructiveButtonClicked: angular.noop
        }, options);

        sheet = $compile('<action-sheet buttons="buttons"></action-sheet>')($scope);

        var hideSheet = function (didCancel) {
          $animate.removeClass(sheet, 'action-sheet-up').then(function () {
            if (didCancel && options.cancel) {
              options.cancel();
            }

            $scope.$destroy();
          });

          $backdrop.release();
        };

        $scope.cancel = function () {
          hideSheet(true);
        };

        $scope.buttonClicked = function (i) {
          if ((options.buttonClicked && options.buttonClicked(i)) === true) {
            hideSheet(false);
          }
        };

        $scope.destructiveButtonClicked = function () {
          if ((options.destructiveButtonClicked && options.destructiveButtonClicked()) === true) {
            hideSheet(false);
          }
        };

        // Show the backdrop.
        $backdrop.retain();

        // Add the action sheet to the DOM.
        $document[0].body.appendChild(sheet[0]);

        // Bring the action sheet into view.
        $timeout(function () {
          sheet.addClass('action-sheet-up');
        }, 20);
      }
    };
  };

  return [
    '$rootScope',
    '$document',
    '$compile',
    '$backdrop',
    '$animate',
    '$timeout',
    ActionSheetService
  ];
});

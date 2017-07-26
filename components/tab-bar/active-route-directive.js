define([
  'angular'
], function (angular) {
  'use strict';

  var ActiveRouteDirective = function ($location, $parse) {
    return {
      restrict: 'AC',
      scope: true,
      compile: function (element, attributes) {
        var useProperty;

        if (attributes.activeRoute) {
          useProperty = 'activeRoute';
        } else if (attributes.ngHref) {
          useProperty = 'ngHref';
        } else if (attributes.href) {
          useProperty = 'href';
        } else {
          throw new Error('activeRoute requires active-route, ng-href or href on ' + element[0]);
        }

        return function ($scope, elem, attrs) {
          var modelSetter = $parse(attrs.ngModel || attrs.routeModel || '$activeRoute').assign,
              watcher = angular.noop;

          function staticWatcher(newVal) {
            var hash = newVal.indexOf('#');

            if (hash > -1) {
              newVal = newVal.substr(hash + 1);
            }

            watcher = function watchHref() {
              modelSetter($scope, ($location.path().indexOf(newVal) > -1));
            };

            watcher();
          }

          function regexWatcher(newVal) {
            var hash = newVal.indexOf('#');

            if (hash > -1) {
              newVal = newVal.substr(hash + 1);
            }

            watcher = function watchRegex() {
              var regexp = new RegExp('^' + newVal + '$', ['i']);
              modelSetter($scope, regexp.test($location.path()));
            };

            watcher();
          }

          switch (useProperty) {
            case 'activeRoute':
              if (attrs.activeRoute) {
                regexWatcher(attrs.activeRoute);
              } else {
                attrs.$observe('activeRoute', regexWatcher);
              }

              break;

            case 'ngHref':
              if (attrs.ngHref) {
                staticWatcher(attrs.ngHref);
              } else {
                attrs.$observe('ngHref', staticWatcher);
              }

              break;

            case 'href':
              staticWatcher(attrs.href);
          }

          $scope.$on('$routeChangeSuccess', function () {
            watcher();
          });

          $scope.$on('$stateChangeSuccess', function () {
            watcher();
          });
        };
      }
    };
  };

  return [
    '$location',
    '$parse',
    ActiveRouteDirective
  ];
});

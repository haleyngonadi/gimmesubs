define([
  'angular'
], function (angular) {
  'use strict';

  var ModalService = function ($q, $http, $templateCache, $rootScope, $document, $compile, $animate) {
    return function modalFactory(config) {
      if (!(!config.template ^ !config.templateUrl)) {
        throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
      }

      var template = config.template,
          templateUrl = config.templateUrl,
          container = angular.element(config.container || $document[0].body),
          deferred,
          html,
          $scope,
          modal = null;

      if (template) {
        deferred = $q.defer();
        deferred.resolve(template);
        html = deferred.promise;
      } else {
        html = $http.get(templateUrl, {
          cache: $templateCache
        }).then(function (response) {
          return response.data;
        });
      }

      var createModal = function (html, localScope) {
        $scope = $rootScope.$new();

        angular.extend($scope, localScope);

        modal = $compile('<modal>' + html + '</modal>')($scope);
        container.append(modal);

        $animate.addClass(modal, 'animated pulse');
      };

      var show = function (localScope) {
        return html.then(function (html) {
          createModal(html, localScope);
        });
      };

      var hide = function () {
        var deferred = $q.defer();

        if (modal) {
          $animate.removeClass(modal, 'animated pulse').then(function () {
            $scope.$destroy();
            modal = null;
            modal.remove();
            deferred.resolve();
          });
        } else {
          deferred.resolve;
        }

        return deferred.promise;
      };

      var active = function () {
        return !!modal;
      };

      return {
        show: show,
        hide: hide,
        active: active
      };
    }
  };

  return [
    '$q',
    '$http',
    '$templateCache',
    '$rootScope',
    '$document',
    '$compile',
    '$animate',
    ModalService
  ];
});

define([
  'angular',
  './modal-service',
  './modal-directive'
], function (angular, ModalService, ModalDirective) {
  'use strict';

  var modal = angular.module('currently.modal', []);

  modal.factory('$modal', ModalService);
  modal.directive('modal', ModalDirective);

  return modal;
});

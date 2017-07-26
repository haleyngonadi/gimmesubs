define([
  'angular',
  './config',
  '../../../partner/components/constants/config'
], function (angular, config, partnerConfig) {
  'use strict';

  var constants = angular.module('app.constants', []);

  constants.constant('config', config);
  constants.constant('partnerConfig', partnerConfig);

  return constants;
});

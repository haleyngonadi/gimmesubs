define([
  'angular'
], function (angular) {
  'use strict';

  var NavbarController = function ($scope, $location, $helpers, config, partnerConfig) {
    $scope.url = partnerConfig.url;

    $scope.openHomepage = function ($event) {
      chrome.tabs.create({ url: $helpers.urlAddUtmCampaign($scope.url) });
    };
  };

  return [
    '$scope',
    '$location',
    '$helpers',
    'config',
    'partnerConfig',
    NavbarController
  ];
});

define([
  'angular',
  'lodash'
], function (angular, _) {
  'use strict';


  var SeriesService = function ($q, $http, $window, config) {
    var that = this;

    this.promise = $q.defer();

    this.getSeries = function () {
      var deferred = $q.defer();

      chrome.storage.local.get(config.storage.series, function (series) {
        deferred.resolve(series[config.storage.series] || {});
      });

      return deferred.promise;
    };

    this.addSetting = function (setting) {
      var deferred = $q.defer(),
          seriesObj = {};

      this.getSeries().then(function (series) {
        var series = angular.extend(series, setting);

        seriesObj[config.storage.series] = series;

        chrome.storage.local.set(seriesObj, function () {
          deferred.resolve();
        });
      });

      return deferred.promise;
    };

    this.getFeeds = function () {
      var deferred = $q.defer();

      chrome.storage.local.get(config.storage.shows, function (shows) {
        deferred.resolve(shows[config.storage.shows] || {});
      });

      return deferred.promise;
    };

    this.getShowsFromExtension = function () {
      var that = this,
          deferred = $q.defer();

      $http.get(chrome.runtime.getURL('partner/shows.json?v=1.0'), {
        cache: false,
        resonseType: 'json'
      }).then(function (response) {
        that.setFeedSubscriptions(response.data.shows).then(function () {
          deferred.resolve();
        });
      });

      return deferred.promise;
    };

    this.setFeeds = function (shows) {
      var deferred = $q.defer(),
          showsObj = {};

      showsObj[config.storage.shows] = shows;

      chrome.storage.local.set(showsObj, function () {
        deferred.resolve();
      });

      return deferred.promise;
    };

    this.setFeedSubscriptions = function (newFeeds) {

      console.log (newFeeds);
      var deferred = $q.defer();

      this.getFeeds().then(function (shows) {
        console.log(newFeeds, shows);

        _.forEach(newFeeds, function (newFeed, i, list) {
          var existingFeed = _.find(shows, function (show) {
                return show.name === newFeed.name;
              });

          if (existingFeed) {
            newFeed = angular.extend(existingFeed, newFeed);
          }

          if (typeof newFeed.subscribed === 'undefined') {
            newFeed.subscribed = newFeed['default'];
          }

          list[i] = newFeed;
        });

        that.setFeeds(newFeeds).then(function () {
          deferred.resolve();
        });
      });

      return deferred.promise;
    };

    this.removeSetting = function (setting) {
      var deferred = $q.defer();

      this.getSetting().then(function (series) {
        delete series[setting];
        deferred.resolve();
      });

      return deferred.promise;
    };


  };

  return [
    '$q',
    '$http',
    '$window',
    'config',
    SeriesService
  ];
});

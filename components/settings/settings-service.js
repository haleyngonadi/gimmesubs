define([
  'angular',
  'lodash'
],



 function (angular, _) {
  'use strict';

  var defaultSettings = {
    articleSnippets: true,
    inlineImages: true,
    openLinksInBackground: false,
    badgeIcon: true,
    badgeStyle: 'dot',
    desktopNotifications: true,
    showWelcomeModal: true
  };


  var SettingsService = function ($q, $http, $window, config) {
    var that = this;

    this.promise = $q.defer();

    

    this.getSettings = function () {
      var deferred = $q.defer();

      chrome.storage.sync.get(config.storage.settings, function (settings) {
        deferred.resolve(settings[config.storage.settings] || {});
      });

      return deferred.promise;
    };

    this.addSetting = function (setting) {
      var deferred = $q.defer(),
          settingsObj = {};

      this.getSettings().then(function (settings) {
        var settings = angular.extend(settings, setting);

        settingsObj[config.storage.settings] = settings;

        chrome.storage.sync.set(settingsObj, function () {
          deferred.resolve();
        });


      });

      return deferred.promise;
    };

    this.getFeeds = function () {
      var deferred = $q.defer();
/*
      chrome.storage.local.get(config.storage.feeds, function (feeds) {
        deferred.resolve(feeds[config.storage.feeds] || {});
       console.log(feeds);
      });
*/

chrome.storage.sync.get(null, function(all) {

  var removed = all;
  delete removed['currently.settings'];

  var test = Object.keys(removed).reduce( (acc, a) => acc.concat(all[a]), [] );
  test = { final: test };
          deferred.resolve(test['final'] || {});


});


      return deferred.promise;
    };

    this.getFeedsFromExtension = function () {
      var that = this,
          deferred = $q.defer();
        
        var feedURL = 'http://cdn.spoilertv.com/javascript/feeds.json?v=' +new Date().getTime();  

        $http.get(feedURL, {
        cache: false,
        resonseType: 'json',
         headers: {
                'Cache-Control': 'no-cache',
                'Pragma':'no-cache'
            }

      }).then(function (response) {
        //console.log(response.data);
        that.setFeedSubscriptions(response.data.feeds).then(function () {
          deferred.resolve();
        });
      });

      return deferred.promise;
    };

    this.setFeeds = function (feeds) {
      var deferred = $q.defer(),
          feedsObj = {};

  feedsObj[config.storage.feeds] = feeds;


  chrome.storage.local.set(feedsObj, function () {
        deferred.resolve();
      });


var longArray = feeds;  
var shortArrays = [], i, len;

for (i = 0, len = longArray.length; i < len; i += 40) {
    shortArrays.push(longArray.slice(i, i + 40));
}

for (i = 0, len = shortArrays.length; i < len; i++) {
   // console.log(shortArrays[i]);

    var key = 'feed_' + i,
        testPrefs = shortArrays[i];
    var jsonfile = {};
    jsonfile[key] = testPrefs;


        chrome.storage.sync.set(jsonfile, function () {
           deferred.resolve();
       // console.log('Saved', key, testPrefs);
    });


}



  };

    this.setFeedSubscriptions = function (newFeeds) {
      var deferred = $q.defer();

      this.getFeeds().then(function (feeds) {
      //  console.log(newFeeds, feeds);

        _.forEach(newFeeds, function (newFeed, i, list) {
          var existingFeed = _.find(feeds, function (feed) {
                return feed.name === newFeed.name;
              });

          if (existingFeed) {
            newFeed = angular.extend(existingFeed, newFeed);
          }

          if (typeof newFeed.subscribed === 'undefined') {
            newFeed.subscribed = newFeed['default'];
          }

          list[i] = newFeed;
        });


if (that.setFeeds(newFeeds) == null){
  //console.log(that.setFeeds(newFeeds));
}
      else {
//console.log(that.setFeeds(newFeeds));

        that.setFeeds(newFeeds).then(function () {
          deferred.resolve();
        });

}


      });

      return deferred.promise;
    };

    this.removeSetting = function (setting) {
      var deferred = $q.defer();

      this.getSetting().then(function (settings) {
        delete settings[setting];
        deferred.resolve();
      });

      return deferred.promise;
    };

    // Set up default settings if they've not been set already.
    this.getSettings().then(function (settings) {
      if (_.isEmpty(settings)) {
        that.addSetting(angular.extend(settings, defaultSettings));
      }
    });
  };

  return [
    '$q',
    '$http',
    '$window',
    'config',
    SettingsService
  ];
});


define([
  'angular',
  'lodash',
], function (angular, _) {
  'use strict';

  var FeedService = function ($q, $http, $window, $settings, $notification, config, partnerConfig) {

   
    function notifyOfNewItems(items, feed) {
      var message = items[0].title;

      $notification.notify(message, items[0], feed);
    }

    function getNewsFeed() {
      var deferred = $q.defer();

      chrome.storage.local.get(config.storage.newsFeed, function (newsFeed) {
        newsFeed = newsFeed[config.storage.newsFeed] || [];

        deferred.resolve(newsFeed);
      });

      return deferred.promise;
    }

    function setNewsFeed(newsFeed) {
      var deferred = $q.defer(),
          newsFeedObj = {};

      newsFeedObj[config.storage.newsFeed] = newsFeed;

      chrome.storage.local.set(newsFeedObj, function () {
        deferred.resolve();
      });

      return deferred.promise;
    }

    function getSingleFeedContent(feed) {
      var deferred = $q.defer();

 $http.get(feed.url, { cache: false})
    .then(function(feedContent) {

            feedContent.feedId = feed.name;
          deferred.resolve(feedContent);
    });

      return deferred.promise;
    }

   function htmlToPlaintext(text) {
  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
}



    function parseNewsFeed(newFeeds) {
      var deferred = $q.defer(),
          now = new Date().getTime(),
          newFeed = [],
          newFeedIds = [],
          parsedFeed = [];

      var extractFeedItems = function (feed) {
        if (feed.status === 200) {
          return feed.data.feed.entry.map(function (item) {     
            item.feedId = feed.feedId;
          item.title = item.title['$t'];
          item.link = item.link[1]['href'];
           var re = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
        var results = re.exec(item.content['$t']);
        var img="";
        if(results) img = results[1];
        item.inlineMedia = img;

        var str = item.content['$t'];
        var preSnippet = str.replace(/<br\s*[\/]?>/gi, "\n");
       var snippet = htmlToPlaintext(preSnippet);
       //console.log(snippet);

       if (snippet.startsWith("(function")) {
        item.contentSnippet = "";

       }

        else {
            var parie= snippet.substr(0, snippet.indexOf('.')); 

            if (parie.length <= 120) 
                item.contentSnippet = parie+'. ';
       
            if (parie.length >= 120)
       item.contentSnippet =  parie.slice(0,140)+'...';

       
     }

 

            newFeedIds.push(feed.feedId);

            delete item.content;
            delete item.media$thumbnail;

            return item;
          });

        }
        
      };

      var removeUnsubscribed = function (item) {
        if (item.favourite || item.readLater) {
          return item;
        }

        if (newFeedIds.indexOf(item.feedId) !== -1) {
          return item;
        }
      };

      var removeFuture = function (item) {
        var itemDate = new Date(item.published['$t']).getTime();

        if (itemDate <= now) {
          return item;
        }
      };

      var sortByDate = function (item) {
        return -(new Date(item.published['$t']).getTime());
      };

      newFeed = _.chain(newFeeds).map(extractFeedItems).flatten(true).compact().uniq('link').uniq('title').value();
      newFeedIds = _.uniq(newFeedIds);

      getNewsFeed().then(function (feed) {
        var newItems,
            i;

        feed = _.filter(feed, removeUnsubscribed);

        _.forEach(newFeed, function (newFeedItem) {
          var existingItemIndex = _.findIndex(feed, function (item) {
            return (item.link === newFeedItem.link || item.title === newFeedItem.title);
          });

          if (existingItemIndex !== -1) {
            parsedFeed.push(feed[existingItemIndex]);
            feed.splice(existingItemIndex, 1);
          } else {
            newFeedItem.notified = false;
            newFeedItem.read = false;
            parsedFeed.push(newFeedItem);
          }
        });

        parsedFeed.push(feed);
        parsedFeed = _.chain(parsedFeed).flatten(true).filter(removeFuture).sortBy(sortByDate).value();
        i = parsedFeed.length;

             // console.log(parsedFeed.length);


        while (i--) {
          if (parsedFeed.length > config.storage.maxItems) {
            if (!parsedFeed[i].favourite || !parsedFeed[i].readLater) {
              parsedFeed.splice(i, 1);
            }
          } else {
            break;
          }
        }

        newItems = _.filter(parsedFeed, function (item) {
          return !item.notified;
        });

        if (newItems.length) {
          notifyOfNewItems(newItems, parsedFeed);

          _.forEach(parsedFeed, function (item) {
            item.notified = true;
          });
        }

        deferred.resolve(parsedFeed);
      });

      return deferred.promise;
    }

    function updateNewsFeed() {
      var promises = [];

      $settings.getFeeds().then(function (feeds) {
        _.forEach(feeds, function (feed, i) {
       //   console.log(feed);

          if (feed.subscribed) {
            promises.push(getSingleFeedContent(feed));
          }
          //else {
           // delete feed;
         // }
        });

        $q.all(promises).then(function (responses) {
          parseNewsFeed(responses).then(function (newFeed) {
            setNewsFeed(newFeed);
          });
        });
      });
    }

    return {
      getNewsFeed: getNewsFeed,
      setNewsFeed: setNewsFeed,
      updateNewsFeed: updateNewsFeed
    };
  };

  return [
    '$q',
    '$http',
    '$window',
    '$settings',
    '$notification',
    'config',
    'partnerConfig',
    FeedService
  ];
});

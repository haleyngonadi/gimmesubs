define([
  'lodash'
], function (_) {
  'use strict';

  var FeedDirective = function ($q, $helpers, $location, $feed, $anchorScroll, $settings, $notification, $actionSheet, $socialShare, config) {
    function link($scope,elem, attrs) {
      var services = {
        feed: $feed.getNewsFeed(),
        settings: $settings.getSettings()
      };

      $scope.limit = config.feedViewLimit;

      $q.all(services).then(function (services) {
        $scope.settings = services.settings;
        $scope.feed = services.feed;

      });
$scope.scrollTo = function(id) {
var old = $location.hash();
$location.hash('top');
$anchorScroll();
//reset to old to keep any additional routing logic from kicking in
$location.hash(old);

};


      $scope.markAllAsRead = function () {
        _.forEach($scope.feed, function (item) {
          item.read = true;
        });

        $feed.setNewsFeed($scope.feed).then(function (feed) {
          $notification.clearBadge();
        });
      };

      $scope.openLink = function (item, target) {
        item.read = true;

        $feed.setNewsFeed($scope.feed).then(function () {
          chrome.tabs.create({
            url: $helpers.urlAddUtmCampaign(item.link),
            active: !$scope.settings.openLinksInBackground
          });
        });
      };

      $scope.toggleReadLater = function (item) {
        item.readLater = (item.readLater) ? false : true;
        $feed.setNewsFeed($scope.feed);
      };

      $scope.toggleFavourite = function (item) {
        item.favourite = (item.favourite) ? false : true;
        $feed.setNewsFeed($scope.feed);
      };

      $scope.share = function (item) {
        $actionSheet.show({
          titleText: 'Share story on',
          buttons: [
            { text: 'Google+', service: 'gplus' },
            { text: 'Twitter', service: 'twitter' },
            { text: 'Facebook', service: 'facebook' },
            { text: 'LinkedIn', service: 'linkedin' }
          ],
          buttonClicked: function (i) {
            $socialShare.share(item, this.buttons[i].service);

            return true;
          },
          cancelText: 'Cancel'
        });
      };
    }

    return {
      restrict: 'E',
      templateUrl: 'app/components/feed/feed.html',
      scope: {
        filterBy: '=',
        emptyTitle: '@',
        emptyMessage: '@'
      },
      link: link
    };
  };

  return [
    '$q',
    '$helpers',
    '$location',
    '$feed',
    '$anchorScroll',
    '$settings',
    '$notification',
    '$actionSheet',
    '$socialShare',
    'config',
    FeedDirective
  ];
});

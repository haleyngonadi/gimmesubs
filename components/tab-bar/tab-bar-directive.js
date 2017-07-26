define(function () {
  'use strict';

  var TabBarDirective = function () {
    return {
      restrict: 'AE',
      scope: true,
      templateUrl: 'app/components/tab-bar/tab-bar.html',
      link: function ($scope) {
        $scope.tabs = [{
          name: 'Home',
          route: '#/home',
          icon: 'fa-home',
          class: 'tab-home'
        },
        {
          name: 'Series',
          route: '#/series',
          icon: 'fa-film',
          class: 'tab-series'
        }, {
          name: 'Watchlist',
          route: '#/reading-list',
          icon: 'fa-bookmark',
          class: 'tab-bookmark'
        }, {
          name: 'Favourites',
          route: '#/favourites',
          icon: 'fa-star',
          class: 'tab-faves'
        }, {
          name: 'Settings',
          route: '#settings',
          icon: 'fa-cog',
          class: 'tab-settings'
        }];
      }
    };
  };

  return TabBarDirective;
});

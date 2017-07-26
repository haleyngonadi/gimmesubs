define([
  'angular'
], function (angular) {
  'use strict';

  var BackdropService = function ($window, $document, $animate) {
    var elem = angular.element('<div class="backdrop">'),
        holds = 0;

    this.element = elem;

    this.retain = function () {
      if ((++holds) === 1) {
        elem.addClass('visible');

        $window.requestAnimationFrame(function () {
          holds && elem.addClass('active');
        });
      }
    };

    this.release = function () {
      if ((--holds) === 0) {
        $animate.removeClass(elem, 'active').then(function () {
          !holds && elem.removeClass('visible');
        });
      }
    };

    // Add the backdrop to the DOM when the service is instantiated.
    $document[0].body.appendChild(elem[0]);
  };

  return [
    '$window',
    '$document',
    '$animate',
    BackdropService
  ];
});

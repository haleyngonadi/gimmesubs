define([
  'lodash'
], function (_) {
  'use strict';

  var HelpersService = function () {
    this.abbreviateNumber = function (number, decimalPlaces) {
      decimalPlaces = Math.pow(10, decimalPlaces || 0);

      var abbrev = ['k', 'M', 'B', 'T'],
          size,
          number,
          i;

      for (i = abbrev.length - 1; i >= 0; i--) {
        size = Math.pow(10, (i + 1) * 3);

        if (size <= Math.abs(number)) {
          number = Math.round(number * decimalPlaces / size) / decimalPlaces;
          return number + abbrev[i];
        }
      }

      return number;
    };

    this.urlAddUtmCampaign = function (url) {
      var utm = {
            source: 'currently',
            medium: 'browser-extension',
            campaign: 'chrome'
          },
          anchor = document.createElement('a'),
          queryParams;

      anchor.href = url;

      queryParams = _.filter(anchor.search.split('&'), function (param) {
        if (param.indexOf('utm_') >= 0) {
          return false;
        }

        return true;
      });

      _.forEach(utm, function (value, key) {
        queryParams.push('utm_' + key + '=' + value);
      });

      anchor.search = queryParams.join('&');

      if (anchor.search.substr(0, 1) !== '?') {
        anchor.search = '?' + anchor.search;
      }

      return anchor.href;
    };
  };

  return [HelpersService];
});

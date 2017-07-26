define(function () {
  'use strict';

  var TrimFilter = function () {
    return function (str, side) {
      var pattern;

      switch (side) {
        case 'left':
          pattern = /^\s+/g;
          break;

        case 'right':
          pattern = /\s+$/g;
          break;

        case 'both':
        default:
          pattern = /^\s+|\s+$/g;
      }

      return str.replace(pattern, '');
    }
  };

  return TrimFilter;
});

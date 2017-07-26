window.name = 'NG_DEFER_BOOTSTRAP!';

require([
  'angular',
  'app'
], function (angular, app) {
  'use strict';

  app.run();

  angular.bootstrap(document, [app.name]);
  angular.resumeBootstrap();
});

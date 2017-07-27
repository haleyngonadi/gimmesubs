var require = {
  baseUrl: 'app',
  paths: {
    'angular': '../bower_components/angular/angular.min',
    'angular-route': '../bower_components/angular-route/angular-route.min',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize.min',
    'angular-animate': '../bower_components/angular-animate/angular-animate.min',
    'angular-moment': '../bower_components/angular-moment/angular-moment.min',
    'angular-material': '../bower_components/angular-material/angular-material.min',
    'angular-aria': '../bower_components/angular-aria/angular-aria.min',
    'lodash': '../bower_components/lodash/lodash',
    'moment': '../bower_components/moment/moment',
    'dirPagination': '../bower_components/dirPagination',
    // 'qTip': '../assets/js/jquery.qtip.min',
    // 'jquery': '../bower_components/jquery/jquery.min',


  },

  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-animate': ['angular'],
    'angular-aria': ['angular'],
    'angular-moment': ['angular', 'moment'],
    'dirPagination': ['angular'],
    'angular-material': ['angular', 'angular-aria', 'angular-animate'],

    // 'qTip': ['jquery']

  },

};

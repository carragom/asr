'use strict';

angular.module('asrApp')
.config(function ($stateProvider) {
   $stateProvider
   .state('sites', {
      url: '/sites?size&index&start&end&sort&user&tag',
      templateUrl: 'app/sites/sites.html',
      controller: 'SitesCtrl as ctrl',
      params: {
         size: '10',
         index: '1',
         sort: 'bytes.desc',
         tag: '0'
      },
      resolve: {
         sitesResource: function($stateParams, RestService) {
            if ($stateParams.user) {
               return RestService.search('sites', {
                  index: $stateParams.index,
                  size: $stateParams.size,
                  user: $stateParams.user,
                  sort: $stateParams.sort,
                  start: $stateParams.start,
                  end: $stateParams.end,
                  tag: $stateParams.tag
               },
               'findByUser');
            } else {
               return RestService.fetch('sites', {
                  index: $stateParams.index,
                  size: $stateParams.size,
                  sort: $stateParams.sort,
                  start: $stateParams.start,
                  end: $stateParams.end,
                  tag: $stateParams.tag
               });
            }
         },
         chartResourceBytes: function($stateParams, RestService) {
            if ($stateParams.user) {
               return RestService.search('sites', {
                  user: $stateParams.user,
                  size: 3,
                  sort: 'bytes.desc',
                  start: $stateParams.start,
                  end: $stateParams.end,
                  tag: $stateParams.tag
               },
               'findByUser');
            } else {
               return RestService.fetch('sites', {
                  size: 3,
                  sort: 'bytes.desc',
                  start: $stateParams.start,
                  end: $stateParams.end,
                  tag: $stateParams.tag
               });
            }
         },
         chartResourceTime: function($stateParams, RestService) {
            if ($stateParams.user) {
               return RestService.search('sites', {
                  user: $stateParams.user,
                  size: 3,
                  sort: 'time.desc',
                  start: $stateParams.start,
                  end: $stateParams.end,
                  tag: $stateParams.tag
               },
               'findByUser');
            } else {
               return RestService.fetch('sites', {
                  size: 3,
                  sort: 'time.desc',
                  start: $stateParams.start,
                  end: $stateParams.end,
                  tag: $stateParams.tag
               });
            }
         }
      }
   });
});

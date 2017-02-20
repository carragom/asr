'use strict';

angular.module('asrApp')
   .controller('NavbarCtrl', function (
      $scope,
      $location,
      Auth,
      $state,
      $stateParams,
      $moment,
      RestService) {

      var self = this;
      self.tags = [{
         name: 'default'
      }];

      self.menu = [{
         'title': 'Users',
         'link': 'users'
      }, {
         'title': 'Sites',
         'link': 'sites'
      }];

      self.site = undefined;
      self.isCollapsed = true;
      self.isLoggedIn = Auth.isLoggedIn;
      self.isAdmin = Auth.isAdmin;
      self.getCurrentUser = Auth.getCurrentUser;

      // RestService.fetch(tag)

      self.logout = function () {
         Auth.logout();
         $location.path('/login');
      };

      self.isActive = function (route) {
         return route === $location.path();
      };

      self.showPickers = function () {
         return $state.includes('users') || $state.includes('sites');
      };

      // Datepicker
      self.endDate = $stateParams.end ? $moment($stateParams.end).toDate() :
         $moment().toDate();
      self.startDate = $stateParams.start ? $moment($stateParams.start).toDate() :
         $moment().subtract(15, 'days').toDate();

      self.maxDate = new Date();

      $scope.$watch('ctrl.startDate', function () {
         self.applyDate();
      });
      $scope.$watch('ctrl.endDate', function () {
         self.applyDate();
      });

      self.tooglePicker = function (picker) {
         self[picker] = !self[picker];
      };

      self.getDateParams = function () {
         var params = {};

         params.start = self.startDate.toISOString().split('T')[0];
         params.end = self.endDate.toISOString().split('T')[0];

         return params;
      };

      self.applyDate = function () {
         $state.go($state.current, self.getDateParams());
      };
   });

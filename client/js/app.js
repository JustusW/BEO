'use strict';


// Declare app level module which depends on filters, and services
var BEO = angular.module('BEO', ['BEO.filter', 'BEO.service', 'BEO.directive', 'BEO.controller']).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            //.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'})
            .when('/keymanager', {templateUrl: 'partials/keyManager.html', controller: 'KeyManagerCtrl'})
            .when('/keymanager/new', {templateUrl: 'partials/keyManagerNew.html', controller: 'KeyManagerNewCtrl'})
            .otherwise({templateUrl: 'partials/home.html'});
    }])
    .run(function () {
        openpgp.init();
    });
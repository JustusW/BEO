/**
 The MIT License (MIT)

 Copyright (c) 2013 JustusW

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 **/

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
        $('#block').hide();
    });
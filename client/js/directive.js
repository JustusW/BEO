'use strict';

/* Directives */


angular.module('BEO.directive', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);
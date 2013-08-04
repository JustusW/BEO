'use strict';

/* Controllers */

angular.module('BEO.controller', [])
    .controller('KeyManagerCtrl', [function() {

    }])
    .controller('KeyManagerNewCtrl', ['$scope', function($scope) {
        $scope.key = {};
        $scope.generate = function () {
            $scope.key = openpgp.generate_key_pair(1, 2048, $scope.userid, $scope.password);
        };

        $scope.export = function() {

        };
    }]);
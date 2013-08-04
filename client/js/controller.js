'use strict';

/* Controllers */

angular.module('BEO.controller', [])
    .controller('KeyManagerCtrl', [function() {

    }])
    .controller('KeyManagerNewCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        $scope.key = {};
        $scope.generate = function () {
            $('#block').show();
            $timeout(function () {
                $scope.key = openpgp.generate_key_pair(1, 2048, $scope.userid, $scope.password);
                $('#block').hide();
            },100);
        };

        $scope.export = function() {

        };
    }]);
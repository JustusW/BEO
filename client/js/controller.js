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

/* Controllers */
var tmp;
angular.module('BEO.controller', [])
    .controller('VoteListCtrl', ['$scope', 'Backend', 'KeyManager', function($scope, Backend, KeyManager) {
        // TODO: Check if user has a private key set.
        $scope.data = {
            voteList: []
        };

        $scope.data.voteList = Backend.getOpenVoteList();

        $scope.submit = function (data) {
            console.log(KeyManager.signMessage(angular.toJson(data)));
        }
    }])
    .controller('KeyManagerCtrl', [function() {

    }])
    .controller('KeyManagerLoadCtrl', ['$scope', 'KeyManager', function($scope, KeyManager) {
        $scope.key = KeyManager.getPersonalKey();

        $scope.submit = function(){
            KeyManager.extrudePersonalKey();
        };
    }])
    .controller('KeyManagerSettingsCtrl', ['$scope', 'Backend', 'KeyManager', function($scope, Backend, KeyManager) {
        $scope.data = {
            settings: Backend.getSettings()
        };
    }])
    .controller('KeyManagerNewCtrl', ['$scope', '$timeout', '$location', 'KeyManager', function($scope, $timeout, $location, KeyManager) {
        $scope.key = {};
        $scope.userid = 'Justus';
        $scope.password = 'test';

        $scope.generate = function () {
            $('#block').show();
            $timeout(function () {
                // TODO: Raise key size to 2048+.
                $scope.key = openpgp.generate_key_pair(1, 512, $scope.userid, $scope.password);
                tmp = $scope.key;
                tmp.privateKeyArmoredPassword = $scope.password;
                KeyManager.registerPersonalKey($scope.key);
                openpgp.keyring.importPublicKey($scope.key.publicKeyArmored);
                $('#block').hide();
                $location.path('/keymanager/load');
            },100);
        };

        $scope.export = function() {

        };
    }]);
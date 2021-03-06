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

/* Services */

angular.module('BEO.service', [])
    .factory('decodingInterceptor', function($q, KeyManager) {
        return function(promise) {
            return promise.then(function(data) {
                if ( !/-----BEGIN PGP SIGNED MESSAGE-----/.test(data.data) ) {
                    return data;
                }
                var msg = openpgp.read_message(data.data)[0];
                //todo: verify message
                var pubVAKey = {obj:openpgp.read_publicKey(KeyManager.getVAKey())[0]};
                var pubCAKey = {obj:openpgp.read_publicKey(KeyManager.getCAKey())[0]};
                if ( pubVAKey == undefined || pubCAKey == undefined ) {
                    return [];
                }
                var keys = [pubVAKey,pubCAKey];
                msg.text = $.trim(msg.text);
                if ( msg.verifySignature(keys) !== true ) {
                    return [];
                }
                return JSON.parse(msg.text);
            });
        }
    })
    .config(function($httpProvider) {
        $httpProvider.responseInterceptors.push('decodingInterceptor');
    })
    .factory('Backend', function ($http,KeyManager) {
        var settings = {
            clearingAuthorityAPI: 'http://localhost/BEO/CAServer/api.php',
            votingAuthorityAPI: 'http://localhost/BEO/VAServer/api.php'
        };
        return {
            getSettings: function () {
                return settings;
            },
            getOpenVoteList: function () {
                return $http.get(settings.votingAuthorityAPI + '?cmd=getVoteList');
            },
            getCAKey: function() {
                $http.get(settings.clearingAuthorityAPI + '?cmd=getPublicKey&target=CAServer')
                    .success(function(data) {
                        KeyManager.registerCAKey(data);
                    });
            },
            getVAKey: function() {
                $http.get(settings.clearingAuthorityAPI + '?cmd=getPublicKey&target=VAServer')
                    .success(function(data) {
                        KeyManager.registerVAKey(data);
                    });
            }
        };
    })
    .factory('KeyManager', function () {
        var data = {
            personalKey: {}
        };
        return {
            extrudePersonalKey: function (){
                if ( data.personalKey.privateKeyArmored == undefined )
                    return;

                var key;

                if ( data.personalKey.privateKeyArmoredPassword != undefined && data.personalKey.privateKeyArmoredPassword != '' ) {
                    key = openpgp.read_privateKey(
                        data.personalKey.privateKeyArmored,
                        data.personalKey.privateKeyArmoredPassword
                    )[0]
                } else {
                    key = openpgp.read_privateKey(
                        data.personalKey.privateKeyArmored
                    )[0]
                }

                key.privateKeyArmored = data.personalKey.privateKeyArmored;
                key.privateKeyArmoredPassword = data.personalKey.privateKeyArmoredPassword;

                if (key.privateKeyPacket.secMPIs) {
                    // todo: Missing Password!
                }

                angular.copy(key, data.personalKey);
            },
            registerVAKey: function(key) {
                data.VAKey = key;
            },
            registerCAKey: function(key) {
                data.CAKey = key;
            },
            registerPersonalKey: function(key) {
                if ( key.privateKey != undefined ) {
                    key.privateKey.privateKeyArmoredPassword = key.privateKeyArmoredPassword;
                    key.privateKey.privateKeyArmored = key.privateKeyArmored;
                    key = key.privateKey;
                }
                angular.copy(key,data.personalKey);
            },
            getPersonalKey: function(key) {
                return data.personalKey;
            },
            hasPersonalKey: function() {
                return data.personalKey != null
                    && data.personalKey.privateKeyPacket != null
                    && data.personalKey.privateKeyPacket.secMPIs != null;
            },
            signMessage: function(message) {
                if ( data.personalKey == undefined ) {
                    return false;
                }
                var key = data.personalKey;
                if ( data.personalKey.privateKey != undefined )
                    key = data.personalKey.privateKey;
                return openpgp.write_signed_message(key, message);
            },
            encryptMessage: function(message,key) {

                return '';
            },
            getCAKey: function() {
                return data.CAKey;
            },
            getVAKey: function() {
                return data.VAKey;
            }
        };
    });


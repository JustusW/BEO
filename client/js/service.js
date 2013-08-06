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
    .factory('decodingInterceptor', function($q) {
        return function(promise) {
            return promise.then(function(data) {
                if ( !/-----BEGIN PGP SIGNED MESSAGE-----/.test(data.data) ) {
                    return data;
                }
                var msg = openpgp.read_message(data.data)[0];
                //todo: verify message
                return JSON.parse(msg.text);
            });
        }
    })
    .config(function($httpProvider) {
        $httpProvider.responseInterceptors.push('decodingInterceptor');
    })
    .factory('Backend', function ($http) {
        var settings = {
            clearingAuthorityAPI: 'http://localhost/BEO/CAServer/api.php',
            votingAuthorityAPI: 'http://localhost/BEO/VAServer/api.php'
        };
        return {
            getSettings: function () {
                return settings;
            },
            getOpenVoteList: function () {
                return $http.get(settings.votingAuthorityAPI + '?cmd=getVoteList')
                    .success(function (data) {
                        console.log(data);
                    });
            },
            getCAKey: function() {
                return $http.get(settings.clearingAuthorityAPI + '?cmd=getPublicKey&target=CAServer');
            },
            getVAKey: function() {
                return $http.get(settings.clearingAuthorityAPI + '?cmd=getPublicKey&target=VAServer');
            }
        };
    })
    .factory('KeyManager', function (Backend) {
        var data = {};
        return {
            registerPersonalKey: function(key) {
                data.personalKey = key;
            },
            signMessage: function(message) {
                if ( data.personalKey == undefined ) {
                    return false;
                }
                return openpgp.write_signed_message(data.personalKey.privateKey, message);
            },
            encryptMessage: function(message,key) {

                return '';
            }
        };
    });


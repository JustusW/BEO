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

angular.module('BEO.service', []).
    value('version', '0.1')
    .factory('Backend', function () {
        var settings = {
            clearingAuthorityAPI: 'http://localhost/BEO/CAServer/api.php',
            votingAuthorityAPI: 'http://localhost/BEO/VAServer/api.php'
        };
        return {
            getSettings: function () {
                return settings;
            },
            getOpenVoteList: function () {
                return [
                    {
                        name:'Vote 1',
                        end:'06.08.2013 00:00',
                        petitionList: [
                            {name:'Petition 1'},
                            {name:'Petition 2'},
                            {name:'Petition 3'},
                            {name:'Petition 4'}
                        ]
                    },
                    {
                        name:'Vote 2',
                        end:'08.08.2013 00:00',
                        petitionList: [
                            {name:'Petition 5'},
                            {name:'Petition 6'}
                        ]
                    },
                    {
                        name:'Vote 3',
                        end:'07.08.2013 00:00',
                        petitionList: [
                            {name:'Petition 7'}
                        ]
                    }
                ];
            }
        };
    })
    .factory('KeyManager', function () {
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


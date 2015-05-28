/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

define(function (require) {
    var sdk = require('baidubce-sdk.bundle');
    var config = {
        credentials: {
            ak: '46bd9968a6194b4bbdf0341f2286ccce',
            sk: 'ec7f4e0174254f6f9020f9680fb1da9f'
        },
        endpoint: 'http://10.105.97.15'
    };

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

    describe('baidubce-sdk', function () {
        it('putObject', function (done) {
            var client = new sdk.BosClient(config);

            var bucket = 'leeight';
            var key = '1.txt';
            // data:text/plain;base64
            var dataUrl = '5L2g5aW977yM5LiW55WMKGhlbGxvIHdvcmxkKQ==';
            var options = {'Content-Type': 'text/plain'};
            client.putObjectFromDataUrl(bucket, key, dataUrl, options)
                .then(function () {
                    return $.get(client.generatePresignedUrl(bucket, key));
                })
                .then(function (data) {
                    expect(data).toEqual('你好，世界(hello world)');
                })
                .catch(fail)
                .fin(done);
        });

        it('initiateMultipartUpload(simple)', function (done) {
            var client = new sdk.BosClient(config);

            var bucket = 'leeight';
            var key = '2.txt';
            var uploadId = null;
            client.initiateMultipartUpload(bucket, key)
                .then(function (response) {
                    uploadId = response.body.uploadId;
                    expect(uploadId).not.toBe(undefined);
                })
                .then(function (p1) {
                    // 如果只有一个 Part 的话，体积可以小于 5M
                    // uploadPartFile(1)
                    var partNumber = 1;
                    var partSize = 28;
                    var dataUrl = '5L2g5aW977yM5LiW55WMKGhlbGxvIHdvcmxkKQ==';
                    return client.uploadPartFromDataUrl(bucket, key, uploadId,
                        partNumber, partSize, dataUrl);
                })
                .then(function (response) {
                    var partList = [
                        {
                            partNumber: 1,
                            eTag: response.http_headers.etag
                        }
                    ];

                    return client.completeMultipartUpload(bucket, key, uploadId, partList);
                })
                .then(function () {
                    return $.get(client.generatePresignedUrl(bucket, key));
                })
                .then(function (data) {
                    expect(data).toEqual('你好，世界(hello world)');
                })
                .catch(fail)
                .fin(done);
        });

        it('initiateMultipartUpload(complex)', function (done) {
            var client = new sdk.BosClient(config);

            var bucket = 'leeight';
            var key = '2.txt';
            var uploadId = null;
            client.initiateMultipartUpload(bucket, key)
                .then(function (response) {
                    uploadId = response.body.uploadId;
                    expect(uploadId).not.toBe(undefined);
                })
                .then(function () {
                    // uploadPartFile(1)
                    // var b = new Buffer(5 * 1024 * 1024);
                    // b.toString('base64')
                    var partNumber = 1;
                    var partSize = 5 * 1024 * 1024 + 1;
                    var dataUrl = new Array(6990508 + 1).join('A') + '=';
                    return client.uploadPartFromDataUrl(bucket, key, uploadId,
                        partNumber, partSize, dataUrl);
                })
                .then(function (p1) {
                    // uploadPartFile(2)
                    var partNumber = 2;
                    var partSize = 28;
                    var dataUrl = '5L2g5aW977yM5LiW55WMKGhlbGxvIHdvcmxkKQ==';
                    return client.uploadPartFromDataUrl(bucket, key, uploadId,
                        partNumber, partSize, dataUrl).then(function (p2) {
                        return [p1, p2];
                    });
                })
                .then(function (allResponses) {
                    var partList = [];
                    for (var i = 0; i < allResponses.length; i ++) {
                        partList.push({
                            partNumber: i + 1,
                            eTag: allResponses[i].http_headers.etag
                        });
                    }

                    return client.completeMultipartUpload(bucket, key, uploadId, partList);
                })
                .then(function () {
                    return $.get(client.generatePresignedUrl(bucket, key));
                })
                .then(function (data) {
                    // console.log(data.length);
                    // 5 * 1024 * 1024 + 1 + 28 = 5242909
                    // LENGTH(你好，世界) = 5
                    // 5 * 3 - 5          = 10
                    // 5242909 - 10       = 5242899
                    expect(data.length).toEqual(5242899);
                })
                .catch(fail)
                .fin(done);
        });
    });
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */
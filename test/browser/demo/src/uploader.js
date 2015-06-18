/**
 * @file app.js
 * @author leeight
 */

define(function (require) {
    var $ = require('jquery');
    var async = require('async');

    var Klient = require('./client');
    var helper = require('./helper');
    var config = require('./config');
    var fileList = require('./file-list');

    var exports = {};

    function handleFileSelect(evt) {
        var files = evt.target.files;
        if (!files.length) {
            return false;
        }

        $('#g_time').val('0s');
        var startTime = new Date().getTime();
        async.eachLimit(files, 1, upload, function (err) {
            if (!err) {
                var endTime = new Date().getTime();
                $('#g_time').html(((endTime - startTime) / 1000) + 's');
            }
            else {
                console.error(err);
            }
        });
    }

    function addDirectory() {
        var name = prompt('请输入文件夹的名字：');
        if (!name) {
            return;
        }
        var opts = config.getOptions();
        var bucketName = opts.bucketName;
        var key = opts.prefix + name + '/';
        var file = new Blob([]);

        var client = Klient.createInstance();
        helper.upload(bucketName, key, file, null, client)
            .then(function () {
            })
            .catch(function (error) {
                console.error(error);
            })
            .fin(function () {
                fileList.refresh();
            });
    }

    function upload(file, callback) {
        var chunkCount = Math.ceil(file.size * 1.0 / config.kMinFileSize);

        $('#g_file_size').val(file.size);
        $('#g_chunk_count').val(chunkCount);
        $('#g_progress').val(0);
        $('#g_url').html('-');

        var client = Klient.createInstance();
        var key = file.name;
        var opts = config.getOptions();
        var bucketName = opts.bucketName;
        key = opts.prefix + key;

        client.on('bosprogress', function (evt) {
            if (evt.lengthComputable) {
                $('#g_progress').val(evt.loaded / evt.total);
            }
        });
        helper.upload(bucketName, key, file, null, client)
            .then(function () {
                $('#g_progress').val(1);
                var url = client.generatePresignedUrl(bucketName, key);
                $('#g_url').html('<a href="' + url + '" target="_blank">下载地址</a>');
            })
            .catch(function (error) {
                $('#g_progress').val(1);
                callback(error);
            })
            .fin(function () {
                fileList.refresh();
                callback(null);
            });
    }

    function switchMode() {
        var mode = getCurrentMode();

        $('tr').each(function () {
            if (this.className !== '') {
                $(this).hide();
            }
        });
        $('tr.' + mode).show();
    }

    function getCurrentMode() {
        var mode = $('input[type=radio]:checked').val();
        return mode;
    }

    function toggleLegend() {
        if ($(this).hasClass('collapse')) {
            $(this).parent().find('table').show();
            $(this).html('高级参数配置[-]');
            $(this).attr('class', 'expand');
        }
        else {
            $(this).parent().find('table').hide();
            $(this).html('高级参数配置[+]');
            $(this).attr('class', 'collapse');
        }
    }

    exports.init = function () {
        $('#file').on('change', handleFileSelect);
        $('#upload').on('click', function (e) {
            $('#file').click();
        });
        $('#addDirectory').on('click', function (e) {
            addDirectory();
        });
        $('input[type=radio]').on('click', switchMode);
        $('legend.collapse').on('click', toggleLegend);
        $('#g_host').val(
            location.protocol === 'file:'
            ? 'http://10.105.97.15'
            : location.protocol + '//' + location.host);
    };

    return exports;
});

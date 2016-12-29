"use strict";
// Created by baihuibo on 16/9/13.
var uploader_1 = require("./lib/uploader");
var angular_1 = require("angular");
var app = angular_1.module('app', [uploader_1.default]);
app.run(function ($rootScope) {
    $rootScope.option = {
        auto: false,
        dnd: 'body',
        multiple: false,
        fileSingleSizeLimit: 1000 * 10 // 10kb
    };
    $rootScope.beforeSend = function (file, data, headers) {
        console.log('beforeSend', arguments);
    };
    $rootScope.queued = function (file) {
        console.log('queued', file);
        $rootScope.file = file;
    };
    $rootScope.error = function (type) {
        // F_EXCEED_SIZE  文件大小超过
        // Q_TYPE_DENIED  文件类型不匹配
        console.warn('error', type);
    };
});
angular_1.bootstrap(document, ['app']);

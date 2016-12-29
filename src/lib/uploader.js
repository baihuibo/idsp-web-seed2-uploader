"use strict";
///<reference path="../../typings/uploader.d.ts"/>
// Created by baihuibo on 16/9/13.
var angular_1 = require("angular");
require("webuploader/dist/webuploader.css");
require("./uploader.less");
var WebUploader = require('webuploader');
var swf = require('webuploader/dist/Uploader.swf');
var modName = 'idsp-web-seed2-uploader';
exports.mod = angular_1.module(modName, []);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = modName;
exports.mod.directive("uploader", function () {
    return {
        scope: {
            option: '=?',
            files: '=?',
            fileQueued: '&',
            fileDequeued: '&',
            uploadStart: '&',
            uploadBeforeSend: '&',
            uploadProgress: '&',
            uploadError: '&',
            uploadSuccess: '&',
            error: '&'
        },
        require: '^?submitUploader',
        link: function (scope, el, attr, ctrl) {
            var option = scope.option = scope.option || {};
            var files = scope.files = scope.files || [];
            var uploader = option.uploader = WebUploader.create({
                dnd: option.dnd,
                disableGlobalDnd: !!option.dnd,
                swf: swf,
                auto: option.auto,
                method: option.method || 'post',
                formData: option.formData || {},
                fileVal: option.name || 'file',
                server: option.server || 'fileupload.php',
                paste: !!option.dnd ? document : void 0,
                pick: {
                    id: el.get(0),
                    multiple: option.multiple
                },
                accept: option.accept,
                fileSingleSizeLimit: option.fileSingleSizeLimit
            });
            var modal = el.closest('.modal');
            if (modal.length) {
                modal.on('shown.bs.modal', function () {
                    uploader['refresh']();
                });
            }
            uploader.on('fileQueued', function ($file) {
                if (option.multiple == false) {
                    // 如果是单选模式
                    files.forEach(function (file) { return uploader.removeFile(file.$$file, true); });
                    files.length = 0;
                }
                scope.$applyAsync(function () {
                    var file = {
                        id: $file.id,
                        name: $file.name,
                        size: $file.size,
                        sizeUnit: WebUploader.formatSize($file.size),
                        percentage: 0,
                        response: null,
                        state: 'ready',
                        $$file: $file
                    };
                    $file._file = file;
                    files.push(file);
                    scope.fileQueued({ $file: $file });
                });
            });
            uploader.on('fileDequeued', function ($file) {
                scope.$applyAsync(function () {
                    var idx = files.indexOf($file._file);
                    idx > -1 && files.splice(idx, 1);
                    scope.fileDequeued({ $file: $file });
                });
            });
            uploader.on('uploadStart', function ($file) {
                scope.$applyAsync(function () {
                    $file._file.state = 'uploading';
                    scope.uploadStart({ $file: $file });
                });
            });
            uploader.on('uploadBeforeSend', function ($chuck, $data, $headers) {
                scope.$applyAsync(function () {
                    scope.uploadBeforeSend({ $chuck: $chuck, $data: $data, $headers: $headers });
                });
            });
            uploader.on('uploadProgress', function ($file, $percentage) {
                scope.$applyAsync(function () {
                    $file._file.percentage = $percentage * 100;
                    scope.uploadProgress({ $file: $file, $percentage: $percentage });
                });
            });
            uploader.on('uploadError', function ($file, $error) {
                scope.$applyAsync(function () {
                    scope.uploadError({ $file: $file, $error: $error });
                });
            });
            uploader.on('uploadSuccess', function ($file, $response) {
                scope.$applyAsync(function () {
                    $file._file.response = $response;
                    $file._file.state = 'success';
                    scope.uploadSuccess({ $file: $file, $response: $response });
                });
            });
            uploader.on('error', function ($type) {
                scope.$applyAsync(function () {
                    scope.error({ $type: $type });
                });
            });
            ctrl && ctrl.register(uploader);
            scope.$on('$destroy', function () {
                ctrl && ctrl.unRegister(uploader);
                uploader.destroy();
                uploader = null;
                files = null;
                option = null;
            });
        },
        restrict: 'E'
    };
});

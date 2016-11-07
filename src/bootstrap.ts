// Created by baihuibo on 16/9/13.
import uploader from "./lib/uploader";
import {module, bootstrap} from "angular";

const app = module('app', [uploader]);

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

bootstrap(document, ['app']);
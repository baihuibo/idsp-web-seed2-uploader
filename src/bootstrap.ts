// Created by baihuibo on 16/9/13.
import uploader from "./lib/uploader";
import {module, bootstrap} from "angular";

const app = module('app', [uploader]);

app.run(function ($rootScope) {

    $rootScope.option = {
        auto: true
    };

    $rootScope.beforeSend = function (file, data, headers) {
        console.log('beforeSend', arguments);
    };

    $rootScope.queued = function (file) {
        console.log(file);
        $rootScope.file = file;
    };
});

bootstrap(document, ['app']);
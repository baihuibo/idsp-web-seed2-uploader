/// <reference path="angularjs/angular-mocks.d.ts" />
/// <reference path="angularjs/angular.d.ts" />
/// <reference path="jquery/jquery.d.ts" />
/// <reference path="lodash/lodash.d.ts" />
///<reference path="uploader.d.ts"/>

import {Uploader} from "./uploader";
declare module "webuploader" {
    export function create(UploaderOption?): Uploader;

    export function formatSize(size, pointLength?, units?): string;
}

declare module "webuploader/dist/Uploader.swf" {
    let swfPath: string;
    export default swfPath;
}
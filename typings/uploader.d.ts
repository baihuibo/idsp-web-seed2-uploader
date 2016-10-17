// Created by baihuibo on 2016/9/28.

interface UploadFile {
    name: string
    size: number
    id: string
    sizeUnit: string
    percentage: number
    response: any
    state: 'ready' | 'uploading' | 'success'
    $$file: Object
}

interface UploaderOption {
    /** webuploader 的实例对象 */
    uploader?: Uploader

    /** 拖拽加入文件的接收容器 */
    dnd?: string

    /** 是否自动开启上传 */
    auto?: boolean

    /** 上传方式 默认 post */
    method?: string

    /** 上传时附带的数据 */
    formData?: Object

    /** 上传域 name */
    name?: string

    /** 服务器地址 */
    server?: string

    /** 是否可以多选文件 */
    multiple?: boolean

    /** 指定接收文件类型 */
    accept?: {
        /** 文字描述 */
        title: string

        /** 允许的文件后缀，不带点，多个用逗号分隔 `jpg,ext,gif,png` */
        extensions: string

        /** 多个用逗号分隔 `image/*,text/*` */
        mimeTypes: string
    }

    /** 限制文件单个大小，超出此大小则不会加入队列 */
    fileSingleSizeLimit?: number
}

interface Uploader {
    on(name: string, cb?: (...args)=>any): void
    destroy()
    getStats()
    md5File(file): Promise<string>
    makeThumb(file, cb: (error, ret)=>any)
    addFiles(file: any | any[])
    removeFile(file, removeQueue?: boolean)
    getFiles(...status): any[]
    retry(file?)
    upload(file?)
    stop(flag: boolean | any)
    cancelFile(file)
}

declare module "webuploader" {
    export function create(UploaderOption?): Uploader;

    export function formatSize(size, pointLength?, units?): string;
}

declare module "webuploader/dist/Uploader.swf" {
    let swfPath: string;
    export default swfPath;
}
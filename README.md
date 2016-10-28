# idsp-web-seed2-uploader
分页组件

安装方法

### 1. 下载程序包
```bash
npm i idsp-web-seed2-uploader --save
```

### 2. 配置文件依赖

找到 `index.html` 文件的systemjs配置,加入 `idsp-web-seed2-uploader`  配置
```js
SystemJS.config({
    transpiler: 'ts',
    typescriptOptions: {
        // ...
    },
    packages: {
        //...
       
        // 组件设置 
        webuploader: {main: 'dist/webuploader.js', format: 'global'},
        'idsp-web-seed2-uploader': {main: 'src/lib/uploader.ts'},
    
        "src": {
            //...
        }
    },
    meta: {
        '*.less': {loader: 'less'},
        '*.css': {loader: 'css'},
        // ...
    },
    
    map: {
        // ...
        'idsp-web-seed2-uploader': 'node_modules/idsp-web-seed2-uploader',
    }
});
```

### 3. 在项目`src/common/directives/directives.ts`中依赖组件

```ts
//...
import uploader from "idsp-web-seed2-uploader";

export const mod = module('directives', [...others, uploader]);
```


### 4. 接下来就可以使用上传组件了
```html
<uploader
 files="Ctrl.files"
 option="Ctrl.uploadOption"
 [file-queued='Ctrl.fn($file)']
 [file-dequeued='Ctrl.fn($file)']
 [upload-start='Ctrl.fn($file)']
 [upload-before-send='Ctrl.fn($chuck, $data, $headers)']
 [upload-progress='Ctrl.fn($file, $percentage)']
 [upload-error='Ctrl.fn($file, $error)']
 [upload-success='Ctrl.fn($file, $response)']
 [error='Ctrl.fn($type)']
 >
</uploader>
```
```ts
@Route({
  ...
  controllerAs : 'Ctrl'
})
@Controller
exports class PageCtrl{
  public files:UploadFile[];
  public uploaderOption:UploaderOption = {
    dnd : '#dnd-wrapper',
    auto:true,
    server : 'uploader.shtml'
  };
  
  // 上传事件处理
  fn(...){
     ...
  }
}
```

#### 指令属性参数
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>类型</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>files</td>
      <td>UploadFile[]</td>
      <td>文件上传队列</td>
    </tr>
    <tr>
      <td>option</td>
      <td>UploaderOption</td>
      <td>上传组件的配置</td>
    </tr>
    <tr>
      <td>file-queued (可选)</td>
      <td>事件</td>
      <td>当一个文件加入上传队列时触发 , `$file` 表示当前加入队列的文件</td>
    </tr>
    <tr>
      <td>file-dequeued (可选)</td>
      <td>事件</td>
      <td>当一个文件移出上传队列时触发</td>
    </tr>
    <tr>
      <td>upload-start (可选)</td>
      <td>事件</td>
      <td>当一个文件开始上传时触发</td>
    </tr>
    <tr>
      <td>upload-before-send (可选)</td>
      <td>事件</td>
      <td>当一个文件开始上传之前触发</td>
    </tr>
    <tr>
      <td>upload-progress (可选)</td>
      <td>事件</td>
      <td>当文件的上传进度发生变化时触发</td>
    </tr>
    <tr>
      <td>upload-error (可选)</td>
      <td>事件</td>
      <td>当一个文件上传发生错误时触发</td>
    </tr>
    <tr>
      <td>upload-success (可选)</td>
      <td>事件</td>
      <td>当一个文件上传成功时触发,`$response` 是服务器的返回数据</td>
    </tr>
    <tr>
      <td>error (可选)</td>
      <td>事件</td>
      <td>当发生错误时触发</td>
    </tr>
  </tbody>
</table>

#### UploadFile 属性
* `file.name` ：表示文件名称(String)
* `file.size` ：表示文件大小(Number)
* `file.sizeUnit` ：计算好的文件大小(String)如：12MB
* `file.percentage` ：上传进度(Number)，从0到100
* `file.response` ：服务器返回数据，默认为null，当状态为`success`时可使用
* `file.state` ：文件状态(String),'ready'|'uploading'| 'success'

#### UploaderOption 参数
<table>
  <thead>
    <tr>
      <th>参数</th>
      <th>类型</th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>server</td>
      <td>String</td>
      <td>文件上传处理服务器</td>
    </tr>
    <tr>
      <td>method (可选)</td>
      <td>String</td>
      <td>上传请求类型 默认 :'post'</td>
    </tr>
    <tr>
      <td>multiple (可选)</td>
      <td>Boolean</td>
      <td>是否允许多选文件</td>
    </tr>
    <tr>
      <td>dnd (可选)</td>
      <td>String (css selector)</td>
      <td>开启拖拽添加文件功能</td>
    </tr>
    <tr>
      <td>auto (可选)</td>
      <td>Boolean</td>
      <td>是否开启自动上传文件功能</td>
    </tr>
    <tr>
      <td>formData (可选)</td>
      <td>Object</td>
      <td>上传文件时附带参数</td>
    </tr>
    <tr>
      <td>name (可选)</td>
      <td>String</td>
      <td>服务器用来获取文件的参数名，默认 `file[]`</td>
    </tr>
    <tr>
      <td>accept (可选)</td>
      <td>Object</td>
      <td>指定可选择的文件类型</td>
    </tr>
    <tr>
      <td>accept.title</td>
      <td>String</td>
      <td>描述文字</td>
    </tr>
    <tr>
      <td>accept.extensions</td>
      <td>String</td>
      <td>允许文件的后缀名，多个用逗号分隔如:`jpg,exe,gif,pdf`</td>
    </tr>
    <tr>
      <td>accept.mimeTypes</td>
      <td>String</td>
      <td>指定文件的miniType，多个使用逗号分隔如：`image/*,text/*`</td>
    </tr>
    <tr>
      <td>fileSingleSizeLimit (可选)</td>
      <td>Number</td>
      <td>限制单个文件的大小</td>
    </tr>
  </tbody>
</table>
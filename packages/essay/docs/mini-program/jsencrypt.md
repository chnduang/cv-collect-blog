### 小程序使用jsencrypt加密

+ 由于小程序不支持window对象，所以不能直接使用官网得包文件
+ 当然目前也有一些做了关于小程序得，具体没用过，可以自行在npm官网找相关得包尝试使用
+ 如果不能使用包安装工具，可以修改源码达到我们得需求
+ [官网文件](https://github.com/travist/jsencrypt/tree/master/bin)不要下载压缩文件，下载jsencrypt.js，然后在其中进行修改

##### 先添加取代window和navigator对象得新对象，名称可以随意取；

> ##### 搜索后，用window2全局替换window，用navigator2全局替换navigator

```js
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.JSEncrypt = {})));
}(this, (function (exports) { 'use strict';
    //------- 这里开始添加---------
    // 用来替换 navigator2
    var navigator2 = {
        appName: 'Netscape',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    };
    //  用来替换window2
    var window2 = {
        ASN1: null,
        Base64: null,
        Hex: null,
        crypto: null,
        href: null
    };
    //--------- 这里结束添加--------
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
    return BI_RM.charAt(n);
}
```

##### 修改完成后在项目中引入

> 想要压缩得可自行找工具进行压缩，网上有在线压缩得工具

```js
// 这里随意举例在utils文件夹下
const Encrypt  = require('./utils/jsencrypt.js');
let _self = new Encrypt.JSEncrypt();
encrypt.setPublicKey("eweawe");   // 这里面会放你得publicKey，这个会约定给出得

// 对其加密
const password = "password";
_self.encrypt(password);
```

##### 如果不想修改得，评论留言，我会给你发




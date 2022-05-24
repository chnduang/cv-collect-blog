```
### 1.将数组转化成字符串

##### 		JSON.stringify(obj)

------

### 2.将字符串转化成数组

##### 	JSON.parse(string)

------

### 3.`art-template`

##### 	{{each 数组}}

​		<li>{{$value}}</li>                // $value   即是item ，遍历的每一项

##### 	{{/each}}

##### 	*这是art-template的模板语法，专有的

##### +$.each(数组,function(){ })

##### +$(' div ').each(function(){ })

​	+一般用于遍历jQuery选择到的伪数组实例对象

​		+ 伪数组是对象可将其转化为数组：

​		+ 对象的原型链中没有forEach这个方法

​		+ 对象的原型链是  Object.prototype

​		+ 这个each是jQuery提供的 	

​```javascript
;[].slice.call($('div'))
//slice() 不传参数时，默认从截取全部
//slice(1,2) 不包含右边 
​```

##### +forEach 是 Ecmascript 5中的一个数组遍历函数 ，是javascript 原生支持的遍历方法，

​	+不兼容低版本的浏览器，IE8开始

------

### 4.如何在`Node`中实心服务器的重定向

##### + header('location')

##### 	*301 永久重定向 浏览器会记住

​		-a.com b.com

​		-a 浏览器不会再请求a了

​		-会直接跳到 b 了

##### 	*302 临时重定向 l浏览器不会记忆

​		-a.com b.com

​		-a 还是会请求a

​		-a 告诉浏览器往 b 跳转

------

### 5.`Node`中的模块系统

+使用node编写的应用程序主要就是用在

##### 	+Ecmascript语言

##### 	+核心模块

​		-fs 文件操作的fs

​		-http 服务的http

​		-url 路径操作模板

​		-path 路径处理模板

​		-os 操作系统信息

##### 	+第三方模块

​		- art-template

​		-必须通过`npm` 下载使用的

##### 	+自己写的模块

​		-文件路径

### 6.`commonJs` 模块规范

##### 6.1	在Node中有一个很重要的概念的：模块系统

​	+模块作用域

​	+使用require 方法来加载模块

​	+使用exports 接口对象来导出模块中的成员

+++

### 7.`exports`和`module.exports`的区别

#### 7.1	简单比较

##### +Node 中是模块作用域，默认的文件中的所有成员只在当前文件模块生效

+对与希望可以被其他模块访问的信息，我们就需要把这些公开的成员都挂载到`exports`

接口对象中就可以了。

+导出多个成员（必须在对象中）

​```javascript
exports.a = 123
exports.b = 'hello'
exports.c = function(){
    console.log('ccc')
}
exports.d = {
    foo: 'bar'
}
​```

+导出单个成员（拿到的就是：函数，字符串）

​```javascript
module.exports = 'hello'

module.exports = function(){ 

}
//后面的会覆盖前面的
​```

+也可以导出多个成员

​```javascript
module.export = {
    add:function(){
        return x+y
    },
    str:'hello'
}
​```

#### 7.1	原理解析

+`exports`和`module.exports`的一个引用：

​```javascript
console.log(exports === module.exports)      //true

exports.foo = 'bar'
//等价于
module.exports.foo = 'bar'
​```

+++

#### 7.2具体分析

+我们发现，每次导出接口成员的时候都通过 module.exports.xxx = xxx 的方式很麻烦，点儿的太多了所以，Node 为了简化你的操作，专门提供了一个变量：exports 等于 module.exports

​```javascript
 var module = {
   exports: {
     foo: 'bar',
     add: function
   }
 }
​```

// 也就是说在模块中还有这么一句代码

​```javascript
// var exports = module.exports

// module.exports.foo = 'bar'

// module.exports.add = function (x, y) {
//   return x + y
// }
​```

// 两者一致，那就说明，我可以使用任意一方来导出内部成员

​```javascript
// console.log(exports === module.exports)

// exports.foo = 'bar'
// module.exports.add = function (x, y) {
//   return x + y
// }
​```

// 当一个模块需要导出单个成员的时候
// 直接给 exports 赋值是不管用的

​```javascript
// exports.a = 123// exports = {}// exports.foo = 'bar'// module.exports.b = 456// 给 exports 赋值会断开和 module.exports 之间的引用// 同理，给 module.exports 重新赋值也会断开// 这里导致 exports !== module.exports// module.exports = {//   foo: 'bar'// }// // 但是这里又重新建立两者的引用关系// exports = module.exports// exports.foo = 'hello'// {foo: bar}exports.foo = 'bar'// {foo: bar, a: 123}module.exports.a = 123// exports !== module.exports// 最终 return 的是 module.exports
​```

// 所以无论你 exports 中的成员是什么都没用

​```javascript
exports = {  a: 456}// {foo: 'haha', a: 123}module.exports.foo = 'haha'// 没关系，混淆你的exports.c = 456// 重新建立了和 module.exports 之间的引用关系了exports = module.exports// 由于在上面建立了引用关系，所以这里是生效的// {foo: 'haha', a: 789}exports.a = 789// 前面再牛逼，在这里都全部推翻了，重新赋值// 最终得到的是 Functionmodule.exports = function () {  console.log('hello')}// 真正去使用的时候：//    导出多个成员：exports.xxx = xxx//    导出多个成员也可以：module.exports = {//                        }//    导出单个成员：module.exports
​```

+++

### 8.Node中的require         

> 一个项目中有且只有 `node_modules`  而且是存放在项目的根目录中的
>
> 这样的话项目中所哟子目录中的代码都可以加载到第三方包
>
> 不会出现有多个`node_modules`

#### 8.1 加载的模块

##### 	+核心模块

​		-本质也是文件

​		-核心模块已经被编译到了二进制文件中了

##### 	+第三方模块

​		-必须从npm 下载的模块

​		-使用的时候就可以通过 require('包名') 的方式来进行加载才可以使用
​		-不可能有任何一个第三方包和核心模块的名字是一样的
​		-既不是核心模块、也不是路径形式的模块
​		-先找到当前文件所处目录中的 node_modules 目录
​		-node_modules/art-template
​		-node_modules/art-template/package.json 文件
​		-node_modules/art-template/package.json 文件中的 main 属性
​		-main 属性中就记录了 art-template 的入口模块
​		-然后加载使用这个第三方包
​		-实际上最终加载的还是文件( index.js )	

##### 	+自己写的模块

#### 8.2 加载规则

> 详细见《深入浅出NodeJs》模块部分

​	+优先从缓存加载     （node底层做的）

​		-不会重复加载

​		-拿到其中的接口对象

​		-避免重复加载，提高模块加载的效率

​	+核心模块

​	+路径形式的文件模块

​	+第三方模块

​	+判断模块标识

------

### 9.npm

#### 9.1 package.json

+ 建议每一个项目都有一个`package.json`            
  + npm init
  + npm init -y         //跳过向导，快速生成
  + npm install --save jquery	//保存依赖信息
  + npm install         //会下载package.json 文件下的所有依赖

+ `package.json`和`package-lock.json`

  + npm5 以前是不会有package-lock.json这个文件的
  + npm5以后才会有
  + npm5 以后的安装包不需要 `--save`的参数，它会自动保存依赖项
  + `package-lock.json`这个文件会保存`node_modules`中的所有包的依赖 
  + 当`node_modules`删除重新安装的时候，安装的速度会更快
  + `lock`是锁定版本的
    + 如果这个项目依赖了`1.11.1`
    + 如果你重新安装install 其实是会安装最新的版本
    + 它会锁定我们当时使用的版本，不让他自动升级


#### 9.2 相关命令

+ 版本号：
  + npm --version
+ 升级(自己升级自己)
  + npm install --global npm

##### 9.2.1 常用命令

+ npm uninstall --save jquery

  + 删除时，依赖也会删除

+ npm uninstall --help 

  + 获取帮助

+ 配置淘宝镜像r

  + ```shell
    npm config set registry https://registry.npm.taobao.org#查看配置信息npm config list
    ```

------

### 10.相对路径

+ 模块加载中，相对路径 ./ 不能省略

+ 文件加载时，相对路径 ./ 可以省略

  > fs.readFile() 和ajax一样，都是异步操作，最后执行

------

### 11.修改完代码自动重启服务器

+ 可以使用第三方的命令行工具，`nodemon`解决频繁修改代码重启服务器的问题

+ nodemon 是一个基于NodeJs开发的一个第三方命令行工具，使用时需要全局安装

+ ```shell
  npm install -g nodemon#安装之后使用#nodemon app.js
  ```

------



### 12.路由

#### 12.1基本路由

**get**:

​```javascript
//当以GET的方式请求的时候，执行对应的处理函数app.get('/', function(req,res){    res.send('hello');});
​```

**post**:

​```javascript
//当以POST的方式请求的时候，执行对应的处理函数app.post('/', function(req,res){    res.send('hello post');});
​```

#### 12.2 在`express`中配置使用`art-template`模板引擎

安装：

> express-art-template 依赖了art-template

​```shell
npm install --save art-templatenpm install --save express-art-template
​```

配置：

> express 为 response 相应对象提供了一个方法 ： render
>
> render 方法默认是不可以使用的， 但是如果配置了模板引擎就可以使用了
>
> res.render('html模板名称'，{模板数据})
>
> 第一个参数不能路径，默认会去项目中的views目录中查找模板文件
>
> 也就是说express有一个约定，开发人员把所有的视图文件都放在  views 目录中了

​```javascript
app.engine('html',require('express-art-template'));app.get('/',function(req,res){    res.render('index.html');})app.get('/admin', function(req,res){    res.render('admin/index.html',{ });})
​```

如果希望修改默认的`views`视图渲染存储目录，可以通过

​```javascript
app.set('views',目录路径)；
​```

#### 12.3 在express中获取表单post请求体数据

在express中没又内置获取表单post请求体的API，这里我们需要使用一个第三方包，`body-parser`

> 在get中是express中内置了一个方法获取请求体，res.query
>
> post:   res.body

安装：

​```shell
npm install body-parser --save
​```

配置示例：

​```javascript
var express = require('express')var bodyParser = require('body-parser')var app = express()//加入这个配置之后，多一个   req.body 拿到请求体的对象// parse application/x-www-form-urlencodedapp.use(bodyParser.urlencoded({ extended: false }))// parse application/jsonapp.use(bodyParser.json())app.use(function (req, res) {  res.setHeader('Content-Type', 'text/plain')  res.write('you posted:\n')  res.end(JSON.stringify(req.body, null, 2))})
​```

### 13.异步函数封装

异步方法：

+ setTimeout
+ readFile
+ writeFile
+ reddir
+ ajax

> 用回调函数调用异步的结果

### 14.path 方法

+ path.basename
  + 获取一个路径的文件名
+ path.dirname
  + 获取一个路径中的目录部分
+ path.extname
  + 获取一路径中的扩展名部分
+ path.join
  + 路径的拼接
+ path.isAbsolute
  + 判断一个路径是否是绝对路径

+ path.parse()
  + 把一个路径转为一个对象

​```shell
path.parse('e:/a/b/c/d.html')
​```

+ __dirname 可以用来获取当前文件模块所属目录的绝对路径

+ __filename 可以用来获取当前文件的绝对路径

  + > 两者都是动态获取的

+ 在文件操作中，使用相对路径是不可靠的，因为在`Node`中文件操作的路径被设计为相对于执行`Node`命令所处的路径 (这不是bug 这样设计是有使用场景的)。在require()中不会影响，可使用相对路径。

  + 为了解决这个问题，很简单，只需要将相对路径换成绝对路径即可

  + 可以使用`__dirname`或者`__filename`帮我们解决这个问题

  + 推荐使用`path.join()`来帮我们解决拼接路径，避免我们手动拼接出现问题


### 15.


```


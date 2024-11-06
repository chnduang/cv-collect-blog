# other

## 复杂度

### 时间复杂度 

> 重时间 轻空间
>
> 以空间换时间

### 空间复杂度

#### 二分

#### 贪心



## 零碎问题

#### ajax fetch axios区别

+ 都是用于网络请求，但是是不同的维度

+ ajax 属于统称

  ```js
  x
  ```

  

+ fetch 是浏览器自带的api

+ axios 是第三方库

#### px % em rem

```
px:
%: 父元素
em: 相当于当前的元素的font-size ,如果当前元素没有，则为父元素的font-size
rem: 根元素html的font-size
vw  屏幕宽度的1%
vh: 屏幕高度的1%

```

#### 箭头函数

+ 缺点： 没有arguments
+ 无法通过apply，ca l l 改变this
+ 大量的箭头的函数导致代码可读性差
+ 不适用
  + 对象方法
  + 对象原型
  + 构造函数

```

```

#### tcp三次握手和四次挥手

+ 先建立连接
  + 确保双方都有收发消息的能力
+ 再传输内容
  + 发请求
+ 网络连接协议是tcp, 传输协议是http协议

+ 三次握手的建立
  + client发包，server接收 ；server: 有client的消息
  + server发包，client接收；client: server 具备接收消息的能力
  + client发包，server接收，server: 等待client发送

+ 四次挥手 断开
  + client发包



#### for in 和for of

+ 适用于不同的数据类型
+ for in 可枚举，数组，字符串 得到key  enumerable
+ for of   可迭代 Symbol[iterable]   得到value

```
遍历对象： for in
遍历Map Set :  for of
遍历Generator:  for of

```

#### for await of

+ 遍历多个promise

```

```

#### JS严格模式的特点

+ 全局变量要先声明
+ 禁止使用with
+ 禁止this指向window
+ 函数参数不能重名
+ 创建eval作用域 （单独的作用域）
  + eval(``)

#### http跨域请求时为什么发送options请求

+ 跨域请求之前的预检查
+ 浏览器执行发起的

+ 跨域请求
  + 浏览器的同源策略
  + 限制于ā ja x请求，不能跨域请求server
  + 不会限制 img  link iframe script 加载第三方的资源

+ JSONP

  ```html
  a
  <script>
  	window.onSuccess=function(data){
      
    }
  </script>
  <script scr=''></script>
  
  b
  "onSucesss({data:{}})"
  ```

+ CORS

  ```
  setHeader
  ```



#### offsetHeight scrollHeight clientHeight

+ offsetHeight
  + border + content + padding
+ clientHeight
  + content+ padding
+ scrollHeight
  + padding 实际内容尺寸

#### HTMLCollection NodeList

> 类数组

+ node是element的父类

+ 所有的节点都是node
+ element是元素的基类

#### Vue computed watch

+ computed 计算用于产生新的数据
+ watch 用于监听现有的数据

#### Vue组件的通讯方式

+ 自定义事件
+ $emit 
  + 父子组件props
+ $attrs 
  + v-bind
+ $parent     this.$parent
+ $ref      this.$ref
+ provide   inject

#### vex mutation action 区别

+ mutation  原子操作，同步代码；
+ action  可包含多个mutation ；可包含异步代码；

#### 如何检测JS的内存泄漏

+ 非预期的情况
+ performance memory

#### 如何进行垃圾回收

+ 函数已经运行结束

+ 引用计数
+ 标记清除

#### js内存泄漏的场景有些

+ 定时器
+ 全局事件
+ 自定义事件 

#### 浏览器和Nodejs的事件循环有什么区别

+ eventloop
+ nodejs
  + 也有宏任务和微任务，分不同的类型，有不同的优先级
  + 宏任务
    + timers
    + I/0
    + idls
    + poll
    + check setImmeditely
  + 微任务
    + process.nextTick优先级最高
+ 先同步再异步
+ node有宏任务和微任务的优先级

#### 单线程和异步

+ js是单线程
+ 浏览器中js的执行的dom渲染共用一个线程

#### 异步

> 先执行同步任务，

+ 宏任务和微任务
+ 微任务  promise async await
+ 微任务在下一轮dom渲染完成之前执行，宏任务在之后执行

#### VDOM

> 用js对象模拟dom节点数据

+ 组件化
+ 数据视图分离
+ 不用关注dom操作

#### 遍历数组for forEach哪个更快

+ for 更快
+ forEach 每次都要创建一个函数来调用，for不会创建函数
+ 函数有独立的作用域，有消耗
+ 越低级的代码，性能越好

#### Nodejs如何开启进程，进程之间如何通讯

+ 多个进程更好运算和利用
+ 单个进程有上限
+ cluster.fork
+ child_process.fork

#### JS Bridge

+ js 无法直接调用native api
+ 需要一些的特定的格式
+ 这些格式统称为 js-bridge



+ 注册全局的API

+ URL scheme



#### requestIdleCallback requestAnimationFrame

+ animation 每次渲染都要执行 高优先级
+ requestIdleCallback 空闲时才执行
+ 宏任务 等待dom渲染完才执行



#### Vue每个生命周期都做了什么

+ beforeCreate
  + 创建一个空白的vue实例
+ create
  + 完成响应式的绑定
  + data, method 初始化完成
  + 未开始模版的渲染
+ beforeMount
  + 编译模版调用render生成vdom
  + 还没有开始渲染dom
+ mounted
  + 完成do m渲染
  + 组件创建完成
+ beforeupdate
  + data变化之后 还没有更新do m
+ updated
  + dat a dom渲染完成	
+ beforeUnmount
  + 解除一些全局的事件
+ unmounted



#### Vue 什么操作dom合适

+ $nexTick 渲染dom
+ mounted 和created 都可以
  + mounted最合适

#### Vue3 composition api生命周期有什么区别

+ 用setup 代替了 beforeCreate 和created
+ 使用hooks函数形式  onMounted()



#### Vue2 Vue3 React diff算法

+ 只比较同一级
+ tag 不同则删掉重建 不再去比较内部的细节
+ 子节点通过key区分



+ react
  + 仅仅右移
+ vue2 
  + 双端移动
+ vue3
  + 最长递增子序列

#### Vue React 为何循环时候使用key

+ vdom diff 会根据key 元素是否要删除
+ 匹配了key 只要移动元素就好
+ 没有匹配到key 则删除重建

#### Vue-router Memoryhistory

+ hash

+ webhistory

+ memoryhistory

  + 网页url不会变化 像组件一样

    

#### 移动端H5 click有300ms 延迟 如何解决

+  FastClick
  + 监听touched 事件 先触发
  + 使用自定义的dom事件 模拟一个click事件
  + 把默认的click事件 禁止掉
+ meta content= “width: device-width”

#### token 和cookie有什么区别

+ cookie是 http规范， 而token是自定义传递

+ cookie 会默认被浏览器存储，token需要自己存储

+ token没有跨域限制 用于jwt

  

+ cookie
  + 服务端可以向客户端发送cookie set-cookie
  + 默认 跨域不共享 传递cookie
  + h5 本地存储
  + 禁止第三方cookie  sameSite
  + cookie 用于登录验证，存储用户标识
  + session 在服务端，存储用户的详细信息，和cookie信息一一对应
  + cookie session 登录验证方案



#### Session 和 JWT

+ 存储在服务端，

+ 默认有跨域限制

+ 多进程 多服务器时 需要第三方缓存redis

  

+ 用户信息存储在客户端，无法快速封禁用户

+ 服务端密钥被泄露，用户信息会丢失

+ 严格保护用户信息的， session



#### 如何实现SSO单点登录

+ cookie
  + 主域名相同
  + 设置cookie domain 共享cookie

#### HTTP协议和UDP协议有什么区别

+ http 协议在应用层
+ TCP UDP 在传输层
  + tcp
    + 稳定传输
  + UDP
  + 无连接，无断开
  + 不稳定传输，效率高
  + 视频会议，语音通话

#### http 协议1.0  1.1  2.0有什么区别

+ 1.1

+ 缓存策略 cache-control
+ 支持长连接 connection: keep-alive
+ 断点续传
+ 支持PUT DELETE



+ 2.0
+ 可压缩header，减少体积
+ 多路复用
+ 服务端推送



#### HTTPS 中间人攻击 如何预防

+ 加密传输 http ssl



#### script defer async 有什么区别

+ 加载的时候都是并行加载的

+ defer
  + 等待html解析完再加执行
+ async
  + script 加载完成之后执行
  + 再解析html



#### prefetch 和dns-prefetch 有什么区别

+ preload
  + 资源在当前页面使用，优先加载
+ prefetch 
  + 资源在未来页面使用，空闲时加载

+ dns-prefetch 预查询
+ pre-connect 预连接



#### 前端攻击的常用手段有哪些 如何预防

+ XSS
  + cross site script 跨站脚本攻击
  + 将js代码插入网页内容中
  + 特殊字符替换
+ CSRF
  + 跨站请求伪造
  + 伪造请求
  + 跨域限制 验证码
  + samesite
+ 点击劫持
  + iframe不能跨域加载
+ DDOS 
  + 分布式拒绝服务
+ sql注入
  + 替换特殊字符

#### Http和websockt有什么区别

+ websocket
  + 支持端对端的通讯
  + 可以由client发起，也可以由server发起
  + 用于 消息通知，聊天室 ，协同编辑 
  + 没有跨域限制
  + 协议ws:// 可以双端发起请求
  + 通过send, onmessage 通讯 http 通过request response
  + 先有http协议再升级到w s

#### WebSocket 和 http长轮询的区别

+ http:
  + 客户端发请求，服务阻塞，不会立即返回
  + time-out 后重新发请求
+ websocket
  + 客户端可发请求，服务端也可以发起请求

#### 从输入url到页面展示的完整的过程

+ 网路请求
  + DNS 查询，建立t c p
  + 浏览器发请求
  + 收到请求的响应，得到html的源代码
  + 解析html过程中遇到静态资源 继续请求静态资源 发网络请求
  + 静态资源可能有强缓存，cache-control 此时不用请求
+ 解析
  + 字符串 => 结构化
  + html 构建dom树
  + css构建cssdom树
  + render tree
+ 渲染
  + 计算dom 尺寸，位置，绘制到页面上
  + 遇到js 可能会执行
  + 异步的css 图片加载 也可能会触发重新渲染



#### 重绘repaint 和回流reflow

+ repaint
  + 元素外观改变，颜色，背景色
  + 元素的尺寸和定位不会变，不会影响其他元素的位置
+ reflow
  + 重新计算尺寸和布局，可能会影响其他元素的位置
+ 重排比重绘影响大，避免



+ 集中修改样式 class
+ 修改之前display: none , 脱离文档流
+ 使用bfc 特性
+ createDocumentFragment 批量操作do m
+ 优化动画， css3 request AnimationFrame
+ 频繁触发的dom操作，使用节流和防抖



##### BFC

+ html
+ float
+ display flex grid
+ overflow auto scroll hidden
+ position: absoluted fixed



#### 如何实现网页的多标签通讯

+ websocket成本高 可以跨域
+ localstorage  同域 跨域不共享
+ sharedWorker
  + 是webworker的一种
  + webworker 开启子进程 执行js , 不能操作dom
  + sharedworker可单独开启一个进程，用于同域的页面通讯



#### 网页和Iframe之间通讯

+ contentWindow.postMessage
+ addEventListenser message 
+ event.origin event.source event.data

#### koa2洋葱模型

+ 一个nodejs的框架
+ 通过中间件组织代码
+ 多个中间件以洋葱模型执行

#### 首屏优化

+ 路由拆分 路由懒加载
+ SSR
  + 渲染页面过程简单，性能好
  + nuxtjs
  + nextjs
+ APP预取
  + h5在app webview 中展示 可使用app预取
  + 用户访问列表页时,app 预加载文章首屏内容
  + 用户进入h5页，直接从app中获取内容，瞬间加载首屏
+ 分页
+ 图片懒加载
+ Hybrid
  + 提前将资源加载到app内部
  + 在app webview 中使用file:.//加载页面文件
  + ajax 获取内容并展示
+ 配合实际情况做骨架屏和loading效果的展示



#### 后端返回10万条数据如何处理

+ 技术方案不合理
+ js可以处理
+ 渲染到dom 会非常卡顿
+ 自定义nodejs中间层
+ 虚拟列表



#### 前端设计模式，使用场景

+ 单例模式
  + vuex store
+ 代理模式
  + proxy
+ 工厂模式
+ 观察者模式
+ 发布订阅
+ 装饰器



#### 观察者模式和发布订阅模式的区别

+ 观察者 
+ 发布订阅模式



#### VUE优化

+ v-if v-show
+ computed 缓存
+ keep-alive  tabs组件
+ 拆包异步加载
+ 路由懒加载
+ SSR

#### VUE遇到过哪些问题

+ 内存泄漏
  + 全局事件
  + 自定义事件

#### 监听Vue React 报错处理

#### Vue React 优化

#### H5 加载很慢

+ performance
+ lighthouse
+ 
+ 优化http缓存策略

#### 项目难点 如何解决

+ bit组件
+ 编辑器

#### 写函数获取数据的类型

#### new一个对象的过程

#### dom树的遍历

#### 深度优先遍历可以不用递归吗

+ 使用栈
+ 递归逻辑清晰，但容易发生stack overflow
+ 非递归效率更高，逻辑复杂

#### LazyMan

#### 函数柯里化，curry函数

#### instanceof 原理

```js
f.__proto__ === F.protoType
```

#### 手写bind, apply call

+ bind
  + 返回一个新的函数
  + 绑定this 和部分参数
  + 如果是箭头函数，不改变this，只改变参数
+ 

```
//
```

#### Events 自定义事件

+ 事件走线

```

```

#### LRU缓存

+ 只缓存最近使用的，删除沉水的数据
+ api:   get set
+ hash存储 对象和map
+ 必须有序 可排序

#### 深拷贝函数，考虑Map Set的循环引用

#### promise执行顺序

+ 多个fulfilled promise实例，同时执行then的链式调用，then 会交替执行 编译器的优化防止一个promise占据太长的时间
+ 慢两拍
  + then 中出现promise实例 会出现慢两拍的效果
  + 第一拍，promise需要从pending 变成fulfilled
  + 第二拍，then函数挂到 微任务队列中



#### React setState

+ React18 前

+ 同步更新不在React上下文中触发
  + setTimeout ,setInterval, promise.then
  + 自定义dom事件
    + document.get
  + ajax回调
+ React18后
  + ReactDom.render  替换成 ReactDom.creatRoot

#### React setState是微任务还是宏任务

#### 前端统计SDK

#### 什么时候用SPA 什么时候用MPA

#### hybrid 模板如何更新的



#### WeekMap WeekSet






















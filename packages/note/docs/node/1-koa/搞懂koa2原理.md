## 一文搞懂 koa2 核心原理

> [https://mp.weixin.qq.com/s/dC2MlBK-fCLnr1DDnAjgUQ](https://mp.weixin.qq.com/s/dC2MlBK-fCLnr1DDnAjgUQ)

## koa的基础结构

首先，让我们认识一下koa框架的定位——koa是一个精简的node框架：

- 它基于node原生req和res，封装自定义的request和response对象，并基于它们封装成一个统一的context对象。
- 它基于async/await（generator）的洋葱模型实现了中间件机制。

koa框架的核心目录如下：

```
── lib
   ├── application.js
   ├── context.js
   ├── request.js
   └── response.js

// 每个文件的具体功能
── lib
   ├── new Koa()  || ctx.app
   ├── ctx
   ├── ctx.req  || ctx.request
   └── ctx.res  || ctx.response
复制代码
```

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHqDVfNYjycFhicdeSxfLCDqstZ3UFt0qh6Fec6XLcqD9RouQRQxpLnUiaQVXfKFrbHdVlVdVRWDwyEw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)undefined

## koa源码基础骨架

`application.js` application.js是koa的主入口，也是核心部分，主要干了以下几件事情：

1. 完成了koa实例初始化的工作，启动服务器
2. 实现了洋葱模型的中间件机制
3. 封装了高内聚的context对象
4. 实现了异步函数的统一错误处理机制

`context.js` context.js主要干了两件事情：

1. 完成了错误事件处理
2. 代理了response对象和request对象的部分属性和方法

`request.js` request对象基于node原生req封装了一系列便利属性和方法，供处理请求时调用。所以当你访问ctx.request.xxx的时候，实际上是在访问request对象上的setter和getter。

`response.js` response对象基于node原生res封装了一系列便利属性和方法，供处理请求时调用。所以当你访问ctx.response.xxx的时候，实际上是在访问response对象上的setter和getter。

**4个文件的代码结构如下：**

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

undefined

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)undefined

### koa工作流

**Koa整个流程可以分成三步:**

1. 初始化阶段

new初始化一个实例，包括创建中间件数组、创建context/request/response对象，再使用use(fn)添加中间件到middleware数组，最后使用listen 合成中间件fnMiddleware，按照洋葱模型依次执行中间件，返回一个callback函数给http.createServer，开启服务器，等待http请求。结构图如下图所示：

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)undefined

1. 请求阶段

每次请求，createContext生成一个新的ctx，传给fnMiddleware，触发中间件的整个流程。3. 响应阶段 整个中间件完成后，调用respond方法，对请求做最后的处理，返回响应给客户端。

### koa中间件机制与实现

koa中间件机制是采用koa-compose实现的，compose函数接收middleware数组作为参数，middleware中每个对象都是async函数，返回一个以context和next作为入参的函数，我们跟源码一样，称其为fnMiddleware在外部调用this.handleRequest的最后一行，运行了中间件：`fnMiddleware(ctx).then(handleResponse).catch(onerror);`

以下是`koa-compose`库中的核心函数：![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

我们不禁会问：中间件中的`next`到底是什么呢？为什么执行`next`就进入到了下一个中间件了呢？中间件所构成的执行栈如下图所示，其中`next`就是一个含有`dispatch`方法的函数。在第1个中间件执行`next`时，相当于在执行`dispatch(2)`，就进入到了下一个中间件的处理流程。因为`dispatch`返回的都是`Promise`对象，因此在第n个中间件`await next()`时，就进入到了第n+1个中间件，而当第n+1个中间件执行完成后，可以返回第n个中间件。但是在某个中间件中，我们没有写`next()`，就不会再执行它后面所有的中间件。运行机制如下图所示：

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

undefined

### koa-convert解析

在koa2中引入了koa-convert库，在使用use函数时，会使用到convert方法（只展示核心的代码）：

```
const convert = require('koa-convert');

module.exports = class Application extends Emitter {
    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        if (isGeneratorFunction(fn)) {
            deprecate('Support for generators will be removed';
            fn = convert(fn);
        }
        debug('use %s', fn._name || fn.name || '-');
        this.middleware.push(fn);
        return this;
    }
}
复制代码
```

koa2框架针对koa1版本作了兼容处理，中间件函数如果是`generator`函数的话，会使用`koa-convert`进行转换为“类async函数”。首先我们必须理解`generator`和`async`的区别：`async`函数会自动执行，而`generator`每次都要调用next函数才能执行，因此我们需要寻找到一个合适的方法，让`next()`函数能够一直持续下去即可，这时可以将`generator`中`yield`的`value`指定成为一个`Promise`对象。下面看看`koa-convert`中的核心代码：

```
const co = require('co')
const compose = require('koa-compose')

module.exports = convert

function convert (mw) {
  if (typeof mw !== 'function') {
    throw new TypeError('middleware must be a function')
  }
  if (mw.constructor.name !== 'GeneratorFunction') {
    return mw
  }
  const converted = function (ctx, next) {
    return co.call(ctx, mw.call(ctx, createGenerator(next)))
  }
  converted._name = mw._name || mw.name
  return converted
}
复制代码
```

首先针对传入的参数mw作校验，如果不是函数则抛异常，如果不是`generator`函数则直接返回，如果是`generator`函数则使用`co`函数进行处理。co的核心代码如下：

```
function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1);
  
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}
复制代码
```

由以上代码可以看出，co中作了这样的处理：

1. 把一个`generator`封装在一个`Promise`对象中
2. 这个`Promise`对象再次把它的`gen.next()`也封装出`Promise`对象，相当于这个子`Promise`对象完成的时候也重复调用`gen.next()`
3. 当所有迭代完成时，对父`Promise`对象进行`resolve`

以上工作完成后，就形成了一个类async函数。

### 异步函数的统一错误处理机制

在koa框架中，有两种错误的处理机制，分别为：

1. 中间件捕获
2. 框架捕获

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)undefined

中间件捕获是针对中间件做了错误处理响应，如`fnMiddleware(ctx).then(handleResponse).catch(onerror)`，在中间件运行出错时，会出发onerror监听函数。框架捕获是在`context.js`中作了相应的处理`this.app.emit('error', err, this)`，这里的`this.app`是对`application`的引用，当`context.js`调用`onerror`时，实际上是触发`application`实例的`error`事件 ，因为`Application`类是继承自`EventEmitter`类的，因此具备了处理异步事件的能力，可以使用`EventEmitter`类中对于异步函数的错误处理方法。

koa为什么能实现异步函数的统一错误处理？因为async函数返回的是一个Promise对象，如果async函数内部抛出了异常，则会导致Promise对象变为reject状态，异常会被catch的回调函数(onerror)捕获到。如果await后面的Promise对象变为reject状态，reject的参数也可以被catch的回调函数(onerror)捕获到。

### 委托模式在koa中的应用

delegates库由知名的 TJ 所写，可以帮我们方便快捷地使用设计模式当中的委托模式，即外层暴露的对象将请求委托给内部的其他对象进行处理。

delegates 基本用法就是将内部对象的变量或者函数绑定在暴露在外层的变量上，直接通过 delegates 方法进行如下委托，基本的委托方式包含：

- getter：外部对象可以直接访问内部对象的值
- setter：外部对象可以直接修改内部对象的值
- access：包含 getter 与 setter 的功能
- method：外部对象可以直接调用内部对象的函数

delegates 原理就是__defineGetter__和__defineSetter__。在application.createContext函数中，被创建的context对象会挂载基于request.js实现的request对象和基于response.js实现的response对象。下面2个delegate的作用是让context对象代理request和response的部分属性和方法：

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)undefined

做了以上的处理之后，`context.request`的许多属性都被委托在`context上`了，`context.response`的许多方法都被委托在`context`上了，因此我们不仅可以使用`this.ctx.request.xx`、`this.ctx.response.xx`取到对应的属性，还可以通过`this.ctx.xx`取到`this.ctx.request`或`this.ctx.response`下挂载的`xx`方法。

我们在源码中可以看到，response.js和request.js使用的是get set代理，而context.js使用的是delegate代理，为什么呢？因为delegate方法比较单一，只代理属性；但是使用set和get方法还可以加入一些额外的逻辑处理。在context.js中，只需要代理属性即可，使用delegate方法完全可以实现此效果，而在response.js和request.js中是需要处理其他逻辑的，如以下对query作的格式化操作：

```
get query() {
  const str = this.querystring;
  const c = this._querycache = this._querycache || {};
  return c[str] || (c[str] = qs.parse(str));
}
复制代码
```

到这里，相信你对koa2的原理实现有了更深的理解吧？
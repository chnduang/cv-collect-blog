## Koa实践总结

> [https://mp.weixin.qq.com/s/siGxYq7TvcD3g580BZJkRw](https://mp.weixin.qq.com/s/siGxYq7TvcD3g580BZJkRw)

## 为什么选择 Koa

小王：为什么选择`Koa`?
老王：因为 Koa 比较`轻量`，几乎没有内置任何的额外功能。也是因为这个原因，Koa 的`灵活度`是很高的，喜欢折腾的人可以尝试下
小王：又轻量又几乎没有任何额外功能？那为什么不用原生`Node`？那个不是更轻？
老王：这个。。。。 我还是先说说怎么用吧

> 有点长，心急的可以查看完整代码  https://github.com/JustGreenHand/koa-app

## 搭建项目并启动服务

经过一系列基操之后，生成如下所示的目录结构：![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0ptkwkREsOqaftBbqbFnTCLOfQF6nfSgnAXcpGy3qnQdk3Vkl5FRlgw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

接下来我们在启动文件 `app/index.js` 文件中写入最简单的启动服务代码:

```
const Koa = require('koa');

const app = new Koa();

const port = '8082'
const host = '0.0.0.0'

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
```

我们运行一下 `node app/index.js` 命令，这个时候，最简单的 node 服务已经启动起来了。浏览器里访问 `http://localhost:8082` 已经可以正常响应了

![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0JmLVldHXIGl2kp9tBd9SbnkZibZIzMm3nWWqPWTTDpHBnhLouDoic3qg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![全栈修仙之路](http://mmbiz.qpic.cn/mmbiz_png/jQmwTIFl1V0dLQzNJW15CVaCoNjposvTpccciaj05o5nPiaqfLRRfTQiaYFYPN41Etrrqt8jPOWukPmJWt3lYxwuA/0?wx_fmt=png)

**全栈修仙之路** 

专注分享 TS、Vue3、前端架构和源码解析等技术干货。

125篇原创内容



公众号

##  改造路由

当项目功能慢慢多起来的时候，路由处理也相应的多了起来，`app/index.js` 代码就成了下面这样：

```
const Koa = require('koa');

const app = new Koa();

const port = '8082'
const host = '0.0.0.0'

app.use(async ctx => {
  const { path } = ctx
  if (path === '/a') {
    // 功能 A
    ctx.body = 'a';
  } else if (path === '/b') {
    // 功能 B
    ctx.body = 'b';
  } else if (path === '/c') {
    // 功能 C
    ctx.body = 'c';
  } else {
    ctx.body = 'hello world'
  }
});

app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
```

这种将所有路由和路由处理函数写在一起的方式，后期会难以维护，代码量长了容易找不到重点。所以我们将路由处理的部分从启动文件 `app/index.js` 里摘出来，单独维护一个路由文件，并用第三方路由管理插件`koa-router` 来管理路由。我们在 `app` 目录下新建 `router` 目录，如下所示:

![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0QZUvB5ibfm68W8IgK4ITF9WRYTZvOjOS5PNIAEbM6g39XXYExHhsegw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

首先我们安装下路由处理插件( koa-ruoter 文档 ): `npm install koa-router -s`, 再在 `app/router/index.js` 文件中编写路由处理部分的代码

```
const koaRouter = require('koa-router');
const router = new koaRouter();

router.get('/a', ctx => {
  ctx.body = 'a'
});

router.get('/b', ctx => {
  ctx.body = 'b'
});

router.get('/c', ctx => {
  ctx.body = 'c'
});

module.exports = router;
```

修改 `app/index.js` 的代码，路由处理从 `app/router/index.js` 文件引入:

```
const Koa = require('koa');

const router = require('./router')

const app = new Koa();

const port = '8082'
const host = '0.0.0.0'

app.use(router.routes());
/*
    原先当路由存在，请求方式不匹配的时候，会报 404，
    加了这个中间件，会报请求方式不被允许
*/
app.use(router.allowedMethods());


app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
```

尝试访问 `http://localhost:8082/a` 返回结果与改造前一致。到这里为止，各个文件看起来是各司其职，功能拆分比较明确的。但是当接口越来越多的时候，我们的路由处理文件还是会越来越庞大，我们的目标是路由处理文件只关心路由的处理，具体业务逻辑不关心。所以这里再次将路由处理文件进行任务拆分。

![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO07hLZUfhulGQ2nXm5ickJPtOe7gNmlzCPe0xlvAkc4YcxpKdjBze5qnQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

如上图，这个阶段我们新增了三个文件

- `app/router/routes.js`    路由列表文件
- `app/contronllers/index.js` 业务处理统一导出
- `app/contronllers/test.js`  业务处理文件

将各业务逻辑的代码放在 controllers 下，示例文件 `app/contronllers/test.js`:

```
const list = async ctx => {
  ctx.body = '路由改造后的结果'
}

module.exports = {
  list
}
```

将这部分业务处理代码导入到 `app/contronllers/index.js`:

```
const test = require('./test');

module.exports = {
  test
};
```

这样的好处是所有业务处理统一一个入口，利于维护。接下来编写文件 `app/router/routes.js`:

```
const { test } = require('../controllers');

const routes = [
  {
    //  测试
    method: 'get',
    path: '/a',
    controller: test.list
  }
];

module.exports = routes;
```

这个时候，原本的 `app/router/index.js` 文件也需要做相应的修改了:

```
/* const Router = require('koa-router');
const router = new Router();

router.get('/a', ctx => {
  ctx.body = 'a'
});

router.get('/b', ctx => {
  ctx.body = 'b'
});

router.get('/c', ctx => {
  ctx.body = 'c'
});

module.exports = router; */


const koaRouter = require('koa-router');
const router = new koaRouter();

const routeList = require('./routes');

routeList.forEach(item => {
  const { method, path, controller } = item;
  //  router 第一个参数是 path， 后面跟上路由级中间件 controller（上面编写的路由处理函数）
  router[method](path, controller);
});

module.exports = router;
```

经过上面的改造后，再次访问下 `http://localhost:8082/a`，返回结果:

![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0jblgwV4wz3nQg1U9bgbI7AVVf01SkNVRibESvElJM80LFOY0kJHg6Jg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

看起来没啥问题，到这里为止路由改造已经完成，而且顺便把启动文件，路由文件，路由处理文件三部分拆开了

## 参数解析

一番实际操作后，发现 post 请求时，拿不到 `body` 里的参数。如下截图:![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0aMJoL6KdcibHolg1quCrmuXrdddJAu2LIYwLzbJQtygrMjGEbokN5SQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
期望的返回值为 `{"a": 4}`, 实际为:![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0defR9BF7NxXvCPr1omGC0ra9FfU5ialE0LicUuEE17wC2asdxske7sXg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

翻阅资料后这里需要加上一个参数解析的中间件。考虑到后面可能会添加更多的中间件，在具体处理参数之前，先将当前的代码再次进行改造下，将中间件处理单独从启动文件 `app/index.js` 里摘出来，新建一个  `app/middlewares` 目录，在该目录中我们添加 `index.js` 文件:

```
const router = require('../router');

/**
 * 路由处理
 */
const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();

module.exports = [
  mdRoute,
  mdRouterAllowed
];
```

上面文件里集中了所有用到的中间件，目前为止是两个路由处理的中间件，接下来改造下启动文件 `app/index.js`:

```
const Koa = require('koa');

const compose = require('koa-compose');
const MD = require('./middlewares/');

const app = new Koa();

const port = '8082'
const host = '0.0.0.0'

app.use(compose(MD));

app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
```

这里引入了一个插件 koa-compose，作用是简化引用中间件的写法。到这里准备工作已经做好了，开始处理参数解析的问题

安装第三方参数解析插件 koa-bodyparser 来帮我们处理 post 请求体中的参数。修改 `app/middlewares/index.js` 文件:

```
const koaBody = require('koa-bodyparser');

const router = require('../router');

/**
 * 参数解析
 * https://github.com/koajs/bodyparser
 */
const mdKoaBody = koaBody({
  enableTypes: [ 'json', 'form', 'text', 'xml' ],
  formLimit: '56kb',
  jsonLimit: '1mb',
  textLimit: '1mb',
  xmlLimit: '1mb',
  strict: true
});

/**
 * 路由处理
 */
const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();

module.exports = [
  mdKoaBody,
  mdRoute,
  mdRouterAllowed
];
```

因为我们已经改造过启动文件了，所以不需要在启动文件里再添加 `app.use()` 了。这里再次尝试用 post 请求:![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO05ic3QDc45Ce74aCRj1t0muF2X9BKZibQiaJ6HuaTFt8mCgBOaJnolibdMA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

发现已经是我们的预期结果了。不过这里还是有个坑:

```
const mdKoaBody = koaBody({
  enableTypes: [ 'json', 'form', 'text', 'xml' ],
  formLimit: '56kb',
  jsonLimit: '1mb',
  textLimit: '1mb',
  xmlLimit: '1mb',
  strict: true
});
```

从这段代码可以稍微看出，`koa-bodyparser` 这个插件只能解析 4 种数据`[ 'json', 'form', 'text', 'xml' ]`，当我们上传文件的时候，我们是获取不到文件的。秉持自己不会造可以白嫖绝不自己造轮子的原则，我们又在网上找到了解决方法，引入新的插件 `formidable`，由于这部分代码稍微有点多，所以我们在 `app/middlewares` 目录下再单独新建一个 `formidable.js` 文件，代码如下:

```
const Formidable = require('formidable');

const { tempFilePath } = require('../config');

module.exports = () => {
  return async function (ctx, next) {
    const form = new Formidable({
      multiples: true, 
      //  上传的临时文件保存路径
      uploadDir: `${process.cwd()}/${tempFilePath}`
    });

    // eslint-disable-next-line promise/param-names
    await new Promise((reslove, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          ctx.request.body = fields;
          ctx.request.files = files;
          reslove();
        }
      });
    });

    await next();
  };
};
```

formidable 具体用法就不解释了，有兴趣的可以 查看文档，这里，我们将写好的中间件在 `app/middlewares/index.js` 中使用:

```
/**
 * 引入第三方插件
 */
const koaBody = require('koa-bodyparser');

/**
 * 引入自定义文件
 */
const router = require('../router');
const formidable = require('./formidable');

/**
 * 参数解析
 * https://github.com/koajs/bodyparser
 */
const mdFormidable = formidable();
const mdKoaBody = koaBody({
  enableTypes: [ 'json', 'form', 'text', 'xml' ],
  formLimit: '56kb',
  jsonLimit: '1mb',
  textLimit: '1mb',
  xmlLimit: '1mb',
  strict: true
});

/**
 * 路由处理
 */
const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();

module.exports = [
  mdFormidable,
  mdKoaBody,
  mdRoute,
  mdRouterAllowed
];
```

写到这里应该是可以了，我们来测试下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0tF7IB7qBuicrsiab06pQwQgBEEefJBTPsSWPJ7HtP2DalyDlW7IWCKPw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0T6CBXNM42MCCiaI6smiawOGibGUJ5GjVvjTP9Yv07COGHJcEfia4Gwx3nw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

从结果看出，我们的期望结果已经拿到了。到这里，参数解析算是处理好了

> 补充下 `formidable.js` 文件中使用的  `const { tempFilePath } = require('../config')`。这里我们新加了个配置目录 `app/config`，主要用来存在各种配置，目录下有 5 个文件，分别是:
>
> - `app/config/index.js`
> - `app/config/base.js`
> - `app/config/dev.js`
> - `...`除了`index.js` 文件，其他文件可以根据项目的实际情况来创建
>
> 这里主要看下 `app/config/index.js` 文件:
>
> ```
> const base = require('./base');
> const dev = require('./dev');
> const pre = require('./pre');
> const pro = require('./pro');
> 
> const env = process.env.NODE_ENV || 'dev';
> 
> const configMap = {
>   dev,
>   pre,
>   pro
> }
> 
> 
> module.exports = Object.assign(base, configMap[env]);
> ```

## 统一返回格式 & 错误处理

在实现错误处理和统一返回格式之前，我们再做一点小小的改造。前面我们创建了 config 目录，里面存了一些常量配置，接下来我们还会创建一个 `common/utils.js` 用来存放工具函数，如果每个引用到的地方都 `require` 来引入是比较麻烦的，所以我们把工具函数和常量配置放到 `app.context` 的属性上，之后就不用频繁引入了，可以通过 `ctx.`来访问，改造 `app/index.js` 如下:

```
const Koa = require('koa');
const compose = require('koa-compose');

const MD = require('./middlewares/');
const config = require('./config')
const utils = require('./common/utils')

const app = new Koa();

const port = '8082'
const host = '0.0.0.0'

app.context.config = config;
app.context.utils = utils;

app.use(compose(MD));

app.listen(port, host, () => {
  console.log(`API server listening on ${host}:${port}`);
});
```

接下来开始正题，先来搞定统一返回格式的问题。这个第一反应就是写个工具函数，不要太简单:

```
const successRes = (data, msg) => {
    return {
        code: 0,
        data,
        msg: msg || 'success',
    }
}
const failRes = (code = 1, data, msg) => {
    return {
        code,
        data,
        msg: msg || 'fail',
    }
}

ctx.body = ctx.utils.successRes('aaa')
//  或
ctx.body = ctx.utils.failRes(10001)
```

这么写也没有问题，但是其实可以更加纯粹点，充分利用 koa 洋葱模型的优势，让 `ctx.body` 更加简洁，返回的就是正确的结果，如: `ctx.body = data`，想到这里，那还是添加中间件了。这里需要加两个，一个错误处理，一个统一返回格式，这两个是相关联的，所以在一起写了

文件 `app/middlewares/response.js`

```
const response = () => {
  return async (ctx, next) => {
    ctx.res.fail = ({ code, data, msg }) => {
      ctx.body = {
        code,
        data,
        msg,
      };
    };

    ctx.res.success = msg => {
      ctx.body = {
        code: 0,
        data: ctx.body,
        msg: msg || 'success',
      };
    };

    await next();
  };
};

module.exports = response;
```

文件 `app/middlewares/error.js`

```
const error = () => {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 200) {
        ctx.res.success();
      }
    } catch (err) {
      if (err.code) {
        // 自己主动抛出的错误
        ctx.res.fail({ code: err.code, msg: err.message });
      } else {
        // 程序运行时的错误
        ctx.app.emit('error', err, ctx);
      }
    }
  };
};

module.exports = error;
```

在 `app/middlewares/index.js` 文件中引入上面的两个中间件:

```
/**
 * 引入第三方插件
 */
const koaBody = require('koa-bodyparser');

/**
 * 引入自定义文件
 */
const router = require('../router');
const formidable = require('./formidable');
const response = require('./response');
const error = require('./error');

/**
 * 参数解析
 * https://github.com/koajs/bodyparser
 */
const mdFormidable = formidable();
const mdKoaBody = koaBody({
  enableTypes: [ 'json', 'form', 'text', 'xml' ],
  formLimit: '56kb',
  jsonLimit: '1mb',
  textLimit: '1mb',
  xmlLimit: '1mb',
  strict: true
});

/**
 * 统一返回格式
 */
const mdResHandler = response();
/**
 * 错误处理
 */
const mdErrorHandler = error();

/**
 * 路由处理
 */
const mdRoute = router.routes();
const mdRouterAllowed = router.allowedMethods();

module.exports = [
  mdFormidable,
  mdKoaBody,
  mdResHandler,
  mdErrorHandler,
  mdRoute,
  mdRouterAllowed
];
```

从这里看出，我们所有的返回值是在 `app/middlewares/error.js` 里拦截了一下，如果状态码是 200，用成功的工具函数包装返回，如果不是则又分为两种情况：一种是我们自己抛出的，包含业务错误码的情况(这种情况我们用失败的工具函数包装返回)；另一种是程序运行时报的错，这个往往是我们代码写的有问题(这种情况我们触发 koa 的错误处理事件去处理)，针对失败的第二种情况，我们还需要修改启动文件 `app/index.js`，添加如下代码:

```
app.on('error', (err, ctx) => {
  if (ctx) {
    ctx.body = {
      code: 9999,
      message: `程序运行时报错：${err.message}`
    };
  }
});
```

完成上面的操作之后我们再来测试下我们的代码: 当 `app/controllers/test.js` 中代码如下时:

```
const list = async ctx => {
  ctx.body = '返回结果'
}
```

请求接口，返回值如下:![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

符合我们的预期

接下来我们修改 `app/controllers/test.js`， 业务中抛出业务错误码

```
const list = async ctx => {
  const data = ''
  ctx.utils.assert(data, ctx.utils.throwError(10001, '验证码失效'))
  ctx.body = '返回结果'
}
```

再次返送请求，结果如下:![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0ZZRaqHSDpNWTFZcZnK3VLCpNjZb0cuSmrrzRqU3qRRib0w5gY1zK4Fg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

符合预期

再次修改 `app/controllers/test.js` 故意写错代码

```
const list = async ctx => {
  const b = a;
  ctx.body = '返回结果'
}
```

再次发送请求看下结果:![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0AibPoNdOEa2voqqGOeFZdZrO5x4lO2xjN9KCHo4SKtZQnpTAbypw0Uw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

符合预期

到这为止，错误处理搞定了，统一返回格式也搞定了，可以搞其他的了

## 跨域设置

这个应该是最简单的了，直接使用插件 `@koa/cors` (查看文档)，因为这个代码量比较少，所以直接在文件 `app/middlewares/index.js` 里添加内容:

```
const cors = require('@koa/cors');

/**
 * 跨域处理
 */
const mdCors = cors({
  origin: '*',
  credentials: true,
  allowMethods: [ 'GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH' ]
});

module.exports = [
  mdFormidable,
  mdKoaBody,
  mdCors,
  mdResHandler,
  mdErrorHandler,
  mdRoute,
  mdRouterAllowed
];
```

大功告成

## 添加日志

这里采用 `log4js` 查看文档 来记录请求日志，添加文件 `app/middlewares/log.js` :

```
const log4js = require('log4js');
const { outDir, flag, level } = require('../config').logConfig;

log4js.configure({
  appenders: { cheese: { type: 'file', filename: `${outDir}/receive.log` } },
  categories: { default: { appenders: [ 'cheese' ], level: 'info' } },
  pm2: true
});

const logger = log4js.getLogger();
logger.level = level;

module.exports = () => {
  return async (ctx, next) => {
    const { method, path, origin, query, body, headers, ip } = ctx.request;
    const data = {
      method,
      path,
      origin,
      query,
      body,
      ip,
      headers
    };
    await next();
    if (flag) {
      const { status, params } = ctx;
      data.status = status;
      data.params = params;
      data.result = ctx.body || 'no content';
      if (ctx.body.code !== 0) {
        logger.error(JSON.stringify(data));
      } else {
        logger.info(JSON.stringify(data));
      }
    }
  };
};
```

在 `app/middlewares/index.js` 中引入上面写的日志中间件:

```
const log = require('./log');

/**
 * 记录请求日志
 */
const mdLogger = log();

module.exports = [
  mdFormidable,
  mdKoaBody,
  mdCors,
  mdLogger,
  mdResHandler,
  mdErrorHandler,
  mdRoute,
  mdRouterAllowed
];
```

我们看下请求效果:![图片](https://mmbiz.qpic.cn/mmbiz_png/Tmczbd3NL038686AOs3WG5iaFbZGUoPO0XEHWDDDqX991r3Dic8w2MwM8fgR7bqia33r0dGnBicU2BqYaPFQ4ME0PQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

```
[2021-03-31T21:44:40.919] [INFO] default - {"method":"GET","path":"/a","origin":"http://localhost:8082","query":{"name":"张三","age":"12"},"body":{},"ip":"127.0.0.1","headers":{"user-agent":"PostmanRuntime/7.26.8","accept":"*/*","cache-control":"no-cache","postman-token":"d8be0c95-10f6-438c-aa37-1006be317081","host":"localhost:8082","accept-encoding":"gzip, deflate, br","connection":"keep-alive"},"status":200,"params":{},"result":{"code":0,"data":"返回结果","msg":"success"}}
[2021-03-31T21:54:55.595] [ERROR] default - {"method":"GET","path":"/a","origin":"http://localhost:8082","query":{"name":"张三","age":"12"},"body":{},"ip":"127.0.0.1","headers":{"user-agent":"PostmanRuntime/7.26.8","accept":"*/*","cache-control":"no-cache","postman-token":"86b581e4-07cf-4b04-9b01-5e56c19f696f","host":"localhost:8082","accept-encoding":"gzip, deflate, br","connection":"keep-alive"},"status":200,"params":{},"result":{"code":9999,"message":"程序运行时报错：b is not defined"}}
```

到这里日志模块也好了。

## 参数校验

前面忘记了对参数做校验，不管是业务逻辑上的需要，还是为了避免程序运行时的错误，参数校验是非常有必要的。还是那句话，我们可以把参数校验放在对应的 controller 里去做，类似这样:

```
const list = async ctx => {
  const { name, age } = ctx.request.query
  if (!name) ctx.utils.assert(false, ctx.utils.throwError(10001, 'name 是必须的'))
  if (!age) ctx.utils.assert(false, ctx.utils.throwError(10001, 'age 是必须的'))
  ctx.body = name + age
}
```

但是当参数较多时，controller 会显得非常庞大，而且我们一眼看不到这个函数的重点，而且我要写很多重复的没用的代码，类似 `ctx.utils.assert(false, ctx.utils.throwError(10001, 'name 是必须的'))` ，我希望我在 controller 层一上来就能写一些业务代码，最合理的还是将参数校验放在中间件中去统一处理，这里我们采用第三方插件 `@hapi/joi` 来处理，在 `app/middlewares/` 下添加 `paramValidator.js` 文件：

```
module.exports = paramSchema => {
  return async function (ctx, next) {
    let body = ctx.request.body;
    try {
      if (typeof body === 'string' && body.length) body = JSON.parse(body);
    } catch (error) {}
    const paramMap = {
      router: ctx.request.params,
      query: ctx.request.query,
      body
    };

    if (!paramSchema) return next();

    const schemaKeys = Object.getOwnPropertyNames(paramSchema);
    if (!schemaKeys.length) return next();

    // eslint-disable-next-line array-callback-return
    schemaKeys.some(item => {
      const validObj = paramMap[item];

      const validResult = paramSchema[item].validate(validObj, {
        allowUnknown: true
      });

      if (validResult.error) {
        ctx.utils.assert(false, ctx.utils.throwError(9998, validResult.error.message));
      }
    });
    await next();
  };
};
```

这次这个参数校验中间件我们不在 `app/middlewares/index.js` 中使用， 我们改造下 `app/router/index.js`:

```
// const koaRouter = require('koa-router');
// const router = new koaRouter();

// const routeList = require('./routes');


// routeList.forEach(item => {
//   const { method, path, controller } = item;
//   router[method](path, controller);
// });

// module.exports = router;

const koaRouter = require('koa-router');
const router = new koaRouter();

const routeList = require('./routes');
const paramValidator = require('../middlewares/paramValidator');

routeList.forEach(item => {
  const { method, path, controller, valid } = item;
  router[method](path, paramValidator(valid), controller);
});

module.exports = router;
```

`koa-router` 是可以添加多个路由级中间件的，我们将参数校验放在这里处理。然后我们添加新的目录 schema，用来存放参数校验部分的代码，添加两个文件:

- `app/schema/index.js`

```
const scmTest = require('./test');

module.exports = {
  scmTest
};
```

- `app/schema/test.js`

```
const Joi = require('@hapi/joi');

const list = {
  query: Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required()
  })
};

module.exports = {
  list
};
```

我们可以看到在 `app/router/index.js` 中一段代码:

```
  const { method, path, controller, valid } = item;
  router[method](path, paramValidator(valid), controller);
```

这里需要一个`valid`属性来校验参数，所以我们接着改造 `app/router/routes.js` 文件如下:

```
const { test } = require('../controllers');
const { scmTest } = require('../schema/index')

const routes = [
  {
    //  测试
    method: 'get',
    path: '/a',
    valid: scmTest.list,
    controller: test.list
  }
];

module.exports = routes;
```

现在我们修改 controller 中的代码，将我们自己手动写的参数校验去掉，改成:

```
const list = async ctx => {
  const { name, age } = ctx.request.query
  ctx.body = name + age
}
```

这里我们没有对参数进行校验了，我们尝试发送请求看看结果:![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

在请求参数中，我们把 `age` 这个参数去掉了，可以看到返回结果是我们预期的，到这为止参数校验也搞定了，`@hapi/joi` 更多的使用方法请 查看文档

## 数据库操作

当涉及到数据库操作时，我们可以在 app 下再新增一个 `service` 目录。将数据库操作从 `controller` 目录下分离出来放在 `service` 目录下，两个目录各司其职，一个专注业务处理，一个专注数据库层面的增删改查。另外再添加一个 model 目录，用来定义数据库表结构，具体的这里暂时不介绍了。

## 目前为止目录结构

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

##  总结

其他更多的公共逻辑都可以放在中间件层面去做，例如登录校验、权限校验等。到目前为止上面细节上还有很多问题没来得及做处理，比如统一返回格式的那个中间件，如果返回的是个文件其实会有问题，后期还会对很多细节进行优化。

上面是我个人总结的实践，有不合理的地方或建议大家帮忙指出来，共同学习交流进步

## 参考资料

- 完整代码:

  https://github.com/JustGreenHand/koa-app
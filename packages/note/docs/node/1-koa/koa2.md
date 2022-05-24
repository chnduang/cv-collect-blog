## Koa2

> Koa2是现在最流行的基于Node.js平台的web开发框架，它很小，但扩展性很强
>
> 使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。一个Koa应用就是一个对象，包含了一个middleware数组，这个数组由一组Generator函数组成。这些函数负责对HTTP请求进行各种加工，比如生成缓存、指定代理、请求重定向等等。这些中间件函数基于 request 请求以一个类似于栈的结构组成并依次执行。

------



### 运行环境搭建

> 知识为了能够让koa运行起来，没有在框架中使用
>
> 知识简单的初始化项目，简单示例

#### 安装`Node`

+ 最好的安装的方法就是使用`nvm`进行安装
+ 在官网下载指定操作系统和版本进行安装，和安装软件一样，一步一步来就可以

#### 初始化项目

+ 找个文件夹`cd`进去

+ 初始化`package.json`文件

  ```shell
  npm init -y
  ```

+ 安装`koa`

  ```bash
  npm install --save koa
  ```

+ 测试是否可以运行

  + 在文件夹的根目录下新建`js`文件
  + 可将官方的示例代码复制或者手动输入进去

  ```js
  const Koa = require('koa');
  const app = new Koa();
  
  // response
  app.use(ctx => {
    ctx.body = 'Hello Koa';
  });
  
  app.listen(3000);
  ```

  + 在终端中输入

    ```bash
    node index.js
    ```

  + 当然这里需要`js`文件修改后热加载的话，可以使用`nodemon`运行

    + 安装`nodemon`

      ```bash
      npm install --save-dev nodemon
      ```

    + 使用

      ```bash
      nodemon index.js
      ```

    + 这样每次修改之后就不用重启服务器了

------



### `Koa2`中的请求

#### `GET`请求

> 在koa2中GET请求通过request接收，但是接受的方法有两种：query和querystring。

+ query：返回的是格式化好的参数对象。

+ querystring：返回的是请求字符串。

  ```js
  const Koa = require('koa');
  const app = new Koa();
  
  app.use(async(ctx)=>{
      let url = ctx.url;
      let request = ctx.request;
      //从request中接受query,querystring
      /*
       两者都是查询的参数
       query: 是格式化后的数据，
       querystring: 字符串类型
       他们既在request中可以获取也可以在ctx中获取
      */
      let req_query = request.query;
      let req_querystring = request.querystring;
  
      let ctx_query = ctx.query;
      let ctx_querystring = ctx.querystring;
  
      ctx.body = {
          url,
          req_query,
          req_querystring,
          ctx_query,
          ctx_querystring
      }
  });
  
  app.listen(8999,()=>{
      console.log('serve is listening on 8999');
  });
  ```

  + 使用`nodemon`启动服务之后，在浏览器打开端口访问，
  + 在路径中输入不同的请求以及请求参数；会打印出`body`对应的值

#### `POST`请求

> 对于POST请求的处理，Koa2没有封装方便的获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req来获取。

**获取Post请求的步骤：**

+ 解析上下文ctx中的原生nodex.js对象req。
+ 将POST表单数据解析成query string-字符串.(例如:name='blog'&age=18)
+ 将字符串转换成JSON格式。

**ctx.request和ctx.req的区别**

- ctx.request:是Koa2中context经过封装的请求对象，它用起来更直观和简单。
- ctx.req:是context提供的node.js原生HTTP请求对象。这个虽然不那么直观，但是可以得到更多的内容，适合我们深度编程。

**ctx.method 得到请求类型**

+ Koa2中提供了ctx.method属性，可以轻松的得到请求的类型，然后根据请求类型编写不同的相应方法，这在工作中非常常用。我们先来作个小例子，根据请求类型获得不同的页面内容。GET请求时得到表单填写页面，POST请求时，得到POST处理页面。

```js
const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
  if (ctx.url === "/" && ctx.method === "GET") {
    let html = `
            <h1>这是get的表单提交</h1>
            <form action="/post" method="POST">   
                <p>姓名</p>
                    <input type="text" />
                <p>年龄</p>
                    <input type="text" />
                <br/>
                <button type="submit">提交</button>
            </form>
        `;
    ctx.body = html;
  } else if (ctx.url==='/post' && ctx.method === "POST") {
    let result = await parsePostData(ctx);
    // console.log(result);
    ctx.body = result;
  } else {
    ctx.body = `<h1>404 NOT FOUND</h1>`;
  }
});


//使用ctx.req.on来接收事件
function parsePostData(ctx){
    return new Promise((resolve,reject)=>{
        try {
            let postData = '';
            ctx.req.on('data', data =>{
                console.log(data);
                postData += data;
            });
            ctx.req.addListener('end',()=>{
                let parseData = parseQueryStr(postData);
                resolve(parseData);
            });
        } catch (error) {
            reject(error);
        }
    });
}

//将POST字符串解析JSON对象
function parseQueryStr(queryStr){
    let queryData={};
    let queryStrList = queryStr.split('&');
    console.log(queryStrList);
    for( let [index,queryStr] of queryStrList.entries() ){
        let itemList = queryStr.split('=');
        console.log(itemList);
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    } 
    return queryData
}

app.listen(8999, () => {
  console.log("serve is listening on 8999");
});

```

#### 使用`koa-bodyParser`中间件

> 接收并解析POST请求

+ **koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中。**

+ 安装中间件

  ```bash
  npm install --save koa-bodyparser
  ```

+ 和`koa`一样，需要引入使用

  ```js
  //注意这里的bodyparser不是驼峰命名的规范
  const bodyParser = require('koa-bodyparser')
  
  //这里bodyParser是一个方法，需要调用
  app.use(bodyParser());
  ```

+ 直接使用`ctx.request.body`进行获取`POST`请求参数

  ```js
  const Koa = require("koa");
  const bodyParser = require('koa-bodyparser');
  
  const app = new Koa();
  
  app.use(bodyParser());
  
  app.use(async ctx => {
    if (ctx.url === "/" && ctx.method === "GET") {
      let html = `
              <h1>这是get的表单提交</h1>
              <form action="/p" method="POST">   
                  <p>姓名</p>
                      <input type="text" />
                  <p>年龄</p>
                      <input type="text" />
                  <br/>
                  <button type="submit">提交</button>
              </form>
          `;
      ctx.body = html;
    } else if (ctx.url==='/p' && ctx.method === "POST") {
      let result = ctx.request.body;
      // console.log(result);
      ctx.body = result;
    } else {
      ctx.body = `<h1>404 NOT FOUND</h1>`;
    }
  });
  
  app.listen(8998, () => {
    console.log("serve is listening on 8998");
  });
  
  ```

------

### `koa2`中的路由

#### `koa2`中原生路由的实现

```js
const Koa = require('koa');
const fs = require('fs');
const app = new Koa();
 
function render(page){
   
   
        return  new Promise((resolve,reject)=>{
            let pageUrl = `./page/${page}`;
            fs.readFile(pageUrl,"binary",(err,data)=>{
                console.log(444);
                if(err){
                    reject(err)
                }else{
                    
                    resolve(data);
                }
            })
        })
    
}
 
async function route(url){
    
    let page = '404.html';
    switch(url){
        case '/':
            
            page ='index.html';
            break;
        case '/index':
            page ='index.html';
            break;
        case '/todo':
            page = 'todo.html';
            break;
        case '/404':
            page = '404.html';
            break;
        default:
            break; 
    }
    let html = await render(page);
    
    return html;
}
 
app.use(async(ctx)=>{
    let url = ctx.request.url;
    let html = await route(url);
    
    ctx.body=html;
})
app.listen(3000);
console.log('starting at 3000');
```

#### `koa-router`中间件的使用

+ 安装`koa-router`中间件

  ```bash
  npm install --save koa-router
  ```

+ 引入以及简单使用

  + `new Router()`中的`prefix`是为了给路由添加前缀
  + 访问的时候我们就都是`/name/list`有统一的前缀

  ```js
  const Koa = require("koa");
  const Router = require('koa-router');
  
  const app = new Koa();
  const router = new Router({
      prefix: '/name'
  });
  
  router
      .get('/',(ctx,next)=>{
          ctx.body = 'get';
      })
      .get('/list',(ctx,next)=>{
          ctx.body = 'get list';
      })
  
  /**router.allowedMethods()
  	这时候只有当请求路径匹配到了/list才会执行allowedMethods,
  	然后根据ctx.status设置response响应头
  **/
  app
     .use(router.routes())
     .use(router.allowedMethods());
  
  app.listen(8998, () => {
    console.log("serve is listening on 8998");
  });
  
  ```

##### 路由的层级

> 也就是我们常说的父子路由

+ 具体的写法见代码

  ```js
  const Koa = require('koa');
  const Router = require('koa-router');
  
  const app = new Koa();
  const router = new Router();
  
  const home = new Router();
  const page = new Router();
  
  router
      .get('/',async (ctx)=>{
          ctx.body = `
              <h3>路由跳转</h3>
              <a href="/home"><button>home路由</button></a>
              <a href="/home/homeChild1"><button>home子路由1</button></a>
              <a href="/home/homeChild2"><button>home子路由2</button></a>
              <a href="/page"><button>page路由</button></a>
              <a href="/page/pageChild1"><button>page子路由1</button></a>
              <a href="/page/pageChild2"><button>page子路由2</button></a>
          `
      })
  	/*
  	  路由中的参数传递
  	  使用ctx.query进行获取
  	*/
      .get('/home',async (ctx)=>{
          ctx.body = ctx.query;
      })
      .get('/page',async (ctx)=>{
          ctx.body = 'page';
      });
  
  home
      .get('/homeChild1',async (ctx,next)=>{
          ctx.body = 'home-child-1';
      })
      .get('/homeChild2',async (ctx,next)=>{
          ctx.body = 'home-child-2';
      });
  
  page
      .get('/pageChild1',async (ctx,next)=>{
          ctx.body = 'page-child-1';
      })
      .get('/pageChild2',async (ctx,next)=>{
          ctx.body = 'page-child-2';
      });
  
  //装载子路由
  router
      .use('/home',home.routes(),home.allowedMethods())
      .use('/page',page.routes(),page.allowedMethods());
  
  // app.use(async (ctx)=>{
  //     ctx.body = 'body';
  // });
  
  app
      .use(router.routes())
      .use(router.allowedMethods());
      
  
  app.listen(8999,()=>{
      console.log('serve is listening on 8999');
  })
  ```

  ------
### `Koa2`中使用`Cookie`

> koa的上下文（ctx）直接提供了读取和写入的方法。
> 让我们直接操作cookie

- `ctx.cookies.get(name,[optins]):`读取上下文请求中的`cookie`。
- `ctx.cookies.set(name,value,[options])`：在上下文中写入`cookie`。
#### ctx.cookies.set(name, value, [options])

通过 `options` 设置 cookie `name` 的 `value` :

- `maxAge` 一个数字表示从 Date.now() 得到的毫秒数
- `signed` cookie 签名值
- `expires` cookie 过期的 `Date`
- `path` cookie 路径, 默认是`'/'`
- `domain` cookie 域名
- `secure` 安全 cookie
- `httpOnly` 服务器可访问 cookie, 默认是 **true**
- `overwrite` 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 **false**). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。

```js
const Koa = require("koa");
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router
    .get('/',(ctx,next)=>{

    })
    .get('/list',(ctx,next)=>{

    })
app

   .use(async(ctx)=>{
       if(ctx.url ==='/'){
            ctx.cookies.set('myCookieTest1','zhouqd1',{
                domain: '127.0.0.1', // 写cookie所在的域名
                path: '/',       // 写cookie所在的路径
                maxAge: 1000*60*60*24,   // cookie有效时长
                expires: new Date('2020-12-31'), // cookie失效时间
                httpOnly: false,  // 是否只用于http请求中获取
                overwrite: false  // 是否允许重写
            });
            ctx.body = 'cookie is ok';
       }else{
            if(ctx.cookies.get('myCookieTest1')){
               ctx.body = ctx.cookies.get('myCookieTest1');
            }
       }
   })
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(8998, () => {
  console.log("serve is listening on 8998");
});

```
-----
### `koa2`中的模板

> 开发中不可能把所有的html代码全部卸载JS里，这显然不现实，也没办法完成大型web开发。必须借用模板机制来帮助我们开发，这节课我们就简单了解一下Koa2的模板机制，koa2的目标机制要依靠中间件来完成开发。

+ 安装中间件

  > 在koa2中使用模板机制必须依靠中间件，我们这里选择koa-views中间件

  ```bash
  npm install --save koa-views
  ```

+ **安装ejs模板引擎**

  ```bash
  npm install --save ejs
  ```

+ **编写模板**

  安装好ejs模板引擎后，就可以编写模板了，为了模板统一管理，我们新建一个view的文件夹，并在它下面新建index.ejs文件。

  ```ejs
  <!DOCTYPE html>
  <html>
  <head>
      <title><%= title %></title>
  </head>
  <body>
      <h1><%= title %></h1>
      <p>EJS Welcome to <%= title %></p>
  </body>
  </html>
  ```

+ `koa`文件

  ```js
  const Koa = require('koa');
  const path = require('path');
  const views = require('koa-views');
  
  const app = new Koa();
  
  app.use(views(path.join(__dirname,'./views/'),{
      extension: 'ejs'
  }));
  
  app.use(async (ctx) =>{
      console.log(ctx);
      const title = 'hello koa template'
      await ctx.render('index',{title});
  });
  
  app.listen(8999,()=>{
      console.log('服务器开启成功,请打开8999....');
  })
  
  ```

------

### `koa2`中的静态资源的处理

> 在后台开发中不仅有需要代码处理的业务逻辑请求，也会有很多的静态资源请求。比如请求js，css，jpg，png这些静态资源请求。也非常的多，有些时候还会访问静态资源路径。用koa2自己些这些静态资源访问是完全可以的，但是代码会雍长一些。所以这节课我们利用koa-static中间件来实现静态资源的访问。

+ 安装`koa-static`

  ```bash
  npm install --save koa-static
  ```

+ 新建`static文件夹`在其中放入一些图片或者css等静态资源的文件

  ```js
  const Koa = require('koa');
  const path = require('path');
  const static = require('koa-static');
  
  const app = new Koa();
  
  const staticPath = './static/'
  
  app.use(static(path.join(__dirname,staticPath)));
  
  app.use(async (ctx) =>{
      ctx.body = 'hello static';
  });
  
  app.listen(8999,()=>{
      console.log('服务器开启成功,请打开8999....');
  })
  
  ```

  
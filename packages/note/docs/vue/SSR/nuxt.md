

## 服务器端渲染到底有什么好处？

> 最主要的原因时SPA（单页应用）不利于搜索引擎的SEO操作。比如你作一个新闻网站，流量的一个主要来源是通过百度、谷歌、bing这些搜索引擎，但是它们对SPA的抓取并不好，特别是百度根本没法抓取到SPA的内容页面，所以我们必须把我们的应用在服务端渲染成适合搜索引擎抓取的页面，再下载到客户端。那Nuxt.js适合作新闻、博客、电影、咨询这样的需要搜索引擎提供流量的项目。如果你要作移动端的项目，就没必要使用这个框架了。

## 什么是SSR

> SSR，即服务器渲染，就是在服务器端将对Vue页面进行渲染生成html文件，将html页面传递给浏览器。

SSR两个优点：

- SEO 不同于SPA的HTML只有一个无实际内容的HTML和一个app.js，SSR生成的HTML是有内容的，这让搜索引擎能够索引到页面内容。
- 更快内容到达时间 传统的SPA应用是将bundle.js从服务器获取，然后在客户端解析并挂载到dom。而SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间。

## Nuxt

> Nuxt.js简单的说是Vue.js的通用框架，最常用的就是用来作SSR（服务器端渲染）。再直白点说，就是Vue.js原来是开发SPA（单页应用）的，但是随着技术的普及，很多人想用Vue开发多页应用，并在服务端完成渲染。这时候就出现了Nuxt.js这个框架，她简化了SSR的开发难度。还可以直接用命令把我们制作的vue项目生成为静态html。

**官方解释**

> Nuxt.js 是一个基于 Vue.js 的通用应用框架。 通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。

**Nuxt.js是特点（优点）**：

- 基于 Vue.js
- 自动代码分层
- 服务端渲染
- 强大的路由功能，支持异步数据
- 静态文件服务
- ES6/ES7 语法支持
- 打包和压缩 JS 和 CSS
- HTML头部标签管理
- 本地开发支持热加载
- 集成ESLint
- 支持各种样式预处理器： SASS、LESS、 Stylus等等

### Nuxt文件目录

**目录结构**

```js
|-- .nuxt                            // Nuxt自动生成，临时的用于编辑的文件，build
|-- assets                           // 用于组织未编译的静态资源入LESS、SASS 或 JavaScript
|-- components                       // 用于自己编写的Vue组件，比如滚动组件，日历组件，分页组件
|-- layouts                          // 布局目录，用于组织应用的布局组件，不可更改。
|-- middleware                       // 用于存放中间件
|-- pages                            // 用于存放写的页面，我们主要的工作区域
|-- plugins                          // 用于存放JavaScript插件的地方
|-- static                           // 用于存放静态资源文件，比如图片
|-- store                            // 用于组织应用的Vuex 状态管理。
|-- .editorconfig                    // 开发工具格式配置
|-- .eslintrc.js                     // ESLint的配置文件，用于检查代码格式
|-- .gitignore                       // 配置git不上传的文件
|-- nuxt.config.json                 // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
|-- package-lock.json                // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package-lock.json                // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package.json                     // npm包管理配置文件
```



### Nuxt基础配置

+ **配置运行的端口**

  ```js
  //在package.json的文件中配置其端口
  "config":{
      "nuxt":{
          "host": "127.0.0.1",
          "port": "8899"
      }
  }
  ```
  
+ **配置全局CSS**

  + 可创建文件`/assets/css/normailze.css`

  + 在`/nuxt.config.js`中配置

    ```js
    css:['~assets/css/normailze.css'],
    ```

  + 配置webpack的loader

    + 在nuxt.config.js里是可以对webpack的基本配置进行覆盖的，比如现在我们要配置一个url-loader来进行小图片的64位打包。就可以在nuxt.config.js的build选项里进行配置。

    ```js
     loaders:[
          {
            test:/\.(png|jpe?g|gif|svg)$/,
            loader:"url-loader",
            query:{
              limit:10000,
              name:'img/[name].[hash].[ext]'
            }
          }
        ],
        /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
          if (isDev && isClient) {
            config.module.rules.push({
              enforce: 'pre',
              test: /\.(js|vue)$/,
              loader: 'eslint-loader',
              exclude: /(node_modules)/
            })
          }
        }
    ```

### Nuxt路由配置

+ **基础路由配置**

  + **pages**文件夹下面的的`vue`组件，重新编译执行后会被自动的配置成路由，
    + 在`.nuxt`中的`router.js`中可以看到详细的路由配置
  + 不管是任意名字的`vue`文件，还是文件夹，都会自动生成路由配置，无需手动配置
  + 需注意的是，配置后需要重新编译，可查看`.nuxt`文件中`router.js`中有没有相关的配置

  ```js
    routes: [{
        path: "/abouts",
        component: _6fe9dcfd,
        name: "abouts"
      }, {
        path: "/news",
        component: _56266eb8,
        name: "news"
      }, {
        path: "/",
        component: _2335bbab,
        name: "index"
      }],
  ```

+ **参数传递**

  + 从一个页面将参数传递给另一个页面的时候

    + 和`vue`基本相同，只是将跳转的`router-link`变成`nuxt-link`
    + 接受时，使用`$route.params.newsId`进行参数的获取

    ```vue
    <template>
      <div>
        <ul>
          <li><nuxt-link :to="{name:'index'}">HOME</nuxt-link></li>
          <li><nuxt-link :to="{name:'about'}">ABOUT</nuxt-link></li>
          <li><nuxt-link :to="{name:'news',params:{newsId:3306}}">NEWS</nuxt-link></li>
        </ul>
      </div>
    </template>
    ```

+ **动态路由**

  + 如果需要为某个组件设置动态路由，则在相应的文件夹下面创建**以下划线命名的vue文件即可**如 `_id.vue`，`nuxt`会自动配置其为动态路由，在`router.js`中可以查看具体的配置

  + 例如：在`news`文件夹下面新建了`_id.vue`的文件，然后在文件里边有` $route.params.id`来接收参数。

    ```vue
    //news.vue
    <template>
      <div>
        <h3>news</h3>
        <nuxt-link :to="{name:'news-news1'}">news1</nuxt-link>
        <nuxt-link :to="{name:'news-news2'}">news2</nuxt-link>
        <nuxt-link to="/news/124">news124</nuxt-link>
        <nuxt-link to="/news/125">news125</nuxt-link>
      </div>
    </template>
    ```

  + **动态参数的校验**

    + 对传过来的参数进行校验

      ```js
      //在动态路由 _id.vue中写校验规则
      export default {
        validate ({ params }) {
          //让传过来的参数必须是数字
          return /^\d+$/.test(params.id)
        }
      }
      ```

    + **validate()**

      ```js
      validate({ params, query }) {
        return true // 如果参数有效
        return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
      }
      
      async validate({ params, query, store }) {
        // await operations
        return true // 如果参数有效
        return false // 将停止Nuxt.js呈现页面并显示错误页面
      }
      ```

    + `validate()`校验`store`中的数据

      ```js
      export default {
        validate ({ params, store }) {
          // 校验 `params.id` 是否存在
       	// 比对store中存储的数据
        return store.state.categories.some((category) => category.id === params.id)
        }
      }
      ```



### Nuxt中默认布局

> 默认布局主要针对于页面的统一布局使用。它在位置根目录下的`layouts/default.vue`。

+ 在layouts目录下创建vue文件，其中需要注意的就是留坑让每个组件使用的时候，有填充内容的地方；

  ```vue
  <template>
    <div>
        <header>self-header</header>
        <nuxt/>
        <footer>self-footer</footer>
    </div>
  </template>
  ```

+ 使用自定义的布局

  ```javascript
  //指定使用的布局
  export default {
      layout: 'self',
      name: 'Test'
  }
  ```



### Nuxt中asyncData方法获取数据

+ 在项目初始化页面前先获取到数据，之前我们是一般实在`mouted`中写异步请求，但是在`ssr`中没有哪个生命周期，所以增加了`asyncData`的方法；

+ 在这个方法被调用的时候，第一个参数被设定为当前页面的**上下文对象**，你可以利用 `asyncData`方法来获取数据并返回给当前组件

+ 注意：由于`asyncData`方法是在组件 **初始化** 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

  ```javascript
  export default {
    data () {
      return { project: 'default' }
    },
    asyncData (context) {
      return { project: 'nuxt' }
    }
  }
  
  export default {
    data () {
      return { 
      	list: []
      }
    },
    async asyncData (context) {
      const {state, data:{list}} = await axios.get('/api/')
      return {
          list
      }
    }
  }
  
  ```

  


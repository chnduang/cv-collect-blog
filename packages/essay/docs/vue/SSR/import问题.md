

## 解决Nuxt.js项目server入口文件不能使用import

> #### 使用nuxtjs官方的脚手架时创建Nuxt.js项目时

### 在server的入口中使用的是默认使用require引入依赖的

```js
const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
```

+ 对于使用经常使用`ES6`的，使用起来会感觉很大的不便

+ 但当我们直接使用`import`导入的时候
  
  ```js
  import Koa from 'koa'
  import consola from 'consola'
  import { Nuxt, Builder } from 'nuxt'
  ```
  
  + 项目会直接报错，它并不能识别`import`

### 解决方法：

> Nuxt.js项目在`npm run dev`时直接使用node编译`index.js`，我们之前写的项目之所以可以，是因为有用`babel`去处理，但`node`本身是不支持这种语法的

+ 在package.json中的脚本`scripts`中测试环境和正式环境的命令后加入`--exec babel-node`
+ 两种环境都需要加入

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server/index.js --exec babel-node",
  "generate": "nuxt generate",
  "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
},
```

+ 如果项目中没有安装`babel-cli`，`babel-preset-env`则需要先安装

  + 这里也可以安装`babel-preset-es2015`则也需要相应的修改`.babelrc`

  ```shell
  yarn add babel-cli babel-preset-env
  //或者使用npm
  npm install babel-cli babel-preset-env
  ```

+ 在项目的根目录下面创建`.babelrc`文件并加入

  ```js
  {
      "presets": ["env"]
  }
  ```

+ 其他的babel配置可自行在官网查看
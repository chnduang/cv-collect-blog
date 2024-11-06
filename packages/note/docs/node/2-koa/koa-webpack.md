### 在koa2中使用webpack进行项目打包

#### 安装依赖

> 这里只是针对`webpackd`的依赖处理
>
> 其它对于babel插件的需求可自行再安装

```
  "dependencies": {
    "@babel/runtime": "^"
    "cross-env": "^7.0.2",
  },
  "devDependencies": {
    "@babel/plugin-transform-runtime": "^7.9.6",
    "@babel/preset-env": "^7.9.6",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",0
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  }
```

#### 创建`webpack`配置文件

> ##### 根目录下创建`webpack.config.js`
>

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './app.js',
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  externals: [
    /^(?!\.|\/).+/i,
  ],  //node 打包可去除一些警告
  target: 'node', // 服务端打包
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // cacheDriectory: true, // 配置缓存目录
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime'] // 辅助代码从这里引用
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};

```

#### 运行`webpack`命令

> 根目录下执行npx webpack
>
> 下面是配置命令执行并制定打包的环境

```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development npx webpack --mode development",
    "build": "cross-env NODE_ENV=production npx webpack --mode production",
  },
```

#### 运行打包后的命令

> 会在根目录下的`dist`文件夹下生成`app.js`
>
> 可使用`pm2`运行

```bash
pm2 start --watch app.js
```
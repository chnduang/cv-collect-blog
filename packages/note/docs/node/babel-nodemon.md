### babel nodemon

使用 babel-node 可以在 node 端**自行编译并运行 es6 甚至 es7**。安装方法如下：

```
npm i @babel/core @babel/cli @babel/preset-env @babel/node -D // 或者使用 yarn
```

注意：我这里是局部安装的，全局安装的方法请自行看官方文档。

然后我们需要在项目的根目录下面创建 .babelrc 文件：

```
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```

最后修改 package.json，使用 babel-node 启动服务器入口文件即可：

```
// 使用命令 npm run server 即可运行
"scripts": {
  "server": "babel-node server.js"
},
```

这里有 2 点需要说明一下：

1. 为什么要用 babel-node 而不用 @babel/register 或者 @babel/polyfill 库？因为后者**只能用于打包过程**。也就是说，需要先编译，然后才能运行。
2. babel-node 只是用于**非打包过程**的，如果需要打包的话（比如用于**生产环境**），则不建议使用 babel-node，因为 babel-node 的打包体积会非常大。

### nodemon

使用 nodemon 可以**监听文件修改，然后让服务器自行重启**。

首先我们安装 nodemon：

```
npm i nodemon -D // 或者使用 yarn
```

最后修改一下 package.json 的命令即可：

```
// 使用命令 npm run server 即可运行
"scripts": {
  "server": "nodemon --exec babel-node server.js"
},
```

说明一下为什么要加 **--exec 这个参数**：这个参数是让 nodemon 运行非 node 程序的



- 添加`start`命令 ：`nodemon --exec babel-node src/server.js `。这个命令是告诉`nodemon`去监听文件的变化，一旦检测到有文件发生了变化，就会重启并用babel-node去运行`src/server.js`文件。这个命令一般用于本地开发。
- 添加`build`命令：`babel src --out-dir dist`。这个命令是告诉babel去编译`src`里的源文件，并将得到的结果输出到`dist`中
- 添加`serve`命令：`node dist/server.js`。这个命令是让我们用node运行我们编译好的文件。可能有人会问，为什么我们不直接用nodemon去运行我们的程序呢？这是因为相较于node,使用nodemon运行我们的程序会使用更多的内存，花费更多的启动时间。


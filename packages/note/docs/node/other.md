## babel

```text
1.Babel7的相关包都挂在了@babel域下。比如之前的babel-cli包现在更名为@babel/cli。
2.@babel/preset-env囊括了以前所有以年份命名的presets的功能。
3.babel-node从CLI中提取出来成了一个独立的包：@babel/node。

```

```
    在最后，我们添加一些`npm`命令到我们的`package.json`文件。

  - 添加`start`命令 ：`nodemon --exec babel-node src/server.js `。这个命令是告诉`nodemon`去监听文件的变化，一旦检测到有文件发生了变化，就会重启并用babel-node去运行`src/server.js`文件。这个命令一般用于本地开发。
  - 添加`build`命令：`babel src --out-dir dist`。这个命令是告诉babel去编译`src`里的源文件，并将得到的结果输出到`dist`中
  - 添加`serve`命令：`node dist/server.js`。这个命令是让我们用node运行我们编译好的文件。可能有人会问，为什么我们不直接用nodemon去运行我们的程序呢？这是因为相较于node,使用nodemon运行我们的程序会使用更多的内存，花费更多的启动时间。
```

```bash
    "scripts": {
        "start": "nodemon --exec babel-node src/server.js",
        "build": "babel src --out-dir dist",
        "serve": "node dist/server.js"
     },
```

```bash

  # // 添加仓库
  wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
  yum -y install yarn

```

# Module build failed: TypeError: this.getResolve is not a function at Object.loader 安装node-sass运行报错

### 安装node-sass编译报错

+ 项目中，想使用sass的功能，当我们正常安装依赖时

  > 默认会安装最新版

  ```bash
  npm install node-sass sass-loader --save-dev 		//安装node-sass 安装sass-loader 
  ```

+ 安装完成后，运行时出现了错误

### Modele build failed: TypeError: this.getResolve is not a function at Object.loader...

+ **这是因为当前sass的版本太高，webpack编译时出现了错误，这个时候只需要换成低版本的就行**
+ 可以选择先删除安装的版本再安装指定版本，也可以直接安装指定版本会覆盖之前版本，安装后最好在package.json中确认其版本是不是安装的版本

```bash
// 卸载之前安装的版本
npm uninstall sass-loader --save-dev
// 安装指定版本
npm install sass-loader@7.3.1 --save-dev
```

+ 也可以直接在package.json中直接修改版本，然后重新安装项目依赖

  ```
    "devDependencies": {
      "sass-loader": "^7.3.1",
    },
  ```

  ```bash
  npm install
  ```

+ 重新启动项目即可
  
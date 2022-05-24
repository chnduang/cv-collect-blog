## babel-node 不是内部或外部命令，也不是可运行的程序

#### 在运行`node`项目的时候出现`babel-node`不是内部或者外部命令，也不是可运行程序

+ 首先查看自己包中有没有安装`babel-cli`

+ 再查看`babel-preset-env`或者之前常用的`babel-preset-es2015`也可以

  + 需要根目录中创建`.babelrc`文件；并加入

  + ```js
    {
        "presets": ["env"]
    }
    ```

+ 如果缺少`babel-core`,安装既可


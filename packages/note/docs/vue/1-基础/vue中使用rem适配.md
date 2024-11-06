# vue-cli3.0使用rem适配方案

> 相对于rem来说，vw适配能更好的适配移动端，但如果既需要适配移动也需要适配PC
>
> vw的适配在pc显示时会显得格外的大，
>
> rem就会相对好些，这里只针对一些简单页面解决方案，复杂项目会有专门的一套解决方案

#### 安装 `lib-flexible` `postcss-pxtorem`

```bash
yarn add lib-flexible postcss-pxtorem 
```

#### lib-flexible

+ 作用：让网页根据设备dpr和宽度，利用viewport和html根元素的font-size配合rem来适配不同尺寸的移动端设备

+ 使用：

  ```js
  // 在main.js中引入即可
  import 'lib-flexible/flexible.js'
  ```

#### pxtorem

+ 作用：将项目中css的px转成rem单位，免去计算烦恼

+ 配置：`package.json`内，在`postcss`内添加：

  ```json
  // 记得去掉注释 
  "postcss": {
      "plugins": {
        "autoprefixer": {},
        "postcss-pxtorem": {
          "rootValue": 75, // 设计稿宽度的1/10,
          "propList":["*"] // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
         }
      }
    },
  
  ```

#### 配置完之后，需要重启服务，运行即可看到都是rem的单位了
### 使用vw实现移动端适配

#### 安装依赖

```bash
yarn add postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano cssnano-preset-advanced postcss-import postcss-url
```

#### 在根目录下创建`.postcssrc.js`，然后配置

+ postcss-import：

  + 相关配置可以点击这里。主要功有是解决@import引入路径问题。使用这个插件，可以让你很轻易的使用本地文件、node_modules或者web_modules的文件。这个插件配合postcss-url让你引入文件变得更轻松。
+ postcss-url：

  + 相关配置可以点击这里。该插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理。在Vue项目中，vue-loader已具有类似的功能，只需要配置中将vue-loader配置进去。
+ autoprefixer：

  + 用来自动处理浏览器前缀的一个插件。如果你配置了postcss-cssnext，其中就已具备了autoprefixer的功能。在配置的时候，未显示的配置相关参数的话，表示使用的是Browserslist指定的列表参数，你也可以像这样来指定last 2 versions 或者 > 5%。
+ postcss-aspect-ratio-mini：

  + 主要用来处理元素容器宽高比。
+ postcss-write-svg：
  + 插件主要用来处理移动端`1px`的解决方案。该插件主要使用的是`border-image`和`background`来做`1px`的相关处理。
+ postcss-px-to-viewport：
  + 要用来把`px`单位转换为`vw`、`vh`、`vmi``n`或者`vmax`这样的视窗单位，也是[`vw`适配方案](https://www.atatech.org/articles/87388)的核心插件之一
+ postcss-cssnext：
  + 其实就是cssnext。该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理。有关于cssnext的每个特性的操作文档，可以点击这里浏览。
+ cssnano：
  + 主要用来压缩和清理CSS代码。在Webpack中，cssnano和css-loader捆绑在一起，所以不需要自己加载它。详细文档可以点击这里获取

```js
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {},
    "postcss-cssnext": {},
    "postcss-px-to-viewport": {
      "viewportWidth": 375,		// 设计稿的宽度
      "viewportHeight": 667,	// 设计稿的高度
      "unitPrecision": 3,    	// px转成vw、vh后小数点保留的位数
      "viewportUnit": "vw",		// 转化成得单位
        						// 指定不转换为视窗单位的类，可以自定义，可以无限添加,
      "selectorBlackList": [	// 建议定义一至两个通用的类名
        ".ignore",
        ".hairlines"
      ],
      "minPixelValue": 3,		// 小于或等于`3px`不转换为视窗单位，你也可以设置为你想要的值
      "mediaQuery": false		// 允许在媒体查询中转换`px`
    },
    "cssnano": {
      "autoprefixer": false,
      "postcss-zindex": false
    }
  }
}
```


## [mpVue2.0]( http://mpvue.com/ )多端小程序框架

>  https://github.com/mpvue/mpvue-docs/tree/master/docs/mpvue 
>
>  http://mpvue.com/mpvue/quickstart.html 

#### 注意事项：

+ 目前mpvue框架使用的是vue2.x，所以需要使用vue2.x的脚手架

  ```bash
  npm install -g vue-cli
  ```

### 搭建mpvue脚手架

+  基于`mpvue-quickstart`模板创建新项目 

  ```bash
  // my-project 为创建的项目名
  vue init mpvue/mpvue-quickstart my-project
  ```

+  安装依赖和运行 

  > 也可以使用yarn进行安装；
  >
  > yarn装包成功后框架提供的readme中是使用npm dev这里是错误的
  >
  > 直接使用yarn dev就可以了

  ```bash
  cd my-project
  npm install
  npm run dev
  ```


### 对比小程序中的特殊传参和方法

+ **如何获取小程序在 page onLoad 时候传递的 options**

  + 在所有 页面 的组件内可以通过 `this.$root.$mp.query` 进行获取。

+ **如何获取小程序在 app onLaunch/onShow 时候传递的 options**

  + 在所有的组件内可以通过 `this.$root.$mp.appOptions` 进行获取。

+ **如何捕获 app 的 onError**

  + 由于 onError 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，在 app 的根组件上添加名为 onError 的回调函数即可。如下：

    ```js
    export default {
       // 只有 app 才会有 onLaunch 的生命周期
       onLaunch () {
           // ...
       },
    
       // 捕获 app error
       onError (err) {
           console.log(err)
       }
    }
    ```

### mpvue框架使用的相关建议

+  不要在选项属性或回调上使用箭头函数
  + 比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数是和父级上下文绑定在一起的，`this` 不会是如你做预期的 Vue 实例，且 `this.a` 或 `this.myMethod` 也会是未定义的。 

+ **精简 data 数据**
  + 冗余数据不要挂在 data 里，所有在 data/props/computed 中的数据，每次变更都会从微信小程序的 JSCore 进程，通过 setData 序列化成字符串后发送到 JSRender 进程。所以，如果你的数据量巨大的时候，会导致页面非常卡顿。

+ **优化长列表性能**
  + 避免在 v-for 中嵌套子组件，这样可以优化大部分部分 setData 时的冗余数据。
  + 通过实践发现 wx:if 和 hidden 的优化肉眼不可见，所以或许可以试试直接通过样式 display 来展示和隐藏。
  + 如果列表过长，强烈建议产品思考更好的展示形态。比如只展示热门，多余的折叠等形式。

+ **合理使用双向绑定** `mpvue` 建议使用 `v-model.lazy` 绑定方式以优化性能，此外 `v-model` 在老基础库下输入框输入时可能存在光标重设的问题。

+ **谨慎选择直接使用小程序的 API** 如果你有小程序和H5复用代码的需要，业务代码需要保持对 WEB `Vue.js` 的兼容性。此时我们不建议在代码中直接调用小程序API，更好的选择是通过桥接适配层屏蔽两端差异。
+ **列表渲染**
  + 嵌套列表渲染，必须指定不同的索引

### mpvue踩坑

- 列表中没有的原生事件也可以使用例如 bindregionchange 事件直接在 dom 上将bind改为@ `@regionchange`,同时这个事件也非常特殊，它的 event type 有 begin 和 end 两个，导致我们无法在`handleProxy` 中区分到底是什么事件，所以你在监听此类事件的时候同时监听事件名和事件类型既 ``
- 小程序能力所致，bind 和 catch 事件同时绑定时候，只会触发 bind ,catch 不会被触发，要避免踩坑。
- 事件修饰符
  - `.stop` 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！
  - `.prevent` 可以直接干掉，因为小程序里没有什么默认事件，比如submit并不会跳转页面
  - `.capture` 支持 `1.0.9`
  - `.self` 没有可以判断的标识
  - `.once` 也不能做，因为小程序没有 removeEventListener, 虽然可以直接在 handleProxy 中处理，但非常的不优雅，违背了原意
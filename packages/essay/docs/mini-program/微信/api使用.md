

## 微信小程序重点API使用

### 小程序的执行流程


### [注册一个小程序]( https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html )（小程序的生命周期)

+ 注册App时，一般会做什么
  + 判断小程序的进入场景
  + 监听生命周期函数，在生命周期中执行对应的业务逻辑，比如在某个生命周期函数中获取微信用户的信息。
  + 因为App()实例只有一个，并且是全局共享的( 单例对象)，所以我们可以将一些共享数据放在这里。
+ 小程序后台存活时间: 
    htps://developers.weixin.qq.com/miniprogram/dev/framework/operating-mechanism.html
+ 小程序的打开场景较多: 
    + 常见的打开场景:群聊会话中打开、小程序列表中打开、微信扫一扫打开、另一个小程序打开
       https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html
+ 如何确定场景?
    + 在onLaunch和onShow生命周期回调函数中，会有options参数，其中有scene值

#### onLanch

+ 发请求

+ 获取用户的数据
  + wx.getUserInfo
  + button open-type = getUserInfo
  + open-data

#### onShow（option）

+ 获取场景，根据不同的场景做对应的逻辑处理

#### onHide

#### onError

### [注册一个页面]( https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html )（页面的生命周期）


#### onLoad 

> 初次加载

#### onShow 

> 页面显示

#### onReady 

> 初次渲染完成

#### onHide

#### onUnLoad

#### [onShareAppMessage]( https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onShareAppMessage-Object-object )

> 监听用户点击页面内转发按钮（[button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) 组件 `open-type="share"`）
>
> 右上角菜单“转发”按钮的行为，并自定义转发内容。 

+ ```
  <button open-type="share">点击分享</button>
  ```

+ ```js
  onShareAppMessage: function (res) {
      return {
        title: '自定义转发标题',
        path: '/pages'    // 用户点进分享所进入的页面
      }
   }
  ```

### [WXS作用以及语法]( https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html )

> WXS（WeiXin Script）是小程序的一套脚本语言，结合 `WXML`，可以构建出页面的结构。
>
> WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。
>
> 但基本是和js一样的
>
> 主要应用的场景是 时间格式化以及过滤器的使用，也可以写成js作成工具类，在我们的js文件中先使用

#### 两种wxs的写法

+ `wxml`中

  ```xml
    <wxs module="info"> 
      const sum = () => {
        
        };
    	module.exports = {
    		sum
    	}
    </wxs>
    
  <view>{{info.sum}}</view>
  ```

+ `.wxs`文件中
  
  ```js
  <wxs src="./wxs/demo.wxs" module="info" />
  ```

### [自定义组件]( https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html )

> 只能使用wx:if；无法使用hidden

> 父子间传值和vue相似

#### 组件和页面通信


#### 父传子

> 通过属性绑定的形式将值传递给子组件

+ 获取子组件并调用其方法 [selectComponent](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html#实现方案)

  ```js
  // this.selectComponent('.tab')   获取到子组件的示例对象this
  // setCurrentIndex 为组件的方法，可以直接setData({}) 。不推荐直接修改数据
  this.selectComponent('.tab').setCurrentIndex(e.detail.index)
  },
  ```

#### 子传父

> 通过 `triggerEvent`  触发事件将数据传递给父组件

+ [triggerEvent]( https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html )

  ```js
  this.triggerEvent("click", data, {})
  ```

#### [插槽slot](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件wxml的slot)

> 在组件的wxml中可以包含 `slot` 节点，用于承载组件使用者提供的wxml结构。
>
> 默认情况下，一个组件的wxml中只能有一个slot。需要使用多slot时，可以在组件js中声明启用。

+ 多插槽的组件声明

  ```js
  Component({
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: { /* ... */ },
    methods: { /* ... */ }
  })
  ```

+ 此时，可以在这个组件的wxml中使用多个slot，以不同的 `name` 来区分。

  ```html
  <!-- 组件模板 -->
  <view class="wrapper">
    <slot name="before"></slot>
    <view>这里是组件的内部细节</view>
    <slot name="after"></slot>
  </view>
  ```

+ 使用时，用 `slot` 属性来将节点插入到不同的slot上。

  ```html
  <!-- 引用组件的页面模板 -->
  <view>
    <component-tag-name>
      <!-- 这部分内容将被放置在组件 <slot name="before"> 的位置上 -->
      <view slot="before">这里是插入到组件slot name="before"中的内容</view>
      <!-- 这部分内容将被放置在组件 <slot name="after"> 的位置上 -->
      <view slot="after">这里是插入到组件slot name="after"中的内容</view>
    </component-tag-name>
  </view>
  ```

#### [组件的样式]( https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html )

+ 组件内的样式对外部样式的影响
  + 组件内的class样式，只对组件wxml内的节点生效，对于引用组件的Page页面不生效。
  + 组件内不能使用id选择器、属性选择器、标签选择器
  
+ 外部样式 对组件内样式 的影响
  + 外部使用class的样式，只对外部wxml的class生效，对组件内是不生效的
  + 外部使用了id选择器、属性选择器不会对组件内产生影响
  + 外部使用了标签选择器,会对组件内产生影响
  
+ 组件内的class样式和组件外的class样式，默认是有一个隔离效果的;

+ 为了防止样式的错乱，官方不推荐使用id、属性、标签选择器;

+ **[组件和页面的样式影响](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#组件样式隔离)**
  
  ```js
  Component({
    options: {
      styleIsolation: 'isolated'
    }
})
  ```
  
  + 如果这个 [Component 构造器用于构造页面](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html) ，则默认值为 `shared` ，且还有以下几个额外的样式隔离选项可用：
    - `page-isolated` 表示在这个页面禁用 app.wxss ，同时，页面的 wxss 不会影响到其他自定义组件；
    - `page-apply-shared` 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式不会影响到其他自定义组件，但设为 `shared` 的自定义组件会影响到页面；
    - `page-shared` 表示在这个页面禁用 app.wxss ，同时，页面 wxss 样式会影响到其他设为 `apply-shared` 或 `shared` 的自定义组件，也会受到设为 `shared` 的自定义组件的影响。
  
+ **[页面向组件传递样式](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#外部样式类)**

  > **注意：在同一个节点上使用普通样式类和外部样式类时，两个类的优先级是未定义的，因此最好避免这种情况。**

  + ```js
    /* 组件 custom-component.js */
    Component({
      externalClasses: ['my-class']
    })
    
    <!-- 组件 custom-component.wxml -->
    <custom-component class="my-class">这段文本的颜色由组件外的 class 决定</custom-component>
    ```

  + ```js
    <!-- 页面的 WXML -->
    <custom-component my-class="red-text" />
    <custom-component my-class="large-text" />
    <!-- 以下写法需要基础库版本 2.7.1 以上 -->
    <custom-component my-class="red-text large-text" />
    ```

### [WX.API]( https://developers.weixin.qq.com/miniprogram/dev/api/ )

#### [网络]( https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html ) 

+ 请求 （request）

+ 我们一般会对

  ```js
  import { baseUrl } from './config.js';
  export default (options) => {
    wx.showLoading({
      title: '数据加载中',
    });
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${baseUrl}/${options.url}`,
        method: options.method || 'get',
        data: options.data || {},
        success: resolve,
        fail: reject,
        complete: (res) => {
          wx.hideLoading();
        }
      });
    });
  }
  ```

+ 对各个页面中封装请求方法

  ```js
  import http from './index.js';
  const getHomeList = () => {
    return http({
      url: 'home/multidata'
    });
  }
  
  export {
    getHomeList
  }
  ```

#### [开放接口]( https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html ) 

+ **登录 （wx.login）**
+ 当我们不需要关心开发者服务器开发的时候，前端需要
  + 调用wx.login() 获取code
  + 调用wx.request发送code到服务器，返回一个登录状态的标识，比如token
  + 我们使用wx.setStorageSync/setStorage,将标识token进行存储
    + 这个和我们的localStorage一样
  + 携带token进行请求，获取返回的数据

#### [导航]( https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html )

+ **navigator**

  ```js
  // 通过url进行参数的传递
  <!-- sample.wxml -->
  <view class="btn-area">
    <navigator url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover">跳转到新页面
   </navigator>
    <navigator url="../../redirect/redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">在当前页打开
   </navigator>
   <navigator url="/page/index/index" open-type="switchTab" hover-class="other-navigator-hover">切换 Tab
   </navigator>
   <navigator target="miniProgram" open-type="navigate" app-id="" path="" extra-data="" version="release">打开绑定的小程序
   </navigator>
   <navigator url="/page/index/index" open-type="navigateBack" delta="2">回退 Tab
   </navigator>
  </view>
  ```

+ 接受传递过来的数据

  ```js
  // 在跳转到的页面中
  Page({
   onLoad: function(options) {
     //在options中拿到
     console.log(options);
   }
  })
  ```

+ 跳转的页面向返回的页面回传数据

  + [getCurrentPages() ]( https://developers.weixin.qq.com/miniprogram/dev/reference/api/getCurrentPages.html )
  + 获取当前栈的所有页面。数组中第一个元素为首页，最后一个元素为当前页面。

  ```js
  Page({
   onUnload() {
  	const pages = getCurrentPages();
      // 获取首页页面对象
      const home = pages[pages.length-1];
      // 使用home页面中的方法修改数据
   }
  })
  ```

### 一些需要注意的地方

+ 因为WXML节点标签名只能是小写字母、中划线和下划线的组合，所以自定义组件的标签名也只能包含这些字符。

+ 自定义组件也是可以引用自定义组件的，引用方法类似于页面引用自定义组件的方式(使用
  usingComponents字段)。
  
+ 自定义组件和页面所在项目根目录名不能以"Wx-" 为前缀，否则会报错。

+ 如果在appjson的usingComponents声明某个组件，那么所有页面和组件可以直接使用该组件。

+ 如何获取每个自定义组件到顶部的距离

  + [wx.createSelectorQuery()]( https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html )
  + 返回一个 SelectorQuery 对象实例。在自定义组件或包含自定义组件的页面中，应使用 `this.createSelectorQuery()` 来代替 

  ```js
  wx.createSelectorQuery().select('.tab').boundingClientRect((rect) => {
      this.setData({
          tabTop: rect.top
       })
    }).exec();
  //这里必须有exec()才能执行
  ```

  


## 小程序跳转小程序

#### [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html)

##### wx.navigateToMiniProgram({ });

| 属性       | 类型     | 默认值  | 必填 | 说明                                                         |
| :--------- | :------- | :------ | :--- | :----------------------------------------------------------- |
| appId      | string   |         | 是   | 要打开的小程序 appId                                         |
| path       | string   |         | 否   | 打开的页面路径，如果为空则打开首页。path 中 ? 后面的部分会成为 query，在小程序的 `App.onLaunch`、`App.onShow` 和 `Page.onLoad` 的回调函数或小游戏的 [wx.onShow](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/(wx.onShow)) 回调函数、[wx.getLaunchOptionsSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html) 中可以获取到 query 数据。对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"。 |
| extraData  | object   |         | 否   | 需要传递给目标小程序的数据，目标小程序可在 `App.onLaunch`，`App.onShow` 中获取到这份数据。如果跳转的是小游戏，可以在 [wx.onShow](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/(wx.onShow))、[wx.getLaunchOptionsSync](https://developers.weixin.qq.com/miniprogram/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html) 中可以获取到这份数据数据。 |
| envVersion | string   | release | 否   | 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。 |
| success    | function |         | 否   | 接口调用成功的回调函数                                       |
| fail       | function |         | 否   | 接口调用失败的回调函数                                       |
| complete   | function |         | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

#### 示例代码

##### 使用api跳转

```js
wx.navigateToMiniProgram({
  appId: '',//小程序appid
  path: 'page/index/index?id=123',//跳转关联小程序app.json配置里面的地址
  extraData: {//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
    foo: 'bar'
  },
 //**重点**要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） 
  envVersion: 'develop',
  success(res) {
    // 打开成功
  }
})
```

##### 使用navigator组件

```html
appd-id:	小程序appid
path:	小程序路径
extra-data:	跳转小程序携带的参数
version:	当target="miniProgram"时有效，要打开的小程序版本，
			有效值 develop（开发版），trial（体验版），release（正式版），
			仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版。
<navigator
    target="miniProgram" 
    open-type="navigate" 
    app-id=""
    path=""
    extra-data="" 
    version="release"
>打开绑定的小程序</navigator>
```

#### 全局配置

> 在当前小程序配置跳转的小程序appId

##### app.json

```json
{ 
  "navigateToMiniProgramAppIdList": [
    "wxe5f52902cf4de896"
  ]
}
```

#### 目标小程序

> 在onLaunch和onShow中都可以接收
>
> 都在其options中;
>
> 具体值可打印出来看看，以便自定义逻辑

```js
App({
  onLaunch: function (options) {
    console.log(options);
  },
  onShow: function (options) {
    console.log(options)
  }
})

```


### 小程序中页面跳转传参对象问题

#### 简单的参数传递

##### 使用url传递参数

```js
wx.navigateTo({
	url:'/pages/detail/detail?query='+ encodeQuery    // 拼接
    url: `/pages/detail/detail?query=${encodeQuery}`   // 模板字符串
});
```

##### 在页面的onLoad生命周期中接收

```js
onLoad: function (options) {
  console.log(options);
}
```

#### 对象传递

> ##### 将对象转换为字符串
>
> ##### 页面接收传递过来的字符串将其转为对象

#### 对象传递问题

>  JSON.parse 方法无法解析包含“？“、”&”之类的字符 

+ 拼接或者使用es6模板字符串的写法，通过url传递

```js
const query = JSON.stringify(item);
//直接转字符串 ，在下个页面转对象的时候会报错,
// 使用encodeURIComponent转码
const encodeQuery = encodeURIComponent(query);
wx.navigateTo({
	url:'/pages/detail/detail?query='+ encodeQuery    // 拼接
    url: `/pages/detail/detail?query=${encodeQuery}`   // 模板字符串
});
```

+ 在跳转到的页面的`onLoad`生命周期里，接收传递的参数

```js
onLoad: function (options) {
  console.log(options);
  const query = decodeURIComponent(options.query);
  const decodeQuery = JSON.parse(query);
  console.log(decodeQuery);
}
```


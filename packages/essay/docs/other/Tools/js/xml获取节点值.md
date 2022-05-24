## JS处理接口返回XML格式数据

```xml
<oauth>
   <status>PERMISSION_ACCESS_TOKEN_EXPIRED</status>
   <code>error.permission.accessTokenExpired</code>
   <message>Access_token is expired or invalid</message>
</oauth>
```
#### 对返回的数据进行处理

```js
//生成新的DOM解析器
const parser = new DOMParser();
//读取返回字符串
const _xml = parser.parseFromString(data, "text/xml");
//获取 code 节点中内容
const htmlContent = _xml.getElementsByTagName("code")[0].innerHTML;
//获得json数组
const jsonArr = JSON.parse(htmlContent);
```

#### 对获取到的节点内容进行相应的判断

> 如果是对返回的code 的编码进行判断

```js
let msg;
switch(htmlContent){  // 为上面获取到的code的几点内容
	case "case1": 
		msg = "case1";
		break;
	case "case2":
		msg = "case2";
		break;
	case "case3":
		msg = "case3";
		break;
}

// 显示不同的toast
showToast({
    title: msg,
    success() {
        
    }
})
```


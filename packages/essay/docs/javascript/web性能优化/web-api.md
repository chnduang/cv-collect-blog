

## WEB-API

### 监听视窗激活状态

```js
// 窗口激活状态监听
let vEvent = 'visibilitychange';
if (document.webkitHidden != undefined) {
    vEvent = 'webkitvisibilitychange';
}
function visibilityChanged() {
    if (document.hidden || document.webkitHidden) {
        document.title = '别走'
        console.log("Web page is hidden.")
    } else {
        document.title = '回来了'
        console.log("Web page is visible.")
    }
}

document.addEventListener(vEvent, visibilityChanged, false);
```






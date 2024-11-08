# websocket

#### Http 和 websocket 有什么区别

- websocket
  - 支持端对端的通讯
  - 可以由 client 发起，也可以由 server 发起
  - 用于 消息通知，聊天室 ，协同编辑
  - 没有跨域限制
  - 协议 ws:// 可以双端发起请求
  - 通过 send, onmessage 通讯 http 通过 request response
  - 先有 http 协议再升级到 w s

#### WebSocket 和 http 长轮询的区别

- http:
  - 客户端发请求，服务阻塞，不会立即返回
  - time-out 后重新发请求
- websocket
  - 客户端可发请求，服务端也可以发起请求

#### 如何实现网页的多标签通讯

- websocket 成本高 可以跨域
- localstorage 同域 跨域不共享
- sharedWorker
  - 是 webworker 的一种
  - webworker 开启子进程 执行 js , 不能操作 dom
  - sharedworker 可单独开启一个进程，用于同域的页面通讯

#### 网页和 Iframe 之间通讯

- contentWindow.postMessage
- addEventListenser message
- event.origin event.source event.data

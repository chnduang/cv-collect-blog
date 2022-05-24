

## Fetch

> [MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
>
> fetch是一种HTTP数据请求的方式，是XMLHttpRequest的一种替代方案。fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象。
>
> fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 `Service Workers`。Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如CORS和HTTP的扩展。

 https://www.jianshu.com/p/7762515f8d1a 

**注意**：`fetch`规范与`jQuery.ajax()`主要有两种方式的不同

- 当接收到一个代表错误的 HTTP 状态码时，从 `fetch()`返回的 Promise **不会被标记为 reject，** 即使该 HTTP 响应的状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 `ok` 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- 默认情况下，`fetch` **不会从服务端发送或接收任何 cookies**, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 [credentials](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch#参数) 选项）。自从2017年8月25日后，默认的credentials政策变更为`same-origin`Firefox也在61.0b13中改变默认值

### 简单的fetch请求

```js
fetch('http://example.com/movies.json')    // 通过网络获取一个JSON文件并将其打印到控制台
  .then(response => {
    return response.json();
  })
  .then(myJson => {  		// 然后返回一个包含响应结果的promise(一个 Response 对象)。
    console.log(myJson);    
  });
```

### fetch中自定义请求参数

> 这里将fetch单独封装起来，以便使用
>
> 项目中也会经常这样使用

+ request.js

  ```js
  export default (url, data) => {
    // * 是默认值
    return fetch(url, {
      body: JSON.stringify(data), 	// must match 'Content-Type' header
      cache: 'no-cache', 		// *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', 	// include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST',     // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', 		// no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()) // parses response to JSON
  }
  ```

+ home.js（使用时）

  ```js
  import http from 'request.js';
  
  const url = "http://example.com/answer";
  const data = {
      a: 1
  };
  http(url, data)
    .then(data => console.log(data)) // JSON from `response.json()` call
    .catch(error => console.error(error))
  ```

### 关于 credentials（发送带凭据的请求）

+ 为了让浏览器发送包含凭据的请求（即使是跨域源），要将`credentials: 'include'`添加到传递给 `fetch()`方法的`init`对象。

  ```js
  fetch('https://example.com', {
    credentials: 'include'  
  })
  ```

+ 如果你只想在请求URL与调用脚本位于同一起源处时发送凭据，请添加`credentials: 'same-origin'`。

  ```js
  // The calling script is on the origin 'https://example.com'
  fetch('https://example.com', {
    credentials: 'same-origin'  
  })
  ```

+ 要改为确保浏览器不在请求中包含凭据，请使用`credentials: 'omit'`。

  ```js
  fetch('https://example.com', {
    credentials: 'omit'  
  })
  ```

### 上传 JSON 数据

> 使用 [`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch) POST JSON数据

```js
var url = 'https://example.com/profile';
var data = {username: 'example'};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
```

### 上传文件

> 可以通过HTML元素，[`FormData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData) 和[`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch)上传文件。

```js
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));
```

### 上传多个文件

> 可以通过HTML元素，[`FormData()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData) 和[`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch)上传文件。

```js
var formData = new FormData();
var photos = document.querySelector("input[type='file'][multiple]");

formData.append('title', 'My Vegas Vacation');
// formData 只接受文件、Blob 或字符串，不能直接传数组，所以必须循环嵌入
for (let i = 0; i < photos.files.length; i++) { 
    formData.append('photo', photos.files[i]); 
}

fetch('https://example.com/posts', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
```

### 检测请求是否成功

> 如果遇到网络故障，[`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch) promise 将会 reject，带上一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 对象。虽然这个情况经常是遇到了权限问题或类似问题——比如 404 不是一个网络故障。想要精确的判断 `fetch()` 是否成功，需要包含 promise resolved 的情况，此时再判断 [`Response.ok`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/ok) 是不是为 true。类似以下代码：

```js
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) { 
  var objectURL = URL.createObjectURL(myBlob); 
  myImage.src = objectURL; 
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
});
```

### 自定义请求对象

> 除了传给 `fetch()` 一个资源的地址，你还可以通过使用 [`Request()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request) 构造函数来创建一个 request 对象，然后再作为参数传给 `fetch()`：

```js
var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request('flowers.jpg', myInit);

fetch(myRequest).then(function(response) {
  return response.blob();
}).then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
```

`Request()` 和 `fetch()` 接受同样的参数。你甚至可以传入一个已存在的 request 对象来创造一个拷贝：

```js
var anotherRequest = new Request(myRequest,myInit);
```

这个很有用，因为 request 和 response bodies 只能被使用一次（译者注：这里的意思是因为设计成了 stream 的方式，所以它们只能被读取一次）。创建一个拷贝就可以再次使用 request/response 了，当然也可以使用不同的 `init` 参数。

> **注意**：[`clone()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/clone) 方法也可以用于创建一个拷贝。它和上述方法一样，如果 request 或 response 的 body 已经被读取过，那么将执行失败。区别在于， `clone()` 出的 body 被读取不会导致原 body 被标记为已读取。

## Headers

> 使用 [`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 的接口，你可以通过 [`Headers()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/Headers) 构造函数来创建一个你自己的 headers 对象。

+ 一个 headers 对象是一个简单的多名值对：

  ```js
  var content = "Hello World";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  myHeaders.append("Content-Length", content.length.toString());
  myHeaders.append("X-Custom-Header", "ProcessThisImmediately");
  ```

+ 也可以传一个多维数组或者对象字面量：

  ```js
  myHeaders = new Headers({
    "Content-Type": "text/plain",
    "Content-Length": content.length.toString(),
    "X-Custom-Header": "ProcessThisImmediately",
  });
  ```

+ 它的内容可以被获取：

  ```js
  console.log(myHeaders.has("Content-Type")); // true
  console.log(myHeaders.has("Set-Cookie")); // false
  myHeaders.set("Content-Type", "text/html");
  myHeaders.append("X-Custom-Header", "AnotherValue");
   
  console.log(myHeaders.get("Content-Length")); // 11
  console.log(myHeaders.getAll("X-Custom-Header")); // ["ProcessThisImmediately", "AnotherValue"]
   
  myHeaders.delete("X-Custom-Header");
  console.log(myHeaders.getAll("X-Custom-Header")); // [ ]
  ```

+ 虽然一些操作只能在 `ServiceWorkers` 中使用，但是它提供了更方便的操作 Headers 的 API。

+ 如果使用了一个不合法的HTTP Header属性名，那么Headers的方法通常都抛出 TypeError 异常。如果不小心写入了一个不可写的属性，也会抛出一个 TypeError 异常。除此以外的情况，失败了并不抛出异常。例如：

  ```js
  var myResponse = Response.error();
  try {
    myResponse.headers.set("Origin", "http://mybank.com");
  } catch(e) {
    console.log("Cannot pretend to be a bank!");
  }
  ```

+ 最佳实践是在使用之前检查 content type 是否正确，比如：

  ```js
  fetch(myRequest).then(function(response) {
    if(response.headers.get("content-type") === "application/json") {
      return response.json().then(function(json) {
        // process your JSON further
      });
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
  ```

## Response 对象

>   **注意**: 静态方法`error()`只是返回了一个错误的response. 与此类似地, [`redirect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/redirect) 只是返回了一个可以重定向至某URL的response. 这些也只与Service Workers才有关。

+ [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 实例是在 `fetch()` 处理完promises之后返回的。
+ 你会用到的最常见的response属性有:
  + [`Response.status`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/status) — 整数(默认值为200) 为response的状态码.
  + [`Response.statusText`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/statusText) — 字符串(默认值为"OK"),该值与HTTP状态码消息对应.
  + [`Response.ok`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/ok) — 如上所示, 该属性是来检查response的状态是否在200-299(包括200,299)这个范围内.该属性返回一个`Boolean`值.
+ 它的实例也可用通过 JavaScript 来创建, 但只有在`ServiceWorkers`中才真正有用,当使用[`respondWith()`](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchEvent/respondWith)方法并提供了一个自定义的response来接受request时:

  ```js
  var myBody = new Blob();
  
  addEventListener('fetch', function(event) {
    event.respondWith(new Response(myBody, {
      headers: { "Content-Type" : "text/plain" }
    });
  });
  ```

+ [`Response()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/Response) 构造方法接受两个可选参数—response的数据体和一个初始化对象(与[`Request()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request)所接受的init参数类似.)
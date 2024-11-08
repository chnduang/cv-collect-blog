# 介绍下 http1 和 2 协议的区别

| 1.0        | 1.1                                                 | 2.0      |                                                                 |
| ---------- | --------------------------------------------------- | -------- | --------------------------------------------------------------- |
| 长连接     | 需要使用`keep-alive` 参数来告知服务端建立一个长连接 | 默认支持 | 默认支持                                                        |
| HOST 域    | ✘                                                   | ✔️       | ✔️                                                              |
| 多路复用   | ✘                                                   | -        | ✔️                                                              |
| 数据压缩   | ✘                                                   | ✘        | 使用`HAPCK`算法对 header 数据进行压缩，使数据体积变小，传输更快 |
| 服务器推送 | ✘                                                   | ✘        | ✔️                                                              |

## HTTP/0.9

已过时。只接受 GET 一种请求方法，没有在通讯中指定版本号，且不支持请求头。由于该版本不支持 POST 方法，因此客户端无法向服务器传递太多信息。

## HTTP/1.0

这是第一个在通讯中指定版本号的 HTTP 协议版本，至今仍被广泛采用，特别是在代理服务器中。

## HTTP/1.1

持久连接被默认采用，并能很好地配合代理服务器工作。还支持以管道方式在同时发送多个请求，以便降低线路负载，提高传输速度。

> HTTP/1.1 相较于 HTTP/1.0 协议的区别主要体现在：
> 缓存处理
> 带宽优化及网络连接的使用
> 错误通知的管理
> 消息在网络中的发送
> 互联网地址的维护
> 安全性及完整性

## HTTP/2

在 HTTP/2 的第一版草案（对 SPDY 协议的复刻）中，新增的性能改进不仅包括 HTTP/1.1 中已有的多路复用，修复队头阻塞问题，允许设置设定请求优先级，还包含了一个头部压缩算法(HPACK)[15][16]。此外， HTTP/2 采用了二进制而非明文来打包、传输客户端—服务器间的数据。[12]

### 帧、消息、流和 TCP 连接

有别于 HTTP/1.1 在连接中的明文请求，HTTP/2 与 SPDY 一样，将一个 TCP 连接分为若干个流（Stream），每个流中可以传输若干消息（Message），每个消息由若干最小的二进制帧（Frame）组成。[12]这也是 HTTP/1.1 与 HTTP/2 最大的区别所在。 HTTP/2 中，每个用户的操作行为被分配了一个流编号(stream ID)，这意味着用户与服务端之间创建了一个 TCP 通道；协议将每个请求分割为二进制的控制帧与数据帧部分，以便解析。这个举措在 SPDY 中的实践表明，相比 HTTP/1.1，新页面加载可以加快 11.81% 到 47.7%[17]

### HPACK 算法

HPACK 算法是新引入 HTTP/2 的一个算法，用于对 HTTP 头部做压缩。其原理在于：

客户端与服务端根据 RFC 7541 的附录 A，维护一份共同的静态字典（Static Table），其中包含了常见头部名及常见头部名称与值的组合的代码；
客户端和服务端根据先入先出的原则，维护一份可动态添加内容的共同动态字典（Dynamic Table）；
客户端和服务端根据 RFC 7541 的附录 B，支持基于该静态哈夫曼码表的哈夫曼编码（Huffman Coding）。

### 服务器推送

网站为了使请求数减少，通常采用对页面上的图片、脚本进行极简化处理。但是，这一举措十分不方便，也不高效，依然需要诸多 HTTP 链接来加载页面和页面资源。

HTTP/2 引入了服务器推送，即服务端向客户端发送比客户端请求更多的数据。这允许服务器直接提供浏览器渲染页面所需资源，而无须浏览器在收到、解析页面后再提起一轮请求，节约了加载时间。

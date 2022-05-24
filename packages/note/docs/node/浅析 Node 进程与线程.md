# 浅析 Node 进程与线程

> [https://www.zoo.team/article/node-process-thread](https://www.zoo.team/article/node-process-thread)

进程与线程是操作系统中两个重要的角色，它们维系着不同程序的执行流程，通过系统内核的调度，完成多任务执行。今天我们从 Node.js（以下简称 Node）的角度来一起学习相关知识，通过本文读者将了解 Node 进程与线程的特点、代码层面的使用以及它们之间的通信。

## 概念

首先，我们还是回顾一下相关的定义：

进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。

线程是程序执行中一个单一的顺序控制流，它存在于进程之中，是比进程更小的能独立运行的基本单位。

早期在单核 CPU 的系统中，为了实现多任务的运行，引入了进程的概念，不同的程序运行在数据与指令相互隔离的进程中，通过时间片轮转调度执行，由于 CPU 时间片切换与执行很快，所以看上去像是在同一时间运行了多个程序。

由于进程切换时需要保存相关硬件现场、进程控制块等信息，所以系统开销较大。为了进一步提高系统吞吐率，在同一进程执行时更充分的利用 CPU 资源，引入了线程的概念。线程是操作系统调度执行的最小单位，它们依附于进程中，共享同一进程中的资源，基本不拥有或者只拥有少量系统资源，切换开销极小。

## 单线程?

我们常常听到有开发者说 “ Node.js 是单线程的”，那么 Node 确实是只有一个线程在运行吗？

首先，在终行以下 Node 代码（示例一）：

```js
# 示例一
require('http').createServer((req, res) => {
  res.writeHead(200);
  res.end('Hello World');
}).listen(8000);
console.log('process id', process.pid);
```

Node 内建模块 http 创建了一个监听 8000 端口的服务，并打印出该服务运行进程的 pid，控制台输出 pid 为 35919（可变），然后我们通过命令 `top -pid 35919` 查看进程的详细信息，如下所示：

```js
PID    COMMAND      %CPU TIME     #TH  #WQ  #POR MEM    PURG CMPRS  PGRP  PPID  STATE    BOOSTS     %CPU_ME
35919  node         0.0  00:00.09 7    0    35   8564K  0B   8548K  35919 35622 sleeping *0[1]      0.00000
```

我们看到 `#TH` (threads 线程) 这一列显示此进程中包含 7 个线程，**说明 Node 进程中并非只有一个线程**。事实上一个 Node 进程通常包含：1 个 Javascript 执行主线程；1 个 watchdog 监控线程用于处理调试信息；1 个 v8 task scheduler 线程用于调度任务优先级，加速延迟敏感任务执行；4 个 v8 线程（可参考以下代码），主要用来执行代码调优与 GC 等后台任务；以及用于异步 I / O 的 libuv 线程池。

```js
// v8 初始化线程
const int thread_pool_size = 4; // 默认 4 个线程
default_platform = v8::platform::CreateDefaultPlatform(thread_pool_size);
V8::InitializePlatform(default_platform);
V8::Initialize();
```

其中异步 I/O 线程池，如果执行程序中不包含 I/O 操作如文件读写等，则默认线程池大小为 0，否则 Node 会初始化大小为 4 的异步 I/O 线程池，当然我们也可以通过 `process.env.UV_THREADPOOL_SIZE` 自己设定线程池大小。需要注意的是在 Node 中网络 I/O 并不占用线程池。

下图为 Node 的进程结构图：

![图片](https://zcy-cdn.oss-cn-shanghai.aliyuncs.com/f2e-assets/ac6325e4-8e85-475c-b3c0-02177f641cec.jpg?x-oss-process=image/quality,Q_75)

为了验证上述分析，我们运行示例二的代码，加入文件 I/O 操作：

```js
# 示例二
require('fs').readFile('./test.log', err => {
  if (err) {
    console.log(err);
    process.exit();
  } else {
    console.log(Date.now(), 'Read File I/O');
  }
});
console.log(process.pid);
```

然后得到如下结果：

```js
PID    COMMAND      %CPU TIME     #TH  #WQ  #POR MEM    PURG CMPR PGRP  PPID  STATE    BOOSTS     %CPU_ME %CPU_OTHRS
39443  node         0.0  00:00.10 11   0    39   8088K  0B   0B   39443 35622 sleeping *0[1]      0.00000 0.00000
```

此时 `#TH` 一栏的线程数变成了 11，即大小为 4 的 I/O 线程池被创建。至此，我们针对段首的问题心里有了答案，**Node 严格意义讲并非只有一个线程，通常说的 “Node 是单线程” 其实是指 JS 的执行主线程只有一个**。

## 事件循环

既然 JS 执行线程只有一个，那么 Node 为什么还能支持较高的并发？

从上文异步 I/O 我们也能获得一些思路，Node 进程中通过 libuv 实现了一个事件循环机制（uv_event_loop），当执主程发生阻塞事件，如 I/O 操作时，主线程会将耗时的操作放入事件队列中，然后继续执行后续程序。

uv_event_loop 尝试从 libuv 的线程池（uv_thread_pool）中取出一个空闲线程去执行队列中的操作，执行完毕获得结果后，通知主线程，主线程执行相关回调，并且将线程实例归还给线程池。通过此模式循环往复，来保证非阻塞 I/O，以及主线程的高效执行。

相关流程可参照下图：

![图片](https://zcy-cdn.oss-cn-shanghai.aliyuncs.com/f2e-assets/038b59e6-2afd-41d4-a869-53df20895f67.jpg?x-oss-process=image/quality,Q_75)

## 子进程

通过事件循环机制，Node 实现了在 I/O 密集型（I/O-Sensitive）场景下的高并发，但是如果代码中遇到 CPU 密集场景（CPU-Sensitive）的场景，那么主线程将长时间阻塞，无法处理额外的请求。为了应对 CPU-Sensitive 场景，以及充分发挥 CPU 多核性能，Node 提供了 child_process 模块（[官方文档](https://nodejs.org/api/child_process.html)）进行进程的创建、通信、销毁等等。

### 创建

child_process 模块提供了 4 种异步创建 Node 进程的方法，具体可参考 child_process API，这里做一下简要介绍。

- spawn 以主命令加参数数组的形式创建一个子进程，子进程以流的形式返回 data 和 error 信息。
- exec 是对 spawn 的封装，可直接传入命令行执行，以 callback 形式返回 error stdout stderr 信息
- execFile 类似于 exec 函数，但默认不会创建命令行环境，将直接以传入的文件创建新的进程，性能略微优于 exec
- fork 是 spawn 的特殊场景，只能用于创建 node 程序的子进程，默认会建立父子进程的 IPC 信道来传递消息

### 通信

在 Linux 系统中，可以通过管道、消息队列、信号量、共享内存、Socket 等手段来实现进程通信。在 Node 中，父子进程可通过 IPC(Inter-Process Communication) 信道收发消息，IPC 由 libuv 通过管道 pipe 实现。一旦子进程被创建，并设置父子进程的通信方式为 IPC（参考 stdio 设置），父子进程即可双向通信。

进程之间通过 `process.send` 发送消息，通过监听 `message` 事件接收消息。当一个进程发送消息时，会先序列化为字符串，送入 IPC 信道的一端，另一个进程在另一端接收消息内容，并且反序列化，因此我们可以在进程之间传递对象。

### 示例

以下是 Node.js 创建进程和通信的一个基础示例，主进程创建一个子进程并将计算斐波那契数列的第 44 项这一 CPU 密集型的任务交给子进程，子进程执行完成后通过 IPC 信道将结果发送给主进程：

main_process.js

```js
# 主进程
const { fork } = require('child_process');
const child = fork('./fib.js'); // 创建子进程
child.send({ num: 44 }); // 将任务执行数据通过信道发送给子进程
child.on('message', message => {
  console.log('receive from child process, calculate result: ', message.data);
  child.kill();
});
child.on('exit', () => {
  console.log('child process exit');
});
setInterval(() => { // 主进程继续执行
  console.log('continue excute javascript code', new Date().getSeconds());
}, 1000);
```

fib.js

```js
# 子进程 fib.js
// 接收主进程消息，计算斐波那契数列第 N 项，并发送结果给主进程
// 计算斐波那契数列第 n 项
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
process.on('message', msg => { // 获取主进程传递的计算数据
  console.log('child pid', process.pid);
  const { num } = msg;
  const data = fib(num);
  process.send({ data }); // 将计算结果发送主进程
});
// 收到 kill 信息，进程退出
process.on('SIGHUP', function() {
  process.exit();
});
```

结果：

```js
child pid 39974
continue excute javascript code 41
continue excute javascript code 42
continue excute javascript code 43
continue excute javascript code 44
receive from child process, calculate result:  1134903170
child process exit
```

## 集群模式

为了更加方便的管理进程、负载均衡以及实现端口复用，Node 在 v0.6 之后引入了 cluster 模块（[官方文档](https://nodejs.org/api/cluster.html)），相对于子进程模块，cluster 实现了单 master 主控节点和多 worker 执行节点的通用集群模式。cluster master 节点可以创建销毁进程并与子进程通信，子进程之间不能直接通信；worker 节点则负责执行耗时的任务。

cluster 模块同时实现了负载均衡调度算法，在类 unix 系统中，cluster 使用轮转调度（round-robin），node 中维护一个可用 worker 节点的队列 free，和一个任务队列 handles。当一个新的任务到来时，节点队列队首节点出队，处理该任务，并返回确认处理标识，依次调度执行。而在 win 系统中，Node 通过 Shared Handle 来处理负载，通过将文件描述符、端口等信息传递给子进程，子进程通过信息创建相应的 SocketHandle / ServerHandle，然后进行相应的端口绑定和监听，处理请求。

cluster 大大的简化了多进程模型的使用，以下是使用示例：

```js
# 计算斐波那契数列第 43 / 44 项
const cluster = require('cluster');
// 计算斐波那契数列第 n 项
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
if (cluster.isMaster) { // 主控节点逻辑
  for (let i = 43; i < 45; i++) {
    const worker = cluster.fork() // 启动子进程
    // 发送任务数据给执行进程，并监听子进程回传的消息
    worker.send({ num: i });
    worker.on('message', message => {
      console.log(`receive fib(${message.num}) calculate result ${message.data}`)
      worker.kill();
    });
  }

  // 监听子进程退出的消息，直到子进程全部退出
  cluster.on('exit', worker => {
    console.log('worker ' + worker.process.pid + ' killed!');
    if (Object.keys(cluster.workers).length === 0) {
      console.log('calculate main process end');
    }
  });
} else {
  // 子进程执行逻辑
  process.on('message', message => { // 监听主进程发送的信息
    const { num } = message;
    console.log('child pid', process.pid, 'receive num', num);
    const data = fib(num);
    process.send({ data, num }); // 将计算结果发送给主进程
  })
}
```

## 工作线程

在 Node v10 以后，为了减小 CPU 密集型任务计算的系统开销，引入了新的特性：工作线程 worker_threads（[官方文档](https://nodejs.org/api/worker_threads.html)）。通过 worker_threads 可以在进程内创建多个线程，主线程与 worker 线程使用 parentPort 通信，worker 线程之间可通过 MessageChannel 直接通信。

### 创建

通过 worker_threads 模块中的 Worker 类我们可以通过传入执行文件的路径创建线程。

```js
const { Worker } = require('worker_threads');
...
const worker = new Worker(filepath);
```

### 通信

#### 使用 parentPort 进行父子线程通信

worker_threads 中使用了 MessagePort（继承于 EventEmitter，[参考](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort)）来实现线程通信。worker 线程实例上有 parentPort 属性，是 MessagePort 类型的一个实例，子线程可利用 postMessage 通过 parentPort 向父线程传递数据，示例如下：

```js
const { Worker, isMainThread, parentPort } = require('worker_threads');
// 计算斐波那契数列第 n 项
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
if (isMainThread) { // 主线程执行函数
  const worker = new Worker(__filename);
  worker.once('message', (message) => {
    const { num, result } = message;
    console.log(`Fibonacci(${num}) is ${result}`);
    process.exit();
  });
  worker.postMessage(43);
  console.log('start calculate Fibonacci');
  // 继续执行后续的计算程序
  setInterval(() => {
    console.log(`continue execute code ${new Date().getSeconds()}`);
  }, 1000);
} else { // 子线程执行函数
  parentPort.once('message', (message) => {
    const num = message;
    const result = fib(num);
    // 子线程执行完毕，发消息给父线程
    parentPort.postMessage({
      num,
      result
    });
  });
}
```

结果:

```js
start calculate Fibonacci
continue execute code 8
continue execute code 9
continue execute code 10
continue execute code 11
Fibonacci(43) is 433494437
```

### 使用 MessageChannel 实现线程间通信

worker_threads 还可以支持线程间的直接通信，通过两个连接在一起的 MessagePort 端口，worker_threads 实现了双向通信的 MessageChannel。线程间可通过 postMessage 相互通信，示例如下：

```js
const {
  isMainThread, parentPort, threadId, MessageChannel, Worker
} = require('worker_threads');

if (isMainThread) {
  const worker1 = new Worker(__filename);
  const worker2 = new Worker(__filename);
  // 创建通信信道，包含 port1 / port2 两个端口
  const subChannel = new MessageChannel();
  // 两个子线程绑定各自信道的通信入口
  worker1.postMessage({ port: subChannel.port1 }, [ subChannel.port1 ]);
  worker2.postMessage({ port: subChannel.port2 }, [ subChannel.port2 ]);
} else {
  parentPort.once('message', value => {
    value.port.postMessage(`Hi, I am thread${threadId}`);
    value.port.on('message', msg => {
      console.log(`thread${threadId} receive: ${msg}`);
    });
  });
}
```

结果:

```js
thread2 receive: Hi, I am thread1
thread1 receive: Hi, I am thread2
```

### 注意

worker_threads 只适用于进程内部 CPU 计算密集型的场景，而不适合于 I/O 密集场景，针对后者，官方建议使用进程的 event_loop 机制，将会更加高效可靠。

## 总结

Node.js 本身设计为单线程执行语言，通过 libuv 的线程池实现了高效的非阻塞异步 I/O，保证语言简单的特性，尽量减少编程复杂度。但是也带来了在多核应用以及 CPU 密集场景下的劣势，为了补齐这块短板，Node 可通过内建模块 child_process 创建额外的子进程来发挥多核的能力，以及在不阻塞主进程的前提下处理 CPU 密集任务。

为了简化开发者使用多进程模型以及端口复用，Node 又提供了 cluster 模块实现主-从节点模式的进程管理以及负载调度。由于进程创建、销毁、切换时系统开销较大，worker_threads 模块又随之推出，在保持轻量的前提下，可以利用更少的系统资源高效地处理 进程内 CPU 密集型任务，如数学计算、加解密，进一步提高进程的吞吐率。因篇幅有限，本次分享到此为止，诸多细节期待与大家相互探讨，共同钻研。
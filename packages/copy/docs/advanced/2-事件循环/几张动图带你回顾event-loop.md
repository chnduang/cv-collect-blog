# 几张动图带你回顾EventLoop

> [https://mp.weixin.qq.com/s/wdx-DIjURNLMREBHlY_sqw](https://mp.weixin.qq.com/s/wdx-DIjURNLMREBHlY_sqw)

## 为什么需要EventLoop

`JavaScript`是单线程的：一次只能运行一个任务。通常，这没什么大不了的，但是现在想象一下您正在运行一个耗时30秒的任务。在此任务中，我们等待30秒才能进行其他任何操作

（默认情况下，`JavaScript`在浏览器的主线程上运行，因此整个用户界面都被卡住了）。

这样子的体验是不能接受的，你不能把时间花在这么一个迟钝的网站。

幸运的是，浏览器为我们提供了`JavaScript`引擎本身不提供的一些功能：`Web API`。

这包括`DOM API`，`setTimeout`，`HTTP`请求等。这可以帮助我们创建一些异步的，非阻塞的行为。

------

## 初次见面

当我们调用一个函数时，它会被添加到一个叫做调用栈的东西中。

调用堆栈是`JS引擎`的一部分，这与浏览器无关。

它是一个堆栈，意味着它是先入后出的（想想一堆薄饼）。

当一个函数返回一个值时，它被从堆栈中弹出。

![图片](https://gitee.com/qdzhou/img-upload/raw/master/images/202202142322995.gif)

响应函数返回一个`setTimeout`函数。`setTimeout`是由`Web API`提供给我们的：它让我们在不阻塞主线程的情况下延迟任务。

我们传递给`setTimeout`函数的回调函数，箭头函数`（）=> { return 'Hey' }`被添加到`Web API`中。

同时，`setTimeout`函数和`response`函数被从堆栈中弹出，它们都返回了它们的值!

![图片](https://gitee.com/qdzhou/img-upload/raw/master/images/202202142325373.gif)

在`Web API`中，定时器的运行时间与我们传递给它的第二个参数一样长，即`1000ms`。回调并不立即被添加到调用栈中，而是被传递到一个叫做队列的东西中。

![图片](https://gitee.com/qdzhou/img-upload/raw/master/images/202202142326192.gif)

这可能是一个令人困惑的部分：这并不意味着回调函数在`1000ms`后被添加到`callstack`（从而返回一个值）！它只是在`1000ms`后被添加到队列中。

**但这是一个队列，该函数必须等待轮到它!**

------

## 揭开面纱

现在是我们一直在等待的部分，是时候让事件循环完成它唯一的任务了：将队列和调用栈连接起来。如果调用栈是空的，那么如果所有先前调用的函数都已经返回了它们的值，并且已经从栈中弹出，那么队列中的第一个项目就会被添加到调用栈中。在这种情况下，没有其他函数被调用，也就是说，当回调函数成为队列中的第一项时，调用栈是空的。

![图片](https://gitee.com/qdzhou/img-upload/raw/master/images/202202142326525.gif)

回调被添加到调用堆栈，被调用，并返回一个值，然后被从堆栈中弹出，如图:

![图片](https://gitee.com/qdzhou/img-upload/raw/master/images/202202142326533.gif)

------

## 跑个demo

其实我看完这些动图后，是很能理解作者思路滴，不过，我还是建议初学者，可以跑个例子看看，下面是一个不错的例子:

```js
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
```

虽然看起来很简单，嗯，可以尝试搞一下:

打开我们的浏览器，跑一下上面的代码，让我们快速看一下在浏览器中运行此代码时发生的情况：

<img src="https://gitee.com/qdzhou/img-upload/raw/master/images/202202142328004.gif" alt="图片" style="zoom:150%;" />
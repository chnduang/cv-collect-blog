# html

### HTMLCollection NodeList

> 类数组

- node 是 element 的父类

- 所有的节点都是 node
- element 是元素的基类

#### 移动端 H5 click 有 300ms 延迟 如何解决

- FastClick
- 监听 touched 事件 先触发
- 使用自定义的 dom 事件 模拟一个 click 事件
- 把默认的 click 事件 禁止掉
- meta content= “width: device-width”

#### script defer async 有什么区别

- 加载的时候都是并行加载的

- defer
  - 等待 html 解析完再加执行
- async
  - script 加载完成之后执行
  - 再解析 html

#### prefetch 和 dns-prefetch 有什么区别

- preload
  - 资源在当前页面使用，优先加载
- prefetch

  - 资源在未来页面使用，空闲时加载

- dns-prefetch 预查询
- pre-connect 预连接

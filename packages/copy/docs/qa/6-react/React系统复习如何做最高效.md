# React 系统复习如何做最高效

> [https://mp.weixin.qq.com/s/iGBZp1ckNHyDS1zJeiYn0Q](https://mp.weixin.qq.com/s/iGBZp1ckNHyDS1zJeiYn0Q)

## 一 前言

哈喽，大家好，我是 alien ，8 月 24 号，我作为分享嘉宾，线上参与了一场 《React 系统复习如何做最高效》 的技术分享，接下来我把直播的内容汇总分享给大家。在分享的过程中，也枚举了一些思考题和一些比较热门的面试题目，一同奉上。

这里非常感谢掘金平台提供一次分享技术的机会，也非常感谢掘友们的热心捧场，整体下来还算是成功的，可能刚开始比较紧张，因为毕竟是第一次直播，人生的第一次直播献给了掘金 😂，后来渐渐地找回了状态。这里保存了直播过程中的一些截图，整体下来掘友们还是蛮给力的，也参与互动，提了很多问题。

直播场景：

掘友互动场景

如果想看直播回放的童鞋，请点击这里： **https://live.juejin.cn/4354/3168473**

好的，废话不说，进入正题，本次直播分享主要按照以下模块进行的，这些模块是我工作几年来总结的一些经验，同学们可以按照对应的模块进行查缺补漏，

- React 基础模块。
- React 优化手段。
- React 生态掌握。
- React 设计模式。
- React 核心原理。
- React 项目实战。

## 二 知识点梳理

上述的模块进行细化，总结的内容如下：

**React 基础模块：**

- 操作 `jsx` 。
- 掌握 class 和 function Component。
- state 更新机制， `setState` 和 `useState` 的用法和区别。
- 理解 `props` ，React 中的 props 可以是什么？
- 类组件生命周期，函数组件生命周期替代方案， `useEffect` 和 `useLayoutEffect`。
- `Ref` 是什么，能做些什么？
- `css in React`。

**React 优化手段**

- 渲染控制。
- 渲染调优。
- 处理海量数据。
- 细节处理。

**React 生态**

- React-Router。
- React-Redux。
- React-Mobx。
- 项目工程 umi | dva 等。

**React 设计模式**

- 组合模式。
- render props 模式。
- HOC | 装饰器模式。
- 提供者模式。
- 自定义 hooks 模式。

**React 核心原理**

- 事件原理。
- 调和原理。
- 调度原理。
- hooks 原理。
- diff 流程等等。

**React 实战**

- 实现表单系统。
- 实现状态管理工具。
- 实现路由功能。
- 自定义 hooks 实践。

以上就是本次直播的提及的 React 应该学习的知识点。用一幅图来概括。

接下来对每一个功能进行拆解。

## 三 功能拆解

分享的内容细化成每一个我们需要掌握的功能点，以问题的形式切入，我们可以尝试一下？

### 1 React 基础模块

#### 基础模块 jsx

jsx 中总结的知识点：

- ① 我们写的 jsx 语法最后变成了什么？React JSX -> React element -> React fiber 流程。
- ② 如何理解 React element?
- ③ 老版本 React 为什么要引入 React，如下：

```
import React from 'react'
function Index(){
    return <div>let us learn React!</div>
}
```

- ④ 如何操作 React Element ，使其变成可控的？react createElement 和 react cloneElement。
- ⑤ `createElement` 和 `cloneElement` 区别。
- ⑥ React children 操作方法和应用场景？map ，forEach ，count ，toArray ，only。
- ⑦ jsx 拓展尝鲜例子：

```
function Test(num){
   console.log(num)
   useEffect(()=>{
       console.log('1111')
   },[])
   return <div>《React 进阶实践指南》</div>
}

export default function Index(){
    const [ isShow , setIsShow  ]= useState(false)
    return <div>
           <button onClick={() => setIsShow(!isShow)} >点击</button>
           {isShow ? <Test num={1} /> : <Test num={2} />}
         </div>
}
```

如上点击按钮 `button`，`useEffect` 中的 `console.log('1111')` 是否打印。

**错误分析：** 点击按钮，切换 `isShow`，控制两个 Test 组件的挂载 ｜ 卸载，因为组件重复挂载，那么 `useEffect` 执行，打印 `console.log('1111')`，但是实际结果是这样吗？

**效果：没有打印**

**流程分析：** 为什么 useEffect 中的 console.log 没有打印呢 ？

- 首先如果我们明白 jsx -> element -> fiber 流程之后，就不难解释这个现象了，写的两个 Test 组件，本质上被 babel 处理成两个 element 对象，`element` 对象中的 type 属性都指向了 Test 组件函数，两个 element 对象唯一区别是 props 不同。
- 那么在 React 调和阶段 React ，判断 type 指向相同，就会判断它们是一个组件，所以一次更新的只是被判定 props 变化，走的更新逻辑。
- 然后在 Test 函数中，更新组件不会让依赖项为 `[]` 的 `useEffect`再次执行，所以 `console.log('1111')` 不会被打印。

**解决问题：**

如果想要组件挂载 ｜ 卸载效果，那么很简单，给其中的 Test 加入一个 key，就可以解决问题，`key` 可以作为组件身份的标示，在下一次更新中，就会根据 key 找到复用的 fiber 节点，如果没有找到，那就会走正常的组件挂载 ｜ 卸载流程了。

```
 {isShow ? <Test num={1} key={1}  /> : <Test num={2} />}
```

#### 基础模块 state

state 中总结的知识点：

- ① state 更新机制? state 改变到视图更新的流程。
- ② state 批量更新的规则，为什么会被打破？
- ③ setState 是同步还是异步的？
- ④ 类组件的 `setState` 和函数组件的 `useState` 有什么共性和区别？
- ⑤ 函数组件的状态管理方法 useState + useRef ? useState 负责更新，useRef 负责保存状态。
- ⑥ state 打印问题：

```
handleClick=()=>{
    setTimeout(()=>{
        this.setState({ number: 1  })
    })
    this.setState({ number: 2  })
    ReactDOM.flushSync(()=>{
        this.setState({ number: 3  })
    })
    this.setState({ number: 4  })
}
render(){
   console.log(this.state.number)
   return <button onClick={ this.handleClick } > 点击 </button>
}
```

点击按钮，打印顺序 ？

打印 3 4 1 ，相信不难理解为什么这么打印了。

首先 `flushSync` `this.setState({ number: 3 })` 设定了一个高优先级的更新，所以 2 和 3 被批量更新到 3 ，所以 3 先被打印。更新为 4。最后更新 setTimeout 中的 number = 1。

#### 基础模块 component

component 模块包含的知识点：

- ① 类组件特点，函数组件特点，两者有什么区别？
- ② 组件的通信方式？
- ③ 组件的强化方式？
- ④ React 对组件的处理和处理时机？
- ⑤ 公共组件的设计规范？

#### 基础模块生命周期

生命周期知识点：

- ① 生命周期的介绍，和用法？
- ② 生命周期的执行时机？父与子生命周期的执行顺序？
- ③ 函数组件生命周期的代替方案？
- ④ useEffect 和 useLayoutEffect 有什么区别，应用场景？
- ⑤ 废弃的生命周期，为什么要废弃？

一幅图表示 **函数组件** 和 **类组件** 所有生命周期的执行时机（包括已经废弃的生命周期）：

#### 基础模块 Ref

ref 知识点总结：

- ① Ref 对象，以及两种 ref 对象创建方法。useRef 和 createRef
- ② Ref 有什么作用？1 获取组件实例，DOM 元素 ；2 组件通信 ；3 保存状态；
- ③ Ref 原理 ？`commitAttachRef` 和 `commitDetachRef`。
- ④ Ref 获取的三种方式？function ；Ref 对象 ；String ；
- ⑤ 如何跨层级传递 ref ?
- ⑥ 父组件如何获取函数子组件内部状态？

#### 基础模块 Css in React

css 模块总结：

- ① React css 模块化方案。
- ② css module 掌握。
- ③ css in js 掌握。

### 2 React 优化手段

React 优化手段总结：

- ① React 渲染控制的方法？。缓存 react element ，pureComponent ，Memo ，shouldComponentUpdate
- ② shallowEqual 浅比较原理。
- ③ React 中节流防抖运用。
- ④ 合理运用状态管理。
- ⑤ 按需引入。减少项目体积。
- ⑥ 代码分割 lazy ，异步组件 Suspense 及其原理。
- ⑦ diff 算法，合理应用 key 。
- ⑧ 渲染错误边界，`componentDidCatch`。
- ⑨ 状态管理工具和 immutable.js 使用。
- ⑩ useMemo 缓存逻辑。
- ⑪ memo 的缓存策略。

### 3 React 生态

React 生态总结：react-router，react-redux ，react-mobx umi dva 等。

- ① 两种路由模式 ｜ spa 单页面路由原理。
- ② React router 使用，实现动态路由，自定义路由。
- ③ Route. Router Switch 分工。
- ④ 权限路由封装。
- ⑤ Mobx-react 使用。
- ⑥ Mobx 和 React Redux 区别？
- ⑦ Mobx 原理，收集依赖，触发更新。
- ⑧ React Redux 和 Redux 使用。
- ⑨ Redux 设计模式 ｜ 中间件原理。
- ⑩ React Redux 原理？
- ⑪ react redux 衍生：dva React-saga 等
- ⑫ React Redux 中 connect 原理 （这里推荐大家看一下源码，学习一下 hooks 使用）。

### 4 React 设计模式

React 设计模式总结：

- ① React 几种设计模式总结。组合模式，render props 模式，提供者模式， hoc 模式，自定义 hooks 模式。
- ② 新老版本 context 用法特点。
- ③ React context 特点。逐层传递，发布订阅。
- ④ 新版本 context 消费者几种方式。contextType ，useContext ，consumer
- ⑤ hoc 两种方式，优缺点？属性代理，反向继承。
- ⑥ hoc 如何解决静态属性继承问题。
- ⑦ hoc 如何解决 ref 获取问题。
- ⑧ hoc 注意事项。
- ⑨ 自定义 hooks 设计。
- ⑩ 自定义 hooks 实践。

以下是一些经典设计模式的代码片段（供大家参考）：

**组合模式**

```
<Form ref={ form } >
    <FormItem name="name" label="我是"  >
        <Input   />
    </FormItem>
    <FormItem name="mes" label="我想对大家说"  >
        <Input   />
    </FormItem>
    <input  placeholder="不需要的input" />
    <Input/>
</Form>
```

**提供者模式**

```
function ConsumerDemo(){
     const { color,background } = React.useContext(ThemeContext)
    return <div style={{ color,background } } >消费者</div>
}
const Son = React.memo(()=> <ConsumerDemo />) // 子组件

const ThemeProvider = ThemeContext.Provider //提供者
export default function ProviderDemo(){
    const [ contextValue , setContextValue ] = React.useState({  color:'#ccc', background:'pink' })
    return <div>
        <ThemeProvider value={ contextValue } >
            <Son />
        </ThemeProvider>
        <button onClick={ ()=> setContextValue({ color:'#fff' , background:'blue' })  } >切换主题</button>
    </div>
}
```

**render props 模式**

```
const Index = ()=>{
    return <Container>
        <Children />
        { (ContainerProps)=> <Children {...ContainerProps} name={'haha'}  />  }
    </Container>
}
```

**hoc 模式**

```
@HOC1(styles)
@HOC2
@HOC3
class Index extends React.Componen{
    /* ... */
}
```

**自定义 hooks 模式**

```
function useXXX(){
    const value = React.useContext(defaultContext)
    /* .....用上下文中 value 一段初始化逻辑  */
    const newValue = initValueFunction(value) /* 初始化 value 得到新的 newValue  */
    /* ...... */
    return newValue
}
```

### 5 React 核心原理

React 核心原理总结：

**fiber 原理**

- ① 什么是 fiber ? Fiber 架构解决了什么问题？
- ② Fiber root 和 root fiber 有什么区别？
- ③ 不同 fiber 之间如何建立起关联的？
- ④ React 调和流程？
- ⑤ 两大阶段 commit 和 render 都做了哪些事情？
- ⑥ 什么是双缓冲树？有什么作用？
- ⑦ Fiber 深度遍历流程？
- ⑧ Fiber 的调和能中断吗？如何中断？

**调度原理**

- ① 异步调度原理？
- ② React 为什么不用 settimeout ？
- ③ 说一说 React 的时间分片？
- ④ React 如何模拟 requestIdleCallback？
- ⑤ 简述一下调度流程？

**hooks 原理**

- ① React Hooks 为什么必须在函数组件内部执行？React 如何能够监听 React Hooks 在外部执行并抛出异常。
- ② React Hooks 如何把状态保存起来？保存的信息存在了哪里？
- ③ React Hooks 为什么不能写在条件语句中？
- ④ useMemo 内部引用 useRef 为什么不需要添加依赖项，而 useState 就要添加依赖项。
- ⑤ useEffect 添加依赖项 props.a ，为什么 props.a 改变，useEffect 回调函数 create 重新执行。
- ⑥ React 内部如何区别 useEffect 和 useLayoutEffect ，执行时机有什么不同？

**事件原理**

- ① React 为什么有自己的事件系统？
- ② 什么是事件合成 ？
- ③ 如何实现的批量更新？
- ④ 事件系统如何模拟冒泡和捕获阶段？
- ⑤ 如何通过 dom 元素找到与之匹配的 fiber？
- ⑥ 为什么不能用 return false 来阻止事件的默认行为？
- ⑦ 事件是绑定在真实的 dom 上吗？如何不是绑定在哪里？
- ⑧ V17 对事件系统有哪些改变

### 6 React 实践

实践是检验真理的唯一标准，如果想要进阶 React ，在理论知识基础上，也需要去尝试敲代码。

- 如过没有做过 React 项目，尝试写一个 demo 。
- 尝试写一个公共组件。
- 尝试写一个高阶组件。
- 尝试写一个自定义 hooks。
- 尝试在项目中使用多种设计模式。

### 7 React 学习的几个重要阶段

进阶 React 可以按照以下阶段去进阶。

- 第一阶段：明白基础 api ,尝试写项目，多尝试一些复杂的逻辑场景。会用一些 React 生态。
- 第二阶段：尝试封装一些基础组件，hoc，尝试使用一些设计模式。
- 第三阶段：学习一些原理，可以尝试看一下核心源码。
- 第四阶段：可以自己根据业务需求写一些库，考虑开源。

## 四 总结

以上就是本次直播分享 React 系统学习部分的内容，大家可以根据自己对 React 的掌握程度，进行查缺补漏，最后祝愿大家早日进阶 React 技术栈。

## 《React 进阶实践指南小册》

本次分享的知识点，在这本小册中都能找到答案。目前小册已经完结，是终点亦是起点, 小册内容将持续更新，随着 React 版本升级持续维护，并有持续更新章节～ 提前透露，小册接下来会补充：`React context` 原理部分，内容补充到第八章。奉上几个小册 7 折 优惠码

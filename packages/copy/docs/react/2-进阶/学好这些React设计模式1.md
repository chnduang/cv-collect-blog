# 学好这些React设计模式-能让你的 React 项目飞起来

> [https://mp.weixin.qq.com/s/dfnajqS0NqTkp7fzK4-4Sw](https://mp.weixin.qq.com/s/dfnajqS0NqTkp7fzK4-4Sw)

## 一 前言

今天我们来悉数一下 React 中一些不错的设计模式，这些设计模式能够解决一些**功能复杂**，**逻辑复用** 的问题，还能锻炼开发者的设计和编程能力，以为多年开发经验来看，学好这些设计模式，那就是一个字 **香**！

基本上每一个设计模式，笔者都会绞尽脑汁的想出两个 demo，希望屏幕前的你能给笔者赏个**赞**，以此鼓励我继续创作前端硬文。

老规矩，我们带着疑问开始今天的阅读：

- 1 React 的常见设计模式有哪些？
- 2 组合模式功能强大，都用于哪些场景。
- 3 render props 使用，开发者应该注意些什么？
- 4 hoc 模式的应用场景。
- 5 提供者模式实现状态管理和状态下发。
- 6 如何使用继承模式，继承模式的优缺点是什么？

我相信读完这篇文章，这些问题全都会迎刃而解。

首先我们想一个问题，那就是 **为什么要学习设计模式？** 原因我总结有以下几个方面。

- **1 功能复杂，逻辑复用问题。**首先 React 灵活多变性，就决定了 React 项目可以应用多种设计模式。但是这些设计模式的产生也确实办了实事:

**场景一：**

在一个项目中，全局有一个状态，可以称之为 theme （主题），那么有很多 UI 功能组件需要这个主题，而且这个主题是可以切换的，就像 github 切换暗黑模式一样，那么如何优雅的实现这个功能呢？

这个场景如果我们用 React 的**提供者模式**，就能轻松搞定了，通过 `context` 保存全局的主题，然后将 `theme` 通过 `Provider` 形式传递下去，需要 theme ，那么消费 context ，就可以了，这样的好处是，只要 theme 改变，消费 context 的组件就会重新更新，达到了切换主题的目的。

**场景二：**

表单设计场景也需要一定程度上的 React 的设计模式，首先对于表单状态的整体验证需要外层的 `Form` 绑定事件控制，调度表单的状态下发，验证功能。内层对于每一个表单控件还需要 `FormItem` 收集数据，让控件变成受控的。这样的 `Form` 和 `FormItem` 方式，就是通过**组合模式**实现的。

- **2 培养设计能力，编程能力**

熟练运用 React 的设计模式，可以培养开发者的设计能力，比如 **`HOC` 的设计** ，**公共组件的设计** ，**自定义 hooks 的设计**，一些开源的优秀的库就是通过 React 的灵活性和优秀的设计模式实现的。

**例子一：**

比如在 React 状态管理工具中，无论是 `react-redux` ，还是 `mobx-react`，一方面想要把 `state` 和 `dispatch` 函数传递给组件，另一方面订阅 state 变化，来促使业务组件更新，那么整个流程中，需要一个或多个 HOC 来搞定。于是 react-redux 提供了 `connect`，mobx-react 提供了 `inject` ，`observer` 等优秀的 hoc。由此可见，学会 React 的设计模式，有助于开发者小到编写公共组件，大到开发开源项目。

今天我重点介绍 React 的五种设计模式，分别是：

- 组合模式
- render props模式
- hoc 模式
- 提供者模式
- 类组件继承

## 二 组合模式

### 1 介绍

组合模式适合一些容器组件场景，通过外层组件包裹内层组件，这种方式在 Vue 中称为 slot 插槽，外层组件可以轻松的获取内层组件的 `props` 状态，还可以控制内层组件的渲染，组合模式能够直观反映出 父 -> 子组件的包含关系，首先我来举个最简单的组合模式例子🌰。

```jsx
<Tabs onChange={ (type)=> console.log(type)  } >
    <TabItem name="react"  label="react" >React</TabItem>
    <TabItem name="vue" label="vue" >Vue</TabItem>
    <TabItem name="angular" label="angular"  >Angular</TabItem>
</Tabs>
```

如上 `Tabs` 和 `TabItem` 组合，构成切换 tab 功能，那么 Tabs 和 TabItem 的分工如下：

- Tabs 负责展示和控制对应的 TabItem 。绑定切换 tab 回调方法 onChange。当 tab 切换的时候，执行回调。
- TabItem 负责展示对应的 tab 项，向 Tabs 传递 props 相关信息。

我们直观上看到 Tabs 和 TabItem 并没有做某种关联，但是却无形的联系起来。这种就是组合模式的精髓所在，这种组合模式的组件，给使用者感觉很舒服，因为大部分工作，都在开发组合组件的时候处理了。所以编写组合模式的嵌套组件，对锻炼开发者的 React 组件封装能力是很有帮助的。

接下来我们一起看一下，组合模式内部是如何实现的。

### 2 原理揭秘

实际组合模式的实现并没有想象中那么复杂，主要分为外层和内层两部分，当然可能也存在多层组合嵌套的情况，但是万变不离其宗，原理都是一样的。首先我们看一个简单的组合结构：

```jsx
<Groups>
    <Item  name="《React进阶实践指南》" />
</Groups>
```

#### 那么 `Groups` 能对 `Item` 做一些什么操作呢 ？

**Item 在 Groups的形态**

首先如果如上组合模式的写法，会被 `jsx` 编译成 `React element` 形态，`Item` 可以通过 `Groups` 的  **props.children** 访问到。

```jsx
function Groups (props){
    console.log( props.children  ) // Groups element
    console.log( props.children.props ) // { name : 'React进阶实践指南》' }
    return  props.children
}
```

但是这是针对单一节点的情况，事实情况下，外层容器可能有多个子组件的情况。

```jsx
<Groups>
    <Item  name="《React进阶实践指南》" />
    <Item name="《Nodejs深度学习手册》" />
</Groups>
```

这种情况下，props.children 就是一个数组结构，如果想要访问每一个的 props ，那么需要通过 `React.Children.forEach` 遍历 props.children。

```jsx
function Groups (props){
    console.log( props.children  ) // Groups element
    React.Children.forEach(props.children,item=>{
        console.log( item.props )  //依次打印 props
    })
    return  props.children
}
```

**隐式混入 props**

这个是组合模式的精髓所在，就是可以通过 React.cloneElement 向 children 中混入其他的 props，那么子组件就可以使用容器父组件提供的**特有的** props 。我们来看一下具体实现：

```jsx
function Item (props){
    console.log(props) // {name: "《React进阶实践指南》", author: "alien"}
    return <div> 名称： {props.name} </div>
}

function Groups (props){
    const newChilren = React.cloneElement(props.children,{ author:'alien' })
    return  newChilren
}
```

- 用 `React.cloneElement` 创建一个新的 element，然后混入其他的 props -> author 属性，React.cloneElement 的第二个参数，会和之前的 props 进行合并 （ merge ）。

这里还是 Groups 只有单一节点的情况，有些同学会问直接在原来的 children 基础上加入新属性不就可以了吗？像如下这样：

```jsx
props.children.props.author = 'alien'
```

- 这样会报错，对于 props ，React 会进行保护，我们无法对 props 进行拓展。所以要想隐式混入 props ，只能通过 `cloneElement` 来实现。

**控制渲染**

组合模式可以通过 children 方式获取内层组件，也可以根据内层组件的状态来控制其渲染。比如如下的情况：

```jsx
export default ()=>{
    return <Groups>
    <Item  isShow name="《React进阶实践指南》" />
    <Item  isShow={false} name="《Nodejs深度学习手册》" />
    <div>hello,world</div>
    { null }
</Groups>
}
```

- 如上这种情况组合模式，只渲染 `isShow = true` 的 Item 组件。那么外层组件是如何处理的呢？

实际处理这个很简单，也是通过遍历 children ，然后通过对比 props ，选择需要渲染的 children 。接下来一起看一下如何控制：

```jsx
function Item (props){
    return <div> 名称： {props.name} </div>
}
/* Groups 组件 */
function Groups (props){
    const newChildren = []
    React.Children.forEach(props.children,(item)=>{
        const { type ,props } = item || {}
        if(isValidElement(item) && type === Item && props.isShow  ){
            newChildren.push(item)
        }
    })
    return  newChildren
}
```

- 通过 `newChildren` 存放满足要求的 React Element ，通过 `Children.forEach` 遍历 children 。
- 通过 `isValidElement` 排除非 element 节点；`type`指向 `Item`函数内存，排除非 Item 元素；获取 isShow 属性，只展示 isShow = true 的 `Item`，最终效果满足要求。

**内外层通信**

组合模式可以轻松的实现内外层通信的场景，原理就是通过外层组件，向内层组件传递回调函数 `callback` ，内层通过调用 `callback` 来实现两层组合模式的通信关系。

```jsx
function Item (props){
    return <div>
        名称：{props.name}
        <button onClick={()=> props.callback('let us learn React!')} >点击</button>
    </div>
}

function Groups (props){
    const handleCallback = (val) =>  console.log(' children 内容：',val )
    return <div>
        {React.cloneElement( props.children , { callback:handleCallback } )}
    </div>
}
```

- `Groups` 向 `Item` 组件中隐式传入回调函数 `callback`，将作为新的 props 传递。
- `Item` 可以通过调用 `callback` 向 `Groups`传递信息。实现了内外层的通信。

**复杂的组合场景**

组合模式还有一种场景，在外层容器中，进行再次组合，这样组件就会一层一层的包裹，一次又一次的强化。这里举一个例子：

```jsx
function Item (props){
    return <div>
        名称：{props.name}     <br/>
        作者：{props.author}   <br/>
        对大家说：{props.mes}   <br/>
    </div>
}
/* 第二层组合 -> 混入 mes 属性  */
function Wrap(props){
    return React.cloneElement( props.children,{ mes:'let us learn React!' } )
}
/* 第一层组合，里面进行第二次组合，混入 author 属性  */
function Groups (props){
    return <Wrap>
        {React.cloneElement( props.children, { author:'alien' } )}
    </Wrap>
}

export default ()=>{
    return <Groups>
    <Item name="《React进阶实践指南》" />
</Groups>
}
```

- 在 `Groups` 组件里通过 `Wrap` 再进行组合。经过两次组合，把 `author` 和 `mes` 混入到 props 中。

这种组合模式能够一层层强化原始组件，外层组件不用过多关心内层到底做了些什么? 只需要处理 `children` 就可以，同样内层 `children `在接受业务层的` props `外，还能使用来自外层容器组件的**状态**，**方法**等。

### 3 注意细节

组合模式也有很多细节值得注意，首先最应该想到的就是对于 `children` 的类型校验，因为组合模式，外层容器组件对 `children` 的属性状态是未知的。如果在不确定 `children` 的状态下，如果直接挂载，就会出现报错等情况。所以验证 children 的合法性就显得非常重要。

**验证children**

比如如下，本质上形态是属于 render props 形式。

```jsx
<Groups>
   {()=>  <Item  isShow name="《React进阶实践指南》" />}
</<Groups>
```

上面的情况，如果 Groups 直接用 children 挂载的话。

```jsx
function Groups (props){
    return props.children
}
```

这样的情况，就会报 `Functions are not valid as a React child` 的错误。那么需要在 Groups 做判断，我们来一起看一下：

```jsx
function Groups (props){
    return  React.isValidElement(props.children)
     ? props.children
     : typeof props.children === 'function' ?
       props.children() : null
}
```

- 首先判断 children 是否是 React.element ，如果是那么直接渲染，如果不是，那么接下来判断是否是函数，如果是函数，那么直接函数，如果不是那么直接渲染 `null` 就可以了。

**绑定静态属性**

现在还有一个暴露的问题是，外层组件和内层组件通过什么识别身份呢？比如如下的场景：

```jsx
<Groups>
   <Item  isShow name="《React进阶实践指南》" />
   <Text />
<Groups>
```

如下，`Groups` 内部有两个组件，一个是 `Item` ，一个是 `Text` ，但是只有 `Item` 是有用的，那么如何证明 Item 组件呢。那么我们需要给组件函数或者类绑定静态属性，这里可以统一用 **`displayName`** 来标记组件的身份。

那么只需要这么做就可以了：

```jsx
function Item(){ ... }
Item.displayName = 'Item'
```

那么在 Groups 中就可以找到对应的 Item 组件，排除 Text 组件。具体可以通过 children 上的 `type` 属性找到对应的函数或者是类，然后判断 type 上的 displayName 属性找到对应的 Item 组件，**本质上 displayName 主要用于调试，这里要记住组合方式，可以使用子组件的静态属性就可以了。** 当然也可以通过内存空间相同的方式。

具体参考方式：

```jsx
function Groups (props){
    const newChildren = []
    React.Children.forEach(props.children,(item)=>{
        const { type ,props } = item || {}
        if(isValidElement(item) && type.displayName === 'Item' ){
            newChildren.push(item)
        }
    })
    return  newChildren
}
```

通过 `displayName `属性找到 `Item`。

### 4 实践demo

接下来，我们来简单实现刚开始的 `tab`，`tabItem` 切换功能。

**tab实现**

```jsx
const Tab = ({ children ,onChange }) => {
    const activeIndex = useRef(null)
    const [,forceUpdate] = useState({})
    /* 提供给 tab 使用  */
    const tabList = []
    /* 待渲染组件 */
    let renderChildren = null
    React.Children.forEach(children,(item)=>{
        /* 验证是否是 <TabItem> 组件  */
        if(React.isValidElement(item) && item.type.displayName === 'tabItem' ){
            const { props } = item
            const { name, label } = props
            const tabItem = {
                name,
                label,
                active: name === activeIndex.current,
                component: item
            }
            if(name === activeIndex.current) renderChildren = item
            tabList.push(tabItem)
        }
    })
    /* 第一次加载，或者 prop children 改变的情况 */
    if(!renderChildren && tabList.length > 0){
        const fisrtChildren = tabList[0]
        renderChildren = fisrtChildren.component
        activeIndex.current = fisrtChildren.component.props.name
        fisrtChildren.active = true
    }

    /* 切换tab */
    const changeTab=(name)=>{
        activeIndex.current = name
        forceUpdate({})
        onChange && onChange(name)
    }

    return <div>
        <div className="header"   >
            {
                tabList.map((tab,index) => (
                    <div className="header_item" key={index}  onClick={() => changeTab(tab.name)} >
                        <div className={'text'}  >{tab.label}</div>
                        {tab.active && <div className="active_bored" ></div>}
                    </div>
                ))
            }
        </div>
        <div>{renderChildren}</div>
    </div>
}

Tab.displayName = 'tab' 
```

我写的这个 Tab，负责了整个 Tab 切换的主要功能，包括 **TabItem 的过滤**，**状态收集**，**控制对应的子组件展示**。

- 首先通过 `Children.forEach` 找到符合条件的 `TabItem`。收集 `TabItem`的 props，形成菜单结构。
- 找到对应的 `children` ，渲染正确的 children 。
- 提供改变 tab 的方法 `changeTab`。
- displayName 标记 `Tab` 组件。这个主要目的方便调试。

**TabItem 的实现**

```
const TabItem = ({ children }) => {
    return <div>{children}</div>
}
TabItem.displayName = 'tabItem'
```

这个 demo 中的 TabItem 功能十分简单，大部分事情都交给 Tab 做了。

TabItem 做的事情是：

- 展示 `children` （ 我们写在 TabItem 里面的内容 ）
- 绑定静态属性 `displayName` 。

**效果**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQSlK3cxpkDSgtTMGlS2icIrRZUibhGLPJKvGQI6taaNn2lqiclT9HCfJQQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

### 5 总结

组合模式在日常开发中，用途还是比较广泛的，尤其是在一些比较出色的开源项目中，组合模式的总结内容如下：

- 组合模式通过外层组件获取内层组件 children ，通过 cloneElement 传入新的状态，或者控制内层组件渲染。
- 组合模式还可以和其他组件组合，或者是 render props，拓展性很强，实现的功能强大。

总结流程图如下：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQa2Fe53890uoLm5icCjtEnvBEDFHFCgIXec2GEAy6eOheIs37nmTaa7w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 三 render props模式

> [*任何*被用于告知组件需要渲染什么内容的函数 prop 在技术上都可以被称为 “render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

### 1 介绍

`render props` 模式和组合模式类似。区别不同的是，用函数的形式代替 `children`。函数的参数，由容器组件提供，这样的好处，将容器组件的状态，提升到当前外层组件中，这个是一个巧妙之处，也是和组合模式相比最大的区别。

我们先来看一下一个基本的 `render props` 长什么样子：

```jsx
export default function App (){
    const aProps = {
        name:'《React进阶实践指南》'
    }
    return <Container>
        {(cProps) => <Children {...cProps} { ...aProps }  />}
    </Container>
}
```

如上是 `render props` 的基本样子。可以清楚的看到：

- `cProps` 为 `Container` 组件提供的状态。
- `aProps` 为 `App` 提供的状态。这种模式优点是，能够给` App` 的子组件 `Container` 的状态提升到 `App` 的 `render` 函数中。然后可以组合成新的` props`，传递给 `Children`，这种方式让容器化的感念更显而易见。

接下来我们研究一下` render props` 原理和细节。

### 2 原理和细节

首先一个问题是` render props` 这种方式到底适合什么场景，实际这种模式更适合一种，容器包装，状态的获取。可能这么说有的同学不明白。那么一起看一下 `context` 中的 `Consumer`。就采用 `render props` 模式。

```jsx
const Context = React.createContext(null)
function Index(){
    return <Context.Consumer>
           {(contextValue)=><div>
               名称：{contextValue.name}
               作者：{contextValue.author}
           </div>}
         </Context.Consumer>
}

export default function App(){
    const value = {
        name:'《React进阶实践指南》',
        author:'我不是外星人'
    }
    return <Context.Provider value={value} >
        <Index />
    </Context.Provider>
}
```

- 我们看到`Consumer` 就是一个容器组件，包装即将渲染的内容，然后通过 `children render` 函数执行把状态 `contextValue` 从下游向上游提取。

那么接下来模拟一下 `Consumer` 的内部实现。

```jsx
function myConsumer(props){
    const contextValue = useContext(Context)
    return props.children(contextValue)
}
```

如上就模拟了一个 Consumer 功能，从 Consumer 的实现看 render props 本质就是容器组件产生状态，再通过 children 函数传递下去。所以这种模式我们应该更在乎的是，**容器组件能提供些什么？**

**派生新状态**

相比传统的组合模式，render props 还有一个就是灵活性，可以通过容器组件的状态和当前组件的状态结合，派生出新的状态。比如如下

```jsx
 <Container>
        {(cProps) => {
            const  const nProps =  getNewProps( aProps , cProps )
            return <Children {...nProps} />
        }}
 </Container>
```

- `nProps` 是通过当前组件的状态 `aProps` 和 `Container` 容器组件 `cProps` ，合并计算得到的状态。

**反向状态回传**

这种情况比较极端，笔者也用过这种方法，就是可以通过 `render props` 中的状态，提升到当前组件中，也就是把容器组件内的状态，传递给父组件。比如如下情况。

```jsx
function GetContanier(props){
    const dom = useRef()
    const getDom = () =>  dom.current
    return <div ref={dom} >
        {props.children({ getDom })}
    </div>
}

export default function App(){
     /* 保存 render props 回传的状态 */
     const getChildren = useRef(null)
     useEffect(()=>{
        const childDom = getChildren.current()
        console.log( childDom,'childDom' )
     },[])
    return <GetContanier>
        {({getDom})=>{
            getChildren.current = getDom
            return <div></div>
        }}
    </GetContanier>
}
```

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQoc1nrHXPsf7L53w9lHW6eKGB2ialunRd4ianQpRvntTBDSPqBicuw54Ng/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

- 这是一个复杂的状态回传的场景，在 `GetContanier` 将获取元素的方法 `getDom` 通过 `render props` 回传给父组件。
- 父组件 App 通过 `getChildren` 保存 `render props` 回传的内容，在 `useEffect` 调用 `getDom` 方法，打印内容如下：

但是现实情况不可能是获取一个 `dom` 这么简单，真实情景下，回传的内容可能更加复杂。

### 3 注意问题

`render props` 的注意问题还是对 `children` 的校验，和组合模式不同的是，这种模式需要校验 `children` 是一个函数，只有是函数的情况下，才能执行函数，传递 `props` 。打一个比方：

```jsx
function Container (props){
    const renderChildren =  props.children
    return typeof renderChildren === 'function' ? renderChildren({ name:'《React进阶时间指南》' }) : null
}
export default function App(){
    return <Container>
        {(props)=> <div> 名称 ：{props.name} </div>}
    </Container>
}
```

- 通过 `typeof` 判断 `children` 是一个函数，如果是函数，那么执行函数，传递 props 。

### 4 实践demo

接下来我们实现一个 demo。通过 render props 实现一个带 loading 效果的容器组件，被容器组件包裹，会通过 props 回传开启 loading 的方法 （ 现实场景下，不一定会这么做，这里只是方便同学学习 render props 模式 ） 。

**容器组件 Container**

```jsx
function Container({ children }){
   const [ showLoading, setShowLoading ] = useState(false)
   const renderChildren = useMemo(()=> typeof children === 'function' ? children({ setShowLoading }) : null  ,[children] )
   return <div style={{ position:'relative' }} >
     {renderChildren}
     {showLoading &&  <div className="mastBox" >
          {<SyncOutlined  className="icon"  spin twoToneColor="#52c41a" />}
     </div>}
   </div>
}
```

- `useState`用于显示 loading 效果，useMemo 用于执行 `children` 函数，把改变 state 的方法 setShowLoading 传入 props 中。这里有一个好处就是当 useState 改变的时候，不会触发 `children` 的渲染。
- 通过 `showLoading` 来显示 loading 效果。

**外层使用**

```jsx
export default function Index(){
    const setLoading = useRef(null)
    return <div>
        <Container>
            {({ setShowLoading })=>{
                console.log('渲染')
                setLoading.current = setShowLoading
                return <div>
                     <div className="index1" >
                         <button onClick={() => setShowLoading(true)} >loading</button>
                     </div>
                </div>
            }}
        </Container>
        <button onClick={() => setLoading.current && setLoading.current(false)} >取消 loading </button>
    </div>
}
```

- 通过直接调用 `setShowLoading(true)`显示 loading 效果。
- 用 useRef 保存状态 setShowLoading ，`Container` 外层也可以调用 setShowLoading 来让 loading 效果消失。

**效果**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQKJrewJLMTktBSSpaKUayiaNjSjnzA4T2AGAWarScczKSBrOZeTXK91A/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

### 5 总结

接下来我们总结一下 render props 的特点。

- 容器组件作用是传递状态，执行 children 函数。
- 外层组件可以根据容器组件回传 props ，进行 props 组合传递给子组件。
- 外层组件可以使用容器组件回传状态。

这种模式下的原理图如下所示：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQmwGpqxVYSd17Dkh3SRYfAx4BWVDfzoRsFCgmiaZCjm861OG0N8QeUKg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)


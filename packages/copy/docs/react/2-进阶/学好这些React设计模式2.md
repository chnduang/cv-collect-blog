# 学好这些React设计模式-能让你的 React 项目飞起来

> [https://mp.weixin.qq.com/s/dfnajqS0NqTkp7fzK4-4Sw](https://mp.weixin.qq.com/s/dfnajqS0NqTkp7fzK4-4Sw)

## 四 hoc 模式

### 1 介绍

hoc 高阶组件模式也是 React 比较常用的一种包装强化模式之一，高阶函数是接收一个函数，返回一个函数，而所谓**高阶组件，就是接收一个组件，返回一个组件，返回的组件是根据需要对原始组件的强化。**

我们来看一下 hoc 的通用模式。hoc 本质上就是一个函数。

```jsx
function Hoc (Component){
    return class Wrap extends React.Component{
        //---------
        // 强化操作
        //---------
        render(){
            return <Component { ...this.props } />
        }
    }
}
```

传统的 HOC 模式如上，我们可以看清楚一个传统的 HOC 做了哪些事。

- 1 HOC 本质是一个函数，传入 `Component` ，也就是原始组件本身。
- 2 返回一个新的包装的组件 Wrap ，我们可以在 Wrap 中做一些强化原始组件的事。
- 3 Wrap 中挂载原始组件本身 `Component`。

### 2 原理

接下来我们看一下 hoc 的具体实现原理。hoc 的实现有两种方式，**属性代理**和**反向继承**。

**属性代理**所谓正向属性代理，就是用组件包裹一层代理组件，在代理组件上，我们可以做一些，对源组件的代理操作。我们可以理解为父子组件关系，父组件对子组件进行一系列强化操作。而 hoc 本身就是返回强化子组件的父组件。

```jsx
function HOC(WrapComponent){
    return class Advance extends React.Component{
       state={
           name: '《React 进阶实践指南》',
           author:'我不是外星人'
       }
       render(){
           return <WrapComponent  { ...this.props } { ...this.state }  />
       }
    }
}
```

属性代理特点：

- ① 正常属性代理可以和业务组件低耦合，零耦合，对于条件渲染和 `props` 属性增强,只负责控制子组件渲染和传递额外的 `props` 就可以，所以无须知道，业务组件做了些什么。所以正向属性代理，更适合做一些开源项目的 `hoc` ，目前开源的 `HOC` 基本都是通过这个模式实现的。
- ② 同样适用于 `class` 声明组件，和 `function` 声明的组件。
- ③ 可以完全隔离业务组件的渲染,相比反向继承，属性代理这种模式。可以完全控制业务组件渲染与否，可以避免反向继承带来一些副作用，比如生命周期的执行。
- ④ 可以嵌套使用，多个 hoc 是可以嵌套使用的，而且一般不会限制包装HOC的先后顺序。

**反向继承**

反向继承和属性代理有一定的区别，在于包装后的组件继承了业务组件本身，所以我们我无须再去实例化我们的业务组件。当前高阶组件就是继承后，加强型的业务组件。这种方式类似于组件的强化，所以你必须要知道当前继承的组件的状态，内部做了些什么？

```jsx
class Index extends React.Component{
  render(){
    return <div> hello,world  </div>
  }
}
function HOC(Component){
    return class wrapComponent extends Component{ /* 直接继承需要包装的组件 */

    }
}
export default HOC(Index) 
```

- ① 方便获取组件内部状态，比如state，props ,生命周期,绑定的事件函数等
- ② es6继承可以良好继承静态属性。我们无须对静态属性和方法进行额外的处理。

### 3 功能及注意事项

上面介绍了 hoc 的二种实现方式，接下来看一下 hoc 能做些什么？以及 hoc 模式的注意事项。

**HOC 的功能**

对于属性代理HOC，我们可以：

- 强化props & 抽离state。
- 条件渲染，控制渲染，分片渲染，懒加载。
- 劫持事件和生命周期。
- ref控制组件实例。
- 添加事件监听器，日志

对于反向代理的HOC,我们可以：

- 劫持渲染，操纵渲染树。
- 控制/替换生命周期，直接获取组件状态，绑定事件。

如果你对上面的每一个功能的具体场景不清楚的话，建议看一下笔者的另外一篇文章：一文吃透React高阶组件(HOC)

**HOC 注意事项**

- 1 谨慎修改原型链。
- 2 继承静态属性，这里推荐一个库 `hoist-non-react-statics` 自动拷贝所有的静态方法。
- 3 跨层级捕获 `ref`，通过 `forwardRef`转发 `ref`。
- 4 render 中不要声明 `HOC`，如果在 render 声明 hoc，可能会造成组件反复挂载情况发生。

### 4 实践demo

之前有同学在面试中，遇到了这样一个问题，就是如果控制组件挂载的先后顺序，比如如下的场景

```jsx
export default function Index(){
    return <div>
        <ComponentA />
        <ComponentB />
        <ComponentC />
    </div>
}
```

如上，有三个子组件，`ComponentA` ，`ComponentB`，`ComponentC`，现在期望执行顺序是 `ComponentA` 渲染完成，挂载 `ComponentB` ，`ComponentB` 渲染完成，挂载 `ComponentC`，也就是三个组件是按照先后顺序渲染挂载的，那么如何实现呢？

实际上，这种情况完全可以用一个 hoc 来实现，那么接下来，请大家跟上我的思路实现这个场景。
首先这个 hoc 是针对当前 index 下面，`ComponentA ｜ ComponentB ｜ ComponentC` 一组 `component` 进行功能强化。所以这个 hoc 最好可以动态创建，而且服务于当前一组组件。那么可以声明一个生产 hoc 的函数工厂。

```jsx
function createHoc(){
   const renderQueue = []            /* 待渲染队列 */
    return function Hoc(Component){  /* Component - 原始组件   */
        return class Wrap extends React.Component{  /* hoc 包装组件 */
         
        }
    }
}
```

那么我们需要先创建一个 hoc，作为这一组组件的使用。

**使用：**

```jsx
const loadingHoc = createHoc()
```

知道了 hoc 的动态产生，接下来具体实现一下这个 hoc 。

```jsx
function createHoc(){
    const renderQueue = [] /* 待渲染队列 */
    return function Hoc(Component){

        function RenderController(props){  /* RenderController 用于真正挂载原始组件  */
            const { renderNextComponent ,...otherprops  } = props
            useEffect(()=>{
                renderNextComponent() /* 通知执行下一个需要挂载的组件任务 */
            },[])
            return <Component  {...otherprops}  />
        }

        return class Wrap extends React.Component{
            constructor(){
                super()
                this.state = {
                    isRender:false
                }
                const tryRender = ()=>{
                    this.setState({
                        isRender:true
                    })
                }
                if(renderQueue.length === 0) this.isFirstRender = true
                renderQueue.push(tryRender)
            }
            isFirstRender = false      /* 是否是队列中的第一个挂载任务 */
            renderNextComponent=()=>{  /* 从更新队列中，取出下一个任务，进行挂载 */
                if(renderQueue.length > 0 ){
                    console.log('挂载下一个组件')
                    const nextRender = renderQueue.shift()
                    nextRender()
                }
            }
            componentDidMount(){  /* 如果是第一个挂载任务，那么需要 */
                this.isFirstRender && this.renderNextComponent()
            }
            render(){
                const { isRender } = this.state
                return isRender ? <RenderController {...this.props} renderNextComponent={this.renderNextComponent}  /> : <SyncOutlined   spin />
            }
        }
    }
}
```

分析一下主要流程：

- 首先通过 `createHoc` 来创建需要顺序加载的 hoc ，`renderQueue` 存放待渲染的队列。
- Hoc 接收原始组件 `Component`。
- `RenderController` 用于真正挂载原始组件，用 useEffect 通知执行下一个需要挂载的组件任务，在 hooks 原理的文章中，我讲过 **useEffect** 采用异步执行，也就是说明，是在渲染之后，浏览器绘制已经完成。
- Wrap 组件包装了一层 `RenderController`，主要用于渲染更新任务，`isFirstRender`证明是否是队列中的第一个挂载任务，如果是第一个挂载任务，那么需要在 `componentDidMount` 开始挂载第一个组件。
- 每一个挂载任务本质上就是 `tryRender` 方法，里面调用了 setState 来渲染 `RenderController`。
- 每一个挂载任务的函数 `renderNextComponent` 原理很简单，就是获取第一个更新任务，然后执行就可以了。
- 还有一些细节没有处理，比如说继承静态属性，ref 转发等。

**使用：**

```jsx
/* 创建 hoc  */
const loadingHoc = createHoc()

function CompA(){
    useEffect(()=>{
        console.log('组件A挂载完成')
    },[])
    return <div>组件 A </div>
}
function CompB(){
    useEffect(()=>{
        console.log('组件B挂载完成')
    },[])
    return <div>组件 B </div>
}
function CompC(){
    useEffect(()=>{
        console.log('组件C挂载完成')
    },[])
    return  <div>组件 C </div>
}

function CompD(){
    useEffect(()=>{
        console.log('组件D挂载完成')
    },[])
    return  <div>组件 D </div>
}
function CompE(){
    useEffect(()=>{
        console.log('组件E挂载完成')
    },[])
    return  <div>组件 E </div>
}


const ComponentA = loadingHoc(CompA)
const ComponentB = loadingHoc(CompB)
const ComponentC = loadingHoc(CompC)
const ComponentD = loadingHoc(CompD)
const ComponentE = loadingHoc(CompE)

export default function Index(){
    const [ isShow, setIsShow ] = useState(false)
    return <div>
        <ComponentA />
        <ComponentB />
        <ComponentC />
        {isShow && <ComponentD />}
        {isShow && <ComponentE />}
        <button onClick={()=> setIsShow(true)} > 挂载组件D ，E </button>
    </div>
}
```

**效果：**

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)<img src="https://mmbiz.qpic.cn/mmbiz_gif/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQl9tXGeh4ls3ekAA5QWcocIwqBD5h4RO0ibOcUaXdiaMibAJoImsCfgIuQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1" alt="图片" style="zoom:50%;" />

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQU2wPWV8ZJ0etGnaqtyXxia5j8FLaUN9VUlpFSy0IqjG5Lvnjewas5Sw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

完美达成需求。

### 5 总结

HOC 在实际项目中，应用还是很广泛的，尤其是一些优秀的开源项目中，这里总结了一下 HOC 的原理图：

**属性代理**

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQIlGS12SM42wyU8icTMKXZPVUMhY59qNmgMDdJBXKwNbicmTCtChRtOTw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**反向继承**

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQJeyYUyQ5CqT5X89fEtYmdTMDBXJrTFYZzoohVia95YAguUoS3yia8QwQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 五 提供者模式

### 1 介绍

首先我们来思考一下，为什么 React 会有提供者这种模式呢？

带着这个疑问，首先假设一个场景：在 React 的项目有一个全局变量 `theme` （ `theme` 可能是初始化数据交互获得的，也有可能是切换主题变化的），有一些视图 UI 组件（比如表单 `input` 框、 `button` 按钮），需要 `theme` 里面的变量来做对应的视图渲染，现在的问题是怎么能够把 `theme` 传递下去，合理分配到用到这个 `theme` 的地方。

如果用 `props` 解决这个问题，那么需要通过 `props` 层层绑定，而且还要考虑 `pureComponent`， `memo` 策略的影响。

所以这个时候用提供者模式最好不过了。React 提供了 context `提供者`模式，具体模式是这样的，React组件树 Root 节点，用 Provider 提供者注入 theme，然后在需要 theme的 地方，用 Consumer 消费者形式取出theme，供给组件渲染使用即可，这样减少很多无用功。用官网上的一句话形容就是Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

但是必须注意一点是，提供者永远要在消费者上层，正所谓水往低处流，提供者一定要是消费者的某一层父级。提供者模式的结构图如下：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQ4DYkOPibfEILmtjhrLwt3RIIS5mzoibGA3rmgFiafniamWicM8Sdiae1YIOw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 2 用法介绍

对于提供者模式的用法，有老版本的 context 和新版本的 context 之分。接下来重点介绍一下两种方式。

#### 老版本提供者模式

在 React v16.3.0 之前，要实现提供者，就要实现一个 React 组件，不过这个组件要做特殊处理。下面就是一个实现“提供者”的例子，组件名为 `ThemeProvider`：

**提供者**

```jsx
class ThemeProvider extends React.Component {
  getChildContext() {
    return {
      theme: this.props.value
    }
  }

  render() {
    return (
      <div>
         { this.props.children }
      </div>
    );
  }
}
ThemeProvider.childContextTypes = {
  theme: PropTypes.object
}
```

- 需要实现 `getChildContext` 方法，用于返回数据就是向子孙组件传递的上下文；
- 需要定义 `childContextTypes` 属性，声明“上下文”的结构类型。

**使用**

```jsx
<ThemeProvider value={{ color:'pink' }}>
    <Index />
</ThemeProvider>
```

**消费者**

```jsx
const ThemeConsumer = (props, context) => {
  const {color} = context.theme
  return (
    <p style={{color }}>
      {props.children}
    </p>
  );
}

ThemeConsumer.contextTypes = {
  theme: PropTypes.object
}
```

- 这里需要注意的是，需要通过 `contextTypes` 指定将要消费哪个 context ，否则将无效。

#### 新版本提供者模式

到了 React v16.3.0 的时候，新的 Context API 出来了，开发者可以创建一个 Context ， Context 上有两个属性就是 `Provider` 和 `Consumer` 。

- `Provider` 用于提供 context 。
- `Consumer` 用于消费 context 。

那么接下来介绍一下具体如何使用，首先开发者需要用 createContext api 创建一个 context。

```jsx
const ThemeContext = React.createContext();
```

然后就是新版本 `Provider` 和 `Consumer`的实现。

**新版提供者**

```jsx
function ThemeProvider(){
    const theme = { color:'pink' }
    return <ThemeContext.Provider value={ theme } >
        <Index />
    </ThemeContext.Provider>
}
```

- 通过 `ThemeContext` 上的 `Provider` 传递主题信息 `theme` 。
- `Index` 是根部组件。

**新版消费者**

```jsx
function ThemeConsumer(props){
    return <ThemeContext.Consumer>
      { (theme)=>{ /* render children函数 */
          const { color } = theme
          return <p style={{color }}>
           {props.children}
       </p>
      } }
    </ThemeContext.Consumer>
}
```

- `Consumer` 采用的就是上述讲到的 `render props` 模式。
- 通过 `Consumer` 订阅 `context` 变化，`context` 变化， `render children` 函数重新执行。`render children` 函数中第一个参数就是保存的 `context` 信息。
- 在新版消费者中，对于函数组件还有 `useContext` 自定义 `hooks` ，对于类组件有 `contextType` 静态属性。

### 3 实践demo

接下来我们实现一个提供者模式的实践 demo ，通过动态 context 来让消费 context 的 `Consumer` 动态渲染。

```jsx
const ThemeContext = React.createContext(null) // 创建一个 context 上下文 ,主题颜色Context

function ConsumerDemo(){
    return <div>
         <ThemeContext.Consumer>
        {
            (theme) => <div style={{ ...theme}} >
                  <p>i am alien!</p>
                  <p>let us learn React!</p>
             </div>
        }
        </ThemeContext.Consumer>
    </div>
}

class Index extends React.PureComponent{
    render(){
        return <div>
            <ConsumerDemo />
        </div>
    }
}

export default function ProviderDemo(){
    const [ theme , setTheme ]= useState({ color:'pink' , background:'#ccc' })
    return <div>
       <ThemeContext.Provider value={theme}  >
          <Index  />
       </ThemeContext.Provider>
       <button onClick={()=>setTheme({ color:'blue' , background:'orange'  })} >点击</button>
    </div>
}
```

- Provider 改变，消费订阅 Provider 的 Consumer 会重新渲染。

**效果：**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQpj65gDmDQUrsHey1E929lvOY2vjYFa1MkUicPkNuZ59icOZyepIXCaibA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

### 4 总结

提供者模式在日常开发中，用的频率还是很高的，比如全局传递状态，保存状态。这里用一幅图总结提供者模式的原理。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQFqiawgezQ3NpnW395DBAgdBVFDW1MEGoicacmkC6oZD7LQGsv5WPaEYg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 六 类组件继承

### 1 介绍

> React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用
> 虽然 React 官方推荐**用组合方式**，而**非继承方式**。但是也不是说明继承这种方式没有用武之地，继承方式还是有很多应用场景的。

在 `class` 组件盛行之后，我们可以通过继承的方式进一步的强化我们的组件。这种模式的好处在于，可以封装基础功能组件，然后根据需要去` extends` 我们的基础组件，按需强化组件，但是值得注意的是，必须要对基础组件有足够的掌握，否则会造成一些列意想不到的情况发生。

我们先来看一个

```jsx
class Base extends React.Component{
  constructor(){
    super()
    this.state={
      name:'《React 进阶实践之指南》'
    }
  }
  componentDidMount(){}
  say(){
    console.log('base components')
  }
  render(){
    return <div> hello,world <button onClick={ this.say.bind(this) } >点击</button>  </div>
  }
}
class Index extends Base{
  componentDidMount(){
    console.log( this.state.name )
  }
  say(){ /* 会覆盖基类中的 say  */
    console.log('extends components')
  }
}
export default Index
```

- `Base` 为基础组件，提供一些基础的方法和功能，包括 UI
- `Index` 为基于 Base 继承的组件，可以针对 Index 做一些功能性的强化。

### 2 特性

继承增强效果很优秀。它的优势如下：

- 可以控制父类 render，还可以添加一些其他的渲染内容；
- 可以共享父类方法，还可以添加额外的方法和属性。

但是也有值得注意的地方，就是 `state` 和生命周期会被继承后的组件修改。像上述 `demo`中， `Person` 组件中的 `componentDidMount` 生命周期将不会被执行。

### 3 实践demo

接下来我们实现一个继承功能，继承的组件就是耳熟能详的 React-Router 中的 Route 组件，强化它，使它变成可以受到权限的控制。

- 当页面有权限，那么直接展示页面内容。
- 当页面没有权限，那么展示无权限页面。

**代码编写**

```jsx
import { Route } from 'react-router'

const RouterPermission = React.createContext()

class PRoute extends Route{
    static contextType = RouterPermission  /* 使用 context */
    constructor(...arg){
        super(...arg)
        const { path } = this.props
        /* 如果有权限 */
        console.log(this.context)
        const isPermiss = this.context.indexOf(path) >= 0 /* 判断是否有权限 */
        if(!isPermiss) {
            /* 修改 render 函数，如果没有权限，重新渲染一个 Route ，ui 是无权限展示的内容  */
            this.render = () =>  <Route  {...this.props}   >
                <div>暂无权限</div>
            </Route>
        }
    }
}
export default (props)=>{
    /* 模拟的有权限的路由列表 */
    const permissionList = [ '/extends/a' , '/extends/b'  ]
   return  <RouterPermission.Provider value={permissionList} >
       <Index {...props} />
   </RouterPermission.Provider>
}
```

- 在根组件传入权限路由。通过 context 模式，保存的是存在权限的路由列表。这里模拟为 `/extends/a` 和 `/extends/b`。
- 编写 PRoute 权限路由，继承 `react-router` 中的 `Route` 组件。
- PRoute 通过 `contextType` 消费指定的权限上下文 `RouterPermission context`。
- 在 `constructor` 中进行判断，如果有权限，那么不用做任何处理，如果没有权限，那么重写 render 函数，用 Route 做一个展示容器，展示无权限的 UI 。

**使用**

```jsx
function Test1 (){
    return <div>权限路由测试一</div>
}

function Test2 (){
    return <div>权限路由测试二</div>
}

function Test3(){
    return <div>权限路由测试三</div>
}

function Index({ history }){
    const routerlist=[
        { name:'测试一' ,path:'/extends/a' },
        { name:'测试二' ,path:'/extends/b' },
        { name:'测试三' ,path:'/extends/c' }
    ]
    return <div>
        {
            routerlist.map(item=> <button key={item.path}
                onClick={()=> history.push(item.path)}
                                  >{item.path}</button> )
        }
        <PRoute component={Test1}
            path="/extends/a"
        />
        <PRoute component={Test2}
            path="/extends/b"
        />
        <PRoute component={Test3}
            path="/extends/c"
        />
    </div>
}
```

**效果**

![图片](https://mmbiz.qpic.cn/mmbiz_gif/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQAicvT8TWXUlaxXdq6H1o4iaGyvPZfmwxeDbqG2Jvib03uib7yPLxibwT8Jg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

- 可以看到，只有权限列表中的 `[ '/extends/a' , '/extends/b' ]` 权限能展示，无权限提示暂无权限，完美达到效果。

### 4 总结

继承模式的应用前提是，你需要知道被继承的组件是什么，内部都有什么状态和方法，对继承的组件内部的运转是透明的。接下来用一幅图表示继承模式原理。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/2KticQlBJtdyI2Qx7gJshibU4oE4E7VJsQhoj2kGSzlozMTIQB5JRvMtjRax1uBONTHbImm9wjqh2MIzz0R1vZxw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

## 七 总结

本章节讲了 React 中常用的几个设计模式。希望同学们看完可以手动敲起来，把这些设计模式运用到真实的项目中。

### 参考资料

「react进阶」一文吃透React高阶组件(HOC)

React进阶实践指南
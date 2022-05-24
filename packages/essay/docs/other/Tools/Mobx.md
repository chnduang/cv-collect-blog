# Mobx

React 和 MobX 是一对强力组合。React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而MobX提供机制来存储和更新应用状态供 React 使用。

## 核心概念

### Observable state(可观察的状态)

MobX 为现有的数据结构(如对象，数组和类实例)添加了可观察的功能。

使用 `observable` 很像把对象的属性变成excel的单元格。 但和单元格不同的是，这些值不只是原始值，还可以是引用值，比如对象和数组。

```javascript
import { observable } from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```

上面一段代码的ES5版本应该是这样:

```javascript
import { decorate, observable } from "mobx";

class Todo {
    id = Math.random();
    title = "";
    finished = false;
}
decorate(Todo, { // 调用 decorate 为 todo 中的属性添加定义(observable)
    title: observable,
    finished: observable
})
```

### Computed values(计算值)

使用 MobX， 你可以定义在相关数据发生变化时自动更新的值。 通过[`@computed`](http://cn.mobx.js.org/refguide/computed-decorator.html) 装饰器或者利用 `(extend)Observable` 时调用 的getter / setter 函数来进行使用。(当然，这里也可以再次使用 `decorate` 来替代 `@` 语法)。

```javascript
class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```

当添加了一个新的todo或者某个todo的 `finished` 属性发生变化时，MobX 会确保 `unfinishedTodoCount` 自动更新。 

### Reactions(反应)

Reactions 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。 简而言之，reactions 在 [响应式编程](https://en.wikipedia.org/wiki/Reactive_programming)和[命令式编程](https://en.wikipedia.org/wiki/Imperative_programming)之间建立沟通的桥梁。

#### React 组件

如果你用 React 的话，可以把你的(无状态函数)组件变成响应式组件，方法是在组件上添加 [`observer`](http://cn.mobx.js.org/refguide/observable-decorator.html) 函数/ 装饰器. `observer`由 `mobx-react` 包提供的。

```javascript
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

@observer
class TodoListView extends Component {
    render() {
        return <div>
            <ul>
                {this.props.todoList.todos.map(todo =>
                    <TodoView todo={todo} key={todo.id} />
                )}
            </ul>
            Tasks left: {this.props.todoList.unfinishedTodoCount}
        </div>
    }
}

const TodoView = observer(({todo}) =>
    <li>
        <input
            type="checkbox"
            checked={todo.finished}
            onClick={() => todo.finished = !todo.finished}
        />{todo.title}
    </li>
)

const store = new TodoList();
ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));
Copy
```

#### 自定义 reactions

`observer` 会将 React (函数)组件转换为它们需要渲染的数据的衍生。 使用 MobX 时没有所谓的智能和无脑组件。 所有的组件都会以巧妙的方式进行渲染，而只需要一种简单无脑的方式来定义它们。MobX 会确保组件总是在需要的时重新渲染，但仅此而已。所以上面例子中的 `onClick` 处理方法会强制对应的 `TodoView` 进行渲染，如果未完成任务的数量(unfinishedTodoCount)已经改变，它将导致 `TodoListView` 进行渲染。 可是，如果移除 `Tasks left` 这行代码(或者将它放到另一个组件中)，当点击 `checkbox` 的时候 `TodoListView` 就不再重新渲染。

使用[`autorun`](http://cn.mobx.js.org/refguide/autorun.html)、[`reaction`](http://cn.mobx.js.org/refguide/reaction.html) 和 [`when`](http://cn.mobx.js.org/refguide/when.html) 函数即可简单的创建自定义 reactions，以满足你的具体场景。

例如，每当 `unfinishedTodoCount` 的数量发生变化时，下面的 `autorun` 会打印日志消息:

```javascript
autorun(() => {
    console.log("Tasks left: " + todos.unfinishedTodoCount)
})
```

### MobX 会对什么作出响应?

为什么每次 `unfinishedTodoCount` 变化时都会打印一条新消息？答案就是下面这条经验法则:

*MobX 会对在执行跟踪函数期间读取的任何现有的可观察属性做出反应*。

想深入了解 MobX 是如何知道需要对哪个可观察属性进行响应，请查阅 [理解 MobX 对什么有反应](http://cn.mobx.js.org/best/react.html)。

### Actions(动作)

不同于 flux 系的一些框架，MobX 对于如何处理用户事件是完全开明的。

- 可以用类似 Flux 的方式完成
- 或者使用 RxJS 来处理事件
- 或者用最直观、最简单的方式来处理事件，正如上面演示所用的 `onClick`

最后全部归纳为: 状态应该以某种方式来更新。

当状态更新后，`MobX` 会以一种高效且无障碍的方式处理好剩下的事情。像下面如此简单的语句，已经足够用来自动更新用户界面了。

从技术上层面来讲，并不需要触发事件、调用分派程序或者类似的工作。归根究底 React 组件只是状态的华丽展示，而状态的衍生由 MobX 来管理。

```javascript
store.todos.push(
    new Todo("Get Coffee"),
    new Todo("Write simpler code")
);
store.todos[0].finished = true;
Copy
```

尽管如此，MobX 还是提供了 [`actions`](http://cn.mobx.js.org/refguide/action.html) 这个可选的内置概念。 如果你现在就想要了解如何编写 actions，请阅读 Actions 章节。很简单！ 使用 `actions` 是有优势的: 它们可以帮助你把代码组织的更好，还能在状态何时何地应该被修改这个问题上帮助你做出明智的决定。



## API常用

### Autorun

当你想创建一个响应式函数，而该函数本身永远不会有观察者时,可以使用 `mobx.autorun`。 这通常是当你需要从反应式代码桥接到命令式代码的情况，例如打印日志、持久化或者更新UI的代码。 当使用 `autorun` 时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发。 相比之下，`computed(function)` 创建的函数只有当它有自己的观察者时才会重新计算，否则它的值会被认为是不相关的。 经验法则：如果你有一个函数应该自动运行，但不会产生一个新的值，请使用`autorun`。 其余情况都应该使用 `computed`。 Autoruns 是关于 *启动效果* (initiating effects) 的 ，而不是产生新的值。 如果字符串作为第一个参数传递给 `autorun` ，它将被用作调试名。

传递给 autorun 的函数在调用后将接收一个参数，即当前 reaction(autorun)，可用于在执行期间清理 autorun。

就像 [`@ observer` 装饰器/函数](https://cn.mobx.js.org/refguide/ observer-component.md)，`autorun` 只会观察在执行提供的函数时所使用的数据。

```javascript
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'

disposer();
numbers.push(5);
// 不会再输出任何值。`sum` 不会再重新计算。
```

待修改

### Reaction

待更新

### @observer

待更新



## Mobx的简单使用

（@ observable、@ observer、action）

### @ observable

装饰器可以在 ES7 或者 TypeScript 类属性中属性使用，将其转换成可观察的。 @observable 可以在实例字段和属性 getter 上使用。

### @ observer

observer 函数/装饰器可以用来将 React 组件转变成响应式组件。 它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件。

### action

用法:
action(fn)
action(name, fn)
@action classMethod() {}
@action(name) classMethod () {}
@action boundClassMethod = (args) => { body }
@action(name) boundClassMethod = (args) => { body }
@action.bound classMethod() {}
任何应用都有动作。动作是任何用来修改状态的东西。 使用MobX你可以在代码中显式地标记出动作所在的位置。 动作可以有助于更好的组织代码。

### 定时器示例

**states.js**

```tsx
import { observable, action } from 'mobx'

class States {

    @observable timer = null;
    @observable secend = 0;

    @action 
    add = () => {
        this.secend++
    }
}

export default new States()
```

**index.js**

```jsx
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { observer } from "mobx-react/native";
import states from './states'

@observer
export default class Index extends Component {

  componentDidMount(){
    states.timer = setInterval( () => { states.add() }, 1000 )
  }

  componentWillUnmount(){
    clearInterval(states.timer);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{states.secend}</Text>
      </View>
    );
  }

}
```



## C7N与Mobx

### 监听 DS 触发视图更新

在不见听 DS 的 update 事件时，DS数据变化是不触发试图跟新的，所以通常想要数据变动试图实施触发，写法是这样：

```js
events:{
	update:()=>{
		this.forceUpdate();
	}
}

// 或者

// 监听查询条件数据变化触发事件
componentDidMount() {
    this.tableDS.queryDataSet.addEventListener('update', this.templateCodeQuery);
  }

componentWillUnmount() {
    this.tableDS.queryDataSet.removeEventListener('update', this.templateCodeQuery);
}
```

在学习Mobx后，我们有了更好的方法：

```js
// 监听DS
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer // DS属性有变动， render都会执行（用户点击选择一条数据或者输入到搜索框一些东西）
export default class BasicTable extends PureComponent {
	render() {
    	const {selected} = this.basicTableDS
        console.log(selected.length) // 每次用户选择一条数据都会触发。
    }
}
```

相比于监听事件的方法，mox方法可以监听到一些 update 监听不到的数据。（例如：用户点击一条数据，selected 数据会 push 一条新的数据，但是 update 监听不到，update 只会监听数据源，DS类部属性变化是不会监听的。）

监听整个DS，这既是好处也是坏处，这样就会造成大量的资源浪费，render 会频发触发。

所以我们可以精确监听一个属性：

```js
// 列表页删除按钮“灰显效果”核心代码
export default class BasicTable extends PureComponent {
  componentDidMount() {
    reaction(
      () => this.props.basicTableDS.selected.length,
      () => {
        this.forceUpdate();
      },
    );
   render() {
    console.log(this.props.basicTableDS.selected.length);
   }
}
```

### 监听 DS 行新增删除

```js
import { reaction } from 'mobx';

    reaction(
      () => this.expensesTableDS.data,
      () => {
        console.log('222');
      },
    );
```


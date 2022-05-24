## Map

> 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

//使用 Map 结构的set方法，将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。
```

### Map实例

+ `Map`构造函数接受数组作为参数，实际上执行的是下面的算法

  ```javascript
  const items = [
    ['name', '张三'],
    ['title', 'Author']
  ];
  
  const map = new Map();
  
  items.forEach(
    ([key, value]) => map.set(key, value)
  );
  ```

+ Map的键对类型的识别

  ```javascript
  //如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。
  
  let map = new Map();
  
  map.set(-0, 123);
  map.get(+0) // 123
  
  map.set(true, 1);
  map.set('true', 2);
  map.get(true) // 1
  
  map.set(undefined, 3);
  map.set(null, 4);
  map.get(undefined) // 3
  
  map.set(NaN, 123);
  map.get(NaN) // 123
  ```



------

### 实例的属性和方法

+ 属性

  + **size**
  + **Map.prototype.set(key, value)**
    + `set`方法返回的是当前的`Map`对象，因此可以采用链式写法。
  + **Map.prototype.get(key)**
    + `get`方法读取`key`对应的键值，如果找不到`key`，返回`undefin`
  + **Map.prototype.has(key)**
    + `has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
  + **Map.prototype.delete(key)**
    + `delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。
  + **Map.prototype.clear()**
    + `clear`方法清除所有成员，没有返回值。

+ 遍历

  + Map 结构原生提供三个遍历器生成函数和一个遍历方法。

    - `Map.prototype.keys()`：返回键名的遍历器。

    - `Map.prototype.values()`：返回键值的遍历器。

    - `Map.prototype.entries()`：返回所有成员的遍历器。

    - `Map.prototype.forEach()`：遍历 Map 的所有成员。

      ```javascript
      const map = new Map([
        ['F', 'no'],
        ['T',  'yes'],
      ]);
      
      for (let key of map.keys()) {
        console.log(key);
      }
      // "F"
      // "T"
      
      for (let value of map.values()) {
        console.log(value);
      }
      // "no"
      // "yes"
      
      for (let item of map.entries()) {
        console.log(item[0], item[1]);
      }
      // "F" "no"
      // "T" "yes"
      
      // 或者
      for (let [key, value] of map.entries()) {
        console.log(key, value);
      }
      // "F" "no"
      // "T" "yes"
      
      // 等同于使用map.entries()
      for (let [key, value] of map) {
        console.log(key, value);
      }
      // "F" "no"
      // "T" "yes"
      ```



------

### Map与其他数据结构的转换

+ Map 结构转为数组结构，比较快速的方法是使用扩展运算符（`...`）

  ```javascript
  const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ]);
  
  [...map.keys()]
  // [1, 2, 3]
  
  [...map.values()]
  // ['one', 'two', 'three']
  
  [...map.entries()]
  // [[1,'one'], [2, 'two'], [3, 'three']]
  
  [...map]
  // [[1,'one'], [2, 'two'], [3, 'three']]
  ```
  
+ 数组转Map

  ```javascript
  //将数组传入 Map 构造函数，就可以转为 Map。
  new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
  ])
  ```

  

### WeekMap

总之，`WeakMap`的专用场合就是，它的键所对应的对象，可能会在将来消失。`WeakMap`结构有助于防止内存泄漏。

注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

```javascript
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```

上面代码中，键值`obj`是正常引用。所以，即使在 WeakMap 外部消除了`obj`的引用，WeakMap 内部的引用依然存在

#### 区别Map

WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有`keys()`、`values()`和`entries()`方法），也没有`size`属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持`clear`方法。因此，`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`

#### WeakMap 的用途

前文说过，WeakMap 应用的典型场合就是 DOM 节点作为键名。下面是一个例子。

```javascript
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
```

上面代码中，`document.getElementById('logo')`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

WeakMap 的另一个用处是部署私有属性。

```javascript
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```

上面代码中，`Countdown`类的两个内部属性`_counter`和`_action`，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏

### WeakRef

WeakSet 和 WeakMap 是基于弱引用的数据结构，[ES2021](https://github.com/tc39/proposal-weakrefs) 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。

```javascript
let target = {};
let wr = new WeakRef(target);
```

上面示例中，`target`是原始对象，构造函数`WeakRef()`创建了一个基于`target`的新对象`wr`。这里，`wr`就是一个 WeakRef 的实例，属于对`target`的弱引用，垃圾回收机制不会计入这个引用，也就是说，`wr`的引用不会妨碍原始对象`target`被垃圾回收机制清除。

WeakRef 实例对象有一个`deref()`方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回`undefined`。

```javascript
let target = {};
let wr = new WeakRef(target);

let obj = wr.deref();
if (obj) { // target 未被垃圾回收机制清除
  // ...
}
```

上面示例中，`deref()`方法可以判断原始对象是否已被清除。

弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。

```javascript
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);
```

上面示例中，`makeWeakCached()`用于建立一个缓存，缓存里面保存对原始文件的弱引用。

注意，标准规定，一旦使用`WeakRef()`创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除
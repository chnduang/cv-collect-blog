## JavaScript 函数式编程解析（上）

## 一些必要的概念

1. 纯函数（Pure Function）

> Pure function 意指相同的输入，永远会得到相同的输出，而且没有任何显著的副作用。

> 纯函数就是数学里的函数，这也是函数式编程的全部。

1. 副作用

> *副作用*是在计算结果的过程中，系统状态的一种改变，或是外部世界可观察的*交互作用*。

副作用可以包含，但不限于：

- 更改文件系统

- 在资料库写入纪录
- 发送一个 http 请求
- 状态变化
- 打印到屏幕/ log
- DOM 查询
- 存取系统状态

概括来说，**任何 function 与外部环境的交互都是副作用。**

1. 柯里化（curry）

使用更少的参数调用一个函数，返回一个接受剩余参数的函数。举例如下：

```
const add = x => y => x + y;

const increment = add(1);

const addTen = add(10);

increment(2); // 3

addTen(2); // 12
```

## 函数式编程的优势

1. ```
    确定性（可预测性、数据不可变），同样的输入必然得到相同的输出
   ```

2. ```
    可以使用数学定律
   ```

```
// 结合律（associative）

add(add(x, y), z) === add(x, add(y, z));

// 交换律（commutative）

add(x, y) === add(y, x);

// 同一律（identity）

add(x, 0) === x;

// 分配律（distributive）

multiply(x, add(y,z)) === add(multiply(x, y), multiply(x, z));
```

## 函数式编程的适用场景

- 可变状态（mutable state）
- 不受限的副作用（unrestricted side effects）
- 无原则设计（unprincipled design）

## 函数是一等公民的意义

在 JavaScript 中，函数是一等公民，它意味着函数就跟其他任何数据类型一样，并没有什么特殊之处——可以存储在数组中，作为函数的参数传递、赋值给变量，等等。作为“一等公民”，函数的意义至少有如下几点：

1. ```
    有助于减少不必要的重构
   ```

```
// 如果renderPost功能发生变化，必须改变包装函数

httpGet('/post/2', json => renderPost(json));

// 例如增加一个err

httpGet('/post/2', (json, err) => renderPost(json, err));


// 如果我们把它写成一个一等公民函数，那么就不需要变了

httpGet('/post/2', renderPost);
```

1. ```
    有助于增加通用性和可重用性
   ```

```
// 专门为特定的功能准备

const validArticles = articles =>

  articles.filter(article => article !== null && article !== undefined),

// 看上去有无限的通用性和可重用性

const compact = xs => xs.filter(x => x !== null && x !== undefined);
```

1. ```
    不需要使用 this，但是需要注意适配外部API
   ```

```
const fs = require('fs');

// scary

fs.readFile('freaky_friday.txt', Db.save);

// less so

fs.readFile('freaky_friday.txt', Db.save.bind(Db));
```

### 纯函数的价值

1. ```
    可缓存
   ```

```
const memoize = (f) => {

  const cache = {};

  return (...args) => {

    const argStr = JSON.stringify(args);

    cache[argStr] = cache[argStr] || f(...args);

    return cache[argStr];

  };

};


const squareNumber = memoize(x => x * x);

squareNumber(4); // 16

squareNumber(4); // 16, 返回输入4的缓存结果
```

1. ```
    可移植性/自文档化（Portable / Self-documenting）
   ```

```
// impure
const signUp = (attrs) => {
  const user = saveUser(attrs);
  welcomeUser(user);
};

// pure
const signUp = (Db, Email, attrs) => () => {
  const user = saveUser(Db, attrs);
  welcomeUser(Email, user);
};
```

纯函数把所有可能改变输出的变量`Db`和`Email`，都作为函数签名，这样我们就能知道函数是做什么的，依赖什么参数——提供了更多的信息。可移植性是 JS 的一个强大特性，函数会通过 socket 序列化并传输，意味着在 web worker 中我们可以运行所有代码。

1. 可测试的（Testable）：利用特性，只需要给出输入和断言的输出即可。
2. 可推理的（Reasonable）：同理
3. 并行代码（Parallel Code）：由于不需要共享内存，所以可以并行处理纯函数

## 柯里化（Currying）

```
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
function curry(fn) {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs) => xs.filter(f));
const map = curry((f, xs) => xs.map(f));
```

通过以上的柯里化函数，我们可以把函数式编程变得简洁，没有冗余。尽管有多个参数，我们仍然可以保留数学函数的定义。

```
match(/r/g, 'hello world'); // [ 'r' ]

const hasLetterR = match(/r/g); // x => x.match(/r/g)
hasLetterR('hello world'); // [ 'r' ]
hasLetterR('just j and s and t etc'); // null
filter(hasLetterR, ['rock and roll', 'smooth jazz']); // ['rock and roll']

const removeStringsWithoutRs = filter(hasLetterR); // xs => xs.filter(x => x.match(/r/g))
removeStringsWithoutRs(['rock and roll', 'smooth jazz', 'drum circle']); // ['rock and roll', 'drum circle']
const noVowels = replace(/[aeiou]/ig); // (r,x) => x.replace(/[aeiou]/ig, r)
const censored = noVowels('*'); // x => x.replace(/[aeiou]/ig, '*')
censored('Chocolate Rain'); // 'Ch*c*l*t* R**n'
```

## 组合（Composing）

Composing 就是把函数像“管道”一样组合起来。下面展示最简单的组合示例。

```
const composes = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpperCase);

shout('send in the clowns'); // "SEND IN THE CLOWNS!"
```

以下是一个通用的 compose 函数：

```
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
```

因为 compose 也是纯函数，同样满足分配律：

```
// 满足分配律
compose(f, compose(g, h)) === compose(compose(f, g), h);
```

所以不管传参的顺序如何，它都返回相同的结果，非常强大 👍

```
const arg = ['jumpkick', 'roundhouse', 'uppercut'];
const lastUpper = compose(toUpperCase, head, reverse);
const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);

lastUpper(arg); // 'UPPERCUT'
loudLastUpper(arg); // 'UPPERCUT!'
```

## Pointfree 风格

Pointfree 的意思是**不使用所要操作的数据，只合成运算过程**。下面是使用**Ramda**[1]函数库的`pipe`方法实现 Pointfree 的例子，选自阮一峰老师的**《Pointfree 编程风格指南》**[2]。

```
var str = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
```

上面字符串最长的单词有多少个字符呢？先定义一些基本运算：

```
// 以空格分割单词
var splitBySpace = s => s.split(' ');

// 每个单词的长度
var getLength = w => w.length;

// 词的数组转换成长度的数组
var getLengthArr = arr => R.map(getLength, arr);

// 返回较大的数字
var getBiggerNumber = (a, b) => a > b ? a : b;

// 返回最大的一个数字
var findBiggestNumber = arr => R.reduce(getBiggerNumber, 0, arr);
```

然后把基本运算合成为一个函数：

```
var getLongestWordLength = R.pipe(

  splitBySpace,

  getLengthArr,

  findBiggestNumber

);

getLongestWordLength(str) // 11
```

可以看到，整个运算由三个步骤构成，每个步骤都有语义化的名称，非常的清晰。这就是 Pointfree 风格的优势。Ramda 提供了很多现成的方法，可以直接使用这些方法，省得自己定义一些常用函数（查看**完整代码**[3]）。

```
// 上面代码的另一种写法

var getLongestWordLength = R.pipe(

  R.split(' '),

  R.map(R.length),

  R.reduce(R.max, 0)

);
```

再看一个实战的例子，拷贝自 Scott Sauyet 的文章**《Favoring Curry》**[4]。那篇文章能帮助你深入理解柯里化，强烈推荐阅读。下面是一段服务器返回的 JSON 数据。![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)现在要求是，找到用户 Scott 的所有未完成任务，并按到期日期升序排列。![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)过程式编程的代码如下（查看**完整代码**[5]）。![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)上面代码不易读，出错的可能性很大。现在使用 Pointfree 风格改写（查看**完整代码**[6]）。

```
const getIncompleteTaskSummaries = (name) => {

  return fetchData()

          .then(R.prop('tasks'))

          .then(R.filter(R.propEq('username', name)))

          .then(R.reject(R.propEq('complete', true)))

          .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))

          .then(R.sortBy(R.prop('dueDate')))

}
```

上面代码就变得清晰很多了。

## 常用 Pointfree 纯函数的实现

下面的实现仅仅为了基本演示，如果考虑实际开发，请参考**ramda**[7],**lodash**[8], 或**folktale**[9]。

```
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c

function curry(fn) {

  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);

  };

}


// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// forEach :: (a -> ()) -> [a] -> ()
const forEach = curry((fn, xs) => xs.forEach(fn));

// map :: Functor f => (a -> b) -> f a -> f b

const map = curry((fn, f) => f.map(fn));

// reduce :: (b -> a -> b) -> b -> [a] -> b

const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero));

// replace :: RegExp -> String -> String -> String

const replace = curry((re, rpl, str) => str.replace(re, rpl));

// sortBy :: Ord b => (a -> b) -> [a] -> [a]

const sortBy = curry((fn, xs) => xs.sort((a, b) => {

  if (fn(a) === fn(b)) {

    return 0;

  }

  return fn(a) > fn(b) ? 1 : -1;

}));


// prop :: String -> Object -> a

const prop = curry((p, obj) => obj[p]);
```

关于更多 Pointfree 纯函数的实现可以参考**Pointfree Utilities**[10]。
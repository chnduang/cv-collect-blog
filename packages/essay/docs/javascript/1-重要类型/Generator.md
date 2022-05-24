

## Generator

> ES6 提供的一种异步编程解决方案。
>
> 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

### 特征

> 形式上，Generator 函数是一个普通函数

+ `function`关键字与函数名之间有一个星号；
+ 函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

### 认识

+ generator生成器函数
  + 普通函数从上开始执行到最后
  + generator函数，中间可以停，到哪停呢，用 yield 配合，交出执行权
  + yield 有 放弃、退让、退位的意思
  + 需要调用next()方法启动执行，需要遇到 yield 停；调用一次执行一次
  + generator函数前面加一个 `*` 两边可以有空格，或靠近函数或`function`
  + 背后实际生成多个小函数，实现每一步都能暂停执行

### yield

+ **`yield`表达式就是暂停标志，用来暂停执行的函数**

+ **`next`方法的运行逻辑**

  + 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。
  + 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。
  + 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。
  + 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

+ **`yield`表达式用在另一个表达式之中，必须放在圆括号里面。**

  ```javascript
function* demo() {
    console.log('Hello' + yield); // SyntaxError
    console.log('Hello' + yield 123); // SyntaxError
  
    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
  }
  ```
  
+ **`yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号。**

  ```javascript
  function* demo() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
  }
  ```

+ **注意点**

  + `yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。

    ```javascript
    (function (){
      yield 1;
    })()
    // SyntaxError: Unexpected number
    ```

  + `yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句才会执行

  + 既可传参，又可以返回

  + 第一个`next()`传参无效，只用来启动

  + **如果将`Generator`函数中的`*`漏掉**

  	+ 没有`*`就是普通函数

    + 如果有`yield`会报错， `ReferenceError: yield is not defined`
    + `yield` 只能在`Generator`函数内部使用



------

### yield和return

+ 相似
  + 都能返回紧跟在语句后面的那个表达式的值
+ 区别
  + 每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行
  + `return`语句不具备位置记忆的功能
  + 一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式

### next()方法的参数

> `yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值

+ 注意
  
+ 由于`next`方法的参数表示上一个`yield`表达式的返回值，所以在第一次使用`next`方法时，传递参数是无效的
  
+ 重要例子

  ```javascript
  function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return (x + y + z);
  }
  
  var a = foo(5);
  a.next() // Object{value:6, done:false}
  a.next() // Object{value:NaN, done:false}
  a.next() // Object{value:NaN, done:true}
  
  //第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行Next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。
  
  var b = foo(5);
  b.next() // { value:6, done:false }
  b.next(12) // { value:8, done:false }
  b.next(13) // { value:42, done:true }
  
  //next()中有参数
  //第一次调用b的next方法时，返回x+1的值6；第二次调用next方法，将上一次yield表达式的值设为12，因此y等于24，返回y / 3的值8；第三次调用next方法，将上一次yield表达式的值设为13，因此z等于13，这时x等于5，y等于24，所以return语句的值等于42。
  ```

  
------

### for...of循环

> `for...of`循环可以自动遍历 Generator 函数运行时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
//一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。
```

+ 给对象加遍历器接口

  > 将 Generator 函数加到对象的`Symbol.iterator`属性上面。

```javascript
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

+ 除了`for...of`循环以外，扩展运算符（`...`）、解构赋值和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。

  ```javascript
  function* numbers () {
    yield 1
    yield 2
    return 3
    yield 4
  }
  
  // 扩展运算符
  [...numbers()] // [1, 2]
  
  // Array.from 方法
  Array.from(numbers()) // [1, 2]
  
  // 解构赋值
  let [x, y] = numbers();
  x // 1
  y // 2
  
  // for...of 循环
  for (let n of numbers()) {
    console.log(n)
  }
  // 1
  // 2
  ```



### next()、return()、throw()之间的比较

> 这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式。

+ `next()`是将`yield`表达式替换成一个值。

  ```javascript
  const g = function* (x, y) {
    let result = yield x + y;
    return result;
  };
  
  const gen = g(1, 2);
  gen.next(); // Object {value: 3, done: false}
  
  gen.next(1); // Object {value: 1, done: true}
  // 相当于将 let result = yield x + y
  // 替换成 let result = 1;
  //第二个next(1)方法就相当于将yield表达式替换成一个值1。如果next方法没有参数，就相当于替换成undefined。
  ```
  
+ `throw()`是将`yield`表达式替换成一个`throw`语句。

  ```javascript
  gen.throw(new Error('出错了')); // Uncaught Error: 出错了
  // 相当于将 let result = yield x + y
  // 替换成 let result = throw(new Error('出错了'));
  ```

+ `return()`是将`yield`表达式替换成一个`return`语句。

  ```javascript
  gen.return(2); // Object {value: 2, done: true}
  // 相当于将 let result = yield x + y
  // 替换成 let result = return 2;
  ```




## 函数

### 函数参数的默认值

> ES6 之前，不能直接为函数的参数指定默认值

```javascript
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World
```

+ ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

  ```javascript
  function log(x, y = 'World') {
    console.log(x, y);
  }
  
  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello
  ```

+ 与解构赋值默认值结合使用

  ```javascript
  function foo({x, y = 5}) {
    console.log(x, y);
  }
  
  foo({}) // undefined 5
  foo({x: 1}) // 1 5
  foo({x: 1, y: 2}) // 1 2
  foo() // TypeError: Cannot read property 'x' of undefined
  ```

### rest参数

> ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

+ **注意**

  + rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

    ```javascript
    // 报错
    function f(a, ...b, c) {
      // ...
    }
    ```

+ 函数的`length`属性，不包括 rest 参数。
  
    ```javascript
    (function(a) {}).length  // 1
    (function(...a) {}).length  // 0
    (function(a, ...b) {}).length  // 1
    ```

### 箭头函数

> 允许使用“箭头”（`=>`）定义函数。

+ 基本用法

  ```javascript
  var f = v => v;
  
  // 等同于
  var f = function (v) {
    return v;
  };
  ```

+ 如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。

  ```javascript
  let fn = () => void doesNotReturn();
  ```

+ 箭头函数可以与变量解构结合使用。

  ```javascript
  const full = ({ first, last }) => first + ' ' + last;
  
  // 等同于
  function full(person) {
    return person.first + ' ' + person.last;
  }
  ```

+ rest 参数与箭头函数结合的例子。

  ```javascript
  const numbers = (...nums) => nums;
  
  numbers(1, 2, 3, 4, 5)
  // [1,2,3,4,5]
  
  const headAndTail = (head, ...tail) => [head, tail];
  
  headAndTail(1, 2, 3, 4, 5)
  // [1,[2,3,4,5]]
  ```

+ **注意点**

  + 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
  + 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
  + 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
  + 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。
  + `this`对象的指向是可变的，但是在箭头函数中，它是固定的。


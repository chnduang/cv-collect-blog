## Set

> 它类似于数组，但是成员的值都是唯一的，没有重复的值。
>
> `Set`本身是一个构造函数，用来生成 Set 数据结构
>
> `Set`函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

### add()

>  用来向Set 结构加入成员，结果表明 Set 结构不会添加重复的值。



### 使用`Set`进行数组去重的方法

+ `Set`函数接受数组作为参数

  ```javascript
  // 例一
  const set = new Set([1, 2, 3, 4, 4]);
  [...set]
  // [1, 2, 3, 4]
  
  // 例二
  const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
  items.size // 5
  
  // 例三
  const set = new Set(document.querySelectorAll('div'));
  set.size // 56
  
  // 类似于
  const set = new Set();
  document
   .querySelectorAll('div')
   .forEach(div => set.add(div));
  set.size // 56
  ```

+ 去除数组中的重复成员

  ```javascript
  // 1去除数组的重复成员
  [...new Set(array)]
  
  //2
  function dedupe(array) {
    return Array.from(new Set(array));
  }
  dedupe([1, 1, 2, 3]) // [1, 2, 3]
  ```

+ 去除重复的字符串

  ```javascript
  [...new Set('ababbc')].join('')
  // "abc"
  ```

+ `NaN`的问题

  ```javascript
  let set = new Set();
  let a = NaN;
  let b = NaN;
  set.add(a);
  set.add(b);
  set // Set {NaN}
  //在 Set 内部，两个NaN是相等。
  //两个对象总是不相等的
  ```



------

### Set实例的属性和方法

+ Set 结构的实例有以下属性。
  + `Set.prototype.constructor`：构造函数，默认就是`Set`函数。

  + `Set.prototype.size`：返回`Set`实例的成员总数。

+ Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

  + `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。

  + `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。

  + `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。

  + `Set.prototype.clear()`：清除所有成员，没有返回值。

```javascript
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

+ `Array.from`方法可以将 Set 结构转为数组。

  ```javascript
  const items = new Set([1, 2, 3, 4, 5]);
  const array = Array.from(items);
  ```



------

### Set的遍历

+ Set 结构的实例有四个遍历方法，可以用于遍历成员。
  +	`Set.prototype.keys()`：返回键名的遍历器

  +	`Set.prototype.values()`：返回键值的遍历器

  +	`Set.prototype.entries()`：返回键值对的遍历器

  +	`Set.prototype.forEach()`：使用回调函数遍历每个成员
+ `key()` `values()` `entries()`方法的实现
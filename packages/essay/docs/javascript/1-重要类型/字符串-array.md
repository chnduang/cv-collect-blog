## 字符串转换为字符数组的方法

### **1、split() 方法**

常见的转换技术是split字符串方法，但这也是有问题的一种。

通过使用空字符串作为split方法的分隔符，我们可以将字符串转换为字符数组。

```js
const text = "abc";
const chars = text.split('');
console.log(chars);//['a', 'b', 'c']
```

该split方法无法正确处理采用两个代码单元（如表情符号）的字符。下面是一个例子。

```js
const text = "abc😎";
const chars = text.split('');
console.log(chars);//["a", "b", "c", "\ud83d", "\ude0e"]
```

### **2、展开运算符**

展开运算符 ( ...) 允许在需要多个元素（如数组文字）的地方扩展诸如字符串之类的可迭代对象。

这是将字符串扩展为字符数组的示例。正确处理采用两个代码单元的字符。

```js
const text = "abc😎";
const chars = [ ...text ];
console.log(chars);//["a", "b", "c", "😎"]
```

### **3、解构赋值**

解构赋值语法可以将数组或可迭代对象中的值解包为不同的变量。

在解构数组或可迭代对象时，我们可以使用 rest 模式将其剩余部分提取到单个变量中。

```js
const text = "abc😎";
const [ ...chars ] = text;
console.log(chars);//["a", "b", "c", "😎"]
```

### **4、Array.from**

Array.from辅助创建从阵列状或迭代的对象的新数组。字符串既可迭代又类似于数组，因此，可以成功地将其转换为字符数组。

```js
const text = "abc😎";
const chars = Array.from(text);
console.log(chars);//["a", "b", "c", "😎"]
```

**重点说明**

该split方法可能是将字符串转换为字符数组的常用方法，但它不处理采用两个代码单元的字符。

我们可以使用对象字面量中的扩展运算符、使用数组解构赋值语法中的剩余模式或Array.from实用程序将字符串正确转换为字符数组。
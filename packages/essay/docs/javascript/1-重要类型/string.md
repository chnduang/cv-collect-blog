## String 

### String.raw()

> ES6 还为原生的 String 对象，提供了一个`raw()`方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

```javascript
String.raw`Hi\n${2+3}!`;
// 返回 "Hi\\n5!"

String.raw`Hi\u000A!`;
// 返回 "Hi\\u000A!"
```

+ 如果原字符串的斜杠已经转义，那么`String.raw()`会进行再次转义。

  ```javascript
  String.raw`Hi\\n`
  // 返回 "Hi\\\\n"
  
  String.raw`Hi\\n` === "Hi\\\\n" // true
  ```



### String中新增的实例方法

#### 确定一个字符串是否包含在另一个字符串中

+ **indexOf**

- **includes()**：返回布尔值，表示是否找到了参数字符串。

- **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。

- **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

  ```javascript
  let s = 'Hello world!';
  
  s.startsWith('world', 6) // true
  s.endsWith('Hello', 5) // true
  s.includes('Hello', 6) // false
  ```

#### repeat()

> `repeat`方法返回一个新字符串，表示将原字符串重复`n`次。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

+ 参数如果是小数，会被取整

  ```javascript
  'na'.repeat(2.9) // "nana"
  ```

+ 如果`repeat`的参数是负数或者`Infinity`，会报错。

  ```javascript
  'na'.repeat(Infinity)
  // RangeError
  'na'.repeat(-1)
  // RangeError
  ```

+ 参数`NaN`等同于 0。

  ```javascript
  'na'.repeat(NaN) // ""
  ```

+ 如果`repeat`的参数是字符串，则会先转换成数字。

  ```javascript
  'na'.repeat('na') // ""
  'na'.repeat('3') // "nanana"
  ```
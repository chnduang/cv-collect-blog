# Slice

> [Array.prototype.slice() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
>
> [https://es6.ruanyifeng.com/#docs/function](https://es6.ruanyifeng.com/#docs/function)

## 类数组转化

> 实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的`arguments`对象

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// es5:
Array.prototype.slice.call(arguments);

Array.prototype.concat.apply([], arguments)

[].slice.call(arguments);
// es6
Array.from(arguments);

```

![image-20220511142320436](https://gitee.com/qdzhou/img-upload/raw/master/images/202205111423698.png)

```js
const unBoundSlice = Array.protoType.slice;
const sliceToArr = Function.protoType.call.bind(unBoundSlice);

function argList() {
  return sliceToArr(arguments)
}
```


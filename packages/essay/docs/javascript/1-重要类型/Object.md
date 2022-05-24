### 对象的扩展以及新增的方法

#### Object.assign()

> 此方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象

+ 简单使用方法

  + ```javascript
    Object.assign(target,source1,source2);
    ```

+ **注意**

  + 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

    + ```javascript
      const target = { a: 1, b: 1 };
      const source1 = { b: 2, c: 2 };
      const source2 = { c: 3 };
      
      Object.assign(target, source1, source2);
      target // {a:1, b:2, c:3}
      ```

  + 如果只有一个参数，`Object.assign`会直接返回该参数


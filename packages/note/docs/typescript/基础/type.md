
### TypeScript的基础类型

> typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型
> 但由于最终会将ts结尾的文件编译成浏览器能识别的js文件，所以类型写错误不会影响最终的编译结果，但是ts会给我们报错误

+ 数字类型（number）

+ 字符串类型(string)

+ 布尔类型(boolean)

+ 数组类型（array）

+ 元组类型（tuple）

+ 枚举类型（enum）

  

+ 任意类型（any）

+ null 和 undefined

+ void类型

+ never类型



#### 类型校验

对于定义的变量和函数以及函数的返回值都需要规定其类型；和其他语言一样，使得定义的变量更加严谨，在变量其后增加其类型；

#### number、string、boolean

```ts
let num: number = 12;
/*
*如果定义的变量是
num:number= 'number'；
则会报错
*/

let str: string = 'string';
/**
 和number一样
*/

let bool: boolean = false;
```



#### 数组Array

```ts
//定义数组的方式

// 1.第一种定义数组的方式
let arr: number[] = [11, 22, 33];
console.log(arr);

//2.第二种定义数组的方式
let arr2: Array<number> = [11, 22, 33];
console.log(arr2);

//3、第三种
let arr3: any[] = ["131214", 22, true];
console.log(arr3);

```



#### 元组Tuple

属于数组的一种

```ts
let tuple:[Number,String] = [12,'tuple'];
```



#### 枚举

枚举类型（enum）

> ​    随着计算机的不断普及，程序不仅只用于数值计算，还更广泛地用于处理非数值的数据。
>
> ​    例如：性别、月份、星期几、颜色、单位名、学历、职业等，都不是数值数据。  
>
> ​    在其它程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。
>
> ​    如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解。
>
> ​    也就是说，事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，
>
> ​    这种方法称为枚举方法，用这种方法定义的类型称枚举类型。

```ts
enum Flag { success=1, error=2 }
let fl: Flag = FLag.success；

enum Color {blue,red,'orange'};
var c:Color=Color.red;
console.log(c);   //1  如果标识符没有赋值 它的值就是下标

enum Color {blue,red=3,'orange'};
var c:Color=Color.red;
console.log(c);   //3

var c:Color=Color.orange;
console.log(c);   //4
```



#### Void

> 当一个函数没有返回值时，你通常会见到其返回值类型是 `void`：

```ts
function fun():void{
 console.log('void');
}

//
function run():number{
  return 123;
}

```



#### Null 和 Undefined

> `undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`
>
> 默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把 `null`和`undefined`赋值给`number`类型的变量。

```ts
var num: number | null | undefined;
num = 1234;
console.log(num);
```



#### Never

`never`类型表示的是那些永不存在的值的类型

> `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never`类型，当它们被永不为真的类型保护所约束时。
>
> `never`类型是任何类型的子类型，也可以赋值给任何类型

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

var a: never;
a = (() => {
  throw new Error("错误");
})();
```



#### 类型断言

有两种形式

**在TypeScript里使用JSX时，只有 `as`语法断言是被允许的。**

+ ```typescript
  let someValue: any = "this is a string";
  
  let strLength: number = (<string>someValue).length;
  ```

+ ```ts
  let someValue: any = "this is a string";
  
  let strLength: number = (someValue as string).length;
  ```

  
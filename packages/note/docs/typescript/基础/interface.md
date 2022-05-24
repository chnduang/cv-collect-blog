### TypeScript中的接口

> 使用接口来定义对象的类型
>
> 行为的抽象，不具体实现

+ 属性类接口
+ 函数类型接口
+ 可索引接口
+ 类类型接口
+ 接口扩展

#### 属性类接口

**接口的作用：**

在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

**行为和动作的规范，对批量方法进行约束**

```ts
 //就是传入对象的约束    属性接口
interface FullName{
    firstName:string;   //注意;结束
    secondName:string;
}

function printName(name:FullName){
//必须传入对象  firstName  secondName
	console.log(name.firstName+'--'+name.secondName);
}
//printName('1213');  //错误
 var obj={   /*传入的参数必须包含 firstName  secondName*/
    age:20,
     firstName:'张',
    secondName:'三'
 };
// printName(obj)
```

##### 接口 ：可选属性

```ts
interface FullName{
    firstName:string;
    secondName:string;
}

function getName(name:FullName){
    console.log(name)
}
//参数的顺序可以不一样
getName({
    secondName:'secondName',
    firstName:'firstName'
})

//可传入一个参数
interface FullName{
    firstName:string;
    secondName?:string;
}

function getName(name:FullName){

    console.log(name)
}
getName({
    firstName:'firstName'
})


//接口ajax
interface Config {
  type: string;
  url: string;
  data?: string;
  dataType: string;
}

//原生js封装的ajax
function ajax(config: Config) {
  var xhr = new XMLHttpRequest();
  xhr.open(config.type, config.url, true);
  xhr.send(config.data);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("chengong");

      if (config.dataType == "json") {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(xhr.responseText);
      }
    }
  };
}
```

##### 接口：只读属性

> 一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly`来指定只读属性

```ts
interface Point{
    readonly x: number;
    readonly y: number;
}

let p: Point = { x: 10, y:20}

//TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
let arr: number[] = [1,2,3,4];
let newArr: ReadonlyArray<number> = arr;

//创建只读性数组，创建后不可被修改
//error:
newArr[1] = 1;
newArr.length = 10;
newArr.push(4);
arr = newArr;

//上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
arr = newArr as number[];
```

#### 额外的属性检查

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return 
}
//没有colour属性，会报错
let mySquare = createSquare({ colour: "red", width: 100 });

//绕过报错
//1.使用类型断言
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

//2.最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性。 如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它：
interface SquareConfig{
    color?: string;
    width?: number;
    [propName:string]: any;
}

//3.将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错。
let createOptions = { colorrr: 'red',width: 20 };
let mySquare = createSquare(createOptions); 
```



#### 函数类型接口

> 接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
>
> 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
//
interface Func{
    (source: string, substr: string): boolean;
}
let myFunc: Func;
//传入的参数可以不用接口中的一样，但是类型需要时一样的
myFunc = function(src: string, subs: string) {
	let res = src.search(subs);
    return result > -1;
}


// 加密的函数类型接口
interface encrypt{
    (key:string,value:string):string;
}

var md5:encrypt=function(key:string,value:string):string{
    //模拟操作
    return key+value;
}
console.log(md5('name','zhangsan'));

var sha1:encrypt=function(key:string,value:string):string{
    //模拟操作
    return key+'----'+value;
}
console.log(sha1('name','lisi'));
```



#### 可索引接口

```ts
//可索引接口 对数组的约束
interface UserArr{
   [index:number]:string
}
var arr:UserArr=['aaa','bbb'];
console.log(arr[0]);

// var arr:UserArr=[123,'bbb'];  /*错误*/
// console.log(arr[0]);

//可索引接口 对对象的约束
interface UserObj{

   [index:string]:string
 }
var arr:UserObj={name:'张三'};
```



#### 类类型接口

```ts
//类类型接口:对类的约束  和   抽象类抽象有点相似    

interface Animal{
    name:string;
    eat(str:string):void;
}

class Dog implements Animal{
    name:string;
    constructor(name:string){
        this.name=name;
    }
    eat(){
    	console.log(this.name+'吃粮食')
    }
}

var d=new Dog('小黑');
d.eat();

class Cat implements Animal{
    name:string;
    constructor(name:string){
        this.name=name;
    }
    eat(food:string){
        console.log(this.name+'吃'+food);
    }
}
var c=new Cat('小花');
c.eat('老鼠');


//
interface interConstructor{
    new (eating: string, food: string ): 
}

interface interInterface{
    eat();
}

function createEat(ct: interConstructor, eating: string ,food: string): interInterface{
    return new ct(eating , food);
}

class Dog implements interInterface {
    constructor(eating:string,food: string){}
    eat(){
        console.log('eating eating')
    }
}

class Cat implements interInterface{
    constructor(eating: string, food: string){}
    eat(){
        console.log('cat cat eating');
    }
}

let dog = createEat(Dog,'dong','dong');
let cat = createEat(Cat,'cat','cat');

function createEat()

```


# TypeScript 泛型

> 泛型：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
>
> 在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

+ 泛型的定义
+ 泛型函数
+ 泛型类
+ 泛型接口

#### 不使用泛型对于多个返回类型的处理

```ts
//同时返回 string类型 和number类型  （代码冗余）
function getData1(value:string):string{
 	return value;
 }
    
function getData2(value:number):number{
    return value;
}
//当然 可以使用:any解决
function getData3(value:any):any{
    return value;
}

//当使用any的时候就相当于放弃了类型检查,传入什么 返回什么。比如:传入number 类型必须返回number类型  传入 string类型必须返回string类型

```

#### 可以支持不特定的数据类型   

> 要求：传入的参数和返回的参数一样
>
> T表示泛型，具体什么类型是调用这个方法的时候决定的

```ts
function get<T>(value:T):T{
    return value;
}

get<number>(12);
get<string>('str');
//前后类型不能不同,
get<number>('str');
```

#### 泛型简单实例：

> 最小堆算法，需要同时支持返回数字和字符串 a  -  z两种类型

```ts
class MinNum<T>{
    public list: T[] = [];
    add(value: T): void{
        this.list.push(value);
    }
    min(): T{
        let min = this.list[0];
        for(let i=0; i< this.list.length; i++){
            if(min > this.list[i]){
                min = this.list[i];
            }
        }
        return min;
    }  
}

let num1 = new MinNum<number>();
num1.add(19);
num1.add(2);
num1.add(10);
console.log(num1.min());

let str1 = new MinNum<string>();
str1.add('h');
str1.add('t');
str1.add('a');
```

#### 泛型接口

```ts
interface ConfigFn<T>{
	(value:T): T;
}
function get<T>(value:T):T{
	return value;
}
let myGet:ConfigFn<string> = get;
myGet('20');
```

#### 把类作为参数来约束数据传入的类型

```ts
class User{
    username: string | undefined;
    password: string | undefined;
}
class DB{
    add(user: User): boolean{
        console.log(user);
        return true;
    }
}
let user = new User();
user.username = 'username';
user.password = 'password123';
let db = new DB();
db.add(user);

```

#### 使用泛型封装

```ts
interface DB<T>{
	add(info:T):boolean;
	update(info:T,id:number):boolean;
	delete(id:number):boolean;
	get(id:number):any[];
}
class MysqlDb<T> implements DB<T>{
    constructor(){
        console.log('泛型');
    }
    add(info:T):boolean{
        console.log('info')
        return true;
    }
    update(info:T,id:number):boolean{
        thrown new Error('update methods');
    }
    delete(id:number):boolean{
        throw new Error('delete methods');
    }
    get(id:number): any[]{
        let list = [
            {
                title: 'title',
                desc: 'desc'
            },
            {
                title: 'title',
                desc: 'desc'
            },
            {
                title: 'title',
                desc: 'desc'
            }
        ]
        return list;
    }
    
}
class User{
    username: string | undefined;
    password: string | undefined;
}
let user = new User();
user.username = 'username';
user.password = 'pass123';
let db = new MysqlDb();
db.add(user);
console.log(db.get(4));
```
















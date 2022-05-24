## TypeScript 类

### TypeSript 类的继承

> 和es6中的继承相似

```ts
class Person {
    name : string;
    constructor(name: string){
        this.name = name;
    }
    run(): string{
       return `${this.name}在running`
    }
}
class P extend Person {
    constructor(name: string){
    	super(name);
    }
    run(): string{
        return `${this.name}在运动`
    }
    work(): string{
        return `${this.name}在工作`
    }
}

let person =  new Person('张三');
alert(person.run());
alert(person.work());
//在父类中定义的方法，如果子类没有重写，
//那么实例化子类的时候就会使用父类的方法
//如果子类中有定义相同的方法，则会使用子类中的方法
```



### TypeScript 类的修饰符

> typescript里面定义属性的时候提供了三种修饰符

+ public :公有          在当前类里面、 子类  、类外面都可以访问
+ protected：保护类型    在当前类里面、子类里面可以访问 ，在类外部没法访问
+ private ：私有         在当前类里面可以访问，子类、类外部都没法访问
+ 属性如果不加修饰符 默认就是 公有 （public）

#### public , protected, private

```ts
    class MyPerson{
        public name: string;
        protected age: number;
        private gender: string;
        constructor(name: string, age: number, gender: string){
            this.name = name;
            this.age = age;
            this.gender = gender;
        }
        nameMethods(): string{
            return `${this.name}在运动`;
        }
        ageMethods(): string{
            return `已经${this.age}`
        }
        genderMethods(): string{
            return `${this.gender}性`
        }
    }

    class Person1 extends MyPerson{
        constructor(name: string, age: number, gender: string){
            super(name,age,gender);
        }
        personName(): string{
            return `${this.name}person1在工作`
        }
        personAge(): string{
            return `person1已经${this.age}`
        }
        personGender(): string{
            return `person1时${this.gender}`
        }
    }
    //父类
    let person = new MyPerson('red',15,'woman');
    console.log(person.name);
    console.log(person.age);
    console.log(person.gender);
    //子类
    let person1 = new Person1('blue',18,'man');
    console.log(person1.personName());
    console.log(person1.personAge());
    console.log(person1.personGender());
```

### TypeScript 类中的只读属性get和只写属性set

> 与ES6中的存值函数 [setter]([http://es6.ruanyifeng.com/#docs/class#%E5%8F%96%E5%80%BC%E5%87%BD%E6%95%B0%EF%BC%88getter%EF%BC%89%E5%92%8C%E5%AD%98%E5%80%BC%E5%87%BD%E6%95%B0%EF%BC%88setter%EF%BC%89](http://es6.ruanyifeng.com/#docs/class#取值函数（getter）和存值函数（setter）))和取值函数[getter]([http://es6.ruanyifeng.com/#docs/class#%E5%8F%96%E5%80%BC%E5%87%BD%E6%95%B0%EF%BC%88getter%EF%BC%89%E5%92%8C%E5%AD%98%E5%80%BC%E5%87%BD%E6%95%B0%EF%BC%88setter%EF%BC%89](http://es6.ruanyifeng.com/#docs/class#取值函数（getter）和存值函数（setter）))相同
>
> 当我们需要对传入的值进行检验时，我们可以使用get和set完成；
>
> 可以使我们不用做太多的if和else的语句

```typescript
//typescript官网示例
let passcode = "secret passcode";
class Employee {
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}
let employee = new Employee();
//其实时在执行set中的fullName的方法
employee.fullName = "Bob Smith";

//执行只读get的fullName，获取set中所写进的数据
if (employee.fullName) {
    alert(employee.fullName);
}
```

### TypeScript中的抽象类：

> 它是提供其他类继承的基类，不能直接被实例化。

+ 用abstract关键字定义抽象类和抽象方法，
+ 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
+ 抽象类和抽象方法用来定义标准 。  
+ 标准：Animal 这个类要求它的子类必须包含eat方法

```ts
abstract class Animal {
    constructor(public name: string){
        this.name = name;
    }
    eating(): void{
        console.log('department name:'+ this.name);
    }
    abstract barking(): void{
        
    }//必须要在派生类中实现
}

class Dog extends Animal {
    constructor(){
        super('animal')
    }
    barking(): void{
        console.log('barking');
    }
    other(): void{
        console.log('other')
    }
}
//animal = new Animal()    //错误：不能创建抽象类的实例
let animal: Animal = new Dog();   //创建一个抽象类型的引用，并对抽象子类进行实例化和赋值
animal.eating();
animal.barking();  
animal.other()  //错误。方法在声明的抽象类中不存在


```



##### 类作为接口使用

> 类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```ts
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```






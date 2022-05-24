

## `class`的基本语法和继承

### class的基本语法

> 类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。
>
> 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。
>
> 与 ES5 一样，类的所有实例共享一个原型对象。

#### class表达式

+ 与函数一样，类也可以使用表达式的形式定义。需要注意的是，这个类的名字是`Me`，但是`Me`只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用`MyClass`引用

  ```javascript
  const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  };
  ```

+ `Me`只在 Class 内部有定义。

  如果类的内部没用到的话，可以省略`Me`，也就是可以写成下面的形式

  ```javascript
  const MyClass = class { /* ... */ };
  ```

+ 采用 Class 表达式，可以写出立即执行的 Class。

  ```javascript
  let person = new class {
    constructor(name) {
      this.name = name;
    }
  
    sayName() {
      console.log(this.name);
    }
  }('张三');
  person.sayName(); // "张三"
  ```

#### constructor方法

> `constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

#### 静态方法

> 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

+ ```javascript
  class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  Foo.classMethod() // 'hello'
  
  var foo = new Foo();
  foo.classMethod()
  // TypeError: foo.classMethod is not a function
  ```


#### **super**

+ `super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

  + 作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。

  ```javascript
  class A {
    constructor() {
      console.log(new.target.name);
    }
  }
  class B extends A {
    constructor() {
      super();
    }
  }
  new A() // A
  new B() // B
  //new.target指向当前正在执行的函数。可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说，super()内部的this指向的是B。
  ```

+ `super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

  + 由于`super`指向**父类的原型对象**，所以**定义在父类实例上的方法或属性**，是无法通过`super`调用的。

  + 如果**属性定义在父类的原型对象上**，`super`就可以取到。

  + 在子类普通方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例。

    ```javascript
    class A {
      constructor() {
        this.x = 1;
      }
      print() {
        console.log(this.x);
      }
    }
    class B extends A {
      constructor() {
        super();
        this.x = 2;
      }
      m() {
        super.print();
      }
    }
    let b = new B();
    b.m() // 2
    //此时print方法中的this是指向当前子类也就是B的this
    //super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类B的实例
    ```

    + 由于`this`指向子类实例，所以如果通过`super`对某个属性赋值，这时`super`就是`this`，赋值的属性会变成子类实例的属性。

      ```javascript
      class A {
        constructor() {
          this.x = 1;
        }
      }
      class B extends A {
        constructor() {
          super();
          this.x = 2;
          super.x = 3;
          console.log(super.x); // undefined
          console.log(this.x); // 3
        }
      }
      let b = new B();
      //super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
      ```

  + **`super`作为对象，用在静态方法之中，这时`super`将指向父类，而不是父类的原型对象。**

    ```javascript
    //super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
    class Parent {	
      static myMethod(msg) {
        console.log('static', msg);
      }
    
      myMethod(msg) {
        console.log('instance', msg);
      }
    }
    
    class Child extends Parent {
      static myMethod(msg) {
        super.myMethod(msg);
      }
    
      myMethod(msg) {
        super.myMethod(msg);
      }
    }
    Child.myMethod(1); // static 1
    
    var child = new Child();
    child.myMethod(2); // instance 2
    ```

  + 在子类的静态方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的子类，而不是子类的实例。

    ```javascript
    //静态方法B.m里面，super.print指向父类的静态方法。这个方法里面的this指向的是B，而不是B的实例。
    class A {
      constructor() {
        this.x = 1;
      }
      static print() {
        console.log(this.x);
      }
    }
    class B extends A {
      constructor() {
        super();
        this.x = 2;
      }
      static m() {
        super.print();
      }
    }
    B.x = 3;
    //指向B类
    B.m() // 3
    ```

  + 

    
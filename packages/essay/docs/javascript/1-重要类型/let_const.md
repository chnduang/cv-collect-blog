

### let和const

> 这是ES6中新增的命令，和一直所用的`var`类似。但是有所不同的是对于所声明的变量只是在`let`声明变量所在的代码块有效。
>
> 这两个变量的出现，也让JavaScript语言更加严谨。同其他编程语言相比，变量的声明

+ 使用var声明变量的问题

  + 如果重复声明同一个变量，不会有任何的报错和警告。
    + 对于其他的编程语言这种重复同一个变量的声明是不允许的
  + 没有办法限制它的修改
  + 没有块级作用域
    + 对比其他语言来说，ES6之前，JavaScript都是只有全局作用域和函数作用域的，没有块级作用域。这就会导致①：内层变量可能会覆盖外层变量。②：用来计数的循环变量泄露为全局变量。

+ let和const

  + 不能重复声明
  + 都是块级作用域，块内声明的，快外无效
  + let是变量，可以修改
  + const是常量，不能修改

+ let和var比较代码

  + ```javascript
     /*
                var aBtn = document.getElementsByTagName('button')
                for (var i=0; i < aBtn.length; i++) {
                    aBtn[i].onclick = function () {
                        alert(i)
                    }
                }*/
                var aBtn = document.getElementsByTagName('button')
                for (let i = 0; i < aBtn.length; i++) {
                    aBtn[i].onclick = function () {
                        alert(i)
                    }
                }
                /*
                var aBtn = document.getElementsByTagName('button')
                for (var i = 0; i < aBtn.length; i++) {
                    // 封装到函数里，限制作用域
                    (function (i) {
                        aBtn[i].onclick = function () {
                            alert(i)
                        }
                    })(i)
                }*/
            }
    ```


### 变量的解构赋值

> 在ES6中，允许按照一定模式，从数组和对象中提取值，对变量进行赋值，称为解构

+ 相当于是一种模式匹配，只要等号两边模式相同，左边的变量就会被赋予相应的值。

  + ```javascript
    let [a,b,c] = [1,2,3];
    console.log(a,b,c);  //1,2,3
    ```

+ 对对象的解构赋值

  + ```javascript
    let {a,b,c} = {a:'aaa',b:'bbb',c:'ccc'}
    console.log(a)   //aaa
    console.log(b)   //bbb
    console.log(c)	 //ccc
    ```

    
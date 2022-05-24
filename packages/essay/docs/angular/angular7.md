### Angular7~8.x


详情参考： https://www.angular.cn/guide/file-structure
app.module.ts、 组件分析

### app.module.ts

> 定义 AppModule， 这个根模块会告诉 Angular 如何组装该应用。 目前， 它只声明了
> AppComponent。 稍后它还会声明更多组件。



### 自定义组件

> https://cli.angular.io/
> 创建组件：
> ng g component components/header

```tsx
// 组件内容详解：
import { Component, OnInit } from '@angular/core'; /*引入 angular 核心*/
@Component({
    selector: 'app-header', /*使用这个组件的名称*/
    templateUrl: './header.component.html', /*html 模板*/
    styleUrls: ['./header.component.css'] /*css 样式*/
})
export class HeaderComponent implements OnInit { /*实现接口*/
constructor() { /*构造函数*/
}
ngOnInit() { /*初始化加载的生命周期函数*/
}
```

### @input

> @input的作用是定义模块输入，是用来让父级组件向子组件传递内容。 
>
> 以下用示例演示@input的使用

+ 父组件app.component.ts

  ```ts
  import { Component, OnInit } from '@angular/core';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
  })
  export class AppComponent implements OnInit{
    // 传给子组件的变量
    public list: string[] = ['list', 'list1', 'list2'];
  
    ngOnInit() {
      console.log('初始化');
    }
  }
  ```

+ 父组件app.component.html

  ```html
  // 通过属性绑定将变量传给子组件
  <app-life [list]="list"></app-life >
  ```

+ 子组件life.component.ts

  ```ts
  import { Component, OnInit, Input } from '@angular/core';
  
  @Component({
    selector: 'app-life',
    templateUrl: './life.component.html',
    styleUrls: ['./life.component.less']
  })
  export class LifeComponent implements OnInit {
    // 通过@Input 接收变量的值
    @Input() list: string[];
  
    constructor() { }
  
    ngOnInit() {
      console.log(this.list);
    }
  }
  ```

+ 子组件life.component.html

  ```html
  // 使用父组件传的list数组中的值
  <li *ngFor = "let item of list">
    {{item}}
  </li>
  ```

### Renderer2

> Renderer2是angular给我们提供的操作dom的方式，
>
> 这个方式可以防止dom的注入攻击

### @viewChild

> 一个选择器，用来查找引用的dom元素或者组件
>
> 在ngAfterViewInit中可以安全的使用 @ViewChild引用的元素

```html
<div #viewRef></div>
#后viewRef就是给模板或者说是dom元素起的一个引用的名字
让我们能够在组件或者模板中使用
```

##### ElementRef

> 是Dom元素的包装类，因为angular没有dom元素的类，所以需要一个包装类进行包装
>
> 让其能在angular中使用并标识它的类型

#### 使用

+ 引用Dom

```ts
@ViewChild('viewRef',{ static: true }) viewRef: ElementRef

//在子组件初始化完生命周期中 打印值
ngAfterViewInit() {
    console.log(this.viewRef);
}
```

+ 引用模板中的angular组件

  + 在@ViewChild中可以使用引用名，也可以使用组件类型

  ```ts
  @ViewChild('ViewComponent') viewCom:ViewComponent
  ```

### @viewChildren

> 多个子视图

### ngModel（双向数据绑定）

> 实现原理即是: 是绑定value属性，并且监听value值的变化

```html
<input type="text" [value]="username" (input)="username = $event.target.value">
```

+ `[(ngModel)]`

  ```ts
  <input type="text" [ngModel]="username" (ngModelChange)="username = $event.target.value">
  ```

  
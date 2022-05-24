### Angular 内置模块

```

```

### 生命周期

+ **constructor**
  + 构造函数永远首先被调用
+ **ngOnChanges**
  + 输入属性变化时被调用
+ **ngOninit**
  + 组件初始化时被调用
+ **ngDoCheck**
  + 脏值检测时调用
  + **ngAfterContentInit**
    + 内容投影`ng-content`完成时调用
  + **ngAfterContentChecked**
    + `Angular`检测投影内容时候调用（多次）
  + **ngAfterViewInit**
    + 组件视图（子视图）初始化完成时
  + **ngAfterViewChecked**
    + 检测视图变化时（多次）
+ **ngOnDestory**
  + 组件销毁时

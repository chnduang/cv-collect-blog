# flex布局下overflow失效解决方案

> 这里使用经典的两栏布局
>
> 比如说我们想让中间部分自适应并且超出长度出现滚动
>
> dom结构简单如下

```html
<div class="container">
	<div class="left"></div>
	<div class="content">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<div class="right"></div>
</div>
```

##### 样式文件

> 这里就直接使用less写了

+ 这样写并不会出现滚动条

```less
.container {
	display: flex;
	align-item: center;
	.content {
    display: flex;
    flex: 1;
    overflow-x: auto;
  }
}
```

+ 可使用如下方案解决

```less
.container {
	display: flex;
	align-item: center;
	.content {
    display: flex;
    flex: 1;
    overflow-x: auto;
    width: 0;   // 加入width
  }
}
```

+ 当时这个只能解决`justify-content: flex-start`也就是不设置`justify-content`值得时候默认值
+ 当改变`justify-content`值得时候换成`center`或者`flex-end`的时候也是会导致`overflow`不生效

#### 最终解决方案

> 给需要滚动的`dom`外层再套一层`div`
>
> 让外层的`div设置overflow`，不设置`justify-content`
>
> 这种方法也是在避免设置`justify-content`的这个属性值

##### DOM结构变更

```html
<div class="container">
	<div class="left"></div>
	<div class="scroll">   // 新增div
    <div class="content">
      <span></span>
      <span></span>
      <span></span>
    </div>
	</div>
	<div class="right"></div>
</div>
```

##### 样式文件变更

```less
.container {
	display: flex;
	align-item: center;
	.scrolll {
    display: flex;
    flex: 1;
    overflow-x: auto;
    width: 0;   // 加入width
  	padding: 10px 0;
  	margin: -10px 0;  //可根据实际情况自己调整
    
    // 下面是滚动条的样式
    &::-webkit-scrollbar {
      // display: none;  // 不显示滚动条
     	// 若宽高不生效可设置 !important即可
      height: 8px;
      width: 8px;
    }
    // 定义滚动条轨道内阴影+圆角
    &::-webkit-scrollbar-track{
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.2);
      background-color: #fff;
    }
    // 定义滑块内阴影+圆角
    &::-webkit-scrollbar-thumb{
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #7d7d7d;
    }
    
    .content {
      display: flex;
      flex: 1;	// 需要设置
      justify-content: flex-end;
    }
  }
}
```

##### `scrollbar`相关属性说明

```css
::-webkit-scrollbar    //滚动条整体部分
::-webkit-scrollbar-button   //滚动条两端的按钮
::-webkit-scrollbar-track   // 外层轨道
::-webkit-scrollbar-track-piece    //内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-thumb //滚动条里面可以拖动的那个
::-webkit-scrollbar-corner   //边角
::-webkit-resizer   ///定义右下角拖动块的样式
```


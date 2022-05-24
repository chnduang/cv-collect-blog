## Ionic3.x中常用组件的使用

### ion-navbar

> ion-navbar组件在定义上是做为导航栏使用，且附带一个回退按钮。在导航栏内可以包含标题，任意数量的按钮，片段或搜索栏。但该组件必须放置在`<ion-header>`中，以便将它们放置在内容的上方。在官方对该组件的注释中有这么一句话 – 'It's important to note that navbar's are part of the dynamic navigation stack.'，意思是导航栏是动态导航堆栈的一部分，因此如果想使用静态工具栏，可以使用ion-toolbar。

### ionc-toolbar

> ion-toolbar组件做为一个静态工具栏，和ion-navbar不同的是，它可以在应用程序中用作标题，子标题，页脚或甚至子页脚的通用栏。当组件放置在`<ion-header>`或`<ion-footer>`内时，组件固定在其各自的位置上。当放置在`<ion-content>`内时，组件将随内容滚动。

### ion-content

> ion-content是做为页面主体内容组件存在的，在视图组件中应当只有一个ion-content存在。这里主要记录下ion-content的滚动监听用法。

> 对于滚动监听做出的解释，在出于性能方面的考虑，如果你试图绑定一个值到任何滚动事件，它将需要被包裹在一个zone.run（）方法中。
>

```tsx
import { Content } from 'ionic-angular';

export class ScrollPage {
    @ViewChild(Content) content: Content;
constructor(public zone: NgZone) { }

// 组件加载完成，对页面的滑动进行监听
ionViewDidLoad() {
    this.content.ionScroll.subscribe(($event: any) => {
        this.zone.run(() => {
            // 当前滑动的距离
            let top = $event.scrollTop;
            // ... do something eg: change class/layout/hidden/display
        })
    })
}
}
```
#### ion-slides

> ion-slides是一个幻灯片容器组件，和ion-slide幻灯片组件组合使用，容器内可以包含任意数量的幻灯片组件。这里主要讲解下常用属性和切换视图停止播放的问题。

```js
autoplay	number	幻灯片切换时的延迟事件，毫秒级别，未启用该参数则禁止自动播放,默认值为null并且不会自动播放幻灯片。
direction	string	滑动方向：“horizontal”或“vertical”。默认值：horizontal。
effect	string	幻灯片的动画效果。其值可以为slide, fade, cube, coverflow 或者flip。 默认值: slide。
initialSlide	number	初始幻灯片的下标索引。 默认值: 0。
loop	boolean	是否启用循环播放的功能，即播放至最后一张幻灯片后循环到第一张幻灯片
pager	boolean	是否启用分页
paginationType	string	分页的类型，该属性与pager配合使用，若pager未启用，则无效。其值可以为bullets, fraction, progress。默认值：bullets。
speed	number	幻灯片之间的过渡时间，毫秒级别。默认值：300。
zoom	boolean	是否启用缩放功能。
关于幻灯片停止播放的bug，主要有两个触发操作，一个是用户在拖拽滑动幻灯片时，幻灯片会停止播放；另一个则是在进入其他视图，包括tab页的切换，都会触发幻灯片停止播放。这里记录下相应的解决方案及代码。
```

```html
<!-- slides.html -->
<ion-content>
    <!-- 监听幻灯片关闭自动播放事件 -->
    <ion-slides autoplay="3000" speed="300" loop (ionSlideAutoplayStop)="startAutoPlay()">
      <ion-slide>
        <h1>Slide 1</h1>
      </ion-slide>
      <ion-slide>
        <h1>Slide 2</h1>
      </ion-slide>
    </ion-slides>
</ion-content>
```

```tsx
// slides.ts
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

export class SlidesPage {
@ViewChild(Slides) slides: Slides;

// 进入当前视图时启动自动播放  
ionViewDidEnter(){  
    this.startAutoPlay();  
}  

// 离开当前视图时停止自动播放  
ionViewDidLeave(){   
    this.stopAutoPlay();  
}  

// 启动自动播放
startAutoPlay(){
    this.slides.startAutoplay();
}

// 停止自动播放
stopAutoPlay(){
    this.slides.stopAutoplay();
}
}
```
### 常用loading和toast

> 在开发中我们会有很多地方使用loading和toast的地方，
>
> 我们可以将其放在我们使用的公共模块中，使用时直接继承即可

```tsx
import { Loading, LoadingController, ToastController, Toast } from 'ionic-angular';

/**
 * 公用方法的抽象类
 * @export
 * @abstract
 */
export abstract class LoadToast {
    constructor() { }

    /**
     * 通用的展示 loading 的组件
     */
    protected showLoading(loadingCtrl: LoadingController,
        message: string): Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true //页面变化的时候自动关闭 loading
        });
        loader.present();
        return loader;
    }

    /**
     * 通用的展示 toast 的组件
     */
    protected showToast(toastCtrl: ToastController, message: string): Toast {
        let toast = toastCtrl.create({
            message: message,
            duration: 3000, //默认展示的时长
            position: 'bottom'
        });
        toast.present();
        return toast;
    }
}
```

#### 使用时

> 需要引入并且继承
>
> 别忘记super()

```tsx
export class LoginPage extends LoadToast {  
 constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    super(); //调用父类的构造函数 constructor
  }
  login() {
    var loading = super.showLoading(this.loadingCtrl, "登录中...");
    // 消失
    loading.dismiss();
    super.showToast(this.toastCtrl, '提示');
  }
}
```


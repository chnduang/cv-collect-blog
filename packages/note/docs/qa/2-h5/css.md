# CSS

### 盒子模型



### px % em rem

```css
px:
%: 父元素
em: 相当于当前的元素的font-size ,如果当前元素没有，则为父元素的font-size
rem: 根元素html的font-size
vw  屏幕宽度的1%
vh: 屏幕高度的1%

```

### offsetHeight scrollHeight clientHeight

+ offsetHeight
  + border + content + padding
+ clientHeight
  + content+ padding
+ scrollHeight
  + padding 实际内容尺寸

### 重绘repaint 和回流reflow

+ repaint
  + 元素外观改变，颜色，背景色
  + 元素的尺寸和定位不会变，不会影响其他元素的位置
+ reflow
  + 重新计算尺寸和布局，可能会影响其他元素的位置
+ 重排比重绘影响大，避免
  + 回流一定会触发重绘，而重绘不一定会回流

#### 例如

+ 添加或删除可见的DOM元素
+ 元素的位置发生变化
+ 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
+ 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
+ 页面一开始渲染的时候（这肯定避免不了）
+ 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

#### 如何避免

+ 集中修改样式 class
+ 修改之前display: none , 脱离文档流
+ 使用bfc 特性
+ createDocumentFragment 批量操作do m
+ 优化动画， css3 request AnimationFrame
+ 频繁触发的dom操作，使用节流和防抖

### BFC

> BFC（Block Formatting Context）块级格式化上下文，是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器

+ html
+ float
+ display flex grid
+ overflow auto scroll hidden
+ position: absoluted fixed

### 为什么在`<img>`标签中使用`srcset`属性？请描述浏览器遇到该属性后的处理过程

> [https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

需要设计响应式图片

#### srcset

+ 定义了我们允许浏览器选择的图像集，以及每个图像的大小。

#### sizes

定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择。

所以，有了这些属性，浏览器会：

1. 查看设备宽度
2. 检查 sizes 列表中哪个媒体条件是第一个为真
3. 查看给予该媒体查询的槽大小
4. 加载 srcset 列表中引用的最接近所选的槽大小的图像


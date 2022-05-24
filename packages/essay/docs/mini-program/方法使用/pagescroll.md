# pagescroll替代方案

防抖

 https://blog.csdn.net/qq_41080490/article/details/80267742 

 https://www.cnblogs.com/zhensg123/p/9089544.html 

```js
_pageScroll({ topDistance, time = 1000}) {
    tt.pageScrollTo({
        scrollTop: topDistance,
        duration: 1000
    });
    _timer = setTimeout(() => {
        this.data.navStatus = true;
    },1100);
},
```


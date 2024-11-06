# 剑指Offer09-用两个栈实现队列-简单

> [https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

![image-20220110165501769](https://gitee.com/qdzhou/img-upload/raw/master/images/202201101655722.png)



## 我的解答

> 一个入队栈只用来往里塞值，一个出队栈用来接收入队栈中pop出来的值，
>
> 最终用出队栈出栈实现队列的删除队列头操作

```js
var CQueue = function() {
    // 入队栈
    this.pushStack = [];
    // 出队栈
    this.popStack = [];
};

/** 
 * @param {number} value
 * @return {void}
 */

// 所有入队操作都在 pushStack栈中完成
CQueue.prototype.appendTail = function(value) {
    this.pushStack.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    // 队列中没有元素 -1
    if(!this.pushStack.length && !this.popStack.length) {
        return -1;
    }
    // 出队栈中无值，从入队栈中取
    if(!this.popStack.length) {
        while(this.pushStack.length) {
            this.popStack.push(this.pushStack.pop())
        }
    }
     
    // 出队栈中有值 直接出栈
    return this.popStack.pop()

};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```



## 官方解答

> [https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/solution/mian-shi-ti-09-yong-liang-ge-zhan-shi-xian-dui-l-3/](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/solution/mian-shi-ti-09-yong-liang-ge-zhan-shi-xian-dui-l-3/)



## 优质解答

+ [腾讯&剑指offer09：用两个栈实现队列 · Issue #34 · sisterAn/JavaScript-Algorithms (github.com)](https://github.com/sisterAn/JavaScript-Algorithms/issues/34)

+ [https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/solution/javascriptjie-leetcodeyong-liang-ge-zhan-shi-xian-/](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/solution/javascriptjie-leetcodeyong-liang-ge-zhan-shi-xian-/)

  ```js
  var CQueue = function() {
      this.stack1 = []
      this.stack2 = []
  };
  CQueue.prototype.appendTail = function(value) {
      this.stack1.push(value)
  };
  CQueue.prototype.deleteHead = function() {
      if(this.stack2.length) {
          return this.stack2.pop()
      }
      if(!this.stack1.length) return -1
      while(this.stack1.length) {
          this.stack2.push(this.stack1.pop())
      }
      return this.stack2.pop()
  };
  ```

+ [https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/solution/mian-shi-ti-09-yong-liang-ge-zhan-shi-xian-dui-l-2/](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/solution/mian-shi-ti-09-yong-liang-ge-zhan-shi-xian-dui-l-2/)
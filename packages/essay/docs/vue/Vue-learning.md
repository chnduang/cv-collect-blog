

### Vue基础知识点：

1:全局的代表`Vue.`的

2:实例的代表`this.`或者`new Vue().`

3:选项代表`new Vue()`的参数或者`export default`里边的属性

### 生命周期：

> 生命周期函数就是`vue`实例在某个时间点会自动执行的函数
>
> beforeCreate created beforeMount mounted beforeDestroy destroyed  befroeUpdate updated

+ beforeMount：页面还没被渲染

+ mounted: 页面已经被渲染完毕
+ vue实例销毁：
  + 需要调用  vm.$destroy() 方法
  + beforeDestroyed：即将被销毁
  + destroyed: 销毁完成

### 过滤器

+ `content`|过滤器,vue中没有提供相关的内置过滤器，可以自定义过滤器。

+ 组件内的过滤器 + 全局过滤器

  + 组件内的过滤器就是`options`中的一个`filters`的属性（一个对象）

    + 对个`key`就是不同的过滤器名，多个`value`就是与`key`对应的过滤方式函数体

  + ```javascript
    Vue.filter('myFilter',function(){
    
    })
    ```

  + 全局：范围大，如果出现同名时，权力小

  + 组件内：如果出现同名时，权力大，范围小

### 路由 vue-router

##### 前端路由核心：

> ​	锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据

##### ui-router：

> ​	锚点值的改变，如何获取模板

##### vue中：

> ​	模板数据不是通过ajax请求来的，而是通过函数获取模板内容

+ 核心：锚点值的改变

+ 看到`vue`开头，需要使用`Vue.use`

+ 核心插件：

  + vue-router   路由
  + vuex   管理全局共享数据

+ 使用方式：

  + 下载

    ```shell
    npm install vue-router --save
    ```

  + 在main.js中引入

    ```javascript
    import VueRouter from 'vue-router'
    ```

  + 安装插件`Vue.use(VueRouter)`

  + 创建路由对象并配置路由规则

    ```javascript
    let router = new VueRouter({
     	routes:[{path:'/home',component:home}]
    });
    ```

  + 将其路由对象传递给Vue的实例，options中加入 router:router

  + 留坑`<router-view></router-view>   `

+ **命名路由**

  - 使用router-link标签

    ```javascript
    <router-link :to="{name:'where'}">去哪里</router-link>
    //更利于维护，如果修改了path 只修改路由配置中的path,该a标签会根据修改的值自动修改。
    ```

  - 在vue-router中，有两大对象被挂载到了实例this

    - $route:只读，具备信息的对象
    - $router :具备功能函数

  - 查询字符串

    - 去哪里：

      ```javascript
      <router-link :to="{name:'detail',query:{id:1}}">
      ```

    - 导航（查询字符串path不用改）

      ```javascript
      {name:'detail',path:'/detail'，组件}
      ```

    - 去了干嘛，获取路由参数（要注意的是query还是params和对应id名）

      - `this.$route.query.id`

  - path方式

    - 去哪里：

      ```javascript
      <router-link :to="{name:'detail',query:{name:1}}">
      ```

    - 导航（path 方式需要在路由规则上加上 /:xxx）

      ```javascript
      {name:'detail',path:'/detail/:name'，组件}
      ```

    - 去了干嘛，获取路由参数（要注意的是query还是params和对应id名）

      - `this.$route.param.name`

+ **编程式导航**

  + 不能保证用户一定会点击某些按钮

  + 并且当前操作，除了路由跳转之外，还有一些别的附加操作

  + this.$router.go 根据浏览器记录 前进1 后退-1

  + this.$router.push（直接跳转到某个页面显示）

    + push 参数：字符串   /xxx

    + 对象

      ```javascript
      {name:'xxx',query:{id:1},params:{name:2}}
      ```

+ **重定向和404**

  + 进入后，默认就是/

  + 重定向
  
    ```javascript
  {path:'/',redirect:'/home'}
  {path:'/',redirect:{name:'home'}}
    ```
  
  + 404: 在路由规则的最后一个规则

    + 写一个匹配
  
    ```javascript
      {path:'*',component:notFoundVue}
    ```
  
+ **嵌套路由**

  + 用单页去实现多页应用，复杂的嵌套路由
  
+ 开发中一般会需要使用
  
  + 试图包含视图
  
+ **路由父子级关系路由**
  
  ```javascript
    {name:'music',path:'/music',component:Music,
   children:[
     		//子路由的path /就是绝对路径   不用/ 就是相对父级路径
     		{name:'child1',path:'child1',component:Child1},
   		{name:'child2',path:'child2',component:Child2}
       
   ]}
  ```

+ **axios**

  + ```javascript
    import Axios from 'axios';
    //给Vue原型挂载一个属性
    Vue.prototype.$axios = Axios;
    ```

  + post请求的时候，如果数据是字符串，默认头就是键值对，否则对象就是application/json

  + this.$axios.get(url,options)

  + this.$axios.post(url,data,options)

  + options:{params:{id:1} //查询字符串， headers:{'content-type':'xxxxx'}}

  + 全局默认设置：Axios.defaults.baseURl = 'xxxx';

  + 针对当前这一次请求的相关设置


    ```js
    this.$axios.post('http://127.0.0.1/api','content=post api')
    ```

  + 合并请求

    + axios.all([请求1，请求2])
    + 分发响应   axios.spread(fn)
    + fn: 对应参数和请求的顺序一致
    + 执行特点：只要有一次失败就算失败，否则成功。必须保证两次请求都成功。



  + 拦截器

    + 过滤，在每一次请求与响应中，添加东西
    + axios.interceptors.request.use(fn)  在请求之前
    + function(config) { config.headers = {xxxx}}  config 相当于options对象
    + 默认设置 defaults 范围小，权力小
    + 单个请求的设置options get(url ,options) 范围小，权力中
    + 拦截器  范围广，权力大，
  

  + 拦截器的loading应用


  + 监视（watch）

    + watch 可以对（单个）变量进行监视，也可以深度监视
    + 简单数据类型

    + 复杂的数据类型

    + 如果需求是对于10个变量进行监视？
      + 计算属性computed可以监视多个值，并且指定返回数据，并且可以显示在页面
      + 都是options中的跟属性
        + watch 监视单个
        + computed 可以监视多个this相关属性值的改变，如果和原值一样则不会触发函数的调用，并且可以返回对象。



  + token(扩展)

    + cookie 和 session 的机制，cookie自动带一个字符串
    + cookie只在浏览器
    + 移动端原生应用，也可以使用http协议，
      + 可以加自定义的头，原生应用没有cookie
    + 对于三端来讲，token可以作为类似cookie的使用，并且可以通用
    + 拦截器可以用在添加token上

+ **vue-resource**

  + `options` 预检请求，是当浏览器发现跨域 + application/json的请求，就会自动发起并且发起的时候携带了一个content-type的头
  
+ 在`created(){}`中
  
  ```js
    this.$http.post('http://127.0.0.1/api/',
  		{
    			content: 'post api'
    		},{
    			emulateJSON: true
    		})
    		.then(res=>{
    			this.data = res.body.message;
    		},err=>{
    			console.log(err);
    		})
  ```
  
  
  
  
  




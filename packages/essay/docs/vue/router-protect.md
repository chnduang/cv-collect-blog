### vue-router

+ 导航守卫

+ 在入口文件中创建路由

  ```javascript
  import Router from 'vue-router'
  Vue.use(Router)
  const router = createRouter()
  
  //路由钩子
  router.beforeEach((to, from, next) => {
      //console.log('before each invoked')
      next()
      //可用于验证登录
      //跳转之前
      if(to.fullPath === '/app'){
      //和路由中的传参一样，可在next中进行传值
          next({path: '/login'})
      }else{
          next()
      }
  })
  router.beforeResolve((to, from, next)=>{
      //console.log('before resolve invoked')
  	next()    
  })
  router.afterEach((to, from, next)=>{
      //console.log('after each invoked')
  })
  ```

+ 路由配置项中的钩子

  ```javascript
  /*
  *使用异步加载组件的方式，提升加载的速度
  *需要安装插件： babel-plugin-syntax-dynamic-import 
  *在.babelrc中加入 "plugin":[
  						"syntax-dynamic-import"
  					]
  */
  component: ()=> import('../component')
  meta:{	
   title: 'this is app',
   description: 'demo'
  },
  beforeEnter(to, from, next){
      console.log('app route before enter')
      next()
  }
  ```

+ 组件内部增加钩子

  ```javascript
  beforeRouteEnter(to,from,next){
  	console.log('todo before enter')
      //一般用于数据获取
  	next(vm=>{
          console.log('after enter vm.id is',vm.id)
      })
      
  }
  beforeRouteUpdate(to,from,next){
  	console.log('todo update enter')
  	next()
  }
  beforeRouteLeave(to,from,next){
  	console.log('todo leave enter')
      //可用于判断
      if(global.confirm('sure?')){
          next()
      }
  }
  ```

+ 钩子的执行顺序

  ```javascript
  before each invoked
  app route before enter
  todo before enter
  before resolve invoked
  after each invoked
  
  //update在路由中参数改变的时候被触发
  before each invoked
  todo update enter
  before resolve invoked
  after each invoked
  ```

  
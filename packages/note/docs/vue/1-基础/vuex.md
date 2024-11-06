### vuex

+ 基本的`store`创建

  ```javascript
  import Vuex from 'vuex'
  import Vue from 'vue'
  
  Vue.use(Vuex)
  
  const store = new Vuex.Store({
      state:{
          data: 0
      },
      mutations:{
          updateData(state,data){
              state.data = data
          }
      }
  })
  
  export default store
  ```

+ 在入口文件中引进

  ```javascript
  import store from './store/store'
  
  new Vue({
  	router,
  	store,
  	render: (h)=>h(App)
  }).$mount('#app')
  ```
  
+ 在组件中获取store中的数据

  ```javascript
  //data是state中的属性
  this.$store.state.data
  
  1. //修改使用mutations中的方法对state中的值进行修改
  第一个参数是mutations中的方法，第二个参数是修改的值
  this.$store.commit('updateData', data)
  
  2.//使用mapMutation对mutations进行修改
  import {mapMutation} from 'vuex'
    ...mapMutation('updateData',data)
  ```

+ 推荐的store写法

  ```javascript
  export default ()=>{
    return new Vuex.Store({
      state:{
          data: 0
      },
      mutations:{
          updateData(state,data){
              state.data = data
          }
      }
   })
  } 
  
  //在入口文件中
  import Vuex from 'vuex'
  Vue.use(Vuex)
  import createStore from './store/store'
  //创建store
  const store = createStore();
  ```

+ 
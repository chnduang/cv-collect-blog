### 官方文档

https://wendux.github.io/dist/#/doc/flyio/readme 

https://github.com/wendux/fly 

 https://www.cnblogs.com/fuzhengyi/p/9579804.html 

 https://github.com/wendux/fly 

 https://wendux.github.io/dist/#/doc/flyio/readme 

### 简单使用

> 这里演示在`mpvue`中的使用

+ 初始化`flyio`对象

  ```js
  const Fly = require('flyio/dist/npm/wx.js')
  const createFly = () => {
    if (mpvuePlatform === 'wx') {
      return new Fly()
    } else {
      return null
    }
  }
  ```

+ 封装处理get/post请求

  ```js
  const handleError = (err) => {
    console.log(err)
  }
  
  const http = {
    get: (url, params = {}) => {
      const fly = createFly()
      if (fly) {
        return new Promise((resolve, reject) => {
          fly.get(url, params)
            .then(res => resolve(res))
            .catch(err => {
              handleError(err)
              reject(err)
            })
        })
      }
    },
    post: (url, data = {}) => {
      const fly = createFly()
      if (fly) {
        return new Promise((resolve, reject) => {
          fly.get(url, data)
            .then(res => resolve(res))
            .catch(err => {
              handleError(err)
              reject(err)
            })
        })
      }
    }
  }
  
  export default http
  ```

+ 使用

  ```js
  // 导入
  import http from '@/utils/request.js'
  
  http.get('https://').then(res => {
      console.log(res);
  })
  ```

  
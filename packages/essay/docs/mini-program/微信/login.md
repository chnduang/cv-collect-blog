## 小程序login登录前后端实现

### 登录流程图


### 获取临时code

```js
wx.login({
	success: res=> {
		console.log(res);
        const code = res.code;
	}
})
```

### 请求的接口

> 使用koa2
>
> fly.js

```js
const Fly=require("flyio/src/node");
const  jwt = require('jsonwebtoken');
const fly = new FLy;

router.get('/getOpenId', async(ctx, next) => {
    // 请求的时候携带的code
	const code = ctx.query.code;
    // 账号
	const appId = '';
	const appSecret = '';
    // 小程序官方提供的
	const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code
`;
    // 使用flyio进行请求，和axios用法相似
    const result = await fly.get(url);
    if (result) {
        const info = JSON.parse(result.data);
        // 一般会将用户的openId(用户的唯一标识)存入数据库： openId: { username: '' }
        // 自定义登录状态， 根据用户的openId和session_key进行加密生成token，返回给前端请求
        // 使用jsonwebtoken加密 openId,session_key
        const token = jwt.sign(info, 'test_token');
        // token 即是自登录状态
        ctx.body = token;
    }
});
```

### 登录验证

```js
router.get('/checkToken', async(ctx, next) => {
   // 放在请求头中的token
   console.log(ctx.request.header.authorization);
   const token = ctx.request.header.authorization;
   try{
       const result = jwt.verify(token, 'test_token');
       ctx.body = 'success';
   }catch(e){
       ctx.body = e;
   }
});
```

### 发送code

```js
onLaunch() {
    const token = wx.getStorageSync('token');
    if (token) {
        const result = await request('/checkToken',{ token });
        console.log(result);
    } else {
        this.login()
    } 
},
login() {
    wx.login({
	success: async (res) => {
		console.log(res);
        const code = res.code;
        // 使用封装的request
        const result = await request('/getOpenId', { code });
		// 存在localStorage中
        wx.setStorageSync('token', result);
    }
  })
},
checkLogin() {
    
}
```


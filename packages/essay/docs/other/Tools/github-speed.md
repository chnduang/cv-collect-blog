### 修改本地host文件加速访问github

#### 在本地的hosts文件后面直接加上以下配置保存即可

```shell
192.30.253.112 github.com
185.199.108.153 assets-cdn.github.com
185.199.109.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
199.232.5.194 github.global.ssl.fastly.net
```



```
ipconfig /flushdns ，回车后执行刷新本地 DNS 缓存数据即可。
```



```js
207.97.227.239 github.com   
65.74.177.129 www.github.com   
207.97.227.252 nodeload.github.com   
207.97.227.243 raw.github.com  
204.232.175.78 documentcloud.github.com  
204.232.175.78 pages.github.com  
```


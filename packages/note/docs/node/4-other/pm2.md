## pm2

> ##### pm2是一个进程管理工具,可以用它来管理你的node进程，并查看node进程的状态，当然也支持性能监控，进程守护，负载均衡等功能
>

 pm2需要全局安装
`npm install -g pm2`
进入项目根目录
启动进程/应用 `pm2 start bin/www 或 pm2 start app.js`

重命名进程/应用 `pm2 start app.js --name wb123`

添加进程/应用 watch `pm2 start bin/www --watch`

结束进程/应用 `pm2 stop www`

结束所有进程/应用 `pm2 stop all`

删除进程/应用 `pm2 delete www`

删除所有进程/应用 `pm2 delete all`

列出所有进程/应用 `pm2 list`

查看某个进程/应用具体情况 `pm2 describe www`

查看进程/应用的资源消耗情况 `pm2 monit`

查看pm2的日志 `pm2 logs`

若要查看某个进程/应用的日志,使用 `pm2 logs www`

重新启动进程/应用 `pm2 restart www`

重新启动所有进程/应用 `pm2 restart all`


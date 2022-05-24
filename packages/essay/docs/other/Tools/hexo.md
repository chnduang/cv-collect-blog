### Hexo

1.基于node
2.npm包管理工具
3.npm install -g hexo(hexo-cli)
4.下载的资源是国外的可能比较慢
5.淘宝镜像（代理的仓库）
6.npm install -g hexo --registry=https://registry.npm.taobao.org
7.在一个空目录（hexo init）博客系统的初始化
8.hexo\source\_posts md文档就是博客文档
9.如果要写一篇博客（新建文件  xxx.md）
10.把md文档转html文件（hexo g）
11.在自己的服务器预览（hexo s） localhost:4000
12.如果从新生成html文件可能会有缓存 （hexo clean,hexo g）

13.和github关联 推代码到github
14.和git关联 hexo-deploy-git 插件（安装 npm install hexo-deployer-git --save ）
15.和github关联需要配置文件
16.修改文件  _config.yml  在最下面
17.
  type: git
  repo: git@github.com:用户名/用户名.github.io.git
  branch: master

18. 需要在github配置仓库 名称（用户名.github.io）
19. 把代码推到github (hexo d)
20. 只能预览代码 无法预览页面
21. 配置当前仓库可以通过网络访问页面
22. 在仓库的首页  settings--->GitHub Pages-->改选项 Source（none---master branch）
23. 通过 用户名.github.io 访问你的博客
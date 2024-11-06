### Next Nuxt Nest

> Next、Nuxt和Nest。这三个框架都是服务器端渲染，它们分别与React、Vue和Angular(三个目前最流行的前端框架)密切相关

- 我们的比较将基于一下几点：
  - 好处
  - 缺点
  - 性能
  - 社区活跃度

## Next

> Next是一个React框架，允许使用React构建SSR和静态web应用

- 安装

  > next react react-dom是必不可少的

  ```bash
  npm install --save next react react-dom
  ```
  
  > next 将读取page目录下的js文件，并解析成页面路由
  
- 好处

  - 默认情况下，每个组件都是服务器渲染的
  - 自动代码拆分，加快页面加载速度
  - 不加载不必要的代码
  - 简单的客户端路由（基于页面）
  - 基于Webpack的开发环境，支持模块热更新（HMR）
  - 获取数据非常简单
  - 支持任何Node HTTP服务器实现，如Express
  - 支持Babel和Webpack自定义
  - 能够部署在任何能运行node的平台
  - 内置页面搜索引擎优化（SEO）处理

- 缺点

  - Next不是后端服务，应该与后台操作独立开
  - 如果你只想创建一个简单的WEB应用，那么它可能会是牛刀杀鸡
  - 数据会在客户端和服务器重复加载
  - 没有实现前后分离的项目，迁移到Next是一件痛苦的事，可能需要双倍工作

- 性能

  > 性能基于一下两点

  - 1、使用Apache Bench测试吞吐量。
  - 2、使用 lighthouse测试 Preformance、Accessibility、Best Practices、SEO

  lighthouse测试报告中可以看到Preformance、Accessibility、Best Practices、SEO都高于70，虽然比其他两个框架低，但不得不说已经是一个比较好的数据，Best Practices 得分nuxt则是高于其他俩个

- 社区活跃度

  - 贡献者数量：678
  - Pull Requests: 3,029
  - 社区相当活跃

## Nuxt

> Nuxt是一个基于Vue的通用应用框架，预设了利用Vue开发服务端渲染的应用所需要的各种配置，主要关注的是应用的UI渲染

- 安装

  > 为了快速入门，Nuxt.js团队创建了脚手架工具 create-nuxt-app

  ```bash
  // 确保安装了npx（npx在NPM版本5.2.0默认安装了）
  npx create-nuxt-app <项目名>
  ```
  
  它会让你进行一些选择:在集成的服务器端框架如:Express、Koa、Hapi、Feathers、Micro、Adonis (WIP)；选择您喜欢的UI框架:Bootstrap、Vuetify、Bulma、Buefy等等
  
  > Nuxt依据 pages 目录结构自动生成 vue-router 模块的路由配置
  
- 好处

  - 它的主要范围是UI渲染，同时抽象出客户端/服务器分布
  - 静态渲染、前后分离
  - 自动代码分层
  - 服务、模板皆可配置
  - 项目结构清晰
  - 组件与页面无缝切换
  - 默认支持得ES6 / ES7
  - 支持开发热更新
  - 路由级别的异步数据获取
  - 支持静态文件服务
  - 样式预处：Sass，Less，Stylus等

- 缺点

  - 周边资源较少
  - 开发复杂的组件可能会很麻烦
  - 自定义配置显得很麻烦
  - 很多具有副作用的数据操作this.items[key]=value
  - 高流量可能会给服务器带来压力
  - 只能在某些挂钩中查询和操作DOM

- 性能

  > Nuxt中的基本HelloWorld应用。每秒能处理190.05个请求。平均一个请求时间为52.619毫秒。在此度量标准上，Nuxt与其他两个框架相比表现最差

  Lighthouse测试报告中Preformance、Accessibility、SEO三项中得分最高

- 社区活跃

  - 贡献者数量：191
  - Pull Requests：1,385

## Nest

> Nest是一个渐进式Node框架,深受Angular的启发。用于构建高效，可扩展的Node.服务器端应用程序的框架。使用TypeScript构建,保留与纯JS的兼容性，集OOP（面向对象编程）,FP（函数式编程）,FRP（响应式编程）一身。服务引擎盖默认使用Express但也提供与各种其他库的兼容性，例如Fastify，允许轻松使用可用的无数第三方插件

- 安装

  > nest提供cli使用该cli命令安装Nest并创建新项目

  ```bash
  npm i @nestjs/cli
  nest new project-name
  ```
  
- Hello World

  > 使用该npm cli命令创建新项目后,src目录下会出现几个核心文件，main.ts是我们的入口

- 好处

  - 作为基于TypeScript的Web框架，可以进行严格的类型定义
  - 自动生成Swagger文档
  - Nest中的文件夹结构主要基于Angular
  - 基于模块的框架，代码可复用
  - 项目结构清晰,只需要关注业务无需关注架构
  - 使用最新版本的TypeScript，意味着JS的型特性基本都可用
  - 为开发人员提供更少的上下文切换。从Angular代码到Nest的过渡相对容易
  - 与Angular类似，Nest也有一个不错的命令行工具

- 缺点

  - 缺乏文档。该框架与其他框架有很好的集成，但文档很少
  - 背后没有大型企业的支持力
  - 总体而言，与其他框架相比，Nest的社区规模较小

- 性能

  > Nest中的基本HelloWorld应用。每秒能处理928.18个请求。每个请求的平均时间为10.774毫秒。在此指标上，Nest在我们比较的三个框架中表现最佳

  Lighthouse提供的报告中，Nest具有非常高的性能,但是accessibility, best practices,SEO得分较低

  Nest不是最流行的框架但值得一试！

- 社区参与

  - 贡献者数量：81
  - Pull Requests：469

Next, Nuxt, Nest比较就到这里 Preformance、Accessibility、Best Practices、SEO选择你最想要的那个吧
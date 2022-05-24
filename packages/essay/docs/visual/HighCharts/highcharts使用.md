## HighCharts

> Highcharts,了解过的都知道它是一个有很多图表类型的图表库，是使用JavaScript编写的，因此对前端开发者是非常友好的。是具有很强的交互性图表。此次使用Highcharts以及Highstock图表用于展示数据。它对JSON数据格式支持较好，数据处理起来比较方便。便于开发过程中对动态数据的处理以及对图表的样式的处理，Highcharts都提供了相关文档说明以及Demo示例。

**实时数据模块:**

此模块是核心模块，用来实时展示温度数据变化，图表会定时发送请求获取到设备上传最新的数据；实时刷新服务器请求到的新数据，实现动态展示的效果；并且我加入了全屏展示图表以及对图表中的进行数据滚动的效果。

![](https://img-blog.csdnimg.cn/20191109000931661.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1pRRDY2Ng==,size_16,color_FFFFFF,t_70)

**历史数据模块:**

用来展示所有的历史数据，和物联网平台提供的历史数据相似，只是此模块我是展示截至到当天的所有历史记录，是整天的数据。可输入想要查看的时间段，出现该时间段的所有数据，采用的图标和实时数据模块相同。不同的是数据处理以及不同图标对数据传入的格式会要求有所不同。

![](https://img-blog.csdnimg.cn/20191109000944565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1pRRDY2Ng==,size_16,color_FFFFFF,t_70)

**数据预警信息模块:**

可显示当天数据的情况，对数据进行范围划分，超出预警和正常温度使用不同的颜色区块可直观的看出哪些数据是超出预警的，哪些数据是合适的。此图标也会通过定时请求数据从而得到刷新图表，不同的是这仅是重新加载图表，而非动态刷新。

![](https://img-blog.csdnimg.cn/20191109000956786.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1pRRDY2Ng==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/2019110900100778.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1pRRDY2Ng==,size_16,color_FFFFFF,t_70)
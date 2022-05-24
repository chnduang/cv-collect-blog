## Django框架

### 创建与使用

> 使用PyCharm创建django项目

```bash
├── manage.py
└── demo
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

##### 关于上面自动生成的目录与文件解释如下：

- manage.py：
  - 一个命令行实用程序，可以让您以各种方式与此Django项目进行交互。你可以阅读所有的细节 manage.py在Django的管理和manage.py。
- 内部demo/目录是您的项目的实际Python包。
  - 它的名字是您需要用来导入其中的任何内容的Python包名称（例如demo.urls）。
- demo/**init**.py：
  - 一个空的文件，告诉Python这个目录应该被认为是一个Python包。
- demo/settings.py：
  - 此Django项目的设置/配置。 Django设置会告诉你所有关于设置的工作原理。
- demo/urls.py：
  - 该Django项目的URL声明; 您的Django动力网站的“目录”。
- demo/wsgi.py：
  - WSGI兼容的Web服务器为您的项目提供服务的入口点。

#### 运行

运行以下命令：

```bash
python manage.py runserver
```

以上说明已经开始使用Django的开发服务器，这是一个纯粹以Python编写的轻量级Web服务器。 我们将其与Django结合在一起，因此您可以快速开发，而无需处理配置生产服务器（如Apache），直到您准备好生产。

+ 默认情况下，该runserver命令在端口8000的内部IP上启动开发服务器。当然也可以指定端口开启服务,如8080端口：

  ```bash
  python manage.py runserver 8080
  ```

+ 如果要更改服务器的IP，请将其与端口一起传递。例如：

  ```bash
  python manage.py runserver 0:8000
  ```

注意：通过IP访问后报如下错误：

```bash
    DisallowedHost at /polls
    Invalid HTTP_HOST header: '192.168.*.*:8000'. You may need to add '192.168.*.*' to ALLOWED_HOSTS.
    HTTP_HOST标头无效：'192.168.*.*:8000'。您可能需要将“192.168.*.*”添加到ALLOWED_HOSTS
    如：ALLOWED_HOSTS = ['192.168.104.240']
```

#### 创建一个应用程序

> Django自带一个实用程序，可以自动生成应用程序的基本目录结构，因此您可以专注于编写代码而不是创建目录。

+ 要创建您的应用程序，在根目录下，输入

```bash
python manage.py startapp show
```

这将创建一个目录show，其目录如下：此目录结构将容纳轮询应用程序。

```bash
demo/
├── manage.py
├── demo
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── show
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
```

#### 定义s第一个视图

+ 打开文件show/views.py 并放入以下Python代码：

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, python-django")
```

+ 这是Django中最简单的视图。要调用视图，我们需要将其映射到一个URL

+ 在show目录中创建一个urls.py的文件：

```
└── show
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    ├── urls.py
    └── views.py
```

+ 在urls.py中配置urlpatterns

```python
# user/bin/python
# Author:ZQD
# -*- coding: utf-8  -*-
from django.urls import path
from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('test', views.test, name='test')
]
```

+ 将show应用中的url引入，配置文件路径

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('show/', include('show.urls'))
]
```

+ 其中include()函数允许引用其他url。请注意，该include()函数的正则表达式 没有$（字符串匹配字符），而是尾部的斜杠。 每当Django遇到时 include()，它会排除与该点匹配的任何部分，并将剩余的字符串发送到随附的url进行进一步处理。

+ 注：include()当您包含其他网址格式时，您应始终使用。 admin.site.urls是唯一的例外。

+ 运行项目

  ```bash
  python manage.py runserver
  ```

+ 在浏览器中输入`localhost:8000/test/index`
+ 页面显示`Hello, python-django`即在index中写的输出文本内容，说明应用就成功运行了


## 什么是jsp?

- 是一个java类，它继承了 servlet ,所以可以说 JSP 就是 servlet

## 为什么会有JSP？

## jsp用法？

- <%@ 指令名字%>

------



## jsp的三大指令

### page指令：

- pageEncoding       jsp内容编码
- extend     用于指定jsp翻译成java文件后，继承的父类是谁，一般不用改
- import     导包
- session
  - 值可选的只有 `true`和`false`
  - 用在控制在这个jsp页面里面，就能够直接使用`session`对象
  - 具体的区别是，在翻译后的java文件中。
    - 如果是true值   ：那么在代码里面会有`getSession()`方法的调用
    - 如果是false值   ： 那么在代码里面就没有`getSession()`方法，无法使用session
- errorPage
  - 就是错误的页面，值需指定错误的页面路径
- isErrorPage
  - 用于指定错误的时候到哪个页面去
  - 声明一个页面到底是不是错误的页面

### include指令：

- 包含另一个jsp的内容进来

  - ```jsp
    <%@ include file="other.jsp"%>
    ```

- 原理：

  - 把另一个页面的所有内容拿过来一起输出，即所有的标签都包含进来

### taglib指令：

- ```jsp
  <%@ taglib prefix="" uri=""%>
  
  	url: 标签库的名称
  	prefix: 标签库的别名
  ```

------



## jsp的动作标签

- <jsp:include page=""></jsp:include>

  - <jsp:include page="other.jsp"></jsp:include>
  - 包含指定的页面，这里是动态包含，也就是不把包含的页面所有元素标签全部拿过来输出，而是把它的运行结果拿过来

- <jsp:param value=""  name=""></jsp:include>

  - 在包含某个页面的时候，或者在跳转某个页面的时候，加入这个参数

  - ```jsp
    <jsp:forward page="other.jsp">
    	<jsp:param value="beijing" name="address">
    </jsp:forward>
        
     //参数接收
     <%=request.getParameter("address")%>
    ```

- <jsp:forward page=""></jsp:forward>

  - 前往哪一个页面

  - ```jsp
    <%
    	//请求转发
    	request.getRequestDispatcher("other.jsp").forward(request,response);
    %>
    ```

------



## JSP内置对象

> 所谓内置对象，就是我们可以直接在jsp页面中使用这些对象，不用创建

- **四个作用域对象**：
  - pageContext
  - request
  - session
  - application   
- **四个作用域的区别**：
  - pageContext 【PageContext】: 
    - 作用域的值仅限于当前的页面。
  - request 【HttpServletRequest】：
    - 作用域仅限于一次请求，只要服务器对该请求做出了响应，这个域中存的值就没有了
  - session 【HttpSession】：
    - 作用域仅限于一次会话
  - application 【ServletContext】：
    - 整个工程都可以访问，服务器关闭后就不能访问了
- page  【Object】 --- 就是这个jsp翻译成的java类的实例对象
- out  【JspWriter】
- exception  【Throwable】
- config   【ServletConfig】
- response  【HttpResponse】



------

## EL表达式

> 为了简化 jsp 代码，具体就是为了简化在 jsp 里面写的那些 jsp 代码

- 写法格式：

  - ```jsp
    ${表达式}
    ```

- 




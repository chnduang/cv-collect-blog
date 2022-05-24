### Mac中使用brew安装mysql密码丢失重置密码

#### 可以使用`brew`命令查看`mysql`的安装情况

```bash
// 列出所有服务
brew services list
// 查看对应服务信息
brew info mysql@5.7
```

#### 如果配置过环境变量的可以跳过这一步

+ 打开`~/.zshrc`

+ ```shell
  export PATH="/usr/local/opt/mysql@5.7/bin:$PATH"
  ```

#### 暂停`mysql`服务

```shell
brew services stop mysql@5.7
```

#### 安全模式启动`mysql`

+ ```shell
  mysqld_safe --skip-grant-tables &
  ```

+ 进入`mysql`交互模式

+ `mysql`

+ ```shell
  use mysql
  flush privileges;
  ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
  ```

+ 可以验证一下是否有效

+ ```shell
  mysql -uroot -p
  
  > 输入新密码
  ```

#### 启动服务

```shell
brew services start mysql@5.7
```


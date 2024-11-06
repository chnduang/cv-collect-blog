### apt-get安装

```shell
sudo apt-get install mysql-server

// 如果想要指定版本只需要
sudo apt-get install mysql-server-5.7
```

> 安装过程中会有提示输入root的密码，输入两次验证，作为进入mysql的root密码

#### 安装结束

+ 输入`mysql -uroot -p`
+ 输入安装时候设置的root密码
+ 能正常进入即可

#### 设置远程访问

```shell
vim /etc/mysql/mysql.conf.d/mysqld.cnf 
```

+ 注释 `bind-address = 127.0.0.1`

+ 保存退出

#### 执行授权命令

+ 重新执行 `mysql -uroot -p`再次进入`mysql`

+ ```shell
  mysql> grant all on *.* to root@'%' identified by '123' with grant option;
  ```

+ 再刷新

+ ```shell
  flush privileges;
  ```

+ 退出

+ ```shell
  quit
  ```

#### 重启服务

```shell
sudo service mysql restart
```


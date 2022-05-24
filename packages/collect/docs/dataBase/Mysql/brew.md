# brew
```
设置密码：

mysql_secure_installation



运行mysql_secure_installation会执行几个设置：

a)为root用户设置密码

b)删除匿名账号

c)取消root用户远程登录

d)删除test库和对test库的访问权限

e)刷新授权表使修改生效

代码如下：

[root@server1 ~]# mysql_secure_installation

NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MySQL

SERVERS IN PRODUCTION USE! PLEASE READ EACH STEP CAREFULLY!

In order to log into MySQL to secure it, we'll need the current

password for the root user. If you've just installed MySQL, and

you haven't set the root password yet, the password will be blank,

so you should just press enter here.

Enter current password for root (enter for none):<–初次运行直接回车

OK, successfully used password, moving on…

Setting the root password ensures that nobody can log into the MySQL

root user without the proper authorisation.

Set root password? [Y/n]<– 是否设置root用户密码，输入y并回车或直接回车

New password:<– 设置root用户的密码

Re-enter new password:<– 再输入一次你设置的密码

Password updated successfully!

Reloading privilege tables..

… Success!

By default, a MySQL installation has an anonymous user, allowing anyone

to log into MySQL without having to have a user account created for

them. This is intended only for testing, and to make the installation

go a bit smoother. You should remove them before moving into a

production environment.

Remove anonymous users? [Y/n]<– 是否删除匿名用户,生产环境建议删除，所以直接回车

… Success!

Normally, root should only be allowed to connect from 'localhost'. This

ensures that someone cannot guess at the root password from the network.

Disallow root login remotely? [Y/n]<–是否禁止root远程登录,根据自己的需求选择Y/n并回车,建议禁止

… Success!

By default, MySQL comes with a database named 'test' that anyone can

access. This is also intended only for testing, and should be removed

before moving into a production environment.

Remove test database and access to it? [Y/n]<– 是否删除test数据库,直接回车

- Dropping test database…

… Success!

- Removing privileges on test database…

… Success!

Reloading the privilege tables will ensure that all changes made so far

will take effect immediately.

Reload privilege tables now? [Y/n]<– 是否重新加载权限表，直接回车

… Success!

Cleaning up…

All done! If you've completed all of the above steps, your MySQL

installation should now be secure.

Thanks for using MySQL!

[root@server1 ~]#

```


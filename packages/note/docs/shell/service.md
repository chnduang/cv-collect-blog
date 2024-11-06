## 服务器的相关命令(以下均在Linux系统中)

​	*云服务器的默认的端口号是22；

​	默认的用户是root （超级权限）；

### *用户的基本配置

##### 	1.ssh root@公网           -登录

##### 	2. df -h             -查看硬盘的使用情况

##### 	3.adduser qd       - 增加用户

##### 		gpasswd -a qd sudo       -升级权限

##### 		sudo visudo        -进入配置文件      （修改user privilege     修改成和root一样）  Ctrl+x   shift +y

##### 		可以用qd登录

### *ssh的免密登录

##### 1.公钥和私钥在.ssh的文件中

##### 2.在.ssh文件夹中 (本地)

##### 	 	 输入                     ssh-keygen -t rsa -b 4096 -C "zhouqd@163.com"

#####    	开启ssh代理 :     eval "$(ssh-agent-s)"  

#####    	将key加入代理：ssh-add ~/.ssh/id_rsa.  ssh-add -K

##### 3.服务器中(.ssh文件夹中)

#####    	输入                     ssh-keygen -t rsa -b 4096 -C "zhouqd@163.com"

#####    	开启ssh代理 :     eval "$(ssh-agent-s)"  

#####   	 将key加入代理：ssh-add ~/.ssh/id_rsa

#####   	 授权：			 vi authorized_keys		(wq!)保存

#####   	 输入内容： 将本地的公钥复制到服务器创建好的公钥文件中

##### 	   授权:                      chmod 600 authorized_keys

#####   	 重启服务：            sudo service ssh restart

### *修改端口号

##### 	1.进入配置文件：        sudo vi /etc/ssh/sshd_config

##### 	2.修改配置项： Port  （1024-65536）选择  

##### 			    	UseDNS:no

##### 			    	PermitRootLogin no

#####  	  末端增加一行：AllowUsers   qd

#####  	  保存后重启：  sudo service ssh restart

#####   	 登录：   ssh -p 39999 qd@公网

### *安全配置

##### 1.升级ubuntu更新：

#####  					sudo apt-get update && sudo apt-get upgrade

##### 	2.sudo iptables -F

##### 	   		sudo vi /etc/iptables.up.rules

##### 	编辑：

```bash
*filter

#allow all connections
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#allow out traffic
-A OUTPUT -j ACCEPT

#allow http https
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT

#allow ssh port login
-A INPUT -p tcp -m state --state NEW --dport 39999 -j ACCEPT

#ping
-A INPUT -P icmp -m icmp --icmp-type 8 -j ACCEPT

#log denied calls
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7

#drop
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set

-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP

#reject all other inbound
-A INPUT -j REJECT

-A FORWARD -j REJECT

COMMIT
```

##### 告知IPtable

##### 		sudo iptables-restore < /etc/iptables.up.rules



##### 激活防火墙

##### 查看状态：sudo ufw status

##### 激活：        sudo ufw enable

##### 开机自动启动：sudo vi /etc/network/if-up.d/iptables

##### 		#!/bin/sh

##### 		iptables-restore /etc/iptables.up.rules

##### 		sudo chmod +x etc/network/if-up.d/iptables

##### 安装fail2ban:

##### 		sudo apt-get install fail2ban

##### 进入修改：sudo vi /etc/fail2ban/jail.conf

##### 查看状态：sudo service fail2ban status

##### 启动：sudo service fail2ban start

##### 关闭：sudo service fail2ban stop



### *nodejs的环境搭载

##### 1.更新ubuntu:

##### 		sudo apt-get update

##### 2.安装所需要的加载（一次安装）

##### 		sudo apt-get install vim openssl build-essential libssl-dev wget curl git

> 在GitHub中找到nvm，wget复制粘贴到命令行回车；安装nvm  ，结束后打开新的窗口登录新的进行操作

##### 3.安装nodejs:

##### 		nvm install v6.9.5

##### 		nvm use v6.9.5

##### 指定node的版本

##### 		nvm alias default v6.9.5

##### 4.安装npm：

​	npm --registry=https://registry.npm.taobao.org install -g npm

##### 	echo fs.inotify.max_user_watches=524288 |sudo tee -a /etc/sysctl.conf && sudo sysctl -p

##### 5.安装相关的工具：

##### 		npm i pm2 webpack gulp grunt-cli

##### 6.安装nginx

##### 	sudo apt-get install nginx

##### 	cd /etc/nginx/conf.d

##### 	sudo vi imooc-com-8081.conf

##### 输入： 	

```bash
upstream imooc {

				server 127.0.0.1:8081

			}

server {

	listen 80;

	server_name 公网ip;


	location / {

		proxy_set_header X-Real-IP $remote_addr
		proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;

		proxy_set_header Host $http_host;
		proxy_set_header X-Nginx-Proxy true;

		proxy_pass http://imooc;
		proxy_redirect off;

}

}
```

##### 7.测试配置

##### 	sudo nginx -t

##### 重启：

##### 	sudo nginx -s reload







​    

   



​	
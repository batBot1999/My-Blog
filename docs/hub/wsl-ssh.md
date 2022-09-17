# 在wsl中开启使用ssh连接

1. 首先卸载ssh服务后再重新安装
``` sh
sudo apt-get remove openssh-server
sudo apt-get install openssh-server
```
2. 编辑sshd_config文件
``` sh
sudo vi /etc/ssh/sshd_config
```
有三处需要修改的
``` sh
port 22
# 默认的22端口在wsl中可能会被占用，可以改成2222端口,并且需要去除前面的注释
```

``` sh
PasswordAuthentication yes
#使用密码登陆改为yes,并且去掉前面的注释
```

``` sh
PermitRootLogin yes
#允许使用root登陆
```

3. 重置ssh服务
``` sh
sudo service ssh restart
# 查看ssh服务是否运行中
sudo service ssh status
```

4. 获取本地ip
``` sh
ifconfig
# ifconfig命令是net-tools早已废弃了，若此命令失效可换成ip命令
ip addr list
```
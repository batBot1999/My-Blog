# Centos 开放端口

由于服务器防火墙的存在,很多服务如果不开放相应端口,默认是屏蔽的,不然端口暴露出去是非常危险的.

```bash
查询当前主机打开的所有端口
netstat -tlunp
```

![image-20210802134138340](http://i0.hdslb.com/bfs/album/651e37dc59d89f014be9270d04700c3787d29d4c.png)

红框标注的都是开放的端口

```shell
查询指定端口是否放开,yes表示开启,no表示未开启
firewall-cmd --query-port=8080/tcp
```

![image-20210802134504454](http://i0.hdslb.com/bfs/album/1f26ed57d3ed585ad2a26f695732be7bb8d4f42a.png)

```shell
查看防火墙状态
systemctl status firewalld
开启防火墙 
systemctl start firewalld  
关闭防火墙 
systemctl stop firewalld
开启防火墙 
service firewalld start 
若遇到无法开启
先用：systemctl unmask firewalld.service 
然后：systemctl start firewalld.service
```

```shell
添加指定需要开放的端口：
firewall-cmd --add-port=123/tcp --permanent
重启下防火墙的服务：
firewall-cmd --reload
查询指定端口是否开启成功：
firewall-cmd --query-port=123/tcp
移除指定端口：
firewall-cmd --permanent --remove-port=123/tcp
```


# debian 替换为国内镜像源

更换镜像前需要先查看当前系统的具体版本再去网上找到镜像源

``` sh
nano /etc/apt/sources.list
```

nano是和vim差不多的文本编辑器
退出命令: `Ctrl + X` 
保存: `Ctrl + O`


更新下源索引
``` sh
apt update
```

Debian和Ubuntu使用的都是 **apt** 包管理工具,debian的命令是简化过的apt命令后缀都可以去掉

Redhat,Centos,Suse使用的是 **yum** 包管理工具

[阿里巴巴开源镜像站-OPSX镜像站-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/mirror/)

### ### 各个版本的debian源

* **debian 7.x (wheezy)**

``` sh
deb http://mirrors.aliyun.com/debian-archive/debian/ wheezy main non-free contrib
deb http://mirrors.aliyun.com/debian-archive/debian/ wheezy-proposed-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian-archive/debian/ wheezy main non-free contrib
deb-src http://mirrors.aliyun.com/debian-archive/debian/ wheezy-proposed-updates main non-free contrib
```

* **debian 8.x (jessie)**

``` sh
deb http://mirrors.aliyun.com/debian/ jessie main non-free contrib
deb http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ jessie main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ jessie-proposed-updates main non-free contrib
```

* **debian 9.x (stretch)**

``` sh
deb http://mirrors.aliyun.com/debian/ stretch main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ stretch main non-free contrib
deb http://mirrors.aliyun.com/debian-security stretch/updates main
deb-src http://mirrors.aliyun.com/debian-security stretch/updates main
deb http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ stretch-updates main non-free contrib
#deb http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib
#deb-src http://mirrors.aliyun.com/debian/ stretch-backports main non-free contrib
```

* **debian 10.x (buster)**

``` sh
deb http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster main non-free contrib
deb http://mirrors.aliyun.com/debian-security buster/updates main
deb-src http://mirrors.aliyun.com/debian-security buster/updates main
deb http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ buster-backports main non-free contrib
```

* **debian 11.x (bullseye)**

``` sh
deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main
deb-src http://mirrors.aliyun.com/debian-security/ bullseye-security main
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
```
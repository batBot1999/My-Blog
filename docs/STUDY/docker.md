# Docker 入门

## 安装

#### 海外服务器

```sh
wget -qO- get.docker.com | bash
```

卸载`docker`

```sh
apt purge docker-ce docker-ce-cli containerd.io
rm -rf /var/lib/docker
rm -rf /var/lib/containerd
```

`docker-compose` 安装

```sh
 sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```sh
sudo chmod +x /usr/local/bin/docker-compose
```

#### 国内机器安装`docker`

```sh
curl -sSL https://get.daocloud.io/docker | sh
```

国内服务器安装 `docker-compose`

```sh
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.1.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

卸载 `docker`

```sh
sudo apt-get remove docker docker-engine
rm -fr /var/lib/docker/
```

## 基础命令

#### 数据卷 `volume`

数据卷挂载之后即使容器删除，只要宿主机的目录不变，除非手动删除数据卷数据

- 创建一个数据卷：`dockek volume create my-volume`
- 查看所有数据卷： `docker volume ls`
- 删除数据卷：`docker volume rm volume_name`
- 查看数据卷详情：`docker volume inspect volume_name` (创建时间，宿主机的挂载位置)
- 清初无用数据卷： `docker volume prune`

```sh
docker run -dp 80:80 -v my-volume:/var/www/html nginx
# 容器启动时，将数据卷挂载到容器指定的路径： /var/www/html
# 容器运行时产生的任何数据都会写入这个路径中
# 使用 -v 参数的时候甚至不需要提前使用命令创建 volume，系统会自动挂载
```

> 默认的数据卷在 linux 中都是在 此路径中
>
> ```sh
> /var/lib/docker/volumes
> ```

**使用绝对路径挂载**

```sh
docker run -idt -v /data/docker_volume/html:/root/html nginx
```

**自动挂载** 不在乎 `volume` 的所在位置只是想要讲某个目录文件持久化

```sh
docker run -itd -v /root/html nginx   #这会创建一个匿名的 volume
```

#### 容器管理

`docker ps`: 查看正在运行的容器, 参数`-a` :过去曾经运行过的容器

`docker stop 容器id`: 停止运行此容器

`docker start 容器id` 启动已经创建好的容器
`docker rename 原容器名 新容器名` 重命名容器

![image-20210801183244053](http://i0.hdslb.com/bfs/album/4c3edd85ca533cea2d330934c72469b3919d193d.png)

`docker diff '容器的id'`: 列出容器内文件变动情况

`A`: add 代表新增的文件

`C`: 更新的文件

`D`: 删除的文件

`docker commit '容器id'`: 更换容器名字

`docker attach '容器id'`: 进入到正在运行中的容器,(不推荐,`exit` 退出容器会暂停容器)

#### 镜像管理

`docker image ls` : 查看已经下载到本地的镜像

`docker rmi 镜像id` 移除镜像

`docker search 镜像名` 在远程仓库中搜索所有可用的镜像

![image-20210808173929994](http://i0.hdslb.com/bfs/album/234c360c8ff0c19984b3c615e75f06f2fc330508.png)

`name` :镜像名 `description` 描述 `stars` 星 `official` 是否是官方 `automated` 自动构建

`docker run` 以镜像创建一个新的容器并运行

`-d` (detach) 后台运行容器，并不直接在宿主机上与之交互，并返回容器 ID

`i` (interactive)以交互模式运行容器，通常与 `-t` 同时使用；

`--name 名字` 自定义容器名字

`p 端口号:端口号` 镜像映射

`nginx` 镜像名称

`docker rm 容器id`:移除容器

`docker inspect 容器id` 查看容器信息

> 如果容器内无法修改文件,可以先拷贝到宿主机中修改,然后再拷贝回去

`docker cp 容器id:/home/demo.txt /root/ ` 拷贝容器中的`demo.tx`t 文到宿主机的`/root`路径下

`docker cp /root/demo.txt 容器id:/home` 拷贝宿主机中的`demo.txt`文件到容器内部

`docker exec -it 容器id /bin/bash` 进入到容器命令行中,启动一个远程 shell
![image-20210801143934667](http://i0.hdslb.com/bfs/album/d67843beff63e0785b6ab20d8c2df09963ed4d7a.png)

## 概念

`docker file` 自动化脚本文件： 可以被 docker 用来构建镜像

`docker-compose` 一个工具用来定义和运行多个 Docker 容器，

- `dockerfile` 文件示范

```sh
FROM node:14-alpine AS build
# 选择一个基础镜像，附加版本号
WORKDIR /opt/node_app
# 指定之后所有的docker命令的工作路径（如果不存在docker会自动创建该路径）
COPY package.json yarn.lock ./
RUN yarn --ignore-optional

ARG NODE_ENV=production

COPY . .
# 使用copy命令将当前文件夹下的所有内容拷贝到Docker镜像中
# 第一个参数：本地文件 '.' 代表程序根目录下的所有文件
# 第二个参数代表Docker镜像中的路径，此时的 '.' 代表当前的工作路径，即使之前设置的工作路径
RUN yarn build:app:docker
# 使用包管理工具进行打包
FROM nginx:1.21-alpine

COPY --from=build /opt/node_app/build /usr/share/nginx/html

HEALTHCHECK CMD wget -q -O /dev/null http://localhost || exit 1

```

使用 docker build 命令来创建一个镜像

```sh
docker build -t my-app .
# `-t` : tag指定了创建镜像的名字  '.' 代表在当前目录下构建
```

- `docker-compose.yml` 文件

```yaml
version: "3.8"

services:
  # 定义多个容器
  excalidraw:
    build:
      context: .
      args:
        - NODE_ENV=development
    container_name: excalidraw
    ports:
      - "3000:80"
    restart: on-failure
    stdin_open: true
    healthcheck:
      disable: true
    environment:
      - NODE_ENV=development
    volumes:
      - ./:/opt/node_app/app:delegated
      - ./package.json:/opt/node_app/package.json
      - ./yarn.lock:/opt/node_app/yarn.lock
      - notused:/opt/node_app/app/node_modules
# 指定数据卷用来存放数据
volumes:
  notused:
```

接下来运行

```sh
docker compose up -d
# d(detach) 代表在后台运行所有的容器
```

如果想要删除运行的容器

```sh
docker compose down
# 停止并删除所有的容器
```

## Hello World

**目标**：使用 `docke` 基础镜像打包出一个私人镜像，输出 `hello world`

```sh
# 目录结构
root@foreverliu:/mnt/c/Users/30328/Desktop/docker_study
.
├── Dockerfile
└── helloworld.js
```

**Dockerfile 文件编写**

```sh
FROM node:slim
# 基础镜像
WORKDIR /app
# 容器内切换到指定路径
COPY . .
# 拷贝当前文件夹下的文件到容器中的目录
CMD ["node", "/app/helloworld.js"]
# 打包完成后执行的命令
```

`Dokcerfile` 文件编写完成后，需要使用命令来根据文件中的指令来构建出镜像

```sh
❯ docker build -t test .
[+] Building 2.4s (8/8) FINISHED
 => [internal] load build definition from Dockerfile                                           0.3s
 => => transferring dockerfile: 117B                                                           0.0s
 => [internal] load .dockerignore                                                              0.4s
 => => transferring context: 2B                                                                0.0s
 => [internal] load metadata for docker.io/library/node:slim                                   0.0s
 => [1/3] FROM docker.io/library/node:slim                                                     0.0s
 => [internal] load build context                                                              0.3s
 => => transferring context: 185B                                                              0.0s
 => CACHED [2/3] WORKDIR /app                                                                  0.0s
 => [3/3] COPY . .                                                                             0.5s
 => exporting to image                                                                         0.8s
 => => exporting layers                                                                        0.6s
 => => writing image sha256:37a6ba6990f911e6f8b9812a1a56269c1d462fb9f978abcf60b265343bdb0be4   0.0s
 => => naming to docker.io/library/test
```

此时使用命令查看，可以发现镜像中多了一个打包好的镜像

![image-20220522174118758](http://i0.hdslb.com/bfs/album/a8ef36f8562a2c1677a3f89420da11866d73851e.png)

**运行容器**

```sh
docker run test
```

![image-20220522174203302](http://i0.hdslb.com/bfs/album/7bd88cc005695b510d0d5037577154a81d787aee.png)

容器输出了 `hello world` 后就退出了

## 各种服务的安装

### Docker 安装 Mysql

1. 拉取`Mysql`镜像

```bash
docker pull mysql
```

`docker ps`

2. 创建`mysql` 容器

```bash
docker run -d --name 数据库名 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=数据库密码  mysql
```

`-p`:代表端口映射,格式为:宿主机端口---> 容器端口

`-e`: 代表添加环境变量 MYSQL_ROOT_PASSWORD 是 root 用户的登录密码

3. 进入`mysql`容器,登录`MySQL`

```bash
docker exec -it mysql_name  /bin/bash
```

如果没有`vim`,先安装 vim,

```bash
apt-get install vim
如果报错,Vim:command not found则需要安装vim
apt-get update:更新源中的索引,获得最新的软件包
更新完成后在安装一遍就好了
```

4. 登录`mysql`

`mysql -u root -p`

### Docker 安装 mongodb

1. 拉取镜像

```sh
docker pull mongo
Using default tag: latest
latest: Pulling from library/mongo
Digest: sha256:82a55eb6d60997007ff390087d4e064218d477e9611a7becd78664a2ab490eff
Status: Image is up to date for mongo:latest
docker.io/library/mongo:latest
```

2. 运行 mongo 容器

```sh
docker run -itd --name mongo -p 27017:27017 mongo --auth
e51301d396ce708970a184cc8889fdfa0e885b11ecf72a8cab504478d2fbb63f
```

`--auth` ：开启 mongo 容器密码认证

3. 命令行进入 mongo 容器

```sh
docker exec -it mongo mongo admin
MongoDB shell version v5.0.8
connecting to: mongodb://127.0.0.1:27017/admin?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("f9026848-d867-4c81-aec3-29aad133ac1d") }
MongoDB server version: 5.0.8
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
```

进入容器后立即执行 `mongo` 命令 以 admin 角色进入数据库命令行

4. 创建管理员账号和密码

```sh
db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
Successfully added user = {
  user: "admin",
  roles: [
    {
      role: "userAdminAnyDatabase",
      db: "admin",
    },
  ],
};
```

`mongo` 中的用户是基于身份 `role` 的，该管理员账户的 `role` 是 `userAdminAnyDatabase`

`userAdmin`代表用户管理身份，`AnyDatabase` 代表可以管理任何数据库

5. 用创建的账号登录

```sh
db.auth('admin','123456')

```

管理员账号登录后，可以用该账户创建其他数据库管理员账号

```sh
use mydatabase 	// 切换到 mydatabase k
switched to db mydatabase
db.createUser({ user: "foreverliu", pwd: "123456", roles: [{ role: "dbOwner", db: "mydatabase" }] })
```

`mongo` 内建的角色类型有：

- `Read` 允许用户读取指定数据库

- `readWrite` 允许用户读写指定数据库

- `dbAdmin` 允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问 system.profile

- `userAdmin` 允许用户向 system.users 集合写入，可以找指定数据库里创建、删除和管理用户

- `clusterAdmin` 只在 admin 数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。

- `readAnyDatabase` 只在 admin 数据库中可用，赋予用户所有数据库的读权限

- `readWriteAnyDatabase` 只在 admin 数据库中可用，赋予用户所有数据库的读写权限

- `userAdminAnyDatabase` 只在 admin 数据库中可用，赋予用户所有数据库的 userAdmin 权限

- `dbAdminAnyDatabase` 只在 admin 数据库中可用，赋予用户所有数据库的 dbAdmin 权限。

- `root` 只在 admin 数据库中可用。超级账号，超级权限

### Dockers 安装 nginx

1. 从云端拉取`nginx`镜像

![image-20210801182336668](http://i0.hdslb.com/bfs/album/e8e8e20bbf1f85b351ad7067a4dd4a5a9c76bd07.png)

2. 查看本地`nginx`镜像的状态

`docker images nginx`

![image-20210801182536249](http://i0.hdslb.com/bfs/album/8a3f30dba6928e4790a53fd7c04baf2007f43548.png)

3. 创建`nginx`容器

`docker run -d --name web-server -p 80:80 0815`

- `-d` 容器以后台模式运行,并且放回容器 ID
- `--name` 重命名容器
- `-p` 指定端口映射,格式为:`宿主端口`---> `容器端口`
- `0815` 指定`IMAGE ID`的前四位

![image-20210801184318797](http://i0.hdslb.com/bfs/album/c54bd49682041f69152541f5f0416bf00d5d107b.png)

容器已经成功创建了,`nginx`的端口映射到自己宿主服务器的端口上,访问服务器`ip`的`80`端口,可以看到`nginx`的欢迎界面,服务器要放开端口.

此时使用`docker ps` 确认了`nginx`服务确实在运行

![image-20210801184729956](http://i0.hdslb.com/bfs/album/1ca2406393162fc85f6ded4f192b4b6b66ed6064.png)

#### 配置 Nginx

> 方法一:进入到`nginx`容器内部修改

这种方法适合改动较少,简单的使用情况

1. 命令行中运行`docker exec -it 5a /bin/bash`

- `exec` 在运行的容器中执行命令
- `-i` `-t` 两个参数合并的写法,表示为指定的容器,`i` 表示和这个容器互动,`t`表示为这个容器创造一个伪终端
- `5a` 是要进入的容器`id` 不写全也没关系,只要唯一指定就行
- `bin/bash` 用来指定执行命令的`shell`解释器

![image-20210801204933502](http://i0.hdslb.com/bfs/album/13282dc061f835e5a25eec172abceb4a0b9849d9.png)

`nginx`有三个主要配置的地方

1. `cd`到`nginx`的内部,`cd/etc/nginx` ,配置文件主要就在这个文件夹中

![image-20210801205247302](http://i0.hdslb.com/bfs/album/390f0090dff41983e24b7c34f5acd91404749a7d.png)

2. `nginx` 的默认`index` 文件目录在`/usr/share/nginx/html`

![image-20210801205438373](http://i0.hdslb.com/bfs/album/ff018870ebca15f10cbb9c5d3343d594ca6e59c9.png)

3. 日志文件在`/var/log/nginx`中

![image-20210801210055855](http://i0.hdslb.com/bfs/album/5522b27760c5df3b32a3a88d6de4def89ed50771.png)

> 方法二,将`nginx`容器内部的配置文件挂载到主机内部,对主机的目录进行修改,适合经常修改操作的情况

[nginx 配置](https://www.cnblogs.com/qiqiloved/p/13470064.html)

### Docker 部署 Jenkins 及初始配置

1. 下载`jenkins` 镜像

```bash
[root@localhost ~]$docker pull jenkinsci/blueocean
Using default tag: latest
latest: Pulling from jenkinsci/blueocean
ff3a5c916c92: Pull complete
5de5f69f42d7: Pull complete
fd869c8b9b59: Pull complete
09b77ebbb585: Pull complete
edaab8c638eb: Pull complete
74718d164167: Pull complete
6d6dab0396d5: Pull complete
f6a4487e3af7: Pull complete
4b44a66deffd: Pull complete
925e68272890: Pull complete
428de9991230: Pull complete
f4b1af398075: Pull complete
425d68489478: Pull complete
e2f8bb400606: Pull complete
251d043c8226: Pull complete
9a6a8fe90c4f: Downloading [==============================================>    ]  62.19MB/66.73MB
9a6a8fe90c4f: Pull complete
Digest: sha256:df6669eab61f76cba7b51847ef24623f65902499925b4d5a2516d155dc95c0c5
Status: Downloaded newer image for jenkinsci/blueocean:latest

```

2. 查看镜像状态

```bash
[root@localhost ~]# docker images
REPOSITORY            TAG       IMAGE ID       CREATED        SIZE
jenkinsci/blueocean   latest    090919d971fc   17 hours ago   716MB
```

3. 以此镜像文件启动成容器

```bash
docker run -d -it  \
--name jenkins -u root \
-p 9090:8080  \
-v /var/jenkins_home:/var/jenkins_home  \
jenkinsci/blueocean
```

> 参数解释:
>
> - `--name` 生成指定容器名
> - `-u root` 以`root` 权限启动避免权限问题导致启动失败
> - `-p` 进行端口映射,宿主机端口---> 容器端口
> - `-v` 将`jenkins`容器的`jenkins_home`目录映射到宿主机的目录中,方便后续配置修改

此时`jenkins`服务已经部署好,浏览器访问`服务器ip:9090`使用服务

![image-20210802112741179](http://i0.hdslb.com/bfs/album/dd26ab59e40adedb0060bd8c833ee357643ffef3.png)

查看`jenkins`密码

```bash
cat /var/jenkins_home/secrets/initialAdminPassword
```

![image-20210802135853545](http://i0.hdslb.com/bfs/album/023eac3342a2307714a618c1ca3bf03e70ced63a.png)

### Docker 部署 gogs

### 简介

`Gitlab` 搭建`git`服务对于服务器的配置要求相对较高,启动和访问速度较慢,

`Gogs` 一款开源的自助`Git` 服务搭建系统,使用`Go` 语言开发,多平台支持,对系统硬件要求极低,甚至树莓派都可以搭建

```bash
# 拉取gogs镜像
docker pull gogs/gogs
# 启动容器
docker run --name gogs -p 10022:22 -p 10050:3000 \
-v /home/apps/gogs/data:/data \
-d gogs/gogs
```

参数:

- `gogs`需要用到两个端口服务:`SSH` :22 端口 ,`网页服务端口`: 3000
- `-v` 挂载`gogs` 文件目录到容器外部
- `-d`后台运行,并返回容器`ID`

![image-20210802154932458](http://i0.hdslb.com/bfs/album/3fe4b81508cb7db995675f14e103bf16260555de.png)

![image-20210802155204057](http://i0.hdslb.com/bfs/album/850a171da8b7cc6d128e42ab8e0fac5547c48b71.png)

此时访问 ip+10050 端口就可以访问 gogs 服务了

![image-20210802160140804](http://i0.hdslb.com/bfs/album/0b69eca5bbef95558ce9a4cea9d47228569ff696.png)

[知乎 gogs 部署](https://zhuanlan.zhihu.com/p/253217380)

### Docker 部署 nginx

```bash
docker pull nginx
#拉取nginx镜像
docker run -id --name nginx -p 80:80 -v /root/html:/usr/share/nginx/html nginx
#启动容器
```

网页静态文件`index.html` 路径: `/var/jenkins_home/workspace/html`

默认 `conf` 路径容器内 `/etc/nginx/nginx.conf`

访问服务:

`192.168.50.17`

#### `nginx`配置文件

```bash
server {
    # 默认监听 80 端口
    listen   80;
    # localhost 为外部访问该地址的域名   域名解析指向---> NGINX 配置文件所在服务器
    server_name  localhost;

    # 这里为本地代理，当外部访问 server_name 域名的时候 就会转到以下代理地址
    #1ocation / {
    #     proxy_pass http://192.168.0.243：8778;
	#}

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    # nginx 的默认访问文件夹为 root  /usr/share/nginx/html
    # nginx 的默认访问页面为  index  index.html  index.htm
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

`nginx`容器内部的配置文件目录:

- 配置文件`conf` 目录: `/etc/nginx`
- 日志`log`目录 `/var/log/nginx`
- 网页文件`html` 目录 `/usr/share/nginx/html`

```bash
docker run -d -p 80:80 --name nginx -v /home/nginx/html:/usr/share/nginx/html nginx
```

## Docker 配置官方镜像加速

### 获取官网链接

登录阿里云控制台,找到镜像工具 => 镜像加速器 => 复制自己的链接

[阿里云加速器控制台链接](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

![image-20220305164015219](http://i0.hdslb.com/bfs/album/baa691a5a7cf8d3b4a9aebd6d40d0d573e227d41.png)

- `Windows` 客户端

点击设置小齿轮 => `Dockers Engine` => 翻到最下面的仓库镜像配置 => 粘贴进去(注意链接要有引号)

![image-20220305164129094](http://i0.hdslb.com/bfs/album/9630a8c9fd59a0041d9ea7823906218ec1949e3e.png)

```json
 "registry-mirrors": [
    "https://mirror.ccs.tencentyun.com"
  ]
```

- linux 客户端

修改配置文件，并重启 docker 服务，

```sh
nano /etc/docker/daemon.json
{
   "registry-mirrors": [
       "https://mirror.ccs.tencentyun.com"
  ]
}
sudo systemctl restart docker
```

## `Images`,`Containers` `Volumes` 区别

![3524_1](http://i0.hdslb.com/bfs/album/a74a14baabac144c4224bf3fcc2e6b530546f184.png)

- `Image` 镜像就是一堆只读层,是多层静态的文件的堆叠
- `container` 容器和镜像差不多,也是一堆层的堆叠,唯一的区别是容器的顶层是可读写的,容器=镜像+读写层,通常是动态的

![](http://i0.hdslb.com/bfs/album/a7be97ed925ff163ef344a2c1ee7e4b644eb30b6.png)

[10 张图带你深入理解 Docker 容器和镜像](http://dockone.io/article/783)

`kubernetes` 和 `docker` 的区别：

`kubernetes`所做的就是将各个容器分发到一个集群中运行，并进行全自动化的管理，包括应用的部署和升级

![image-20220416170959362](http://i0.hdslb.com/bfs/album/71f629e94074999b04f31dfd9a4889684a1af855.png)

## Dockfile 中使用多个 cmd 命令

1. 方法一: `CMD` 命令不用中括号框起来，将命令用 “&&”符号连接

```sh
# 用nohup框起来，不然npm start执行了之后不会执行后面的
CMD nohup sh -c 'npm start && node ./server/server.js'
```

2. 方法二： 用 ENTRYPOINT 命令，指定一个执行的 shell 脚本，然后在 entrypoint.sh 文件中写上要执行的命令：

```sh
ENTRYPOINT ["./entrypoint.sh"]
```

entrypoint.sh 文件如下：

```sh
// entrypoint.sh
nohup npm start &
nohup node ./server/server.js &
```

### 容器启动执行完脚本后自动退出

一个 docker 容器同时只能管理一个进程，这个进程退出后，容器也就退出了，当然一个容器里可以同时运行多个进程。当容器启动完后执行某脚本后，该进程结束了，其他进程也结束了，所以该容器自动退出了，解决方案：我们可以让该脚本一直运行不停止。

**解决方式：**

在脚本最后一行添加 tail -f /dev/null，这个命令永远完成不了，所以该脚本一直不会执行完，所以该容器永远不会退出。

## Docker Compose

`Compose` 是一个用户定义和运行多容器的工具，直接用命令行创建容器不够直观，不方便管理。可以通过把所有的容器运行配置写在 YML 文件中，来运行容器。主要有三个步骤，

- 编写 `Dockerfile` 来创建应用程序的环境
- 编写 `docker-compose.yml` 来定义构成应用程序的服务
- 执行 `docker-compose up -d` 来启动运行整个应用程序

[composerize](https://www.composerize.com/) ,这个网站可以将`docker`命令转变为 `yml` 文件

![image-20220522211439950](http://i0.hdslb.com/bfs/album/0858da5b39d8200fd6f793a9a35ae9d4c36dc5eb.png)

### 安装

直接下载`docker-compose`的二进制文件

docker-compose 的下载地址：[github 下载链接](https://github.com/docker/compose/releases)

根据自己的操作系统选择对应的版本进行下载

上传到自己的服务器上,输入以下命令

```sh
mv docker-compose-Linux-x86_64 /usr/bin/docker-compose
chmod 755 /usr/bin/docker-compose
docker-compose version
```

如果输出以下版本号,则表示安装成功

```sh
Docker Compose version v2.4.1
```

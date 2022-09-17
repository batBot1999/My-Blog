# Caddy

## 简介

Caddy 是一款功能强大，扩展性高的 Web 服务器，目前在 Github 上已有`40K+Star`。Caddy 采用 Go 语言编写，可用于静态资源托管和反向代理。

**Caddy 有着一下特性**

- 相比于 Nginx 复杂的配置，Caddy 的配置文件 `Caddyfile` 配置简单
- 自动申请安全证书实现 `https`
- `go` 语言编写性能和内存安全有保证

## 安装

### docker

1. 下载镜像

```sh
docker pull caddy
```

2. 之后使用如下命令启动 caddy 服务，这里将宿主机上的`Caddyfile`配置文件、Caddy 的数据目录和网站目录挂载到了容器中

```sh
docker run -p 80:80 -p 443:443 --name caddy \
    -v /mydata/caddy/Caddyfile:/etc/caddy/Caddyfile \
    -v /mydata/caddy/data:/data \
    -v /mydata/caddy/html:/usr/share/caddy \
    -d caddy
```

3. 之后使用 `docker exec` 进入 `caddy` 容器内部执行命令

```sh
docker exec -it caddy /bin/sh
```

### linux

使用 wget 命令去下载 `caddy` 的二进制安装包，[官网链接](https://github.com/caddyserver/caddy/releases),根据自己的系统自行下载

```sh
wget https://github.com/caddyserver/caddy/releases/download/v2.5.1/caddy_2.5.1_linux_amd64.tar.gz
```

![image-20220515173154114](http://i0.hdslb.com/bfs/album/fa30d0ba8e9c8dbd71f5902f7d456a19b2ff94fa.png)

下载完成后使用 `tar zxvf` 命令解压缩文件,解压完成后的 `caddy` 文件就是可执行文件

```sh
tar zxvf caddy_2.5.1_linux_amd64.tar.gz
```

配置软连接，将命令映射到全局使用

```sh
ln -s /root/Caddy/caddy /usr/sbin/caddy		# 前面为应用的目录，后面为系统的路径
```

![image-20220515180152408](http://i0.hdslb.com/bfs/album/cca8d3b79c3e9442761e87d70d75f04a1cb50458.png)

现在命令全局可用了，已经安装完成

### windows

[官网下载连接](https://github.com/caddyserver/caddy/releases)

![image-20220515172223846](http://i0.hdslb.com/bfs/album/456867dd0fe519e88c4e340b8a8b464f6ac547fe.png)

下载完成解压到自己指定的目录

![image-20220515172633389](http://i0.hdslb.com/bfs/album/5703982e50e2c4fe7cfd24a63b1c51a1781b3547.png)

将该路径添加到环境变量中

![image-20220515172742043](http://i0.hdslb.com/bfs/album/35401ab5019d01ae64a3759d1d4ca155b40ce294.png)

添加完毕后点击保存

![image-20220515172807244](http://i0.hdslb.com/bfs/album/a1744115303878b5f8e03d69025c9aabffaa51ec.png)

此时在全局都能使用 caddy 命令了，我们来测试一下

```sh
❯ caddy
Caddy is an extensible server platform.

usage:
  caddy <command> [<args...>]

commands:
  adapt           Adapts a configuration to Caddy's native JSON
  add-package     Adds Caddy packages (EXPERIMENTAL)
  build-info      Prints information about this build
  environ         Prints the environment
  file-server     Spins up a production-ready file server
  fmt             Formats a Caddyfile
  hash-password   Hashes a password and writes base64
  help            Shows help for a Caddy subcommand
  list-modules    Lists the installed Caddy modules
  reload          Changes the config of the running Caddy instance
  remove-package  Removes Caddy packages (EXPERIMENTAL)
  reverse-proxy   A quick and production-ready reverse proxy
  run             Starts the Caddy process and blocks indefinitely
  start           Starts the Caddy process in the background and then returns
  stop            Gracefully stops a started Caddy process
  trust           Installs a CA certificate into local trust stores
  untrust         Untrusts a locally-trusted CA certificate
  upgrade         Upgrade Caddy (EXPERIMENTAL)
  validate        Tests whether a configuration file is valid
  version         Prints the version

Use 'caddy help <command>' for more information about a command.

Full documentation is available at:
https://caddyserver.com/docs/command-line
```

## Caddyfile 文件配置

```sh
# 直接访问端口
:96 {
  root * /root/html/one # 静态文件夹下的根目录，内部文件需要为index.html
  file_server	# 开启静态文件服务器
}

# 直接访问端口
:100 {
  respond "I am 8080"
}

# 子域名，实现反向代理
one.foreverliu.xyz {
  encode gzip
  root * /root/html/two
  file_server
}

# 重定向
baidu.foreverliu.xyz {	# 拦截所有该条url的访问请求，进行内部逻辑处理
  redir https://baidu.com
}
```

> 反向代理
>
> 当请求服务器资源的时候，`http` 服务器（这里就是 caddy）根据自己的请求，进行转发可以转发到静态资源路径，也有可能转发到动态的服务端口上去。

## 基本使用

每次重写配置文件以后，需要重新加载配置文件

```sh
caddy reload
```

配置文件`Caddyfile` 如果文件格式有问题，会有以下警告

```sh
root@VM-0-4-debian:~/Caddy# caddy reload
2022/05/15 10:14:16.382 INFO    using adjacent Caddyfile
2022/05/15 10:14:16.383 WARN    Caddyfile input is not formatted; run the 'caddy fmt' command to fix inconsistencies     {"adapter": "caddyfile", "file": "Caddyfile", "line": 4}
```

此时使用 `caddy fmt --overwrite` 重新格式化配置文件即可解决

## 按目录划分路由

> 有时候需要使用同一个域名来访问不同的前端项目，这时候就需要用到子目录来区分不同的项目了

```sh
foreverliu.com/admin		# 访问后台项目
foreverliu.com/app		# 访问前台项目
foreverliu.com		    # 访问api文档项目
```

需要修改`Caddyfile` 文件，使用 `route` 指定路由，修改后重新加载配置文件即可

```sh
http://www.foreverliu.com {
  route /admin/* {
    uri strip_prefix /admin
    file_server {
      root /mydata/caddy/html/admin
    }
  }

  route /app/* {
    uri strip_prefix /app
    file_server {
      root /mydata/caddy/html/app
    }
  }

  file_server * {
    root /mydata/caddy/html/www
  }
}
```

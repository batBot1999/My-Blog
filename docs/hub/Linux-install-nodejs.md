# Linux 安装 nodejs 并配置 NPM

####  连接服务器

![](http://i0.hdslb.com/bfs/album/84852beaad0f834d6579f3ce5d220c8195b3dba9.png)

## 第一步,在 Linux 中找到安装路径并下载

```sh
cd /usr/local/bin
```

![](http://i0.hdslb.com/bfs/album/f4019781bd4886f876a1f1e6db06eae3144c67ba.png)

**去 node 中国官网,找到自己要下载的版本**

[Node.js 中文网](http://nodejs.cn/download/)

点击这个阿里云镜像,因为是国内的节点,速度会快很多

![](http://i0.hdslb.com/bfs/album/bd03ce0533e00b68bf4d13d26ce1af0d6de60fed.png)

进入阿里镜像站,下载这个 64 位 linux 版本,复制这个链接地址
![](http://i0.hdslb.com/bfs/album/8cb9787b0f6e834a24eb41b0c02a29132714c045.png)

进入 final shell 中使用 `wget`命令下载该文件

```sh
yum install -y wget
# 前提需要先安装wget命令
wget https://npmmirror.com/mirrors/node/v16.14.2/node-v16.14.-linux-x64.tar.xz
```

![](http://i0.hdslb.com/bfs/album/81329770552fdce51a96016332559688a640b8e5.png)

该命令会在此路径下载要安装的压缩包
![](http://i0.hdslb.com/bfs/album/ae1a4dbb58347069cee7320d88351b0a5a0e3700.png)

## 解压缩安装包

输入以下命令开始解压

```sh
tar -xvf node-v16.4.0-linux-x64.tar.gz
```

![](http://i0.hdslb.com/bfs/album/923c50d2721e2de914e6b5c2a0ee94d908c23ad3.png)

回到上一级重命名文件夹为 **node.js**

```sh
cd ..
mv node-v16.4.0-linux-x64.tar.gz Node.js
```

![](http://i0.hdslb.com/bfs/album/4f816d23f3c01a437247b7e185a332da6b0ce6fc.png)

## 配置 bin 文件中的软连接以便全局访问

```sh
cd Node.js/bin
```

进入 nodejs 中 bin 文件夹,有以下三个文件

![](http://i0.hdslb.com/bfs/album/dc6446fbc653d9e581a125c2d9b5eefbad07b91b.png)

执行命令配置关联

```sh
ln -s /usr/local/bin/Node.js/bin/node /usr/bin/node
ln -s /usr/local/bin/Node.js/bin/npm /usr/bin/npm
ln -s /usr/local/bin/Node.js/bin/npx /usr/bin/npx
```

### wsl安装产生的错误

我的`WSL` `debian` 安装到这一步的时候一直报错，需要先去终端中关闭 `wsl` 再重启一下,就配置好了

``` sh
wsl --shutdown
wsl
```

配置好后进入根目录,输入 **npm**,**node** 等命令测试一下

![](http://i0.hdslb.com/bfs/album/a5f4b1d78fa692a51c4f1a1100a8cc7f86b3ca68.png)

> 此时 node 已经安装成功!!!

## 配置 NPM

**设置全局安装位置**

```sh
# 进入node安装位置
cd /usr/local/bin/Node.js
# 新建全局安装文件夹和缓存文件夹
mkdir node_global
mkdir node_cache
# 设置下全局安装路径和缓存位置
npm config set prefix "node_global"
npm config set cache "node_cache"
# 最后查看下自己配置是否成功
npm config ls
```

node 安装路径下的文件夹格式

![](http://i0.hdslb.com/bfs/album/e28b9210016d618dca1286fb675769ea61051de1.png)

![](http://i0.hdslb.com/bfs/album/efabd9960986f0b694e2f1ac6bab56add637eaee.png)

**更换国内的淘宝镜像源**提高下载速度

```sh
# 设置镜像源(淘宝或者腾讯镜像源)
npm config set registry=https://registry.npmmirror.com
npm config set registry=http://mirrors.cloud.tencent.com/npm
# 查看更改后的镜像源
npm config get registry
```

![](http://i0.hdslb.com/bfs/album/ef2f891fff085b1107d24fa4e652d5b3abd5231d.png)

### 安装pnpm以提高安装速度

``` sh
npm i pnpm -g
```

安装完成后输入pnpm 会发现提示命令没找到，这是由于nodejs 是使用二进制包解压缩后，将 npm 和 node 命令使用软链接放到 /usr/local/bin 中安装的

配置环境变量，让以后每次全局安装的命令都从自己指定的目录文件夹去搜寻

``` sh
nano /etc/profile
```

![image-20220824182617648](https://i0.hdslb.com/bfs/album/69e11388fc5deeaf32a7966c5d0e018fe2512c87.png)

在末尾添加全局命令的文件夹

``` sh
export PATH="$PATH:/usr/local/bin/nodejs/node_global/bin"
```

保存后需要执行以下命令才会生效

``` sh
source /etc/profile
```


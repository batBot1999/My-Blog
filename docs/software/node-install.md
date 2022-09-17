# nodejs 安装配置教程

***

#### 官网下载 `node` 长期支持版本 [node官网](https://nodejs.org/zh-cn/)

无脑点击下一步安装,默认安装在 `C:\Program Files\nodejs`

命令行进入 `node` 安装的主目录,使用以下命令
``` sh
node -v
npm -v
```
出现相应的版本号,安装成功

<img :src="('http://i0.hdslb.com/bfs/album/33f429f717d55c5390cc8c9dabaa6473bcb342d2.png')" alt="安装成功">

在安装的 `nodejs` 文件夹下新建两个新文件夹
``` sh
md node_global
md node_cache
```

* 目录示意图
<img :src="('http://i0.hdslb.com/bfs/album/d9d68e1349a00a0a4c0473605470eb5c83cbb97e.png')" alt="logo">

#### 配置文件夹路径
``` sh
npm config set prefix "C:\Program Files\nodejs\node_global"
npm config set cache "C:\Program Files\nodejs\node_cache"
```

#### 配置环境变量,使得终端可以全局访问

``` sh
# 用户变量内设置
Path    C:\Program Files\nodejs\node_global
# 系统变量内添加
NODE_PATH   C:\Program Files\nodejs\node_modules
```

<img :src="('http://i0.hdslb.com/bfs/album/8d651da05f1eb520ac1a92b35fbe78202abf3160.png')">

<img :src="('http://i0.hdslb.com/bfs/album/302da73a627209bc6dc335f92606e4987f1d27a4.png')">

***

* 每次更改后记得及时保存

为提高国内安装访问速度,需要对 `npm` 切换淘宝镜像源
``` sh
npm config set registry https://registry.npm.taobao.org
```

配置完成后查看当前镜像源
``` sh
npm config get registry 
```

## Windows 查看端口占用和结束进程

### 查看所有端口

``` bash
netstat - ano
```

![image-20211123113022015](http://i0.hdslb.com/bfs/album/143e9046052276bbcd62f35716f50e0dc17a40ad.png)

### 查看特定端口的占用情况

``` bash
netstat - ano | findstr "3000"
```

![image-20211123112727257](http://i0.hdslb.com/bfs/album/202996a43457ec982cb579ee0db489afc923585d.png)

> `pid` : 进程标识符: (**process identifier**),又称为进程ID, 大多数操作系统内核用于标记进程的数值,用来调整进程优先级,杀死进程.

### 结束进程

> 通过查询端口占用的pid来杀死对应的进程来解决端口占用问题

对于window 操作系统,没必要使用命令行直接打开窗口管理器中的详细信息,对pid排序,右键结束进程

<img src="http://i0.hdslb.com/bfs/album/1bade7bd925b22002c30b3a43e41d2948bf99259.png" alt="image-20211123113437384" style="zoom:67%;" />


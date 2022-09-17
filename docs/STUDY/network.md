## 专业名词

`HTTP` : (Hyper Text Transfer Protocol): 超文本传输协议

`TCP`: (Transmission Control Protocol)传输控制协议

`URI` : (Uniform Resource Identifier) 统一资源标识符

`DNS` (Domain Name System)域名服务系统

`UDP` (User Datagram Protocol): 用户数据报协议

`Socket` 套接字（一堆通用程序组件的集合，包含很多用于发送和技术数据的程序组件）

`ARP` (Address Resolution Protocol) 地址解析协议

`SSH`(Secure Shell):安全壳协议

## HTTP方法

| 方法   |  含义      | 备注 |
| ------ | ---- | ------------------------------------------------------------ |
| `GET`  |    获取URI指定信息,如果URI是一个文件,则返回文件内容.URI是程序,则返回程序的输出结果   | 查 |
| `POST` | 从客户端发送数据到服务端,一般是用来发送表单信息 | 增 |
| `HEAD` | 和`GET`类似.不过只返回`HTTP`的消息头(message header),并不反回数据的内容.用户获取文件最后更新时间等属性信息 |                                                              |
| `OPTION` | 用户通知和查询通信选项 |                                                              |
| `PUT` | 替换服务器上URI位置的文件,如果文件不存在的话则创建这个文件 | 类似于touch命令 |
| `DELETE` | 删除URI指定位置的服务器文件 | 删 |
| `TRACE` | 将服务器收到的请求行和头部(header)直接返回给客户端.用于在使用代理的环境下检查改写请求的情况 |                                                              |
| `CONNECT` | 使用代理传输加密消息时使用的方法 | |

### DNS和VPN

域名地址给人用，方便阅读和理解。ip地址给机器用，处理起来简单高，两者之间需要做一个映射表这就是DNS服务。

主机先会在自己的本地hosts文件中查询ip地址，如果没有查询到就去最近的DNS服务器查询。如果查询到了ip地址返回给客户端

来自客户端的查询主要包含以下三种信息：

* 域名： 服务器、邮件服务器（邮件地址中@后面的部分）名称
* Class: 最早设计DNS方案时，Class就是用来识别网络中的信息。如果除了互联网之外就没有其他网络了，Class值永远是代表互联网的IN
* 记录类型： 表示域名对应何种类型的纪录

`MX` (Mail Exchange)邮件交换

![image-20220413130852300](http://i0.hdslb.com/bfs/album/003b94985607b0aeb397a12e70eedcf855698677.png)

DNS服务器中包含着这三种信息的纪录数据，客户端发送查询请求后会沿着表中的数据去比较找到对应的ip地址并返回。

## 响应状态码

每次客户端向服务端发送服务后，都会收到响应消息。响应消息中有一个状态码，主要用来向程序告知执行的结果。

| status code |           含义           |
| :---------: | :----------------------: |
|     1xx     | 告知请求的处理进度和情况 |
|     2xx     |           成功           |
|     3xx     |    表示需要进一步操作    |
|     4xx     |        客户端操作        |
|     5xx     |        服务端错误        |

### 常见HTTP头部

1. 通用头部字段： 请求和响应报文两者都会使用到的部分

* `Date` 表示请求或者响应生成的时间
* `Connection` : 发送响应后TCP连接是否继续保持（keep-alive/close)连接复用，需要配合`content-length`使用
* `Cache-Control` 控制缓存的相关信息

2. 请求头： 用于表示请求消息的附加信息的头字段

* `Referer` 纪录当前发送请求的网址（可以用来防止盗链）
* `User-Agent` 客户端软件的名称和版本号等相关信息
* `Accept` 客户端可支持的数据类型（Conten-Type),text/html,application/xhtml+xml,image/avif,image/webp
* `Accept-Encoding` 客户端可以支持的编码压缩格式：gzip,deflate
* `Accept-Language` 客户端支持的语言，zh-CN,zh,EN
* `Connection` : 

2. 响应头： 用于表示响应消息的附加信息的头字段

* `Content-Type` 表示消息体的数据类型（text/html)
* `Content-length` 响应体的长度（38493）
* `Content-Encoding` 响应体的压缩算法（gzip)
* `Server` 表示服务器程序的名称或者版本号
* `transfer-Encoding` 传输方式，一段段发，通常有这个头就没有content-length(chunked)
* `Last-Modified`: 该资源的最近修改时间（Tue, 12 Apr 2022 07:58:55 GMT）
* `Expires` 该资源的过期时间（Fri, 15 Apr 2022 04:31:27 GMT）资源过期之前浏览器可以使用缓存的版本，过期之后就必须重新请求资源
* `content-Disposition` :attachment; filename="cool.html" 当响应中有这个头的时候，浏览器会触发下载对话框
* `ETag`  "33a64df551425fcc55e4d42a148795d9f25f89d4" 资源的哈希值，可以帮助资源的更新，让缓存更加高效

### 自定义get函数

``` js
function get(url) {
	let xhr = new XMLHttpRequest();
	xhr.open("get", url, false);
	xhr.send();
	return xhr.responseText;
}
// 向指定的url发送get请求
```

## promise

* 举例

``` js
const isPregnant = false;
// 先定义好失败
const promise = new Promise(
	(resolve, reject) => {
		if (isPregnant) {
			resolve("孩子他爹");
		} else {
			reject("老公");
		}
	},
);
// 声明一个承诺,成功和失败分别对应不同的处理结果
promise
	.then(
		(name) => {
			console.log(`男人成为了${name}!`);
		},
	)
	// 成功后执行的函数
	.catch(
		(name) => {
			console.log(`男人成为了${name}!`);
		},
	)
	// 失败后的执行
	.finally(() => {
		console.log(`男人和女人最终结婚了!`);
	});
	// 最终的执行
```

* 图片加载的`promise` 示例

``` js
const imgAdress = "http://i0.hdslb.com/bfs/album/1d429705eaff37ead9adef2b8fd8d5fb119846a1.png";

// 返回一个 promise 的函数
const imgPromise = (url) => {
	return new Promise(
		(resolve, reject) => {
			const img = new Image();
			img.src = url;
			img.onload = () => resolve(img);
			img.onerror = () => reject(new Error("图片有误"));
		},
	);
};

// 函数调用这个地址,返回一个promise,接着对promise的两种状态处理
imgPromise(imgAdress)
    .then(img => document.body.appendChild(img))
    .catch(err => document.body.innerHTML = err);
```

``` js
sock = dgram.createSocket('udp4')
// 创建对象
sock.bind(8000)
// 绑定端口
sock.send('你好世界！',8000,'81.68.209.144')
// 一方发送消息(data,port,ip)
sock.setBroadcast(true)
// 允许设备UDP广播
sock.on('message',(data,info) => console.log(data.toString(),info))
// 监听消息，并输出
sock.addMembership('239.x.x.x')
// 加入频道
sock.send(data,8000,'255.255.255.255')
// 发送广播
sock.send(data,8000,'245.x.x.x')
// 发送组播
```


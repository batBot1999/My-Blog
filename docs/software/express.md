Express 基础入门

### 概述

`Express` 是一个`Node.js` 的`web` 框架,`Node.js` 是一个构建网络服务和应用很棒的工具.`Express` 是在其基础上api上,提供易于使用的功能,来满足`web` 服务器的使用需求.

它是开源且免费的,易于扩展,性能优良的,并且有很多预制包可供你直接使用,来执行各种事情.

#### 安装

你可以使用`pnpm`来安装`express` 到各种项目中

``` shell
pnpm i express --save
```

先创建一个空白目录,`CD` 到目录中,使用`pnpm init - y` 来创建 `package.json` 文件

![image-20211022180307295](http://i0.hdslb.com/bfs/album/8aec0fb34a1b53aeee7ce41740af1bad5c07b425.png)

<img src="http://i0.hdslb.com/bfs/album/1d429705eaff37ead9adef2b8fd8d5fb119846a1.png" alt="image-20211022180248806" style="zoom:67%;" />

#### Hello World

我们先来创建一个最简单的`hello world` 的web 服务器吧

这是以下代码:

``` js
const express = require('express')
cosnt app = express()

app.get('/', (req,res) => {
  res.send('Hello World')
})

app.listen(3000,() => console.log('服务运行在localhost:3000'))
```

将上述代码保存为 `app.js` 文件到你项目根路径中,并且开启服务

``` js
node app.js
```

此时打开浏览器到: `localhost:3000` 你会看到 `Hello World` 的信息.

![image-20211022181141179](http://i0.hdslb.com/bfs/album/756a3884c9ce3b3a90c49e5a3b685671cce0313f.png)

#### 通过学习 Hello World来理解 Express 的基础

上面四行代码在屏幕背后做了很多,

首先,我们导入了 `express` 的包到 `express` 值中,我们通过调用应用程序的 `app()` 方法来实例化一个应用程序.

一但有了应用对象,我们通过使用 `app.get()` 来告诉它在 `/ `路径上监听 `get` 请求.

每一个`http` 动词都有一个方法: `get()` ,`post()` ,`put()` ,`delete()` ,`path()` :

``` js
app.get('/',(req,res) => { /* */})
app.post('/',(req,res) => { /* */})
app.put('/',(req,res) => { /* */})
app.delete('/',(req,res) => { /* */})
app.path('/',(req,res) => { /* */})
```

当一个请求开始被调用的时候,我们通过使用一个回调函数来处理它们;

我们使用一个箭头函数:

``` js
(req,res) => res.send('Hello World')
```

`Express` 在这个回调函数中给我们提供了两个对象,分别是 `req` 和 `res` ,我们称为 "请求对象" 和 "响应对象"

`Request` 是 `http` 请求,它可以提供给我们所有的信息,包括: 请求参数,请求头,请求体等等....

`Response` 是我们发给客户端的响应对象,我们在这个回调中所作的就是使用 `Respone.send() ` 方法将 `Hello world ` 字符串发送给客户端

这个方法将此字符串设置为正文,并且关闭了链接

第四行代码实际上启动了服务器,并且告诉它监听 `3000`端口上的服务.

### 请求参数

一份关于各种请求对象属性以及使用说明:

#### 请求参数

前面我提到了 `Request` 对象如果保存所有的HTTP请求信息.

一下属性你可能会经常用到:

| Property       | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| .app           | 包含对Express应用对象的引用                                  |
| .baseUrl       | 每一个应用相应的基础路径                                     |
| .body          | 包含在请求正文中所提交的数据(必须在访问前手动解析和填充)     |
| .cookies       | 包含请求所返送的cookies(需要cookie-parser中间件)             |
| .hostname      | 服务器主机名                                                 |
| .ip            | 服务器ip                                                     |
| .method        | 使用的HTTP方法                                               |
| .params        | 路由命名的参数                                               |
| .path          | URL 路径                                                     |
| .protocol      | 请求协议                                                     |
| .query         | 一个包含请求中使用的所有查询字符串的对象                     |
| .secure        | 如果请求时安全的(使用HTTPS)                                  |
| .signedCookies | 包含由请求发送的已签名的cookies (需要`cookie-parser` 中间件) |
| .xhr           | 如果请求是`XMLHttpRequest` 为true                            |

#### 如何使用Express查询GET查询字符串参数

查询字符串是在URL路径之后的部分,以问好"?"开头.

例如:

``` js
?name=Jack
```

使用 `&` 来添加多个查询参数

``` js
?name=Jack&age=35
```

如何在Express中获取这些查询字符串的值?

Express通过为我们提供了 `Request.query` 对象使其获取变得非常简单

``` js
const express = require('express')
const app = express()

app.get('/',(req,res) => {
  console.log(req.query)
})

app.listen(8000)
```

这个对象为每一个查询参数填充一个属性.

如果没有查询参数,它就是一个空对象

这样的话就可以很容易的使用 `for...in` 循环对它进行迭代.

``` js
for (const key in req.query) {
  console.log(key,req,query[key])
}
```

然后就会打印出每一个查询参数的键和值

你可以这样访问每一个单独的属性;

``` js
req.query.name		// Jack
req.query.age 		// 35
```

<img src="http://i0.hdslb.com/bfs/album/8b4d902c035355585c550a73963d8cf66989838e.png" alt="image-20211023125901370" style="zoom:80%;" />



####  如何使用Express查询Post查询字符串中的参数

post查询参数是由`http` 客户端发送的,例如通过表单,或在执行发送数据的post请求发送数据.

那么我们如何访问这些数据了?

如果发送的是 JSON 数据, 使用 `conten-type : application/json`,你将会使用 `express.json()` 这个中间件:

``` js
const express = require('express')
const app = express()

app.use(express.json())
```

如果数据作为JSON发送, 使用 `Content-Type: application/x-www-form-urlencoded` 你将会使用` express-urlencoded() `中间件:

``` js
const express = require('express')
const app = express()

app.use(express.urlencoded())
```

在这两种情况下,你都可以通过引用` Request.body` 中的数据来访问他:

``` js
app.post('/form', (req,res) => {
  const name = req.body.name
})
```

> 注意: 旧版的Express需要使用body-parser模块来处理post 数据,从Express 4.16(2017年9月发布)开始,这种情况就不存在了



































### 中间件

中间件是一个在路由处理过程中的勾子函数,在某些时刻执行一些操作,这取决于你想让它做什么.

它通常用来编辑请求或相应对象,或在请求到达路由处理程序之前终止请求.

它像这样被添加到执行堆栈中:

``` js
app.use((req,res,next) => { /* */ })
```

我们通常要在中间件函数的末尾调用 `next()` ,用来传递给下一个处理程序,除非我们像过早的结束响应.并把它发送给客户端.

我们通常使用`npm` 包中预制好的中间件,这是一个[中间件列表](https://expressjs.com/en/resources/middleware.html)

一个例子是 `cookie-parser` ,它被用来解析 `cookie` 到`req.cookie` 对象,使用 `npm install-parser` 来安装它,你可以这样使用:

``` js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.get('/',(req,res) => res.send('Hello World!'))

app.use(cookieParser())
app.listen(3000, () => console.log('Server ready'))
```

你也可以设置一个中间件函数只为特定的路由运行,而不是所有路径运行,方法是把它作为路由定义的第二个参数:

``` js
const myMiddleWare = (req,res,next) => {
  /* */
  next()
}

app.get('/', myMiddleWare, (req,res) => res.send('Hello World!'))
```

如果你需要存储一个中间件中生成的数据,以便将其传递给后续的中间件函数或请求处理程序.你可以使用 `Request.local` 对象.它将该数据添加到当前请求中.

``` js
req.locals.name = 'Jack'
```

### 静态文件服务

**如何在Express中从文件夹中提供静态文件资源了?**

我们一般在一个单独的 `public` 文件夹中放置图片,CSS文件,并且把他们暴露在根路径下.

``` js
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

/* ...*/

app.listen(3000, () => console.log('Server ready'))
```

如果你有一个 `index.html` 文件在 `/public` 中,点击 `http://localhost:3000`这将地址你会看到对应的文件

这个 `__dirname` 变量是一个字符串,其中包含了项目根目录的绝对路径,必须要和包含静态文件的路径相连接配合

### 发送文件

Express 提供了一个简单的方法来传输文件作为附件, `Response.download()` 

一旦用户点击了使用该方法发送文件的路由,浏览器将会提示用户下载文件.

`Response.download()` 方法允许你去发送一个附加在请求中的文件.并且浏览器不会在页面中显示该文件,而是将其保存到磁盘中

``` js
app.get('/',(req,res) => res.download(__dirname + './file.pdf'))
```

应用程序:

``` js
const express = require('express')
const app = express()

app.get('/',(req,res) => res.download(__dirname + './file.pdf'))
```

这个方法也提供了一个回调函数,一但文件被发送后,你可以用这个回调函数来执行对应的代码:

``` js
res.download('./file.pdf', 'user-facing-filename.pdf', (err) => {
  if(err) {
    // handle error
    return 
  } else {
    // do something
  }
})
```























































###  处理表单的post请求

如果使用express处理表单?

下面是一个 `HTML` 表单的例子:

``` html
<form method="POST" action="/submit-form">
	<input type="text" name="username" />
	<input type="submit" />
</form>
```

当用户按下提交按钮,浏览器将会自动发送一个 `post` 请求到与页面同源的 `/submit-form` 链接中,发送其中的数据.

当编码为 `application/x-www-form-urlencoded` 时,表单数据包含了用户输入字段的值.

表单也可以使用 `get` 方法发送数据,但是绝大多数的表单都是使用 `post` 方法

表单数据将会被放置在 `post` 请求体中正文中

为了解析`post` 请求,你将会使用Express提供的 `express.urlencoded()` 中间件

``` js
const express = require('express')
const app = express()

app.use(express.urlencoded())
```

现在你需要在 `/submit-form` 路由上创建一个Post端口,任何数据都将可以在 `Request.body` 上获得.

``` js
app.post('/submit-form', (req,res) => {
  const username = req.body.username;
  // ...
  res.send()
})
```

不要忘记在使用数据之前用 `express-validator` 来验证它.

### 表单文件上传

如何在Express中管理存储并且处理通过表单上传的文件

这是一个允许用户上传文件的`form` 表单的`html` 例子:

``` html
<form method="POST" action="/submit-form">
	<input type="file" name="document" />
	<input type="submit" />
</form>
```

当用户点击了提交按钮,浏览器会自动发送一个 `post` 请求到与页面同源 的`/submit-form` 地址,发送其中包含的数据,不是编码成 `application/x-www-form-urlencoded` 的正常形式,而是作为 `multipart/form-data` .

在服务器端,处理各种各样杂乱的数据会很麻烦,而且会容易出错,所以我们需要使用一个实用库叫做: `formidable` 这是[github](https://github.com/felixge/node-formidable)链接

你可以这样来安装使用: 

``` js
pnpm i formidable
```

接着,在你的Node.js文件中添加它:

``` js
const express = require("express")
const app = express()
const formidable = require('formidable')
```

现在在 `/submit-form` 路线的 `post` 端点,我们使用`formidable.Incoming From()` 实例化了一个新的`for秒不了表单:

``` js
app.post('/submit-form', (req,res) => {
  new formidable.IncomingFrom()
})
```

做完了以上的配置,我们需要解析这个表单,我们可以通过提供一个回调来做异步操作,这代表着所有的文件都会被处理,一但`formidable` 完成,它就会让他们可用.

``` js
app.post('/submit-form', (req, res) => {
	new formidable.IncomingFrom().parse(req, (err, fields, files) => {
		if (err) {
   		console.error('Error', err)
			throw err
		}
			console.log('Fields', fields)
			console.log('Files', files)
			files.map(file => {
			console.log(file)
		})
	})
})
```

或者你可以使用事件而不是回调,在每一个文件被解析时候得到通知,以及其他的事件,比如结束处理,收到一个非文件字段,或者发生错误.

``` js
app.post('/submit-form', (req, res) => {
  new formidable.IncomingFrom().parse(req)
    .on('field', (name, field) => {
      console.log('Field', name, field)
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    })
    .on('aborted', () => {
      console.error('Request aborted by the user')
    })
    .on('error', (err) => {
      console.error('Error', err)
      throw err
    })
    .on('end', () => {
      res.end()
    })
})
```

不论你选择什么方法,你都会得到一个或多个`Formidable.File` 对象,它给你提供了有关上传文件的信息,以下是你可以调用的一些方法.

* `file.size` , 以字节为单位的文件大小
* `file.path` ,被写入的文件的路径
* `file.name` ,文件名
* `file.type` ,文件类型

该路径默认为来临时文件夹,如果你监听了 `fileBegin` 事件时可以修改.

``` js
app.post('/submit-form', (req, res) => {
  new formidable.IncomingFrom().parse(req)
    .on('fileBegin', (name, file) => {
      form.on('fileBegin', (name, file) => {
        file.path = __dirname + '/uploads/' + file.name
      })
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    })
  //...
})
```


## 前言

> 本书大部分内容是根据原作者 Fiavio 所写的《React-beginners-handbook》所翻译而来,有一些内容概念发生了改变,加入了自己的学习认知和看法.希望自己通过翻译对所学知识进行总结并进行输出以提高自己的掌握程度,也希望能给您提供一些价值.
>
> 本人能力水平有限,如果遇到错误请谅解 😀
> 原作者网址: https://flaviocopes.com/ 你可以阅读原版书籍
> 译者: 就叫阿 J

《React 初学者手册》这本书遵循"二八定律": 使用 20%的时间,学习 80%的知识.

我发现这种方法提供了一个很好的概述.

这本书并不是要教授所有关于 React 的大而全的知识,它只关注与语言的核心,尽量简化复杂的内容.

我希望本书的内容将会帮助你获得你想要的: "学会 React 的技术知识"

本书的作者是 Fiavio, \*\*我每天会在我的个人网站 https://flaviocopes.com/ 上分享推送我的网页开发教程.

你可以在推特@flaviocopes 上找到我

享受吧!

## React 简介

本书的总是是提供一个 React 入门学习指南

在本书的结尾,你将会对以下内容有一个基础的认知

- React 是什么? 为什么如此流行?
- 如何安装 React
- React 概念: 组件
- React 概念: 状态
- React 概念: Props
- 处理 React 中的用户事件
- React 组件中的生命周期事件

以上内容将会是你在其他高级 React 课程中的前置基础,本书主要面向刚开始基础 React 的前端开发人员.React 是一个 JavaScript 库,旨在简化图形界面的开发.它由 Facebook 开发,2013 年发布,被包括 Facebook 和 Instagram 以及其它无数应用产品广泛使用.

React 的主要宗旨是,将应用界面拆分成一系列的组件,便于理解界面及其应用状态.

你刚开始学习 React 可能感觉有点难,但只要你坚持下去,我保证你将会有最好的体验之一.因为 React 比以往大大简化了前端开发的难度,并且其周边生态中有很多好用的库和轮子.

React 自身仅有很小的 API,你刚开始只需要理解 4 个基本概念:

- 组件
- JSX
- State
- Props

在本书中我们将会探讨以上几个问题,关于其他高级概念去其他学习资料中寻找.

## 使用 React 前你需要知道的 JS 知识?

在直接学习 React 之前,你需要了解一些 JavaScript 核心概念

- [变量](https://flaviocopes.com/javascript-variables/)
- [箭头函数](https://flaviocopes.com/javascript-arrow-functions/)
- [使用 Rest 运算符和 Spread 运算符来处理对象和数组](https://flaviocopes.com/javascript-rest-spread/)
- [对象和数组的结构](https://flaviocopes.com/javascript-destructuring/)
- [模板字符串](https://flaviocopes.com/javascript-template-literals/)
- [类](https://flaviocopes.com/javascript-classes/)
- [回调函数](https://flaviocopes.com/javascript-callbacks/)
- [Promise](https://flaviocopes.com/javascript-promises/)
- [Async/Await](https://flaviocopes.com/javascript-async-await/)
- [ES6 模块化](https://flaviocopes.com/es-modules/)

如果你还不太了解以上概念,我给你提供了一些链接来找到更多以上主题的信息

## 为什么你要学习 React?

我强烈建议所有前端开发人员对 React 有一个基本认知:

有以下几个原因:

1. React 非常流行,作为一个开发者,你工作上会有很大概率遇到 React 项目,或者你的团队想要基于 React 技术栈开发新项目
2. 如今很多的工具库都是以 React 为核心构建的,流行的框架和工具比如: Next.js,Gatsby 和许多其他工具都是基于 React
3. 做为前端工程师,React 在工作面试的时候很可能会被问到

这些都是原因,但是我想让你学习 React 的原因之一是: React 很棒,开发理念和体验很好,包括代码可复用性,组件化开发,速度相应快,轻量级并且由于是数据驱动,完美的适应许多常见的场景.

## React 安装

有几种不同的方法来安装 React,首先强烈推荐一种方法,那就是使用官方推荐工具: `create-react-app` ,这是一个命令行应用,可以让你短时间内上手 React.

首先使用`npx` ,这是一个简单的方法可以让你下载和执行 Node.js 命令并且无需安装,

> 可以看我的`NPX` 教程https://flaviocopes.com/npx/)

`npx`是和`npm`(从 5.2 版本开始)一起绑定的,如果你现在还没有安装`npm` 你可以现在就从 https://nodejs.org,官网开始下载,(`npm`是`Node`自带的包管理工具),如果你不知道你安装的`npm`版本,可以使用`npm - v` 命令查看版本号来检查是否是需要更新.

> 注意: 如果你还不熟悉终端命令行的使用,可以来我的网站查看`osx` 教程,适用与`Mac` 和`Linux` 网址: https://flaviocopes.com/macos-terminal/

当你运行`npx create-react-app <app-name>` 的时候,`npx` 会下载并运行最新的`creat-react-app` 版本,并且删除掉旧版本.这点很好因为你不会想在你每次跑程序的时候,电脑里还装着旧版本.

你可以使用最新最棒的代码

那我们开始了:

> `npx create-react-app todoList`

<img src="http://i0.hdslb.com/bfs/album/5460db5c4188f63235f902c9eac200f1ebcbc783.png" alt="image-20210927110637178" style="zoom:67%;" />

此时已经完成了运行:

<img src="http://i0.hdslb.com/bfs/album/d75b3e959d5416a79e811319366c32e7358eb490.png" alt="image-20210927110748433" style="zoom: 67%;" />

`create-react-app` 命令在你创建的文件夹中生成了一个一些文件,并且初始化了一个`GIt` 仓库,它还在软件包中添加了一些命令文件

<img src="http://i0.hdslb.com/bfs/album/1aa2dbc5f92828c40eef9aa91eb459cc7f250d2f.png" alt="image-20210927111049870" style="zoom:67%;" />

现在你就可以进入你新建的应用程序文件夹中,运行`npm start`命令立即启动该应用程序

<img src="http://i0.hdslb.com/bfs/album/e7e8f982d370b7bee6c8c942e34fba4e5d4652b0.png" alt="image-20210927111417647" style="zoom:67%;" />

默认情况下,这个命令会在本地 3000 端口运行,在你的浏览器打开这个地址将会显示欢迎界面.

<img src="http://i0.hdslb.com/bfs/album/cfccd3909645c873f87fa03ad1238bb9787386f1.png" alt="image-20210927111631544" style="zoom:67%;" />

现在你已经可以在这个应用程序里工作了!

现在介绍第二种方法: 使用`pnpm`和`vite2` 来安装`React` ,是译者本人自己常用的方法,速度更快体验更好

> `pnpm` 就是和`npm` `yarn` 一样的包管理工具,其最大的优点就是速度及其快,依赖安装对于磁盘空间利用率也比较高,正常使用比`npm` 快至少两倍,`pnpm` 的所有命令和`npm` 一样,只需要开头加一个`p`
>
> 安装: `npm i pnpm -g`

> `vite` 是`vue`作者尤雨溪开发的前端构建工具,能够大幅度提高前端开发体验,服务启动,依赖安装速度飞快

现在开始:

> `pnpm init vite@latest`,并输入项目名称

![image-20210927113047699](http://i0.hdslb.com/bfs/album/5a26351fad6982cb85174a991a2b7ed0da2a1ba8.png)

选择 React 项目

![](http://i0.hdslb.com/bfs/album/0ab9e8a4b1dbae5c129d06160662c8961eb5d3b3.png)

![image-20210927113223619](http://i0.hdslb.com/bfs/album/a2c5c6a9a51494ed80defbe79f2deb332cc4e9fa.png)

初始化完成后,按照提示,输入对应的命令,安装依赖文件

<img src="http://i0.hdslb.com/bfs/album/3ec44b19b355d4470724a7e0f587a9b620b97df7.png" alt="image-20210927113523967" style="zoom:50%;" />

在这里可以看到不到一秒钟,所有的依赖文件都已经安装完毕,可以说速度很快了

> `pnpm dev` 启动服务器
>
> 在浏览器中打开给定的本地端口地址

<img src="http://i0.hdslb.com/bfs/album/e941644d99766d42c115ea2164efce38a9ed0383.png" alt="image-20210927113725818" style="zoom: 80%;" />

<img src="http://i0.hdslb.com/bfs/album/32ed231ef43bbfebb33f9d27fdb05467547ae7bb.png" alt="image-20210927113916800" style="zoom:67%;" />

React 应用已经开始运行了

## React 组件

刚才你已经看到了如何创建你的第一个 React 应用了,这个应用中包含一系列的文件,可以做各种各样的事情,取决于你自己如何配置,其中有一个文件很重要:`App.jsx`

`App.jsx` 是你遇到的第一个 React 组件

代码如下:

```jsx
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
```

一个由 React 构建的应用,或者说其他的流行框架类似于 Vue 和 Svelte 都是由几十个组件所组成.

现在我们来分析下这第一个组件.我们可以把这个组件尽可能的简化成下面的样子:

```js
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return; /* something */
}

export default App;
```

在这你可以看到一些东西,我们首先导入了几个"东西",并且导出了一个叫 `App` 的函数,在例子中,我们导入的东西包括: Javascript 库文件(`react` 的`npm` 包文件),一个 SVG 图像,和一个 CSS 文件

> `create-react-app` 的默认配置允许我们导入图像和 CSS 文件以便我们在 JavaScript 中使用,但这并不是我我们需要关心的事情,我们仅需要关注组件的概念

`App` 是一个函数,在原来的例子中,它返回的东西乍看起来很奇怪,它看起来像是`HTML` 但是又在里面嵌入了`JavaScript` 代码.

这就是 `JSX` ,一种用来构建组件进行输出的特殊语言,下一章节我们会更多的聊`JSX`

一个组件除了定义需要返回的 JSX 之外,还有其他几个特征

组件可以有自己的 `state` (状态),这意味着它封装了一些其他组件无法访问的变量,除非这个组件主动暴露给应用的其他部分.

组件也可以从其他组件中接受数据,这种情况我们称它为 `props`

别担心,我们很快就会详细的了解这些术语(JSX, State 和 Props).

# JSX 简介

说到 React 就不得不提及 `JSX` ,你看到的第一个 React 组件, `App` 组件就是由`create-react-app` 这个默认应用定义的,它的代码时这样的:

```js
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
```

之前我们忽略了`return` 里面声明的东西,在本章节中我们将会讨论这些

我们把组件中所有包裹在括号里面返回的内容称为 JSX.这些东西看起来像 `HTML` 但并不是真正的 `HTML` .还是有点不同的地方,并且就算把这段代码放在`JS` 文件中,一点也不像`JavaScript`

代码背后,React 将会对这些`JSX` 进行处理,并将其转译成浏览器能够解释的`JavaScript` 代码.

虽然我们在编写 `JSX` 代码,但是最后有一个转译步骤,是其能够被`JavaScript` 解释器所执行.

React 给了我们这个接口,原因之一就是: 更容易使用`JSX` 来构建`UI` 界面,当然,你只要对它稍微熟悉点就够了

下一小节中,我们将讨论`JSX` 如何让你更容易的构建`UI` 界面,然后我们将看看你需要知道其与正常`HTML` 的区别之处.

# 使用 JSX 来组件 UI

正入上一节所提到的,使用`JSX` 的主要好处之一就是可以非常容易的建立一个 React 组件.特别是,在 React 组件中,你可以导入其他的 React 组件,也可以嵌入并显示他们.

一个 React 组件通常是在它自己的文件中创建的,因为这样我们可以很容易的在其他组件中(通过导入)进行复用.

但一个 React 组件也可以通过另一个组件的同一个文件来创建.如果你打算只在这个组件中使用它,也并没又什么规定,你自己感觉不错就行.

当一个文件的行数变得太多了的时候,我一般会使用单独的文件.

为了尽可能的简单,我们先创建一个相同的组件: `App.js`

我们接着创建一个`WelcomeMessage` 的组件:

```js
function WelcomeMessage() {
  return <p>Welcome!</p>;
}
```

看到没?这个简单的函数返回了一行代表`p` `HTML` 的元素的`JSX` ,我们将会添加它刀这个 `App.js` 文件.

现在我们可以在 `App` 组件的 `JSX` 中添加这个 `<Welcome Message/>` 在用户界面中显示

```js
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function WelcomeMessage() {
  return <p>Welcome!</p>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <WelcomeMessage />
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
```

现在这是结果,你应该能在屏幕中看到这个 `Welcome` 信息.

<img src="http://i0.hdslb.com/bfs/album/4d3f479e9833ed64f2743bf89e303b1f62fab238.png" alt="image-20210930171252350" style="zoom:67%;" />

我们把这个应用中的 `WelcomeMessage` 称为"子组件", `App` 就是它的父组件.

我们添加这个 `<Welcome Message>` 组件就像它是 `HTML` 语言一样,这就是 React 组件和 `JSX` 的美妙之处: 我们可以就像写 `HTML` 页面一样,用它们去构建应用界面.

关于一些不同的地方,我们会在下一章节中介绍.

# JSX 和 HTML 的不同之处

`JSX` 看起来很像 `HTML` ,但他并不是.这个章节中,我想给你介绍一些使用 `JSX` 时候你必须要知道的重点.

如果你仔细看 `App` 组件中的 `JSX` 元素,会发现一个地方明显有不同: 有一个奇怪的属性叫做: `class Name` .

在 `HTML` 中,我们称为"class"属性,诸多原因,这个属性用的非常多,其中一个原因是 `CSS` , `class` 属性让我们很容易对 `HTML` 属性设置各种各样的样式,像`Tailwind` 这种`CSS` 框架把这个属性放在了用户设计界面的中心位置.

但是有个问题,我们在`JS` 文件中写`UI` 代码,但是在`Javascript` 这门编程语言中,`Class` 是一个关键字,这意味着我们不能随便使用这个关键字,它有个特定的用途(定义`JavaScript` 类) ,所以 React 的作者不得不为他选择一个不同的名字.

这就是我们最后要用`class Name`而不是`class` .当你直接复制/粘贴`HTML` 代码片段的时候,你需要牢记这一点,

React 将会尽力保证不出错,但它会在开发者工具中提供一些报错提醒.

![image-20210930195839507](http://i0.hdslb.com/bfs/album/3a5ee74cf87fc39363414b60f9c2b67d25893074.png)

这并不是唯一存在这个问题的 `HTML` 功能,但却是最常见的一个.

另一个 `JSX` 和 `HTML` 的不同之处是,`HTML` 语法很宽松,我们可以说,即使你在语法上有错误,或者你标签对闭合错误,或者有一个不匹配的.浏览器也会尽力去解释`HTML` 不会让它错误.

这是网页的重要特点之一,它很宽松.

`JSX` 就不那么宽松了,如果你忘了闭合标签,你会直接收到一个报错.

<img src="http://i0.hdslb.com/bfs/album/9b33d1735df7cb87388aa8a3a7bb9e1a799a7370.png" alt="image-20210930200611990" style="zoom:67%;" />

> React 一般会给出友好并且信息详尽的错误提示,这会帮你更好的解决问题

另一个较大的不同之处在于在 `JSX` 和 `HTML` 中我们可以插入`js` 代码.

我们会在下一章节中聊一聊这方面.

# 在 JSX 中编写 JavaScript

React 的最棒的一个特点就是:React 允许我们在`JSX` 中编写`JavaScript` 代码并嵌入.

其他诸如`Angular` 和 `Vue` 框架,有他们自己特定的方式来输出模板中中的`JavaScript` 值,或者执行循环这样的事情.

React 并没有增加新的东西,相反,它通过使用大括号,来让我们在`JSX` 中使用`Javascript`

我直接拿我们之前研究的 `App` 组件当例子来向你展示:

我们通过这样来导入这个 `logo` 的 SVG 文件

```js
import logo from "./logo.svg";
```

接着我们在 `JSX`中给这个 SVG 文件中的`img` 标签 `Src` 属性.

```js
<img src+{logo} class="App-logo" alt="logo" />
```

再举个列子,假设 `App` 组件有一个变量叫做 `message`

```js
function App() {
  const message = "Hello!";
  //...
}
```

我们可以通过在 `JSX` 中添加 `{message}` 来输出他的值,在花括号 `{}` 中,我们可以添加任何 `Javascript` 语句,但每一个大括号都要有一个语句.接着这个代码语句必须有返回值.

例如:这是一个在 `JSX` 中常见的语句,我们有一个三元操作符,我们定义了一个条件( `message=== hello` ),如果判断为真,就输出一个值,判断为假,则打印另一个值(指本例中 `message` 的内容)

```js
{
  message === "Hello!" ? "true" : "false";
}
```

# React 状态管理

每一个 React 组件都有自己的 `state` (状态),这里所说的 `state` 是什么意思? `state` 是由组件管理的一组数据.

举个例子,想象下一个表单,表单中的每一个独立输入元素,都需要负责管理其对应状态: "表单内写了什么"

当一个按钮没有被聚焦时,需要负责知道自己是否被点击了,一个超链接需要负责知道自己是否被鼠标悬停过,在 React 或其他任何基于组件的框架和库中,我们所有的应用程序都基于并大量使用组件的状态.

我们使用 React 提供的 `usestate` 工具来管理状态.这是一个钩子(现在你还不用知道钩子的细节,但他就是这样用的)

你先用这种方式来从 React 中导入`useState`

```js
import React, { useState } from "react";
```

通过调用 `useState()` ,你将会得到一个新的状态变量,和一个我们可以调用的函数来改变其值.

`useState()` 接受状态项的初始值,并返回一个包含状态变量的数组.以及可以用来改变状态的函数.

例如:

```js
const [count, setCount] = useState(0);
```

这很重要,我们不能直接改变一个状态变量的值,必须调用它的修改器函数.否则 React 组件将不会根据数据的变化更新 UI 界面.调用修改器函数是我们告诉 React 组件状态已经发生改变的方式.

语法有点奇怪,对嘛? 由于`useState()` 返回一个数组,我们使用数组结构语法来访问每一个单独项目.像这样: `const [count, setCount] = useState(0)`

下面是一个实际的例子:

```js
import { useState } from "react";
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Clickme</button>
    </div>
  );
};

ReactDOM.render(<counter />, document.getElementById("App"));
```

只要你想,你可以添加任意多的 `useState() `调用 ,来创建任意多的状态变量

```js
const [count, setCount] = useState(0);
const [anoterCounter, setAnoterCounter] = useSta;
```

# React 组件 Props

我们把传递给组件的初始值称为 `props` ,在之前我们创造过一个 `welcomeMessage` 组件

```js
function WelcomeMessage() {
  return <p>Welcome!</p>;
}
```

接着我们这样来使用它:

```js
<WelcomeMessage />
```

这个组件并没有任何初始值,它并没有 `props`, `props` 可以在作为属性传递给 JSX 中的组件.

```js
<WelcomeMessage myProp={"somevalue"} />
```

然后在组件内部,我们接受 `props` 作为参数

```js
function WelocmeMessage(props) {
  return <p>Welcome!</p>;
}
```

我们经常会使用:"对象的解构" 来获取 `props` 的名称

```js
function WelcomeMessage({ myprop }) {
  return <p>Welcome!</p>;
}
```

现在我们有了`prop` ,我们可以在组件的内部使用它,例如: 我们可以在`JSX` 中打印它的值:

```js
function WelcomeMessage({ myprop }) {
  return <p>{myprop}</p>;
}
```

这里的大括号由多种含义,在函数参数的情况下,大括号是作为对象解构语法的一部分使用的,接着我们用它们来定义函数代码块,最后在 JSX 中打印 `JavaScript` 值.

向组件传 `props` 是在你的应用程序中传递数据的好方法.一个组件要么持有数据要么通过 `props` 来接受数据.

我们也可以把函数作为 `props` 来传递,所以一个子组件可以在一个父组件中调用一个函数.

一个特殊的 `props` 叫做`children` 它包含在组件的开头和结尾标签之间传递任何东西的值,例如:

```js
<welcomeMessage>Here is some message</welcomeMessage>
```

在这个例子中, 在 `WelcomeMessage` 内部,我们可以通过使用 `children` 来访问 `Here is some message` 的值.

```js
function WelcomeMessage({ children }) {
  return <p> {children}</p>;
}
```

# React 应用中的数据流

在 React 应用中,数据通常从父组件流向子组件,正如我们在上一节看到的那样,使用 `props`

```js
<WelcomeMessage myprop={"somevalue"} />
```

如果你向子组件传递一个函数,你就可以改变从子组件上改变父组件的状态.

```js
const [count,setCount] = useState(0)
<Counter setCount = {setCount} />
```

# React router

很多现代网站实际上是只有一个页面构成也称为 `spa` 单页面应用程序，用户请求网站时，网站返回一整个的 `js` 和 `html` 文件，当用户在某个页面内点击的时候，需要告诉浏览器怎么加载另一个页面地址。由于页面只有一个 `index.html` 文件，所有浏览器自带的 `<a>` 标签并不能做单页应用的跳转，所有需要 `react-router`来实现路由功能。 **`React router` 就是根据 `url` 中的路由地址来有条件的渲染组件。**

前端路由：

```js
history.pushState({}, "test", "/test-page1");
window.onpopstate;
```

``` sh
location.hash   # 这个对象上有当前页面的路由地址，也可以设置其值手动修改
```

## BrowserRouter

最常用的全局路由之一，最外层的 `Api` 通常就是使用 `BrowserRouter` ,其内部实现是用了 `history` 这个库和 `Context` 来实现的，当用户前进后退的时候， `history` 这个库会记住用户的历史纪录，这样要跳转的时候可以直接操作。

`BrowserRouter` 使用的时候，通常用来包住其他需要使用路由的组件，一般使用在应用的最外层。

``` js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invoices from "./routes/expenses";
import Expenses from "./routes/expenses";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

## IndexRoutes

什么是`IndexRouter` ?

* 索引路由在父路由路径上的插槽中渲染
* 当父路由匹配但其他子路由都不匹配的时候，索引路由匹配
* 索引路由是父路由的默认子路由
* 当用户尚未单击导航列表中的某个项目时，将呈现索引路由

### BrowerRouter

会根据浏览器的支持程序选择使用 `HashRouter` 还是 `HistoryRouter`, `MemoryRouter` 不会将路由地址展示在地址栏上。

## 路由匹配模式

### Hash模式

最早期的前端路由是基于`location.hash` 来实现的，`hash` 模式情况下，默认将前端路由的路径用井号 `#` 拼接在真实后端 `url` 后面的模式，当井号 `#` 后面的路径发生变化的时候，浏览器并不会重新刷新页面，而是触发 `onhashchange` 事件。

### 特点

* `hash` 的 `#` 号永远不会提交到 `server` 端
* `hash` 可以改变 `url` 但是不会使页面重新加载（ `hash` 的改变是记录在 `window.history` 中）

### history 模式

history Api是 html5 提供的新特性，允许开发者直接修改前端路由，即更新浏览器的 `url`地址而不重新发起请求。

### 前端路由怎么去掉 # 号

`#` 号是由于前端路由默认处于 `hash` 模式下，在哈希模式下默认就是有 `#` 在 `url` 上面的，

* 前端框架中使用 `history` 模式
* 后端服务器 `nginx` 中需要单独配置 location，指定路径映射到资源文件所在的根目录
* 文件打包的时候的要配置`assetPublicPath` 调整静态资源路径，否则默认 `/` 路径，资源文件无法加载出来

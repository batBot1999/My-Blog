# React 学习

## 特性

- 单向数据流
- 数据驱动免除了 操作`dom`树，`React `负责操控
- 组件化，多处复用

## JSX 简介

### JSX 属性

JSX 元素也可以像 HTML 元素一样拥有属性,一个 JSX 属性使用类似 HTMl 语法编写,一个名称后面跟着一个等于号,接着是一个值,这个值应该用一对引号将其包裹,像这样:

```jsx
my-attribute-name = "my-attribute-value"
```

下面是一些带属性的 JSX 元素

```jsx
<a href="http://www.example.com">Welcome to the Web</a>;

const title = <h1 id="title">Introduction to React.js: Part I</h1>;
```

一个单独的 JSX 元素可以像 HTML 一样有很多元素

```jsx
const panda = <img src = 'images/panda.jpg' alt = 'panda' width = '500px' height = '500px'>
```

JSX 外部元素有个规则:一个 JSX 表达式只能有一个最外层元素.

以下代码可以解析:

```js
const paragraphs = (
  <div id="i-am-the-outermost-element">
    <p>I am a paragraph.</p>
    <p>I, too, am a paragraph.</p>
  </div>
);
```

但是这个代码就无法解析了

```jsx
const paragraphs = (
  <p>I am a paragraph.</p>
  <p>I, too, am a paragraph.</p>
);
```

所以 JSX 表达式最外层最好用`<div></div>` 标签包裹

## 元素渲染

`ReactDOM`是一个`JavaScript` 库的名字,这个库中包含了几个`React`特有的方法,这些方法大部分都是用来处理`DOM`元素的.

`ReactDOM.render()` 是渲染 JSX 最常用的方法,它接受一个 JSX 表达式,创建一个对应的 DOM 节点树,并且将该树添加到 DOM 中.

参数一: JSX 表达式,它将被渲染到屏幕上

```jsx
ReactDOM.render(<h1>Hello world</h1>, document.getElementById('app')),
```

### 列表渲染

使用原生的 `map` 来进行,重复渲染的是哪一个模板就 `return ` 谁

**注**： 遍历列表的时候同样需要一个类型为 `number/string` 的不可重复的 `key` 来提高 `diff` 性能

`key` 不会被渲染到真实 `dom` 中，仅仅存在于 `React` 中

```jsx
const names = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王"];

export default function testDemo() {
  return (
    <div>
      <p>列表渲染</p>
      <ul>
        {names.map((i) => (
          <li key={i}>老{i}头</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 条件渲染

- 使用三元运算符
- 使用逻辑与运算符

```jsx
export default function CanSmoke(props) {
  const age = props.age;
  return (
    <div>
      <h1>Hello!</h1>
      {age > 18 && <h3>you can somoke!</h3>} // 与运算符,年龄大于18岁可以抽烟
    </div>
  );
}

// main.jsx
<Condition age={28} />;
```

![image-20220523205938204](http://i0.hdslb.com/bfs/album/51e4da8a8196348063ad5a449d76ca68c22fa45f.png)

### props 和 state

`props` 是组件对外的接口，`state` 是组件对内的接口。

![image-20220529163210629](http://i0.hdslb.com/bfs/album/496fcbceac0fc0ffb1a3902ad925ebf59e9dce64.png)

**props**

- `props` 也叫做属性
- 属性一定是从上层元素自上而下的传递下来
- 属性是只读的，不能组件内部修改 `props` 只能在该组件的上层组件中修改

**state**

- `state` 也叫做状态
- 可以理解为组件自身存储的私有变量

**单向数据流**

> 避免了数据在组件中来回传递

```txt
graph TD
	A[<父组件>] --> |数据| B[<子组件>] -->|更新界面| A
```

## 组件生命周期

#### componentDidMount( )

组件挂载后立即执行的操作，有很多依赖于 DOM 节点初始化的操作放置在这里。如：通过网络请求资源，或者加载事件监听器。

#### componentWillUnmount( )

在组件卸载或者卸载之前直接调用。一般用来执行必要的清理操作，例如： 清除 timer,取消网络请求，移除相同的事件监听器。

## Hook

什么是 hook ?

hook 就是 `JavaScript` 函数，能够让函数组件中使用 `React` 特性，通常名字都是以 `use` 开头，但是运行得时候具有额外得规则：

### useState

```js
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);
  // 声明一个叫做 "count"得 state 变量
}
```

`useState` 返回两个变量，一个是当前 `state` ,另一个是更新 `state` 的函数

### useEffect

对环境的改变即为副作用，比如修改 `document.title` ,如果只是改变自己的状态就不是副作用，改变环境或者全局变量就是副作用

用来模拟 `class` 组件中的 `componentDidMount` `componentWillUnmount` 和 `componentWillUnmount` 的功能。

`useEffect` 的默认行为是在第一次渲染之后和每次更新之后都会执行，相当于挂载和更新。或者说是在 `DOM` 渲染之后进行(`afterRender`)。

```jsx
/* 
  1.作为componentDidMount使用，[]作第2个参数
  2.作为componentDidUpdate使用，可指定依赖
  3.作为componentWillUnmount使用，通过return
*/
const { useState, useEffect } = React;
function App() {
  const [num, setNum] = useState(0);
  const onclick = () => setNum(num + 1);

  // 第一次渲染的时候执行
  useEffect(() => {
    console.log(`我是第一次渲染的时候执行的`);
  }, []);

  // 每次update都会执行(默认行为)
  useEffect(() => {
    console.log(`每次更新的时候执行的函数，update`);
  });

  // 条件更新(用于监听某个值变化时执行,包含第一次)
  useEffect(() => {
    console.log(`只有num更新了才会执行`);
  }, [num]);

  // 在条件中判断排除第几次更新不监听
  useEffect(() => {
    if (num !== 2) {
      console.log(`只有num不为2的时候才执行`);
    }
  }, [num]);

  return (
    <>
      <button onClick={onclick}>点击加一</button>
      <h1>{num}</h1>
    </>
  );
}
```

`useEffect( )` 传两个参数，第一个是函数，第二个是数组 `[]`

- 当第二个参数是 `[]` 时，表示只会在第一次渲染后执行前面的函数。
- 如果不写第二个数组参数的时候，表示从渲染开始每次更新都会执行前面的函数
- 当第二个参数为`[n]` 的时候，表示只有 `n` 的值发生变化的时候才会执行前面的函数，包括第一次

### useReducer

`useReducer` 是一个状态管理的 `hook` `api` 是 `useState` 的替代方案。

#### 两者对比

- 如果 `state` 的类型是 `number` ,`string` `boolean` 建议使用 `useState` ,如果 `state` 的类型为 `object` 或者 `Array` 使用 `useReducer`
- 如果 `state` 的变化非常多， 建议使用 `useReducer` 几种管理 `state` 状态
- 只在组件内部使用的状态使用 `useState` 如果像维护全局 `state` 使用 `useReducer`

### useContext

React 中组件树之间相互通信只能数据向下流动，事件向上流动。但是如果组件层级过大，一层层之间相互流动都需要手动添加 `props` 。就像一层层的打洞，而使用 `Context` 就可以在组件树中进行数据传递。

![img](http://i0.hdslb.com/bfs/album/b40522fa6949875e2b35e9a197aa8749df9774e0.png)

#### 使用场景

对于一个组件树来说，`context` 就是它的全局数据变量，只要层级比它低的都能接受访问到这个数据。一般来说在以下方面会使用到，

- 网站用户主题，
- 国际化，网站首选语言
- 当前认证用户信息

#### 使用方法

> 函数式组件为例

1. 创建 `createContext`

```jsx
const MyContext = createContext(defaultValue); // 这里传入数据对象
```

只有当订阅了 `Context` 对象的组件没有在组件树中匹配到 `provider` 的时候，`defaultValue `才会生效

`context` 就像一层壳子包裹需要使用数据的组件，从这个 '壳子' 中可以访问数据

2. 使用 `Provider` 指定使用的范围

在圈定的范围内，传入读操作和写操作对象，可以使用上下文

```jsx
<MyContext.provider value={{ n, setN }}>
  <p>Num {n}</p>
  <Child />
</MyContext.provider>
```

3. 最后使用 `useContext`

使用 `useContext` 来接受上下文，因为传入的是对象，则接受的也是因该是对象。

```jsx
const { n, setN } = useContext(c);
```

#### 完整示例(函数式)

```jsx
/* 先构造一个context,可以添加默认值,当没有数据提供者的时候从默认值中获取 */
const CompanyContext = createContext();

class CompanyContainer extends Component {
  state = {
    companyName: "光华钢铁贸易公司",
    employees: 1234566767,
    name: "赵大强",
    teamName: "改革机动小组",
    teams: 200,
    title: "总经理",
  };

  render() {
    return (
      <CompanyContext.Provider value={this.state}>
        {" "}
        // 将state中的数据传递给Context提供者
        <Company /> // 第一个子组件
      </CompanyContext.Provider>
    );
  }
}

const Company = () => (
  <CompanyContext.Consumer>
    {" "}
    // Context内容的消费者
    {({ companyName, employees, teams }) => (
      <>
        <h1>
          公司名: <span>{companyName}</span>
        </h1>
        <p>
          成员: <span>{teams}</span>
        </p>
        <Team /> // Team 子组件
        <p>
          联系电话: <span>{employees}</span>
        </p>
        <Employee /> // Employee子组件
      </>
    )}
  </CompanyContext.Consumer>
);

const Team = () => (
  <CompanyContext.Consumer>
    {({ teamName }) => (
      <p>
        我来自： <span>{teamName}</span> 团队。
      </p>
    )}
  </CompanyContext.Consumer>
);

const Employee = () => (
  <CompanyContext.Consumer>
    {({ name, title }) => (
      <p>
        我是一个总经理,我的名字是：{name},我的头衔是 <span>{title}</span>
      </p>
    )}
  </CompanyContext.Consumer>
);
```

### useRef

> `usrRef` 神奇的地方出了可以在不 re-render 的状态下更新值，也可以直接操作 DOM 从而控制 DOM 行为

和 `useState` 不同的是，`useState` 返回一个数组，第一个是 `state` 第二个是修改`state` 的方法。每次重新设置`state`值的时候，就会触发重新渲染。

```js
const [count, setCount] = useState(0);
// count：0
const [count] = useRef(0);
// count: {current: 0}
```

而 `useRef` 只返回一个 `object` 这个个对象包含 `current` 属性，每次更新 `current` 的值的时候不会触发重新渲染。

#### 用处

- 计算 `render` 的次数

```js
const App1 = () => {
  const renderCount = useRef(0); // { current: 0 }
  const [count, setCount] = useState(0);
  useEffect(() => {
    renderCount.current += 1;
  });
  console.log(renderCount);
  return (
    <div>
      <p>renderCount.current</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <h1>{count}</h1>
    </div>
  );
};
```

- 操作 `dom`

```jsx
// 用处二： 在react中操作dom
function App2() {
  const textEl = useRef(); // dom节点的值被传入了 ref对象的 current中

  const clickHandler = () => (textEl.current.innerText = "hello world");

  return (
    <div>
      <button onClick={clickHandler}>点我改变h1标签内容</button>
      <h1 ref={textEl}>Nice</h1>
    </div>
  );
}
```

- 获得 `previouts state` 的值，在函数式组件中，用于无法得知上一个状态的 `state` 是什么，因为每一次的 `render` 都是一个全新的状态， 这个时候就需要使用 `useRef` 了，因为 `useRef` 中的 `current` 值得改变并不会导致 `re-render`

```jsx
// 用处三： 获得 Previous 的值
function App3() {
  const [name, setName] = useState("");
  const previousName = useRef("");
  const countRender = useRef(0);

  useEffect(() => {
    previousName.current = name;
  }, [name]);

  useEffect(() => {
    countRender.current += 1;
  });

  return (
    <>
      <input type="text" onChange={() => setName(event.target.value)} />
      <hr />
      <p> My name is {name} </p>
      <p> My previous name is {previousName.current} </p>
      <p>Render times is {countRender.current} </p>
    </>
  );
}
```

`useRef` 多用在不涉及画面显示的时候，才会使用来控制 `dom`

### 注意点

- 提供者和消费者都是组件，一对标签中的内容需要使用 `{}` 包裹，使用箭头函数的时候注意返回的是一个整体，用括号包裹而不是花括号
- `provider` 可以嵌套使用，内层的 `value` 覆盖外层的 `value`
- 当 `provider` 内的 `value` 发生变化的时候，内层的消费组件都会重新渲染

### useMemo

有的组件中可能有着大量重复的计算，组件数据变更后默认是重新计算数据的，如果这个数据每次都是一样的输出，可以将数据存储起来，不用每次都重新 render。

```js
const memoizedValue = useMemo(fn(a, b), [a, b]); // 数组中放置的是每次函数计算所需要的依赖项
```

### useCallback

> 返回一个记忆化的 callback ,就是在依赖没有改变的情况下，把某个 function 保存下来。

```js
const memoziedCallback = useCallback(() => {
  doSomething(a, b), [a, b];
});
```

**useCallback 和 useMemo 异同**

![img](http://i0.hdslb.com/bfs/album/cb83faf711b331dff9b765f2f2ae88dee1f0befd.png)

- `useCallback` 返回 `callback function ` ,所以可以传参数进去
- `useMemo` 返回值
- `useCallBack(fn,deps)` 等同于 `useMemo(() => fn,deps)`

### custom hooks

自定义 hook 最大的作用就是抽象利用逻辑，可以多次复用。自定义的 `hook` 就是一个函数，名称默认为 `use` 开头，函数内部可以调用其他的 `hook`

#### useKeyPress

返回按键

```js
function useKeyPress() {
  const [pressKey, setKey] = useState(undefined);

  const handleKeyPress = ({ code }) => setKey(code);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);

  return pressKey;
}
```

#### useMousePos

返回鼠标按键

```js
function useMousePos() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    function onMove(event) {
      setPos({ x: event.x, y: event.y });
    }

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return pos;
}
```

#### useInterval

计时器

```js
function useInterval() {
  const [times, setTimes] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTimes((times) => times + 1), 1000); // 由于这个函数只在组件挂载成功时运行一次,此时的time就是组件刚创建时候的值,就是0
    return () => {
      clearInterval(id);
    };
  }, []);

  return times;
}
```

#### useWindowSize

追踪浏览器窗口尺寸

```js
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowSize;
}
```

#### useForceUpdate

强制组件更新

```js
function useForceUpdate() {
  const [i, setI] = useState(0);
  function forceUpdate() {
    setI((i) => i + 1);
  }
  return useCallback(forceUpdate, []);
}
```

#### useToggle

```js
function useToggle(initialState) {
  const [value, setValue] = useState(initialState);
  const toggleValue = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggleValue];
}
```

#### useHover

```js
function useHover() {
  const [isHovering, setIsHover] = useState(false);
  const hoverRef = useRef();

  useEffect(() => {
    const enter = () => setIsHover(true);
    const leave = () => setIsHover(false);

    hoverRef.current.addEventListener("mouseenter", enter);
    hoverRef.current.addEventListener("mouseleave", leave);
    return () => {
      hoverRef.current.removeEventListener("mouseenter", enter);
      hoverRef.current.removeEventListener("mouseleave", leave);
    };
  }, [hoverRef.current]);

  return [hoverRef, isHovering];
}
```

## Fragments

有时候一个组件需要返回多个并列元素

```jsx
function App() {
  return (
    <p>I would</p>
    <p>really like</p>
    <p>to render</p>
    <p>an array</p>
  );
}
// 错误语法，多个并列元素需要用div包裹
```

> 当渲染返回多个同级标签的时候，JSX 转换器发现最外层元素是多个元素，而不是单个元素的时候，会不知道渲染哪一个 tag,所以会报错

### 问题

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns /> // 此处的Columns是横向子组件，外层为 tr 标签
        </tr>
      </table>
    );
  }
}
```

这个 `Columns` 组件外层元素是 `tr` 标签，也意味着这组件需要返回多个 `<td>` 但是如果这个子组件返回多个 `td` 语法上就是错的，需要包裹一层 `div` 作为父元素，这样的话，整个组件最终渲染出来的`html` 是无效的。

```jsx
function () {
    return (
    	<div>
        	<td>hello</td>
        	<td>one</td>
        	<td>two</td>
        </div>			// 作为组件返回时会失效不显示，打破了层级关系
    )
}
```

### **解决方法**

- 多个并列元素使用 `<div>` 包裹,但是会在 `DOM` 上添加额外的节点
- 多个并列元素使用 `[ ]` 包裹成一个数组返回，注意数组元素之间需要添加 `,`

最新的方法,使用`Fragment` ,可以为子元素分组而不添加额外的节点

```jsx
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

还有一种更简单的短语法

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

### 带 key 的 Fragments

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        //如果没有key，React将会展示一个key warning
        < key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </>
      ))}
    </dl>
  );
}
```

## Redux 初探

当 react 组件树嵌套层级变得很深的时候，跨组件通信变得非常麻烦，这时候就需要专门的工具来负责管理用户界面的状态。类似于后端的 `数据库`概念

### 核心概念

- `store` 数据的唯一来源，页面的小型数据库(全局的`Javascript`对象树)
- `Action` `store` 中数据的的修改，只能通过调用 `dispatch` 函数，给这个函数传递一个 `action` 而这个 `action` 实质上就是一个对象，描述发生了什么

```js
{ type: 'ADD_TODO', text: '我是一只小小小鸟' }
```

这个 `action` 中包含着动作的类型，以及状态更新所需要的数据。如果要更新 `store` 状态通过调用 `dispatch` 函数

```js
dispatch({ type: "ADD_TODO", text: "我是一只小小小鸟" });
```

- `reducer` 纯函数，基于先前的 `state` 和 `action` 来计算新的 `state`

```jsx
// 默认state
const defaultState = {
  login: false
}

// reducer函数接收 state 和对 state 的操作描述,返回新state
const reducer = (state,action) {
  if(action.type === "LOGIN") {
    return {login: true}
  } else {
    return state
  }
}

// 根据 reducer 返回的新state 创建新 store
const store = Redux.createStore(reducer)
```

## React-redux

### 工作流程

![image.png](http://i0.hdslb.com/bfs/album/82b63602155b88fa1e46cf7321343c4d260a4ee9.png)

`React-redux` 是 `redux` 作者封装的专门用于 `react` 专用的状态管理库。提供了在 `react` 组件中特定的 `api` ,一般会和 `Redux` 一起使用。

### connect( )

`React-redux` 组件提供 `connect()` 方法，从 `ui` 组件生成容器组件， `connect( )` 就是将这两种组件连接起来。

```jsx
import { connect } from "react-redux";

// A functional React component
function App({ message, onMessageClick }) {
  return <div onClick={() => onMessageClick("hello")}>{message}</div>;
}
// 映射 `state` 到 `props`:
// 作为props添加到组件中.
function mapState(state) {
  return { message: state.message };
}

// 映射`dispatch` 到 `props`:
function mapDispatch(dispatch) {
  return {
    onMessageClick(message) {
      dispatch({ type: "click", message });
    },
  };
}

// 此处连接:
export default connect(mapState, mapDispatch)(App);
```

`connect( )` 接收两个函数作为参数，

`mapStateToProps` 和 `mapDispatchToProps` 前者将外部的数据（即 `state` 对象） 传入映射到 `ui` 组件的参数（`props` ) ,后者负责输出逻辑，将用户发出的动作变成 `action` 对象，从 `ui` 组件传出去修改 `store`

### mapStateToProps()

`mapStateToProps` 是一个函数，建立一个从外部 state 对象到 `props` 对象的映射关系

作为函数 `mapStateToProps` 执行后应该立刻返回一个对象。对象中的每个一键值对就是一个映射。

```jsx
function mapStateToProps(state) {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    //todos 是UI组件中的同名参数， getVisibleTodos() : 可以从 state 中算出 todos d
  };
}
```

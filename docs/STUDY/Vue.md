# Vue 笔记

### Vue 的特点

1. 采用组件化的模式,一次开发多次复用,提高开发效率
2. 声明式编码,数据驱动开发者无需直接操作 DOM
3. 采用虚拟 DOM+优秀的 DIFF 算法,尽量复用节点

## 基础命令

---

### 插值表达式

作用:双大括号中的内容将被解析成为文本

```html
<h1>{{ msg }}</h1>

<script>
  export default {
    data() {
      return {
        msg: "hello",
      };
    },
  };
</script>
```

### `v-html`

作用:可以将数据渲染为真正的 `HTML` 代码

```html
<div v-html="msg"></div>

<script>
  export default {
    data() {
      return {
        msg: "hel<h1>你好世界</h1>lo",
      };
    },
  };
</script>
```

- `v-bind`
  作用:绑定数据和元素属性

应用: 绑定 `src` 路径, `href` 超链接, `class` 类属性
可以缩写为 `:`

```html
<a v-bind:href="url">百度</a>
<a :href="url">百度</a>
<img :src="imgSrc" />

<script>
  export default {
    data() {
      return {
        url: "http://www.baidu.com",
        imgSrc:
          "http://i0.hdslb.com/bfs/album/e6c53dc180e8e1a5dcd819cc161ee0fdc911128d.png",
      };
    },
  };
</script>
```

### `V-if`

**作用**: 条件渲染,根据后面表达式的真假田间渲染元素,如果为 `true` 则显示该组件, 为 `false` 时则销毁该组件

```html
<h1 v-if="(Math.random() > 0.5 )">你好世界</h1>
<!-- 每次刷新页面,随机数大于 0.5 才进行显示 -->
```

### `v-else` 和 `v-else-if`

`v-if` 和 `V-else` `v-else-if` 组合搭配使用,进行流程控制.

`v-else` 必须要和 `v-if` 匹配使用,不能单独使用,只有当 `v-if` 的值为 `false` 的时候, `V-else` 模块才能显示出来

```html {5-8}
<button @click="num=1">按钮一</button>
<button @click="num=2">按钮二</button>
<button @click="num=3">按钮三</button>
<button @click="num=5">按钮四</button>
<h1 v-if="num == 1 ">这是选项一</h1>
<h1 v-else-if="num == 2">这是选项二</h1>
<h1 v-else-if="num == 3">这是选项三</h1>
<h1 v-else>这是选项四</h1>
<!-- 条件一不满足时,使用 v-else-if 进行多个逻辑条件的判断 -->

<script>
  export default {
    data() {
      return {
        num: 1,
      };
    },
  };
</script>
```

**效果图**

<img src="http://i0.hdslb.com/bfs/album/a99062376db77e942a55c90a2663d6d055cccbad.gif" alt="Vue流程控制语句">

### `V-show`

v-show 通过设置标签的 display 属性来实现标签的隐藏和显示

### `V-on`

作用:对 `dom` 中的元素进行事件监听

缩写: `@click='function' `

```html
<button @click="num++">{{num}}</button>

<script>
  export default {
    data() {
      return {
        num: 2,
      };
    },
  };
</script>
<!-- 每次鼠标点击数字加 1 -->
```

**事件修饰符**

事件流像弹簧一样，总是先由外向内捕获，而后自内向外冒泡

- `.stop` 阻止事件的冒泡,使其仅仅在本节点作用
- `.self` 当事件绑定到本元素的时候才开始触发,子父级元素的事件对其没有作用,事不关己高高挂起
- `.prevent` 阻止默认事件,列如 `a` 标签默认的跳转网页事件禁止触发
- `.once` 事件只触发一次
- `.capture` _添加事件侦听器时使用事件捕获模式_，当元素发生冒泡时，先触发带有该修饰符的元素。如果拥有多个该元素，则从外向内触发。**谁有事件修饰符，就先触发谁**

#### 事件冒泡

一个元素接收到事件,会将他接受到事件**从内向外**传递给自己的父级,一直到 `window`

_示例_:

```html
<div id="box1" @click="one">
  <div id="box2" @click="two">
    <div id="box3" @click="three">盒子1</div>
    盒子2
  </div>
  盒子3
</div>

<script>
  export default {
    methods: {
      one() {
        console.log(1);
      },
      two() {
        console.log(2);
      },
      three() {
        console.log(3);
      },
    },
  };
</script>
```

<img :src="('http://i0.hdslb.com/bfs/album/58544cd56f20f906ad563d8be1440145e8526ca3.gif')" alt="事件冒泡现象">

点击最内层的盒子,事件依次向外扩散的过程

#### 事件捕获

事件捕获和事件冒泡完全相反，是从外到内直到指定元素的现象

### `V-for`

使用 `v-for` 指令循环遍历数组,对象,对象数组

::: tip 迭代普通数组
在 data 中定义普通数组
:::

```html {1,7}
<h1 v-for="(item,index) in lists">{{index + 1}}.{{item}}</h1>
<!-- 提供两个参数,数组下标总是放在后面 -->

<script>
  export default {
    data() {
      return {
        lists: ["老王", "老张", "老钱", "老孙"],
      };
    },
  };
</script>
```

**效果图**

<img src="http://i0.hdslb.com/bfs/album/bf72dce40347ef19b51c784c17eb13019b30443b.png" alt="v-for遍历数组">

::: tip 迭代对象
在 data 中定义对象
:::

```html {1,8-14}
<h1 v-for="(value,key) in obj">{{key}}:{{value}}</h1>
<!-- 第一参数为对象值,第二个参数为对象的键名 -->

<script>
  export default {
    data() {
      return {
        obj: {
          id: 13,
          sex: "男",
          name: "小明",
          score: 89,
          grade: "优秀",
        },
      };
    },
  };
</script>
```

- **效果图**

<img src="http://i0.hdslb.com/bfs/album/d1f198444fee9b6b16bd3b1d5b2534accc027908.png">

::: tip 迭代对象数组
将多个对象组合作为数组处理
:::

```html {1,8-11}
<h1 v-for="(item,index) in arrayObj">
  {{ index+1 }}.职位:{{ item.work }} 工作地:{{item.place}} 薪水:{{item.salary}}
</h1>

<script>
  export default {
    data() {
      return {
        arrayObj: [
          { work: "后端开发", place: "南京", salary: 7000 },
          { work: "会计", place: "上海", salary: 9000 },
          { work: "建造师", place: "广州", salary: 4000 },
          { work: "教师", place: "杭州", salary: 10000 },
        ],
      };
    },
  };
</script>
```

- **效果图**

<img src='http://i0.hdslb.com/bfs/album/3f32921cf0caa6c2f341e3b6786c8085658cbddb.png' alt='v-for迭代数组对象'>

::: tip 迭代数字
使用 `V-for` 迭代数字时,计数是从 **1** 开始的
:::

```html
<h1 v-for="count in 6">{{ count }}</h1>
```

<img src="http://i0.hdslb.com/bfs/album/c31541b263d7cfab0b61bc06d9fdbf91455025fb.png" alt="v-for遍历数字">

### `V-model`

::: tip 数据改变==>视图改变
使用 `V-model` 指令在 `input`, `select`, `text`, `checkbox` 等表单控件或者组件上创建数据双向绑定
:::

<img src="http://i0.hdslb.com/bfs/album/9b3a2c132b25dd88a764c068e4de05641e5c48a6.gif" alt="双向数据绑定">

事件修饰符 --> 可以组合使用

- `.lazy` 让**数据在失去焦点或者回车时才会更新**，避免*value*内容没有输入完就执行后续的*change*方法
- `.number` 默认情况下,无论输入框输入的是数字还是字母,都会作为字符串类型进行处理， `.number` 修饰符可以使得输入的内容**自动转换为数字类型.**
- `.trim` 虽然浏览器显示多个空格会过滤掉，但是传值的数据并没有过滤,使用 `.trim` 修饰符**过滤掉内容左右两边的的空格**

```html {1-2,8}
<input type="text" v-model="msg" />
<h1>{{msg}}</h1>

<script>
  export default {
    data() {
      return {
        msg: "延迟加载",
      };
    },
  };
</script>
```

<img src="http://i0.hdslb.com/bfs/album/f106885b7028753399e9ea62df125e04090ce6d4.gif" alt="延迟加载">

```html {1,9}
<input type="number" v-model.number="msg" />
<h2>{{msg}}</h2>
<h2>数据类型：{{typeof(msg)}}</h2>

<script>
  export default {
    data() {
      return {
        msg: 1111,
      };
    },
  };
</script>
<!-- 输入框中只能输入数字 -->
```

<img src="http://i0.hdslb.com/bfs/album/319c748c9357a296a440dc6fbcc4030fd232d518.gif" alt="number修饰符">

```html {1,9,3}
<input type="text" v-model.trim="msg" />
<br />
<span>hi{{msg}}</span>

<script>
  export default {
    data() {
      return {
        msg: "小张",
      };
    },
  };
</script>
```

<img src="http://i0.hdslb.com/bfs/album/63f19a77d45a3bb6483917c7cc256bc5ab22ed74.gif" alt="trim修饰符">

## 组件开发

组件化开发是 Vue 的精髓,所有页面都是由一个个的组件构成.

使用组件的优点:

- 开发效率高
- 已经开发过的组件可以重复使用
- 提升整体项目的可维护,扩展性
- 每个组件功能尽可能单一

<img src="https://cn.vuejs.org/images/components.png" alt="组件🌳">

## Vue 路由

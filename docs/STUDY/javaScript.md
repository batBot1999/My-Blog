# JavaScript 知识点

### JS 数据类型

七种基本数据类型:

- `Undefined`
- `Null`
- `Boolean`
- `Number`
- `String`
- `Symbol` (es6 新增)
- `BigInt` (es10 新增)

1 种引用数据类型 `object`

- 普通对象`object`
- 数组对象 `Array`
- 正则对象 `RegExp`
- 日期对象 `Date`
- 数学对象 `Math`
- 函数对象 `Function`

快速记忆法: **那你是真的牛逼 (u s N B)**

基础数据类型存储在栈内存中,引用数据类型存储在堆内存中.

### if...else...简写

- if()语句

```js
if (3 > 2) console.log(23);
```

- 三目运算符: 条件 ? 条件成立的执行语句 : null

```js
2 + 3 === 5 ? alert("true") : null;
```

- `&&` 条件为真走`&&` 后面的语句

```js
9 % 3 !== 0 && alert("成立");
```

- `||` 条件不管成不成立都走 `||`后面的语句

```js
 9%3！=0 || alert('成立')
```

### 面向对象知识点

凡是通过构造函数创建出来的新对象，这个对象都叫做这个构造函数的实例。

可以通过 `instanceof` 操作符来判断是否是该构造函数创建的

``` js
function Fruit(name,color) {
    this.name = name;
    this.color = color;
    this.weigth = 200
}
let apple = new Fruit("apple","red")
console.log(apple instanceof Fruit)
```

原型属性(`prototype` ):使用构造函数创建新实例对象的时候，大量重复的属性没有必要每次都重新赋予。可以将这些重复的属性挂载到原型属性上 `prototype` ,之后每次创立新实例对象的时候都会自动包含这些变量。所有的实例都可以继承 `prototype` 上面的属性，**因此可以将原型属性看作是创建对象的配方**

#### 迭代所有属性

> 自有属性是直接在对象上定义的，而原型属性是在 `prototype` 上面定义的

``` js
function Dog(name) {
  this.name = name;
}

Dog.prototype.numLegs = 4;

let beagle = new Dog("Snoopy");
let ownProps = [];
let prototypeProps = [];

for(let key in beagle) {
  if(beagle.hasOwnProperty(key)) {		// 通过 Obj.hasOwnProperty(key) 来判断是否是自有属性
    ownProps.push(key)
  } else {
    prototypeProps.push(key)
  }
}
console.log(ownProps,prototypeProps)		// [ 'name' ] [ 'numLegs' ]
```

#### 构造函数属性

被构造函数创建出来的实例对象都有一个 `constructor` 属性。

**实例对象的constructor属性就是对其构造函数的一个引用**

通过这个属性可以找出它是一个什么对象

``` js
function Dog(name) {
  this.name = name;
}
let dog = new Dog("jack")

dog.constructor === Dog		// dog这个实例的 constructor 属性又指向Dog 这个创建它的构造函数
true
```

#### 手动更改原型后，构造函数属性丢失

手动设置一个实例对象的原型属性，会有个副作用：将会清除 `constructor` 属性。

<img src="http://i0.hdslb.com/bfs/album/963966ad35ed867a87b4902d1e223e1e38a6c9cd.png" alt="image-20220526222931307" style="zoom: 67%;" />

为了解决这个问题，对于每次手动给新对象重新设置过 `prototype` 属性过后都要重新在原型对象钟定义一个`constructor` 属性

``` js
Bird.prototype = {
    constructor : Bird,			// 给构造函数的 prototype 属性重新设置 constructor 指向构造函数，之后创建的每个一实例都能指向当初那个创造它的构造函数
    numLegs: 2,
    eat: function() {
        console.log(`I am eating`)
    },
    describe: function() {
        console.log(`My name is `: this.name)
    }
}
```

#### 原型链

孩子从父母哪里继承他们的基因，实例对象从他们的构造函数哪里继承其 `prototype`

``` js
function Bird(name) {
    this.name = name
}
let duck = new Bird("Donald")
Bird.prototype.isPrototypeOf(duck)  		// 判断duck是否是从 Bird 哪里继承的 prototype
```

`JavaScript` 中几乎所有的对象都有自己的`prototype` ,并且它的 `prototyp` 也是一个对象。

``` js
function Bird(name) {
  this.name = name;
}
let duck = new Bird("Donald");
duck.hasOwnProperty("name")		// 这个hasOwnProperty是Object对象原型上的一个方法，但是通过继承,duck这个实例也可以方法到该方法。这就是通过原型链条一直可以向上访问。因此所有的对象都可以访问 hasOwnProperty 这个方法
```

#### 编写父类使用继承来避免重复属性

`Cat` `Bear` 两个构造函数上都包含着 `eat` 方法多次重复，可以创建一个他们的父类再继承父类的属性。

``` js
function Cat(name) {
  this.name = name;
}

Cat.prototype = {
  constructor: Cat,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Bear(name) {
  this.name = name;
}

Bear.prototype = {
  constructor: Bear,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Animal() { }

Animal.prototype = {
  constructor: Animal,
  eat: function() {
      console.log("nom nom nom")
  }
};
```

通过将子类的原型设置为父类的实例，从而实现继承。

``` js
function Animal() { }	// 父类 Animal

Animal.prototype = {
  constructor: Animal,
  eat: function() {
    console.log("nom nom nom");
  }
};

function Dog() { }		// 子类
Dog.prototype = Object.create(Animal.prototype)		// 子类的原型从父类的原型上获得

// Bird对象的配方中包含了Animal中所有关键的成分
let beagle = new Dog();
```

#### 重置一个继承的构造函数属性

子类从父类哪里继承其 `prototype` 的同时也继承到了他父类的 `constructor` 属性

``` js
function Bird() { }
Bird.prototype = Object.create(Animal.prototype);
let duck = new Bird();
duck.constructor	// duck的constructor变成了Animal
```

而 `duck` 和其他所有的 `Bird` 实例都应该表示他们是由 `Bird` 直接创建的，而不是由 `Animal` 创建的。此时可以手动将 `Bird`的构造函数属性设置为 `Bird` 对象

``` js
Bird.prototype.constructor = Bird
duck.constructon // Bird
```

#### 使用 Mixin 在不相关的对象之间添加共同行为

方法和行为是可以通过继承来共享获得的，但是有些情况下，并不是适用于不相关的对象，比如 `Bird` 和 `plane` 虽然都可以飞行，但是之间差别太大并不存在继承关系。

对于不相关的对象，更好的方法是使用 `Mixin` ,`Mixin` 给其他的对象提供了特定的行为方法，但是并不单独使用它，而是将这些方法添加到其他类中。就像工具一样随用随到

``` js
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// 用法：
class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法
Object.assign(User.prototype, sayHiMixin);

// 现在 User 可以打招呼了
new User("Dude").sayHi(); // Hello Dude!
```

#### 通过使用闭包来保护对象内的属性不被外部修改

构造函数构造出来的实例，有公共属性它可以在实例被定义范围内被访问修改。

``` js
function Bird(name) {
    this.name = name
}
let bird = new Bird("jack")
bird.name	// "jack"
bird.name = "Duffy"		// 被修改了
```

如果想要属性不被修改最简单的方法就是在构造函数中创建变量，这个变量只存在构造函数调用时候的上下文中，而不是全局可用。这样这个属性就只能由构造函数中的方法来访问和修改。

``` js
function Bird() {
    let numLegs = 4;		// 这个变量就只有调用的时候才能访问
    this.getLegs = function(){	// 访问
        console.log(numLegs)
    };
    this.change = function() {	// 修改
        numLegs = 12
    }
}
let bird = new Bird()
bird.getLegs()		// 4
bird.changeLegs()
bird.getLegs()		// 10
```

此时的`numLegs`已经变成了私有属性，**在JavaScript中，函数总是可以访问创建它的上下文，这叫做闭包**

#### IIFE创建一个模块

`IIFE` 立即执行函数表达式(`*immediately invoked function expression*`),函数在声明后立刻执行

``` js
(function () {
  console.log("Chirp, chirp!");
})();
```

通常情况下 `iife` 通常用来讲相关功能分组到单个对象或者 `module` 中

``` js
let funModule = (function () {	// 立即调用返回一个对象，返回的对象中包含了所有的Mixin行为，可以用来调用
  return {
    isCuteMixin: function (obj) {
      obj.isCute = function () {
        return true;
      };
    },
    singMixin: function (obj) {
      obj.sing = function () {
        console.log("Singing to an awesome tune");
      };
    },
  };
})();

funModule.glideMixin(duck)	// 模块上调用glideMixin方法
```

### Call、apply、bind区别

``` js
const steven = {
  name: 'steven',
  phoneBattery: 70,
  charge: function (level1) {
    this.phoneBattery = level1
  }
}

const jack = {
  name: 'jack',
  phoneBattery: 50,
}

console.log(jack)
steven.charge.call(jack,90)
console.log(jack)
/*
{ name: 'jack', phoneBattery: 50 }
{ name: 'jack', phoneBattery: 90 }
 */
// jack调用了steven的充电方法并传入了90的电量参数
```

``` js
const steven = {
  name: 'steven',
  phoneBattery: 70,
  charge: function (level1,level2) {
    this.phoneBattery = level1 + level2
  }
}

const jack = {
  name: 'jack',
  phoneBattery: 50,
}

console.log(jack)
steven.charge.apply(jack,[40,50])
console.log(jack)
/*
{ name: 'jack', phoneBattery: 50 }
{ name: 'jack', phoneBattery: 90 }
 */
//apply传入的参数是一个数组参数
```

``` js
const steven = {
  name: 'steven',
  phoneBattery: 70,
  charge: function (level1) {
    this.phoneBattery = level1
  }
}

const jack = {
  name: 'jack',
  phoneBattery: 50,
}

console.log(jack)
const jackCharge = steven.charge.bind(jack)
jackCharge(90)
console.log(jack)
/*
{ name: 'jack', phoneBattery: 50 }
{ name: 'jack', phoneBattery: 90 }
 */
//bind并不是立即执行,而是先返回一个函数对象
```

* 这三者的作用都是改变 `this` 指向的
* 不同点: `call`可以传入多个形参, `apply` 只能传一个数组形参
* `bind` 区别: `bind` 并不会立即调用,而是返回一个函数对象

[B站视频链接](https://www.bilibili.com/video/BV1Ug411F7fZ)

### 生成器函数

 ### promise async await和异步编程

异步编程：异步编程允许在执行一个长期的任务时，程序无需等待，继续执行后续的代码
直到任务完成时才返回通知，正常情况下是使用回调函数形式进行的

单线程的优点：

* 所有的任务处理都集中在同一个线程上，可以避免线程同步、和资源竞争的问题
* 无需频繁切换线程，节省资源开销

`Java Script` 语言中有两种异步编程的方式：

1. 第一种是使用 **回调函数**

``` js
setTimeout(() => console.log('这是三秒后的结果'),3000)
console.log('立马就能看到我')
// 立马就能看到我
undefined
// 这是三秒后的结果
```

![image-20220417153953466](http://i0.hdslb.com/bfs/album/02125d9a4619d98758c60a8b89093d6f10a49048.png)

回调函数简单好理解，但是一但执行多个异步操作，回调函数代码一层套一层，将会变得可读性很差，形成回调地狱，由此产生了 `promise`

**回调地狱现象**：（`Callback Hell`） 多个异步函数的叠加，导致代码层次变得很深。

``` js
console.log('任务开始')
setTimeout(() => {
    console.log('开始执行第一个任务')
    setTimeout(() => {
        console.log('开始执行第二个任务')
        setTimeout(() => {
            console.log('开始执行第三个任务')
            // . . .
        }, 3000)
    }, 3000)
}, 3000)
```



2. 使用 `promise`

![image-20220418152152160](http://i0.hdslb.com/bfs/album/80330443b5a34ffe709be76d42f3a0413019b2cd.png)

### 声明方式

使用 `promise` 类来定义一个 `promise` 对象

``` js
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('this is the eventual value the promise will return');
  }, 3000);
});

console.log(myPromise);
```

还可以通过使用 `promise` 内置的 `API` 进行声明：

``` js
const myPromise = Promise.resolve('这将返回一个Promise')
console.log(myPromise)
```

### 介绍

``` js
// promise resolve状态
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('完成了')
        console.log(promise)
    }, 3000)
})
console.log(promise)
```

![image-20220418154056771](http://i0.hdslb.com/bfs/album/35debfe419eaffd5ef8ffeb32f06b067c39b9cdd.png)

**注意点**

``` js
// 以下代码输出什么？
let promise = new Promise((resolve,reject) => {
    resolve(1);
    setTimeout(() => resolve(2),1000);
})
promise.then(res => console.log(res))
```

> 输出结果为 `1`
>
> 第二个对 `resolve` 的调用会被忽略，只有第一次对 `resolve/reject` 的调用才会被处理，进一步的处理都会被忽略掉

异步函数： 返回值永远是一个 `promise` 对象

``` js
// 使用 async 将一个函数标记为异步函数
async function f() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const json = await response.json();
    console.log(json)
}
// await会等待promise完成之后直接返回最终的结果
f();
```

### AJAX

`XMLHttpRequest` 是浏览器内建的对象，允许使用 `javaScript` 发送 `http` 请求

一个简单的`ajax` 请求函数

``` js
// 完整的ajax请求，包含错误处理
function XHR(method, url) {
  method = method.toUpperCase();
  // 1.创建XML对象
  let xhr = new XMLHttpRequest();
  xhr.responseType = "arraybuffer";
  // 2.配置请求对象
  xhr.open(method, url);
  // 3.发送网络请求
  xhr.send();
  // 4.响应处理
  xhr.onload = function () {
    if (xhr.status !== 200) {
      // 状态码不是200即为错误
      console.log(`错误 ${xhr.status}: ${xhr.statusText}`);
    } else {
      console.log(`已经接收到，接收了${xhr.response.length} bytes`); // 服务器响应长度
      console.log(`详细信息为：`);
      console.log(xhr.response);
    }
  };

  // 5.错误处理
  xhr.onerror = function () {
    console.log(`请求拒绝！`);
  };
}
```

`XML` 实例对象中主要的方法和参数

``` js
// 上传文件并实现上传进度
function upload(file) {
  let xhr = new XMLHttpRequest();
  var size;
  xhr.upload.onprogress = function (event) {
    size = event.total / 2 ** 20;
    console.log(`上传了${event.loaded} 总共${event.total}`);
  };
  xhr.onloadend = function () {
    //上传完成的触发事件，结束时间戳
    var time = ~~(Date.now() - start) / 1000;
    var speed = size / time;
    console.log(`时间花费${time}s`);
    console.log(`${speed}MB/s`);
    if (xhr.status === 200) {
      console.log("成功");
    } else {
      console.log("错误" + this.status);
    }
  };

  xhr.open("POST", "http://localhost:3001/users");
  xhr.timeout = 2000;
  xhr.send(file);
  // 开始的时间戳
  var start = Date.now();
  xhr.onerror = () => console.log("网络错误");
}
```

### Fetch

使用 `Fetch` 来发送 `GET` 请求

``` js
let url = "http://localhost:3001/users";
fetch(url)
  .then((res) => res.text())
// 响应数据以text形式解析
  .then((data) => console.log(data))
// 接着打印处解析出的数据
  .catch((err) => console.log(err))
// 捕获过程中发生的错误
  .finally(() => console.log("最终结果"));
// 最终无论发生什么都执行的操作
```

使用 `Fetch` 来发送 `POST` 请求

``` js
// 使用 Fetch来发送post数据
let url = "http://localhost:3001/users";

let obj = {
  id: 23,
  name: "张三",
};

let response = await fetch(url, {
  method: "POST",	// 请求方法
  headers: {		// 设置请求头
    "Content-type": "application/json;charset=utf-8",	// 如果请求体是字符串，默认设置为文本
  },
  body: JSON.stringify(obj),	// 将对象转换成json数据
});

let result = await response.text();		// 发送数据后，等待服务器响应
console.log(result);		// s
```





## DOM

- DOM(document model model)文档对象模型

js 语言最初是为了 web 浏览器创造的，其主要作用就是为了操作 dom 元素，提供一种控制网页的方法。

![](http://i0.hdslb.com/bfs/album/729e41cb8f508a45b84ea9c0dcf4bcb440b59e62.png)

`window`为根对象

### 获取 dom 元素

- 通过 js 获取到页面的元素进行操作

通常有两类标签

1. 非常规标签

> 日常这样使用很少

```js
# html 标签
var html = document.documentElement
console.log(html)

# head 标签
var body = document.head
console.log(body)

# body 标签
var body = document.head
console.log(body)
```

2.  常规标签

- `getElementById()`

语法：查找范围.getElementById('id 名称')

在 document 中查找一个元素

返回值：

    有与此 id 匹配的元素，返回相应元素

    无与此 id 匹配的元素，返回null

- `getElementsByTagName()`

语法：查找范围.getElementsByTagName('标签名')

返回值：伪数组(常用的数组方法无法使用)

    遇到相匹配的标签元素，返回所有的元素

    如果没有相匹配的元素，返回空伪数组

- `getElementsByClassName()`

语法：查找范围.getElementsByClassName('类名')

返回值：伪数组(常用的数组方法无法使用)

    遇到相匹配的类元素，返回所有的元素

    如果没有相匹配的类名，返回空伪数组

- `getElementsByName()`

语法：查找范围.getElementsByName('元素 name 属性的值')

返回值：是一个伪数组

遇到匹配元素，返回所有相匹配的元素

没有匹配元素，返回空的伪数组

---

- `querySelector()`

语法：查看范围.querySelector('选择器')

选择器：所有在 css 中可以使用的选择器，这里都可使用

返回值：找到选择器匹配的元素，返回第一个找到的内容

如果没有找到选择器匹配的元素，返回 null

- `querySelectorAll()`

语法：查看范围.querySelectorAll('选择器')

返回值：找到所有选择器匹配的元素，返回所有内容

    未找到，返回null

**最后这两个选择器都不兼容低版本的 IE**

---

### 模块化(module)

前端应用原来越复杂，导致项目难以维护，需要引入模块化开发的思想解决问题，项目按需加载相应模块,随着项目越来越大,会有大量变量在全局作用域内冲突,代码难以调试.项目无法维护.

``` js
//几种不同的作用域
Global Scope => Module Scope => Function Scope => Block Scope
// 模块级作用域会作用范围在全局和函数级之间
// 各个模块之间的作用域是独立的,彼此无法互相访问
```

使用`IIFE` 也可以创建出类似的效果

``` js
//使用IIFE来创建出一个立即执行的函数:函数运行但却不会产生任何的变量,不会污染全局
var weekDay = function () {
	var name = 'jack'
	return name;
	};
}();
```





**几种模块化的方案**

按照出现的历史顺序

* `Commonjs` : 主要用于node开发服务端和electron桌面应用程序
* `AMD`(asynchronous module definition): 异步模块定义: 浏览器中用的比较多
* `ES Module` js语言原生实现的语法

### 对象

##### 对象的四种创建方式:

- 字面量创建

```js
let user = {};

let user = {
  name: "jack",
  age: 24,
  sex: "man",
  hobby: "music",
};
```

- 内置构造函数创建

```js
let user = new object();
user.name = "jack";
user.age = 24;
user.sex = "man";
user.hobby = "music";
```

- 工厂函数创建对象
  > 1. 先封装一个工厂函数
  > 2. 使用工厂函数来创建对象

```js
function createObj(name, age, sex, hobby) {
  //手动创建对象
  let user = {};

  // 手动添加成员
  user.name = name;
  user.age = age;
  user.sex = sex;
  user.hobby = hobby;

  //返回这个对象
  return user;
}
createObj("小王", 23, "男", "music");
// { name: '小王', age: 23, sex: '男', hobby: 'music' }
```

- 使用构造函数和`new`创建

构造函数本质上就是一个用来创造对象的常规函数,不过有两个注意点

1. 构造函数的命名用大写字母开头
2. 只能由`new` 操作符来执行

函数被`new` 操作符执的过程:

1. 创建一个空对象并分配给`this`
2. 为空对象添加属性
3. 隐式返回`this`

构造函数最后返回一个对象

```js
function User(name) {
  // this = {};(隐式创建)

  //添加属性到 this
  this.name = name;
  this.age = 23;

  //return this;(隐式返回)
}

let obj = new User("老王"); // User {name: '老王',age: 23}
```

构造器的主要作用:**实现可重用的对象代码**

##### 构造器的`return`

通常构造器不需要`return` ,他们主要的任务就是将必要的东西写入`this`,如果有`return`的话

- `return` 返回的是一个对象,则返回这个对象,而不是`this`
- `return ` 返回的是一个原始数据类型,则无效

```js
function User(){
  this.name = 'mike';
  return { name : 'jack'}		//返回的是这个对象,而不是mike
}
console.log(new.User().name);		//jack
```

```js
function User(){
  this.name = '老王';
  return 23;		//数字是基本数据类型,不会影响返回值
}
console.log(new.User().name);		//老王
```

构造函数如果没有参数,可以省略`new`后的括号;

```js
let user = new User(); //没有参数
let user = new User(); //等同
```

##### 构造器中的方法

```js
function User(name) {
  this.name = name;
  this.sayHi = () => console.log("我叫" + ":" + this.name);
}
// 普通函数
let tmp = new User("老王"); //使用new将函数变成构造函数,并传递给tmp
tmp.sayHi(); //我叫:老王
//构造出的对象,并调用对象的方法
```

使用构造函数创建出来的对象,这个对象都叫做这个构造函数的 `instance` (实列),`javaScript`提供了一种简单的方法来验证对象是否是由构造函数所创建的.返回`true` 或者 `false`

```js
let Bird = function (name, color) {
  this.name = name;
  this.color = color;
  this.numLegs = 4;
};

let bird = new Bird("jack", "yellow");
bird instanceof Bird; // true;			bird是由构造函数创建的实例,所以返回true

let obj = { name: "Jack", color: "yellow", numLegs: 4 };
obj instanceof Bird; // false;			obj不是构造函数创建的实例,返回false
```

`prototype` 是一个可以在所有实例之间共享的对象,由于所有的实例都可以继承 `prototype` 看作是创建对象的配方. 在 `JavaScript` 中所有的对象都有几个 `prototype` 属性,这个属性是属于它所在的构造函数.

**对象两种属性**

- 自身属性: 直接在对象上定义的.
- `prototype`: 原型属性在`prototype` 上定义.

```js
function Bird(name) {
  this.name = name; // 自有属性
}

Bird.prototype.numLegs = 2; // 原型属性

let duck = new Bird("Jack");

let ownProps = []; // 自身属性数组
let prototypeProps = []; // 原型属性数组

for (let property in duck) {
  // for...in主要是用来遍历对象的所有属性,包括自有属性和原型属性
  if (duck.hasOwnProperty(property)) {
    // 遍历到的自有属性
    ownProps.push(property);
  } else {
    prototypeProps.push(property); // 遍历到原型属性
  }
}
console.log(ownProps); // [ 'name' ]
console.log(prototypeProps); // [ 'numLegs' ]
```

**`constructor` 属性**

每个实例对象都从原型中继承了一个`constructor` 属性,这个属性指向了用于构造此实例对象的构造函数.

```js
function Dog(name) {
  this.name = name;
}

// 检查创建这个实例是否是由这个Dog 创建的
function joinDogFraternity(candidate) {
  return candidate.constructor === Dog;
}
```

**将原型用对象修改**

单独给`prototype` 添加属性,

```js
Bird.prototype.numLegs = 2;
```

如果需要添加多个原型属性,这样写就太拖沓了

```js
Bird.prototype.eat = function () {
  console.log("nom nom nom");
};

Bird.prototype.describe = function () {
  console.log("My name is " + this.name);
};
```

最有效的方式就是直接给对象的 `prototype` 设置一个已经包含了属性的新对象,直接将这个对象挂在到这个原型属性上.一次性添加进来.

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype = {
  numLegs: 2,
  eat: () => console.log("nom nom nom"),
  describe: function () {
    console.log(`My name is ${this.name}`); // 箭头函数的this问题,只能用普通函数写法
  },
};
let dog = new Dog("jack");

console.log(dog); // { name: 'jack' }
console.log(dog.name); // jack
dog.eat(); // nom nom nom
dog.describe(); // My name is jack
```

**更改原型时，记得设置构造函数属性**

手动设置一个新对象的原型有个副作用: 会清除原本的 `constructor` 属性,这个属性可以用来检查是那个构造函数创建了实例,但是现在该属性已经被覆盖了.需要手动给原型对象中定义个 `constructor` 属性:

```js
function Dog(name) {
  this.name = name;
}

Dog.prototype = {
  constructor: Dog, // 手动的给原型对象添加 constructor 属性
  numLegs: 4,
  eat: function () {
    console.log("nom nom nom");
  },
  describe: function () {
    console.log("My name is " + this.name);
  },
};

let dog = new Dog("Jack");
console.log(dog.constructor === Dog); // true
```

**对象的原型从哪里来**

对象可以直接从创建它的构造函数哪里继承其 `prototype`

```js
function Bird(name) {
  this.name = name;
}

let duck = new Bird("Jack");

// 检查 duck 对象是否继承自 Bird 的构造函数
console.log(Bird.prototype.isPrototypeOf(duck)); // true;
```

**原型链**

`JavaScript` 中基本所有的对象都有自己的 `prototype` .并且对象的 `prototype` 自身也是一个对象.所有他自己也有自己的 `prototype`

```js
function Dog(name) {
  this.name = name;
}

let beagle = new Dog("Snoopy");

console.log(beagle.hasOwnProperty); // [Function: hasOwnProperty]
// beagle的原型是从 Dog 构造函数所继承的
console.log(Dog.prototype.isPrototypeOf(beagle)); // true

// Dog的原型是从 Object对象的构造函数所继承的.
console.log(Object.prototype.isPrototypeOf(Dog.prototype));
```

`hasOwnProperty` 是定义在 `Object.prototype` 上的一个方法,虽然在 `Dog` 的原型上面没有定义该方法,但是依然可以在这个对象上面访问到,这就是通过 `prototype` 链条访问的一个例子,因为 `Object` 是 `JavaScript` 中所有对象的 `supertype` ,因此所有的对象都可以访问 `hasOwnProperty` 方法.

#### Array

#### Math

- Math 对象不是一个构造函数,所以不需要`new`来调用,而是直接使用里面的属性和方法即可.

|     方法名      |                         描述                          |                       注意点                       |
| :-------------: | :---------------------------------------------------: | :------------------------------------------------: |
| `Math.random()` |           返回介于 `[0,1)` 之间的一个随机数           |
| `Math.round(x)` |             对 `x` 进行四舍五入为一个整数             |
| `Math.sign(x)`  |                  判断 `x` 的值的符号                  | 返回值:`1`正数,`-1`负数,`0`正零,`-0`负零,`NaN` NaN |
| `Math.max(...)` |                 返回括号中数字最大值                  |
| `Math.min(...)` |                 返回括号中数字最小值                  |
| `Math.floor(x)` |              返回小于等于 `x` 的最大整数              |
| `Math.ceil(x)`  |            返回大于或等于 `x` 的最接近整数            |
|  `Math.abs(x)`  |                   返回 `x` 的绝对值                   |
| `Math.acos(x)`  |                  返回 `x` 的反余弦值                  |
| `Math.asin(x)`  |                  返回 `x` 的反正弦值                  |
| `Math.atan(x)`  | 以介于-PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值 |

## ES6 相关知识

> **ECMA**：(Europen Computer Manufactures Association) 欧洲计算机制造联合会

- ECMAScript 和 javascript 的区别？

  ES 是标准规范,js 是实现,`ECMAScript` ≈ `JS`

#### var let 和 const

`var` 的缺点

- 没有块级作用域

  `var`声明的变量都是全局变量，在代码代码外部都是可以访问的，必须通过闭包的方式实现块级作用域

- 允许重复声明

  `var`可以重复声明一个变量，之前声明过的变量会被忽略

- `var`声明的变量，在声明语句前就已经被使用过

  声明的变量，会被自动提升到函数的顶部，成为函数的升格

<img src="http://i0.hdslb.com/bfs/album/e5dab58e4ec5fedc925b06b4d6cf56a5b232e56a.png" alt="image-20211221101416142" style="zoom:50%;" />

当使用 `let` 时候,同名的变量只能声明一次,否则会报错,如果使用 `var` 则会覆盖.

#### let 和 const 的区别

- `let`和`const`相类似，都含有块级作用域，都不允许变量提升,不允许重复声明
- `const` 声明的变量是一个只读的常量，一但声明其值不能重新赋值修改，想要修改就必须立即初始化

`const` 声明的关键字通常用大写字母作为常量标识符

```js
const NUM = 12;
const HUMAN_NAME = "jack";
```

**注：`const` 声明并不能保证变量的值不得改动，而是指向变量内存地址的指针不能改动是固定的，对于复合数据类型的数据（对象和数组），指向的数据依旧是可以变动的。**

```js
const ARR = [1，2，3，4]；
ARR = [5,6,7,8];	//错误
ARR[3] = 5;		//输出[1,2,3,5]
```

#### 彻底冻结对象

`const` 声明的对象并不是真正的不可改，可以使用`Object.freeze(对象)`来彻底冻结保护对象数据不被改写

```js
let user = {
  name: "jack",
  age: 10,
  hobby: "game",
};
Object.freeze(user); //冻结了这个对象
user.age = 20; //普通模式下不会报错，但是数据无法改写,严格模式下会报错
console.log(user); //{ name: 'jack', age: 10, hobby: 'game' }
```

#### 箭头函数和 this 的指向问题

> 语法简洁,方便作为回调函数使用

`let` `函数名` = `(参数)` => `函数体`

```js{7}
//  原函数
let sum = function(a,b) {
  return a + b;
};

// 箭头写法
let sum = (a,b) => a + b;
```

**注意点:**

- 函数体只有单行时,无需写 `return` 关键字
- 多行的函数体,需要使用花括号 `{}` 包裹,并使用 `return` 返回相应的值
- 参数只有一个时,可以直接省略括号
- 没有参数,括号也需要保留空置

在 JavaScript 中, `this` 是自由的,他的值是在调用的时候根据上下文**计算**出来的,并不取决于方法声明的位置,而是取决与在"点符号"前的是什么对象.

箭头函数没有自己的 `this` ,箭头函数内部访问到的 `this` 都是外部获取的,默认指向在定义它时所处的宿主对象

#### 设置函数的默认参数

ES6 语法允许参数传入默认的参数，来更加的灵活的运用函数

```js
let sum = (num = 10) => num + 2;
sum(); //12
sum(5); //7
```

#### rest 展开运算符

使用`...` 展开运算符，可以创建一个变量来接受多个参数的的函数，这些参数以数组的形式存储在函数内部读取的数组中，在此函数内部，各种数组的方法也都可以使用。

```js
const sum = (...args) => {
  let tmp = 0;
  for (let i of args) {
    tmp += i;
  }
  console.log(args.length);
  return tmp;
};
sum(1, 2, 3, 4); //4, 10		函数内部，y
```

#### Map 和 set(集合与映射)

ES6 之前的语法，处理"键值对"形式的存储时，都是使用*对象*来进行的。Map 是新的集合类型，真正使用了键值存储机制。

方法和属性：

- `new Map()`:创建集合
- `map.set(key,value)` :增加存储值
- `map.delete(key)` :删除指定键的值
- `map.get(key)` :查询访问指定键，返回相应值，没有该`key`则返回 `underfined`
- `map.has(key)` :判断`key`是否存在，存在返回`true`,否则返回`false`
- `map.clear()` :清空`map`
- `map.size` :返回`map`中实体的个数

Map 迭代

- `map.keys()` :遍历并返回所有的键
- `map.values()` :遍历并返回所有的值
- `map.entries()` :遍历并返回所有的实体

```js {7,17,27}
let map = new Map([
  ["白菜", 12],
  ["糖醋里脊", 32],
  ["红烧肉", 45],
]);
// 遍历集合键
for (let son of map.keys()) {
  console.log(son);
}
/*
 白菜
糖醋里脊
红烧肉
*/

// 遍历集合值
for (let son of map.values()) {
  console.log(son);
}
/*
12
32
45
*/

// 遍历集合实体
for (let son of map.entries()) {
  console.log(son);
}
/*
[ '白菜', 12 ]
[ '糖醋里脊', 32 ]
[ '红烧肉', 45 ]
*/
```

## Nodejs

### `fs`

**fd**：概念（file descriptor)文件描述符

操作系统当前打开的文件的编号，是一个整数

``` js
fs.readSync(fd, buffer, offset, length, position)
```

#### 判断文件夹是否存在

``` js
import { constants } from "buffer";
import fs from "fs";
fs.access("./info.json", constants.F_OK, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("包含该文件夹");
  }
});
```

#### 创建空文件夹

主要用于临时创建文件夹

``` js
import fs from 'fs'
> fs.mkdtempSync('img')			// 创建的同时并返回文件夹名
'imgZ6tevo'
```

#### 返回存在文件的绝对路径

``` js
import fs from 'fs'
> fs.realpathSync('index.js')
'/mnt/c/Users/30328/Desktop/axios/index.js'
```

#### 删除文件夹

> 删除的时候要求文件夹需要为空的

``` js
import fs from 'fs'
> fs.rmdirSync('hi')
Uncaught Error: ENOTEMPTY: directory not empty, rmdir 'hi'
    at Object.rmdirSync (node:fs:1188:10) {
  errno: -39,
  syscall: 'rmdir',
  code: 'ENOTEMPTY',
  path: 'hi'
}
// 文件夹不为空
```

#### 删除文件或文件夹

``` js
import fs from 'fs'
> fs.rmSync('hi',{recursive: true})
undefined
// 使用{recursive: true}可以将文件夹中的子目录和子文件都递归性质的删除
```


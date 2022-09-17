# This问题

## this是什么？

this 是一个指针，这个指针并不指向自身，而是指向调用函数的对象.

> 指向原则: **this永远指向最后调用它的对象**

## 绑定类型

### 默认绑定

如果引用 `this` 的函数是一个**独立函数**,那么函数将绑定到全局对象

``` js
function log() {
    console.log(this.name)	// 尝试从全局对象中找一个叫 "name" 的属性
}
var name = "jack"		// var 声明的变量已经变为window对象的一个属性
log()	// 输出： "jack"
```

![image-20220526174048225](http://i0.hdslb.com/bfs/album/5f66941ac15f48a1f6272dbe159caf0e8e389278.png)

如果在严格模式下，此规则不适用,因为此时的 `this` 指向 `undefined` 而 `undefined` 上面没有 `this` 对象，所以会抛出错误。显示 `this` 的引用未定义

![image-20220526174251192](http://i0.hdslb.com/bfs/album/b201d43252ff75f660d9f7e93047744d5ab4ced0.png)

``` js
(function log1(){console.log(this)})()
// Window about:newtab 默认输出全局对象

function log2() {
  "use strict"		// 严格模式下this就指向undefined
    console.log(this)
}
log2()		//  undefined
```

###  隐式绑定

函数调用是否存在于调用者的对象上(上下文中)，当对象在调用站点绑定到它时，函数才能使用该对象作为其上下文。

``` js
function log() {
  console.log(this.name)
}
var myObj = {
    name: "jack",
    log: log
}
myObj.log()
```

这里的 `log` 函数声明在对象的外部，严格来说不属于 `myObj` 这个对象，但是在调用 `log` 函数的时候，`Js` 会默认根据调用位置的上下文环境来应用这个函数， 隐式绑定将函数调用中的 `this` 指向 `myObj` 这个上下文对象。

**等价于**

``` js
function log() {
  console.log(this.name);
}

var myObj = {
  name: "jack",	//运行时自动插入该方法
};

myObj.log();	// "jack"
```

这种情况下，虽然 `myObj` 这个对象中没有 `log` 这个字段的函数，但是在运行时将会自动插入 `log` 函数作为其方法，然后解析为 `this` 上下文

**对象属性链中只有最后一层会影响到调用位置**

``` js
function sayHi(){
    console.log('Hello,', this.name);
}
var person2 = {
    name: 'Christina',
    sayHi: sayHi
}
var person1 = {
    name: 'YvetteLau',
    friend: person2
}
person1.friend.sayHi();
// 结果是: Hello, Christina.
```

不管嵌套了多少层，在判断 `this` 的时候只关注最后一层，就是调用他的那个对象

### 显示绑定

隐式绑定都和这个对象中的引用有关，不管是预先定义的还是后面默认插入到调用上下文中的。

但是如果想要强制一个函数在调用的时候，使用一个对象来作为他的执行上下文，而不想特地在对象上面放一直引用的属性方法呢？

这就需要用到 `call()`和 `apply()`了

要将函数调用显式的绑定到上下文中，需要对函数调用 `call()` 方法，并且将上下文对象作为参数传入：

``` js
function log() {
    console.log(this.name)
}

var myObj = {
    name: "jack"
}
log.call(myObj)		// myObj中原本是没有log方法的，但是log方法执行的时候将执行上下文绑定到myObj中了
// 输出： "jack"
```

此时这个函数无论传递多少次给新的变量，只要一被调用他执行的都是相同的上下文，因为它已经被绑定（显式绑定）到该对象，这叫做硬绑定。

``` js
function log() {
  console.log(this.name);
}

var myObj = {
  name: "jack",
};

function sayName() {
  log.call(myObj);
}

sayName(); // 传递给sayName调用函数 "jack"
setTimeout(sayName, 100);
// 执行上下文已经被绑定死了 输出 "jack"
sayName.call(window); // 重新绑定到 window 对象也没有,依然是 "jack"
```

硬绑定是将上下文锁定到函数调用中，并真正的使该函数成为方法的完美方式。

### 构造函数 new 绑定

`JS`和 `C++` 不一样，没有类，在 `js` 中，构造函数仅仅是使用 `new` 这个操作符时候被调用的函数，这些函数就是普通函数并没有什么特殊的，不属于某一个类，也不能实例化出一个类。任何一个函数都可以使用 `new` 来调用，所有并不存在什么 "构造函数"，它也不特殊，仅仅是对于函数的 "构造调用"。是一种用法

> 当使用 `new ` 这个操作符来调用函数的时候，会自动执行以下的操作：

1. 创建一个空对象，函数中的 `this` 指向这个空对象
2. 这个新的对象被执行 [[原型]] 连接
3. 执行构造函数方法，属性和方法被添加到 `this` 引用的对象中
4. 如果该函数中没有返回其他的对象，那么返回 `this` ,即刚刚创建的这个新对象， 否则返回函数中返回的对象。

``` js
// 手动模拟构造函数的过程
function _new() {
  let target = {}; //创建的新对象
  //第一个参数是构造函数
  let [constructor, ...args] = [...arguments];
  //执行[[原型]]连接;target 是 constructor 的实例
  target.__proto__ = constructor.prototype;
  //执行构造函数，将属性或方法添加到创建的空对象上
  let result = constructor.apply(target, args);
  if (result && (typeof result == "object" || typeof result == "function")) {
    //如果构造函数执行的结构返回的是一个对象，那么返回这个对象
    return result;
  }
  //如果构造函数返回的不是一个对象，返回创建的新对象
  return target;
}
```

因此使用 `new` 来调用函数的时候，`this` 上绑定到新创立的对象上

``` js
function People(name) {
    this.name = name;
}
var someone = new People("Jack")	// 创建新对象，并把this指向这个对象，接着this上面挂载属性和方法
console.log(someone.name)	// "jack"
```

### 绑定优先级

当同时应用了多种 `this` 绑定的规则，会按照一定的优先级进行决定。
`new绑定` > `显示绑定` > `隐式绑定` > `默认绑定`
















# JS 简写技巧

##

```js
// 普通写法
let x;
let y = 20;

// 缩写写法
let x,
  y = 20;
```

## 利用解构,给多个变量赋值

```js
// 普通写法
let a, b, c;
a = 5;
b = 8;
c = 12;

// 缩写写法
let [a, b, c] = [5, 8, 12];
```

## 三元运算符代替 if...else...

```js
// 普通写法
let age = 24;
let status;
if (age > 18) {
  status = "成年人";
} else {
  status = "未成年";
}

// 缩写写法
let status = age > 18 ? "成年人" : "未成年";
```

## 结构交换两个变量值

```js
let a = 12,
  b = 20;

// 普通写法
let tmp = a;
a = b;
b = tmp;

// 缩写写法
[a, b] = [b, a];
```

## 利用箭头函数简化普通函数

```js
// 普通写法
function sum(num1, num2) {
  return num1 + num2;
}

// 缩写写法
let sum = (num1, num2) => num1 + num2;
```

## 使用模板字符串减少拼接

在大括号的内部可以放入任意的 `JavaScript`表达式,可以运算,以及引用对象属性,甚至可以调用函数

```js
let name = "foreverliu";

// 普通写法
console.log("我的名字叫:" + name);

// 缩写写法
console.log(`我的名字叫:${name}`);
```

如果是多行的字符串也可以使用模板字符串简化,不需要再使用 `\n` 转义换行了

```js
// 普通写法
console.log("你是我的眼\n带我领略四季的变换");

// 缩写写法
console.log(`你是我的眼
带我领略四季的变换`);
```

## 压缩多个条件

有时候为了匹配多个条件需要使用很长的 `||` 来检查多个条件链,可以使用数组中的方法来进行判断

```js
let value;
// 普通写法
if (value === 1 || value === 2 || value === 3 || value === 4) {
  console.log("小于5");
}

// 缩写写法
if ([1, 2, 3, 4].includes(value)) {
  console.log("小于5");
}
```

## 使用一元运算符简化字符串转数字

```js
// 普通写法
let age = parseInt("24");
let height = parseFloat("180.7");

// 简写写法
let age = +"24";
let height = +"180.7";
```

## 质数运算符

使用双星号语法代替 `Math.pow()` 来求幂

```js
// 普通写法
let num = Math.pow(2, 4); // 16

// 缩写写法
let num = 2 ** 4; // 16
```

## Math.floor( )简写

使用 `~~` 来对数字下取整

```js
// 普通写法
Math.floor(8.23); // 8

// 缩写写法
~~8.23; // 8
```

## 利用数组的扩展运算符 `...` 简化代码

扩展运算符 `...` ,可以将一个数组"打散"成用逗号分隔的参数序列.

- 快速数组合并

```js
let arr1 = [10, 20, 30];

// 普通写法
let arr2 = arr1.concat([40, 50]); // [10,20,30,40,50]

// 缩写写法
let arr2 = [...arr1, 40, 50]; // [10,20,30,40,50]
```

- 寻找数组中的最大最小值

```js
// 缩写写法
const arr = [2, 4, 8, 5, 10];

Math.max(...arr); // 10
Math.min(...arr); // 2
```

## 压缩 for 循环

使用 ES5 中的 `forEach()` 方法可以一行代码循环遍历数组

```js
const nums = [1, 2, 3, 4, 5];

// 普通写法
for (let i = 0; i < nums.length; i++) {
  console.log(i, nums[i]);
}

// 缩写写法
nums.forEach((item, index) => console.log(index, item));
```

## 使用 && 运算符简化 if 语句

当符号左边条件为真的时候执行右边的语句

```js
let age = 20;
//普通写法
if (age > 18) {
  console.log("成年人");
}

// 缩写写法
age > 18 && console.log("成年人");
```

## 将任何值转换为布尔值

在 js 中使用 `!!` 运算符对目标对象执行两次取反操作可以将任何内容转换为布尔值

```js
!!true; // true
!!2; // true
!![]; // true
!!"test"; // true

!!false; // false
!!0; // false
!!""; // false
!!null; // false
!!undefined; // false
```

## repeat()方法重复字符串

```js
let str = "";

// 普通写法
for (let i = 0; i < 5; i++) {
  str += "hello "; // 'hello hello hello hello hello '
}

// 缩写写法
"hello ".repeat(5); // 'hello hello hello hello hello '
```

## 创建对象计数器或者映射

- 对象存储

```js
let str = "kapilalipak";
const table = {};
for (let char of str) {
  table[char] = table[char] + 1 || 1;
  // "||" 返回链上的第一个真值, 存元素计数器+1,不存在设为1
}
// 输出: {k: 2, a: 3, p: 2, i: 2, l: 2}
```

- 哈希表存储

```js
let string = "kapilalipak";
const map = new Map();
for (let char of string) {
  map.set(char, map.get(char) + 1 || 1);
}
// 输出: Map(5) { 'k' => 2, 'a' => 3, 'p' => 2, 'i' => 2, 'l' => 2 }
```

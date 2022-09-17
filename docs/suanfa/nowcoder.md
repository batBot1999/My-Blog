## **牛客网练习题**

[牛客网`JavaScript`基础练习挑战记录](https://www.nowcoder.com/ta/js-advanced)

## 数据类型

### FED20 基本数据类型检测

![image-20211228152644970](http://i0.hdslb.com/bfs/album/cc4f52cf15e5e8ef4e25fb3c2d508d9417d9e665.png)

``` js
function _typeof(value) {
    return typeof(value)
}
```

### FED22数据类型转换

![image-20211228161202765](http://i0.hdslb.com/bfs/album/cb58944df81daf0ae341d9178871569f1a039a9d.png)

``` js
// ES6模板字符串语法
function _splice(left,right) {
    return `${left}${right}`
}

// 简单的字符串拼接
function _splice(left,right) {
    return left.toString() + right.toString()
}
```

## 运算符

### FED23阶乘 

![image-20211228164633698](http://i0.hdslb.com/bfs/album/f6f7845438868470be371256282feb182879920d.png)

``` js
function _factorial(number) {
  let res = 1;
  for(let i = 1; i <= number; i++) {
    res *= i
  }
  return res;
}
```

### FED24绝对值

![image-20211228164938801](http://i0.hdslb.com/bfs/album/da35d62489b6d2b7b64bd8fe236e701ed1d270ca.png)

      ``` js
      // 判断数字大小,进行返回
      function _abs(number) {
          return number >= 0 ? number : -number;
      }
      
      // Math.abs()
      function _abs(number) {
          return Math.abs(number)
      }
      ```

### FED25 幂

![image-20211228171039916](http://i0.hdslb.com/bfs/album/746dcc283d888c315955d66fe23d173b9757ca58.png)

``` js
// 简单函数写法
function _pow(number,power) {
  let res = 1;
  while(power > 0) {
    res *= number;
    power--
  }
  return res
}

// 直接调用库
function _pow(number,power) {
  return number ** power;
}
```

### FED26 平方根

![image-20211228171333460](http://i0.hdslb.com/bfs/album/df1f466ed2b5235d30ecf9ac238046878381b53c.png)

``` js
function _sqrt(number) {
  return Math.sqrt(number);
}
```

### FED27 余数

![image-20211228171456725](http://i0.hdslb.com/bfs/album/3d8cb2fe6961bd3a36fdc9812252dcac08f7d3f7.png)

``` js
function _remainder(value) {
    return value % 2;
}
```

### FED56 数组求和

![image-20211228172230608](http://i0.hdslb.com/bfs/album/a11ae31f15cf032a54b3a4324d9d4ec39285c018.png)

``` js
// 遍历数组累加
function sum(arr) {
  let sum = 0;
  arr.forEach(item => sum += item)
  return sum;
}

// ES6中的reduce()求和
function sum(arr) {
  return arr.reduce((acc,cur) => acc + cur);
}
```
### FED69 完全等同

![image-20210726143657770](http://i0.hdslb.com/bfs/album/ee2974b69b46d720d08f0dcb86ac6b8e09d8e6b7.png)

```js
function identity(val1, val2) {
  return val1 === val2;
}

//知识点: == 弱相等,不同类型的数据相比较的话,会进行自动数据类型转换,
//       === 严格相等,比较时不会做任何数据类型转换,值要相同,数据类型也要相同
```

### FED70 或运算

![image-20210815124741282](http://i0.hdslb.com/bfs/album/6c9e14e4fc252d957f67ac9da5045917aac7ff4e.png)

```js
function or(a, b) {
  return a || b;
}
```

### FED71 且运算

![image-20210815124857068](http://i0.hdslb.com/bfs/album/e56d10e41b4d0b87afc9d5e6f1b613426395357a.png)

```js
function add(a, b) {
  return a && b;
}
//且运算规则:如果a的布尔值是true ===> 返回b的值
//				 如果a的布尔值是false===> 直接返回a的值,且不再对第二个运算子求值
```
### FED72 字符串字符统计

![image-20211228225233380](http://i0.hdslb.com/bfs/album/4b9127061cbce6c8bb9349caef3ff7098384c08a.png)

``` js
function count(str) {
  let obj = {};
  let arr = [...str].filter(i => i !== ' ');    // 字符串打散成数组并过滤掉空格
  for(let item of arr) {      // 遍历数组
    item in obj ? obj[item]++ : obj[item] = 1;      // 如果空对象中已经有属性,计数加一;没有属性添加这个属性值为一
  }
  return obj
}
```

## 流程控制

### FED28 返回星期数

![image-20211228221947130](http://i0.hdslb.com/bfs/album/cfc52a6ff8c446d7514e75917d1db555471abb50.png)

``` js
function _getday(value) {
  switch (value) {
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
    case 7:
      return "星期天";
  }
}
```



## 内置对象

### FED29 从大到小排序

![image-20211228181454502](http://i0.hdslb.com/bfs/album/3ae99523f75b1ae2de418e74524c93f428327071.png)

``` js
// 直接使用内置的排序函数
function _sort(array) {
	return array.sort((a,b) => b - a);
}
```

### FED30 大写字符串

![image-20211228181617459](http://i0.hdslb.com/bfs/album/c6860f28af6fac6f640248a4c7e8bcdfc37834a5.png)

``` js
function _touppercase(string) {
	return string.toUpperCase()
}
```

### FED31 对象属性键名

![image-20211228182212451](http://i0.hdslb.com/bfs/album/508f288822fd34136518e806989fb962d24f04d4.png)

``` js
// 使用for...in... 遍历对象的键,数组也是一种对象
function _keys(object) {
  let arr = []
  for(let key in object) {
    arr.push(key)
  }
  return arr
}
```

### FED32 对象数字

![image-20211228182937433](http://i0.hdslb.com/bfs/album/b25c3e08e3f84c14c47bc29040a824138d836782.png)

``` js
function _numbertoobject(number) {
	return {number}    
}
```

### FED33 对象字符串

![image-20211228183114822](http://i0.hdslb.com/bfs/album/af6555d4a17c26d8e9878511e1ad546c6c4a61bb.png)

``` js
function _stringtoobject(string) {
    return {string}
}
```

### FED34 去除字符串两端空格

![image-20211228183245600](http://i0.hdslb.com/bfs/album/b37201fcd2ac1f82d62c25dfe23210f2f7f45ade.png)

``` js
function _trim(string) {
	return string.trim();			// 去除字符串两端的空格
}
```

### FED35 输出日期

![image-20211228205119898](http://i0.hdslb.com/bfs/album/937a1675e47a2730630106335fa69a62d045fd31.png)

``` js
function _date(number) {
  let date = new Date(number);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day}`
}
```

### FED36 数字取整

![image-20211228203315106](http://i0.hdslb.com/bfs/album/82a8c5245e98195483b312c017e9665ea592a6aa.png)

``` js
// 可以使用 ~~ 代替 Math.floor()
function _int(value) {
  return ~~value;
}
```

### FED37 数组反转

![image-20211228205608236](http://i0.hdslb.com/bfs/album/518cc4f2bd28ca3f5cb85880117fbc55c73d701f.png)

  ``` js
  // 使用自带的数组反转函数
  function _reverse(array) {
  	return array.reverse();
  }
  
  // 从后往前遍历数组
  function _reverse(array) {
    let res = [];
    for(let i = array.length - 1; i >= 0; i--) {
      res.push(array[i])
    }
    return res;
  }
  ```

### FED38 数组转字符串

![image-20211228205910420](http://i0.hdslb.com/bfs/album/4db5a1080277abbe32674602a08a03c41b5faa43.png)

``` js
// 直接使用自带的join() 函数
function _join(array) {
  return array.join('');
}

// 遍历拼接数组
function _join(array) {
  let res = '';
  array.forEach(item => res += item);
  return res;
}
```

### FED39 数组最大值

![image-20211228210309084](http://i0.hdslb.com/bfs/album/20c68f1f4eed88b1c3ed176fca1d2a21af0dd545.png)

``` js
// 自带的函数方法
function _max(array) {
  return Math.max(...array);
}

// 遍历数组比较
function _max(array) {
  let max = array[0];
  array.forEach(i => {
    if(i > max) {
      max = i;
    }
  })
  return max;
}
```

### FED40 搜索数字

![image-20211228213620500](http://i0.hdslb.com/bfs/album/e9c4d320b8c0597935d8250d127d8e8e01f8dd53.png)

``` js
// 字符串也可以使用...操作符
function _search(string) {
	return [...string].map(i => parseInt(i)).some(i => i >= 0 && i <9);
}
```

### FED41 头部插入元素

![image-20211228213926761](http://i0.hdslb.com/bfs/album/a22b70f1ad00965c5e2509904d129596cf286179.png)

``` js
// ES6写法
function _unshift(array,value) {
  return [value,...array]
}

// 直接插入到数组头写法
function _unshift(array,value) {
  array.unshift(value);
  return array;
}
```

### FED42 尾部插入元素 

![image-20211228214502819](http://i0.hdslb.com/bfs/album/f7b7190f3d2c003475dd71117ffa6e19565d6b35.png)

``` js
// ES6写法
function _push(array,value) {
  return [...array,value]
}

// 直接push()写法
function _push(array,value) {
  array.push(value);
  return array;
}
```

### FED43 Js-位置查找

![image-20211228214821753](http://i0.hdslb.com/bfs/album/837111794a973a979b92bfe5ad44bcae7a3c10fa.png)

``` js
// indexOf() 方法
function _indexof(array,value) {
  return array.indexOf(value);
}

// 遍历
function _indexof(array, value) {
  for (let i of array) {
    if (array[i] == value) {
      return i
    }
  }
  return -1
}
```

### FED44 向下取整

![image-20211228215525453](http://i0.hdslb.com/bfs/album/ce13390cc6e5d278419d031db3cf926e1b7f110b.png)

``` js
function _floor(number) {
  return ~~number;
}
```

### FED45 整数反转

![image-20211228220336557](http://i0.hdslb.com/bfs/album/120483a91cc54549d10846dc1d7c3a329db20f2b.png)

``` js
function _reverse(number) {
    let res = parseInt(Math.abs(number).toString().split('').reverse().join(''));
    return number >= 0 ? res : res * -1;
}
```

### FED46 字符串搜索

![image-20211229140329167](http://i0.hdslb.com/bfs/album/b650020ead78c384f083b8506ae882cfbb6efca1.png)

``` js
// 直接循环遍历字符串
function _search(string, value) {
  for (let i = 0; i <= string.length - 1; i++) {
    if (string[i] === value) {
      return true;
    }
  }
  return false;
}

// 字符串打散成为数组操作
function _search(string,value) {
	return [...string].includes(value)
}

// String.indexOf()返回调用它的String对象中第一次出现的指定值的索引
function _search(string, value) {
  return string.indexOf(value) !== -1;
}
```

### FED57移除数组中的元素

![image-20211228172822096](http://i0.hdslb.com/bfs/album/939b0a29393a1f751a565eeebd5ad9b914dbf5a6.png)

``` js
// 遍历数组,找出其中不是目标的值
function remove(arr, item) {
  let res = [];
  arr.forEach(i => {
    if(i !== item) {
      res.push(i)
    }
  })
  return res
}

// 直接使用ES6中的filter( )过滤函数
function remove(arr, item) {
  return arr.filter(i => i !== item);
}
```

### FED58 移除数组中的元素

![](http://i0.hdslb.com/bfs/album/3f1272da0d48cc16b019c5f315bf07e7f5a07463.png)

```js
// 从后往前遍历数组!,遇到相等的就直接切掉当前数组
function removeWithoutCopy(arr, item) {
  for(let i = arr.length - 1; i >= 0; i--) {
    if(arr[i] == item) {
      arr.splice(i,1)
    }
  }
  return arr
}
```

### FED59 添加元素

![](http://i0.hdslb.com/bfs/album/aedbbca91ad22f5445051b205053d17455a7b0b8.png)

```js
//方法一,声明空数组,遍历arr打入空数组,最后打入item
function append(arr,item){
  let tmp = []
  for(let i for arr){
    tmp.push(i);
  }
  tmp.push(item);
  return tmp;
}

//方法二,arr.slice()不带参数可以复制返回数组的副本
function append(arr,item){
	let tmp = arr.slice();
  tmp.push(item)
  return tmp;
}

//方法三,直接使用concat连接数组
function append(arr,item){
  return arr.concat([item]);
}
```

### FED60 删除数组最后一个元素

![](http://i0.hdslb.com/bfs/album/a49683795c97586c7a5723e2f2c54eb867423de7.png)

```js
//方法一,复制出新数组,末尾添加新元素
function truncafe(arr) {
  let tmp = arr.slice();
  tmp.pop();
  return tmp;
}

//方法二,arr.slice方法,返回新数组,原数组从头数第一个到从尾数倒数第二个切片
function truncafe(arr) {
  return arr.slice(0, -1);
}
```

### FED61 添加元素

![](http://i0.hdslb.com/bfs/album/9db79ddeeab19efc07ad97f20da6c82f3489ea2d.png)

```js
//方法一,拷贝出新数组,再添加元素到头部
function prepend(arr, item) {
  let tmp = arr.slice();
  tmp.unshift(item);
  return tmp;
}

//使用concat创建新数组并连接
function prepend(arr, item) {
  return [item].concat(arr);
}

// 展开运算符...
function prepend(arr, item) {
  return [item, ...arr];
}
```

### FED62 删除数组的第一个元素

![](http://i0.hdslb.com/bfs/album/7e992a0cd9031a53666b65ffdf847e1d7e4be9d6.png)

```js
//方法一,使用slice()拷贝出新数组,在使用shift去除新数组的首位
function curtail(arr){
  let tmp = arr.slice();
  tmp.shift();
  return tmp;
}

//方法二,slice对数组切片
function curtail(arr) {
    return arr.slice(1);
}

//方法三,空数组concat连接后,相当于拷贝副本,在shift
fuction(arr){
  let tmp = arr.concat();
  tmp.shift();
  return tmp;
}
```

### FED63 数组合并

![image-20210722155256824](http://i0.hdslb.com/bfs/album/0f22f1948c7eabdb548b53b4049d4b8d0ba4c228.png)

```js
function concat(arr1, arr2) {
  return arr1.concat(arr2);
}
//concat方法返回的是新数组
```

### FED64 添加元素

![](http://i0.hdslb.com/bfs/album/4f83ad0f4c60e341d44fc2bba838bf249f142d16.png)

```js
//利用slice和concat
function insert(arr, item, index) {
  return arr.slice(0, index).concat([item], arr.slice(index));
}

//利用slice拷贝在使用splice拼接替换
function insert(arr, item, index) {
  let tmp = arr.slice();
  tmp.splice(index, 0, item);
  return tmp;
}
```

### FED65 求二次方

![image-20210723155435049](http://i0.hdslb.com/bfs/album/6d1614fa1d424f5db2dbb6dfe2d7b35eed93e615.png)

```js
//方法一,复制出一个数组出来,遍历此数组元素,对每个元素的值push到新数组中
function square(arr) {
  let tmp = arr.slice();
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(tmp[i] * tmp[i]);
  }
  return newArr;
}

//方法二,拷贝出新数组后,shift取得首位,push到末尾执行数组length次
function square(arr) {
  let tmp = arr.slice();
  for (let i = 0; i < arr.length; i++) {
    let n = arr.shift();
    n *= n;
    tmp.push(n);
  }
  return tmp;
}

//方法三,使用数组的map方法,对数组的每一项回调返回平方
function square(arr) {
  return arr.map((item) => item * item);
}

// forEach():会修改原来的数组  ; map():得到一个新数组并返回
```
### FED66 查找元素位置

![image-20211228175337597](http://i0.hdslb.com/bfs/album/b45a5cae2e38612ef8320bb6f235640241d3a075.png)

``` js
function findAllOccurrences(arr, target) {
  let res = []
  arr.forEach((item,index) => {
    if(target == item) {
      res.push(index)
    }
  })
  return res;
}
```


### FED68 正确的使用 `parseInt`

![image-20210726142355840](http://i0.hdslb.com/bfs/album/f4cee1355f75607bdff8778a746cbf8d3d7b2223.png)

```js
//原题
function parse2Int(num) {
  return parseInt(num);
}

function parse2Int(num) {
  return parseInt(num, 10);
}

//parseInt(string, radix):string:需被解析的字符串,radix:要解析数字的基数,值在0~36之间
```

## 函数

### FED47 函数——参数对象

![image-20211229141126126](http://i0.hdslb.com/bfs/album/04c6a47f2cbb74f8a455a0b9c7aba73ea6c43f6e.png)

``` js
// 浏览器函数在调用的时候,会传递一个类数组对象参数: arguments.
function getArguments(a, b, c) {
  return [...arguments];			// 展开运算符将类数组对象转换成数组.
}
```

## this

### FED48 this指向

![image-20211229143912059](http://i0.hdslb.com/bfs/album/beaaade738d9fc04c827c90ca695e497a3a16437.png)

``` js
```








###        

### 20.添加元素

![image-20210901181712463](http://i0.hdslb.com/bfs/album/952089721018a087f8ee161833b49aa4cf82cfd7.png)

```js
// 直接使用ES6的...spread展开操作符号
function append(arr, item) {
  return [...arr, item];
}

// 方法二 slice复制出一份,在push进去
function append(arr, item) {
  let res = arr.slice();
  res.push(item);
  return res;
}
```

### 26.计数

![image-20210722163449677](http://i0.hdslb.com/bfs/album/e80c0e9526b74fe111200f6a867de312ca82919e.png)

```js
// 数组遍历计数
function count(arr, item) {
  let count = 0;
  arr.forEach((i) => {
    if (i === item) {
      count++;
    }
  });
  return count;
}

// reduce遍历计数
function count(arr, item) {
  return arr.reduce((acc, val) => (val === item ? acc + 1 : acc), 0);
}

// filter过滤取长度
function count(arr, item) {
  return arr.filter((i) => i === item).length;
}
```

### 27.查找重复元素

![image-20210722180804955](http://i0.hdslb.com/bfs/album/da5653c81af76efd660b7d8da73a8e1daece6022.png)

```js
//关键是判断数组中间项和前项的位
function duplicates(arr) {
  let tmp = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == arr[i + 1] && arr[i] !== arr[i - 1]) {
      tmp.push(arr[i]);
    }
  }
  return tmp;
}
```


### 查找数组元素

![image-20210723182626339](http://i0.hdslb.com/bfs/album/94f9b57451720b0cee0beaffc52a0549f85bc2f7.png)

```js
//方法一,遍历数组,将遍历时索引给打入新数组
function findAllOccurrences(arr, target) {
  let tmp = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      tmp.push(i);
    }
  }
  return tmp;
}

//方法二,使用数组map方法,map方法最后返回的就是一个新数组
function findAllOccurrences(arr, target) {
  return arr.map((item, index) => {
    if (target == item) {
      return index;
    }
  });
}
```

### 避免全局变量

![image-20210723190410320](http://i0.hdslb.com/bfs/album/5e30894249a4c3da6a55282cf2ae5335ea4f94c6.png)

```js
//题目
function globals() {
  myObject = {
    name: "老王",
  };
  return myObject;
}

//函数内对象没有声明,直接变成全局变量,直接使用var或者let声明一下就好了
function globals() {
  let myObject = {
    name: "老王",
  };
  return myObject;
}

function golobals() {
  return { name: "老王" };
}
```

### 正确的函数定义

![image-20210726131718017](http://i0.hdslb.com/bfs/album/d76184ad27195b43c33cf0ed209c8f46113b1222.png)

```js
//题目
function functions(flag) {
  if (flag) {
    function getValue() {
      return "a";
    }
  } else {
    function getValue() {
      return "b";
    }
  }

  return getValue();
}

//方法一,考察function 函数名 (){} 和 var 函数名 = function () {} 之间的区别
//前者是在执行前,就会被解析,后者是在执行过程中被解析
function functions(flag) {
  let getValue = null;
  if (flag) {
    getValue = function () {
      return "a";
    };
  } else {
    getValue = function () {
      return "b";
    };
  }
  return getValue();
}

//方法二
function functions(flag) {
  return flag ? "a" : "b";
}
```



### 计时器

![image-20210726152853196](http://i0.hdslb.com/bfs/album/930005f2059b64fa60763ecd5822f7fc26ce63fa.png)

```js
function count(start, end) {
  //立即输出第一个数
  console.log(start++);
  let timer = setIntval(() => {
    start <= end ? console.log(start++) : clearInterval(timer);
  }, 100);
  return { cancel: () => clearInterval(timer) };
}
//设置定时器后,计数器开始增加到结束后,清除定时器
```

---

**空值合并运算符 `??`**

`a ?? b` 结果:

- 如果 `a` 是已定义,则结果为 `a`
- 如果 `a` 未定义,则结果为 `b`

```js
let fruit;
console.log(fruit ?? "apple"); //apple
//变量声明后未赋值,返回 ?? 符号后面的参数

let fruit = "banana";
console.log(fruit ?? "apple"); //banana
//变量已经声明,返回原来的值
```

**三元运算符 `? `**

```js
let result = condition ? value1 : value2;
//如果condition条件为真则返回 值1,否则返回 值2;为了增加代码可读性,通常给判断语句加一层括号

let age = 20;
let info = age < 18 ? "未成年" : "成年人";
console.log(info);

//多重判断的运算符
let age = 34;
let message =
  age < 16
    ? "少年"
    : age < 18
    ? "未成年"
    : age < 25
    ? "青年"
    : age < 45
    ? "中年"
    : "老年";
console.log(message);
等价于;
if (age < 16) {
  message = "少年";
} else if (age < 18) {
  message = "未成年";
} else if (age < 25) {
  message = "青年";
} else {
  message = "老年";
}
```

---

### 流程控制

![image-20210726172502644](http://i0.hdslb.com/bfs/album/7fa930aedef3f6fa1cdb7bf697aaa517b8b49dca.png)

```js
function fizzBuzz(num) {
  return num % 3 === 0 && num % 5 === 0
    ? "fizzbuzz"
    : num % 3 === 0
    ? "fizz"
    : num % 5 === 0
    ? "buzz"
    : Object.prototype.toString.call(num) !== "[object Number]"
    ? false
    : num;
}
//使用Object.prototype.toString.call(num)来判断是否是number数据类型
```

**知识点**

`typeof`运算符返回参数的类型,两种使用方式

- 直接作为运算符: `typeof x`
- 函数形式: `typeof(x)`

有没有括号,两者结果差不多,使用 `typeof x`的调用会以**字符串**的形式返回数据类型;

```js
typeof 12; // "number"
typeof "apple"; //"string"
typeof false; //"boolean"
let a = typeof 12;
typeof a; //"string",因为返回是字符串格式
```

使用 `Object.prototype.toString.call()` 来检测对象类型, `typeof` 不能准确判断对象变量

```js
console.log(Object.prototype.toString.call("jerry")); //[object String]
console.log(Object.prototype.toString.call(12)); //[object Number]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
console.log(Object.prototype.toString.call(null)); //[object Null]
console.log(Object.prototype.toString.call({ name: "jerry" })); //[object Object]
console.log(Object.prototype.toString.call(function () {})); //[object Function]
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call(new Date())); //[object Date]
console.log(Object.prototype.toString.call(/\d/)); //[object RegExp]
function Person() {}
console.log(Object.prototype.toString.call(new Person())); //[object Object]
```

---

### 二进制转换

![image-20210728171600119](http://i0.hdslb.com/bfs/album/b74236b9bda7fb9606162afdfb2984908512aef8.png)

```js
function base10(str) {
  return parseInt(str);
}

//parseInt(str,radix):将字符串读取数字,并以指定基数(radix)返回
```

### 二进制转换

![image-20210728181338865](http://i0.hdslb.com/bfs/album/fa30dd116110f5c06a333b99c1a044314d09461a.png)

```js
function converToBinary(num) {
  let tmp = num.toString(2);
  let len = tmp.length;
  return len < 8 ? "0".repeat(8 - len) + tmp : tmp;
}
```

### 二进制转换

![image-20210901142704660](http://i0.hdslb.com/bfs/album/fea26f31691d2ef1def2c9c7d8ff6d214d711b49.png)

```js
// 方法一 直接使用原生的方法,字符串转二进制 ==> 分割为数组 ==> 反转数组访问
function valueAtBit(num, bit) {
  return num.toString(2).split("").reverse()[bit - 1]; // 注意:最后返回值是string类型
}

// 方法二 模拟除法运算
function valueAtBit(num, bit) {
  let res = 0;
  for (let i = 0; i < bit; i++) {
    res = num % 2;
    num = parseInt(num / 2);
  }
  return res;
}
```

### 判断是否包含数字

![image-20210729091258496](http://i0.hdslb.com/bfs/album/61a6a4f308a6f1f8dcfd52228ffae69f7d12a684.png)

```js
//遍历字符串,并且对每个字符串判断ASCII码值
function containsNumber(str) {
  for (let char of str) {
    if (char.charCodeAt() < 58 && char.charCodeAt > 47) {
      return false;
      break;
    }
  }
  return true;
}

//遍历字符串,使用 !NaN 判断是否为数字
function containsNumber(str) {
  for (let item of str) {
    if (!isNaN(item)) {
      return true;
    }
  }
  return false;
}
```

### 斐波那契数列第 n 项值

![image-20210812144325644](http://i0.hdslb.com/bfs/album/89cf0d462c9324c21dc4727c846d2b6591b31046.png)

```js
// 方法一,新建初始数组,循环(n-1)次,每次将数组的倒数第一项与倒数第二项的和push进去,最后返回数组的pop
function fibonacci(n) {
  let arr = [0, 1];
  let i = 1;
  while (i < n) {
    arr.push(arr[arr.length - 2] + arr[arr.length - 1]);
    //还可以使用es6语法的arr.at()反向索引访问数组的值
    //arr.push(arr.at(-2) + arr.at(-1));
    i++;
  }
  return arr.pop();
}

//方法二,递归
function fibonacci(n) {
  return n < 3 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

//方法三,迭代
function fibonacci(n) {
  let start = 1,
    second = 1,
    end;
  for (let i = 3; i <= n; i++) {
    end = start + end;
    start = second;
    second = end;
  }
  return end;
}
```



### 使用 arguments

![image-20210901140106457](http://i0.hdslb.com/bfs/album/9c43d0889c659ae963d86c0e36b9a2e3ac3a8790.png)

```js
function useArguments() {
  return Array.from(arguments).reduce((acc, item) => acc + item, 0);
}
```

### 柯里化

![image-20210901152200855](http://i0.hdslb.com/bfs/album/f97b0645bdcd0032b1c16c9917511d852340cc2d.png)

```js
// 函数柯里化: 把接受多个参数的函数变成接受多个单一参数的函数
function curryIt(fn) {
  return function(a) {
    return function(b) {
      return fucntion(c) {
        return a + b + c
      }
    }
  }
}

// 直接使用ES6的语法会更加简洁
let curryIt = fn => a => b => c => a + b + c
```

### 模块

![image-20210901154742901](http://i0.hdslb.com/bfs/album/b69f3ab80df5b5cb3f57599e6621242d7823928f.png)

```js
function createModule(str1, str2) {
  let obj = {
    greeting: str1,
    name: str2,
    sayIt: function () {
      return this.greeting + ", " + this.name;
    },
  };
  return obj;
}
```

### 数组去重

![image-20210901160808677](http://i0.hdslb.com/bfs/album/a03a3368a253688fd708315807929be2a2fb92d8.png)

```js
// 遍历迭代去重
Array.prototype.uniq = function () {
  let res = [];
  this.forEach((item) => {
    if (!res.includes(item)) {
      res.push(item);
    }
  });
  return res;
};

// 利用set集合中的值唯一特性去重
Array.prototype.uniq = function () {
  return [...new Set(this)];
};
```

### 获取字符串的长度

![image-20210901175430497](http://i0.hdslb.com/bfs/album/13f00c5229261b4cf800fbfc0dc318c49db8e94a.png)

```js
function strLength(s, bUnicode255For1) {
  if (bUnicode255For1) {
    return s.length;
  } else {
    return s
      .split("")
      .reduce((acc, item) => (item.charCodeAt() > 255 ? acc + 2 : acc + 1), 0);
  }
}
// reduce方法遍历到每个数组元素的时候,对累加器进行操作,最后返回累加器的值
```

## 前端大挑战

### JS1 直角三角形

​      ![image-20220130102542119](http://i0.hdslb.com/bfs/album/9219aa230b8369cd0e384ecf88634630e1d7cdf9.png)

``` js
var triangle = document.querySelector('.triangle');
let str = ''
for(let i = 0; i <= 3; i++) {
    for(let j = 0; j < i; j++) {
        str += '*'
    }
    str += '<br/>'
}
triangle.innerHTML = str;
```

### JS5 创建数组

![image-20220130102912401](http://i0.hdslb.com/bfs/album/592506e911f8dcd06f946500de8875170750162c.png)

``` js
const _createArray = (number) => {
    return new Array(number).fill(number)
}
```

### JS7 无重复数组

![image-20220130104617651](http://i0.hdslb.com/bfs/album/0458d557f3c7fb3790217158131b7fec32d8b752.png)

``` js
const _getUniqueNums = (start, end, n) => {
  var res = [], i = n;
  var randomNum = (start, end) => ~~(Math.random() * (end - start + 1)) + start;
  while (n) {
    res.push(randomNum(start, end))
    n--
  }
  return res
}
```

## JS9 新数组

![image-20220130105926868](http://i0.hdslb.com/bfs/album/69b01c723e3f6e94b9f795c18bed266cb3a37dd6.png)

``` js
const _delete = (array, index) => {
  let res = [];
  for (let item of array) {
    if (item === array[index]) continue;
    res.push(item)
  }
  return res
}
```

### JS10 计数器

![image-20220130110621411](http://i0.hdslb.com/bfs/album/2077646f31459c483bdcfed30fe2050ca1a1e1c4.png)

``` js
const closure = () => {
  let count = 1;
  return function () {
    return count++;
  }
}
```










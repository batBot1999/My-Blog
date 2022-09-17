# JavaScript数据结构

## 创建堆栈类

``` js
/* 
	一个栈应该有如下方法：
	压栈方法：push(), 出栈方法pop(),返回栈顶元素peek(), 判断栈空方法：isEmpty(),清空栈：clear()
*/
function stack() {
  var collection = []
  this.push = function(item) {
    collection.push(item)
  }
  this.pop = function() {
    return collection.pop()
  }
  this.peek = function() {
    return collection[collection.length - 1]
  }
  this.isEmpty = function() {
    return collection.length === 0
  }
  this.clear = function() {
    collection.length = 0
  }
}
```

## ES5中创建Map类

`Map` 映射:是用来存储键值对的数据结构,就像一个对象一样,不过 `Map` 允许任何类型的键(key)

``` js
var Map = function() {
  this.collection = {};

  // 接受key,判断Map中是否存在相应得值
  this.has = (key) => {
    return this.collection.hasOwnProperty(key);
  };

  // add(key,value)添加一对新的键值对进Map中,这个方法也可以用来更新一个值
  this.add = (key,value) => {
    this.collection[key] = value;
  };

  // remove(key),从map中删除与key对应的值
  this.remove = (key) => {
    if(this.has(key)) {
      delete this.collection[key]
    }
  };

  // get(key),根据key返回value值
  this.get = (key) => {
    if(this.has(key)) {
      return this.collection[key];
    } else {
      return '该键值对还未被定义'
    }
  }

  // values, 返回map中所有值得数组
  this.values = () => {
    return [...Object.values(this.collection)];
  }

  // size, 返回map中元素的数目
  this.size = () => {
    return [...Object.values(this.collection)].length;
  }

  // clear()方法: 清空map中的所有元素
  this.clear = () => {
    this.collection = {};
  }
};
```

## ES6中的Map语法

``` js
// new Map() : 创建 map
let map = new Map()

// map.set(key,value) : map中添加键值对
map.set('name','Jack')

// map.get(key): 根据键来返回值,如果map中没有对应的key,则返回undefined
map.get('name')

// map.has(key): 根据 key来查询map中是否存在对应的值,返回true或者false 
map.has('name') // true

// map.delete(key): 删除指定键的值
map.delete('name')

// map.clear(): 清空map
map.clear()

// map.size(): 返回map中元素的个数
map.size()
```

## ES5中手动创建集合类及方法

``` js
class Set {
  constructor() {
    // 集合类用对象存储
    this.dictionary = {};
    this.length = 0;
  }
  // has(element)： 方法判断集合中是否存在某个元素，返回"true",不存在返回"false
  has(element) {
    return this.dictionary[element] !== undefined;
  }
  // 这个方法会返回集合中的所有值
  values() {
    return Object.values(this.dictionary);
  }
  // add(element): 方法添加一个新元素到集合中，添加成功则返回true,添加失败返回false
  add(element) {
    if (!this.has(element)) {
      this.dictionary[element] = element;
      this.length++;
      return true;
    }

    return false;
  }
  // remove()方法，从集合中删除某个元素，并返回true，否则返回false
  remove(element) {
    if (this.has(element)) {
      delete this.dictionary[element];
      this.length--;
      return true;
    }

    return false;
  }
  // size()方法： 返回集合中的元素个数
  size() {
    return this.length;
  }
  
  // union() 方法： 接收一个集合作为参数，返回和原本集合的并集， setA.union(setB): 集合A和集合B的并集
  union(set) {
    const newSet = new Set()
    // 遍历集合一的元素，将其添加到新集合中
    this.values().forEach(item => newSet.add(item))
    // 遍历结合二的元素，将其添加到新集合中
    set.values().forEach(item => newSet.add(item))
    return newSet
  }
  
  // intersection()方法： 对两个集合的数据求交集
  intersection(set) {
    const newSet = new Set()
    this.values().forEach(item => {
      if(set.values().includes(item)) {
        newSet.add(item)
      }
    });
    return newSet
  }
  
  // difference()方法： 找出集合一中存在二集合二中不存在的元素，即集合一和集合二的差集
  difference() {
    const newSet = new Set()
    this.values().forEach(item => {
      if(!set.values().includes(item)) {
        newSet.add(item)
      }
    })
    return newSet
  }
  
  // isSubsetOf(set)方法： 判断集合二是否为集合一的子集，是则返回true,不是子集则返回false
  isSubsetOf(set) {
    return this.values().every(item => set.values().includes(item))
  }
}
```

## ES6集合

``` js
// 创建集合
var set = new Set()

// 从一个数组中创建集合
var set = new Set([1,2,4,'hello',null])

// 集合中添加元素
set.add(1)
set.add(2)

// 集合中删除元素
set.delete(1)

// 检查值是否在集合中
set.has(2)

// 返回集合的大小
set.size()

// 使用 "..." 展开运算符将可迭代对象转化为数组
var set = new Set([1,2,3])
var setToArr = [...set] 		// [1,2,3]
```


## 哈希表(散列表)

哈希表也叫散列表,它提供了一种键值之间的映射关系,只要给出一个 `key` 就可以高效的查找到与它匹配的 `value` ,时间复杂度接近于`O1` ,

散列表可以通过使用数组来实现,因为数组根据索引查询值可以进行随机访问.将 `key` 转换为 `value` 得一个中转站就叫做: 哈希函数

如果哈希函数对不同得键产生相同得值,这种情况叫做哈希碰撞,解决哈希碰撞得一个方法是: 将两个键值对都存储在这个索引上,查找其中一个时,在这个索引中进行迭代,来查找要寻找得键.

# 链表

**种类**

* 单向链表
* 双向链表
* 单向循环链表
* 双向循环链表
* 环形链表

**特点**

链表不同于数组,内存放置并不需要连续,每个元素由一个存储元素本身的节点和指向下个元素的引用构成.

**链表类的方法**

* append( element): 链表尾部添加一个新元素
* appendAt( element, position): 链表的特定位置插入一个新元素
* remove(position): 删除指定项的元素
* remove( ): 清空链表
* indexOf( element): 根据元素查找其索引

## 链表中的节点

链表是数据元素的线性集合,称为节点,每个节点指向下一个节点.每个节点包括两个元素: 一个自身的`element` ,一个是对下一个节点的引用

``` js
// 声明一个构造器函数,挂载一个自身元素,一个对下一个节点的引用
var Node = function(element) {
  this.element = element;
  this.next = null;
}

// 分别声明两个节点,每个节点都有自身元素,和引用
const Dog = new Node('Dog');
const Cat = new Node('Cat');

// 对Dog的下一个引用挂载给Cat
Dog.next = Cat

console.log(Dog)		// { element: 'Dog', next: { element: 'Cat', next: null } }
```

## 创建链表类

一个链表有几个基本属性: 表头: `head` ,表长: `length` ,添加节点方法: `add(element)` ,每次添加新节点到链表中时都需要判断链表是否有`head` ,如果已经有了就一直根据节点的`next` 查询到最后一个指向为 `null` 的节点,此节点即为 :链表尾

``` js
// 声明一个链表构造函数
function LinkedList() {
  let length = 0;
  let head = null;
  
  // 声明一个构造节点的构造器,由于this的指向问题,不能使用箭头函数
  function Node(element) {
    this.element = element;
    this.next = null;
  }
  
  // 添加head和length方法
  this.head = () => head;
  this.size = () => length;
  
  // add(element)方法: 用来向链表中添加节点
  this.add = (element) => {
    const node = new Node(element)
    let current;		// 声明一个位置指针
    if(head === null) {			 // 如果链表头为空
      head = node;
    } else {
     	// 链表头不为空,在链表尾部添加节点
      current = head;			// 指针先指向头部,从头部开始后移
      while(current.next !== null) {		// 只要位置指针的next还不时null,就一直后移
        current = current.next;
      }
      current.next = node;		// 此时位置指针为链表尾,在链表尾添加节点
    }
    length++;
  }
  
  // remove(element)方法: 从链表中删除给定的元素
    this.remove = function(element){
    // 当删除的元素即为head节点
    if(head.element === element) {
      head = head.next;
      return length--
    }
    let previous = head;
    // 只要当前节点不是element节点,就一直往后遍历
    while(previous) {
      let current = previous.next
      if(current) {
        if(current.element === element) {
          previous.next = current.next
          return length--;
        }
      }
      previous = current
    }
  };
  
  // isEmpty(),判断链表是否为空
  this.isEmpty = function {
    return length === 0	 
  }
  
	// indexOf(element),根据元素查询索引,head(索引为0),如果为查询到返回-1,查询到返回index
  this.indexOf = function(element) {
    let current = head;
    // 遍历节点,当索引i小于链表长度并且当前节点不是尾节点时候执行语句
    for(let i = 0; i < length && current !== null; i++) {
      if(current.element === element) {
        return i
      }
      current = current.next		// 每次循环后步进到下一节点
    }
    return -1
  }
}
```

``` js
/*
	举例: 声明一个fruit链表,给fruit链表中添加几种水果节点
*/
const fruit = new LinkedList();

fruit.add('apple')
console.log(fruit.head())
// { element: 'apple', next: null }
fruit.add('banna')
fruit.add('cherry')
console.log(fruit.size())
// 3
```

## 排序算法

### 冒泡排序

> 冒泡排序（BubleSort)比较数组内相邻的两个项，如果第一个比第二个大，则交换他们位置，否则不动。数组中元素较大的数会依次向上浮动，类似气泡升到表面。

**注意点**

1. 每一轮过后，轮数相等的元素都会放置最后，变得有序
2. 比较的轮数是，数组的长度—1
3. 每一轮需要比较的元素个数为：数组长度-比较轮数

![img](https://i0.hdslb.com/bfs/album/c3b05110462924508ec81e4bf16a48e1d188bd6e.webp)

``` js
function BubleSort(arr){
    for(var i = 0; i < arr.length - 1; i++){        //外层循环控制比较轮数
        for(var j = 0; j < arr.length -(i+1); j++){ //内层循环控制比较指针移动
            if(arr[j] > arr[j+1]){
                var tmp = arr[j];                   //设置空元素来交换数组位置
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
        }
    }
}
```

### 选择排序

> 选择排序（selection sort),每一轮和待排序的元素依次比较，比较出大小就交换两者顺序，直到所有待排序的元素全部排完。

**特点**

1. 比较的轮数=数组长度-1
2. 每次比较完毕后，指针的地址+1

![img](https://i0.hdslb.com/bfs/album/9461357cf5362dc376107eac8a407bbb8bf57748.gif)

``` js
  for(var i = 0; i < arr.length-1; i++){        //比较的轮数
    for(var j = i+1; j < arr.length; j++){      //被比较数的下标
      if(arr[i] > arr[j]){            
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
    }
  }
```


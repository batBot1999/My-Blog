## FreeCodeCamp 基础算法

自学`js` 总感觉很多地方知识掌握的不到位,希望通过系统的刷题提高自己的知识掌握能力,写文章强迫自己输出,形成系统的思维.

[FCC 官网链接](https://chinese.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-algorithm-scripting/convert-celsius-to-fahrenheit)

[JS 基础算法课程\_B 站链接](https://www.bilibili.com/video/BV1iZ4y1p7kr)

### 摄氏度转换为华氏度

![image-20210814174446734](http://i0.hdslb.com/bfs/album/2888730d1262e7b10c79b43b0af2cb0cabd07123.png)

```js
function convertToF(celsius) {
  return (celsius * 9) / 5 + 32;
}
//对于结果直接返回即可
```

### 反转字符串

![image-20210815011341225](http://i0.hdslb.com/bfs/album/206c6a2b330c0c989a518013e99592831c5885e0.png)

```js
输入: "hello";
输出: "olleh";
```

```js
// 思路一,split拆分成数组 ==> 数组倒置 ==> join拼接数组
function reverseString(str) {
  return str.split("").reverse().join("");
}

// 思路二,for循环从尾到头遍历,每次拼接遍历到的字符串
function reverseString(str) {
  let res = "";
  for (let i = str.length - 1; i >= 0; i--) {
    res += str[i];
  }
  return res;
}

// 思路三,字符串拆分成数组 ==> 设置头指针i,尾指针j ==>  只要 i < j 循环互换数组指针处位置
function reverseString(str) {
  let arr = str.split("");
  let i = 0,
    j = str.length - 1,
    tmp = 0;
  while (i < j) {
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    i++;
    j--;
  }
  return arr.join("");
}

// ES6语法
function reverseString(str) {
  let arr = str.split("");
  let i = 0,
    j = arr.length - 1;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }
  return arr.join("");
}

// 思路四,使用递归 (hello) ==> o(ell)h ==> ol(l)eh ==> olleh
function reverseString(str) {
  if (!str) {
    // 如果字符不存在,返回空字符
    return "";
  }
  if (str.length === 1) {
    // 如果字符长度为一,返回字符
    return str;
  }
  let end = str.length - 1;
  return str[end] + reverseString(str.slice(1, end)) + str[0]; // 返回首尾互换并且上一次调用递归后的字符串
} // str.slice(start,end):获取子字符串返回[start,end),包括第一个参数,不包括第二个参数
```

### 计算整数的阶乘

![image-20210816163629896](http://i0.hdslb.com/bfs/album/1607f9367633c7947d1b5d08f73dce5aa1d5f298.png)

```js
// 方法一,迭代遍历累积
function factorialize(num) {
  let res = 1;
  for (let i = 1; i <= num; i++) {
    res *= i;
  }
  return res;
}

// 方法二,递归法
function factorialize(num) {
  return num <= 1 ? 1 : factorialize(num - 1) * num;
}
```

### 找出字符串中的最长单词

![image-20210816175310251](http://i0.hdslb.com/bfs/album/497c5e877a4ad88887f087589c6f1651d7dbac6e.png)

```js
输入: "The quick brown fox jumped over the lazy dog";
输出: 6;
```

```js
// 遍历字符串分割的数组,累技每一项的字符串长度
function findLongestWordLength(str) {
  let arr = str.split(" ");
  let len = 0;
  for (let item of arr) {
    if (len < item.length) {
      len = item.length;
    }
  }
  return len;
}

// 方法二: 字符串分割为数组 ==> 数组每一项map返回长度数组 ==> 长度数组升序排列 ==> 弹出最大数
function findLongestWordLength(str) {
  return str
    .split(" ")
    .map((item) => item)
    .sort((a, b) => a - b)
    .pop();
}
```

### 找出多个数组中的最大数字

![image-20210817114806289](http://i0.hdslb.com/bfs/album/b6c4b08ff58aa96139ec5dc97357d17372a50747.png)

```js
输入: [
  [4, 5, 1, 3],
  [13, 27, 18, 26],
  [32, 35, 37, 39],
  [1000, 1001, 857, 1],
];
输出: [5, 27, 39, 1001];
```

```js
// 对数组map ==> 每一项子数组正序排序 ==> 排序的数组pop出最大值 ==> 最大值组成新数组
function largestOfFour(arr) {
  return arr.map((item) => item.sort((a, b) => a - b).pop());
}

// 遍历子数组,进行迭代比较
function largestOfFour(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let max = -Infinity;
    for (let item of arr[i]) {
      max = Math.max(max, item);
    }
    res.push(max);
  }
  return res;
}

// 使用ES6中的map和...展开运算符,对每个子数组展开取最大值
function largestOfFour(arr) {
  return arr.map((item) => Math.max(...item));
}
```

### 确认结尾

.![image-20210820104611925](http://i0.hdslb.com/bfs/album/29a0353ef25bd88e6109b65b2a592abeb6f089d7.png)

```js
输入: "Walking on water and developing software from a specification are easy if both are frozen",
  "specification";
输出: false;

输入: "Bastian", "n";
输出: true;
```

```js
// 切掉str的target长度的字符串与target进行比较
function confirmEnding(str, target) {
  return str.slice(-target.length) === target;
}

// 从str，和target末尾开始遍历，每次遍历到的字符进行比较
function confirmEnding(str, target) {
  if (target.length > str.length) {
    return false;
  }
  let i = str.length - 1,
    j = target.length - 1; // 声明i和j为str与target的尾指针
  while (j >= 0) {
    if (str[i] !== target[j]) {
      // 对于每次遍历到的字符判断是否一样，不一样直接返回false
      return false;
    }
    i--;
    j--;
  }
  return true; // 只有当str都遍历完，没有发现有不一样的时候才能返回true
}
```

### 重复输出字符串

![image-20210820161707102](http://i0.hdslb.com/bfs/album/50145b9a6110bb8b8b5611c8c1e5f3a343f1c7ed.png)

```js
输入: "abc", 3;
输出: "abcabcabc";

输入: "abc", -2;
输出: "";
```

```js
// 声明空字符串,循环num次,每次连接字符串
function repeatStringNumTimes(str, num) {
  let res = "";
  for (let i = 0; i < num; i++) {
    res += str;
  } // 当num为负数的时候,直接进不去循环,res还是为空,能覆盖到循环这个条件;无需另外判断
  return res;
}

// 使用数组join方法,有num+1数目元素的空数组,在数组间隙之间插入str字符串
function repeatStringNumTimes(str, num) {
  return num <= 0 ? "" : Array(num + 1).join(str); // 声明一个有num+1个元素的空数组
}

// 使用递归
/*
	定义一个神奇的函数f()
	'ababab' ==> 'abab' ==> 'ab' ==> ''
	f(3) = f(2) + str
	f(2) = f(1) + str
	f(1) = f(0) + str			到f(0)时直接返回空字符
	规律：f(num) = f(num - 1) + str
*/
function repeatStringNumTimes(str, num) {
  return num <= 0 ? "" : repeatStringNumTimes(str, num - 1) + str;
}
```

### 截断字符串

![image-20210820171015070](http://i0.hdslb.com/bfs/album/af132e9a98913da99b0bb07bfefbef932283d447.png)

```js
输入： "A-tisket a-tasket A green and yellow basket", 8
输出:  "A-tisket..."

输入： "hello" 9
输出： "hello"
```

```js
// 如果str的长度比num大，使用slice切片拼接字符，否则直接返回str
function truncateString(str, num) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}
```

### 按参数过滤数组

![image-20210821011455945](http://i0.hdslb.com/bfs/album/29616598dc00a1ed1a0e8676a39dc4489797bda4.png)

```js
输入: findElement([1, 3, 5, 8, 9, 10], function (num) {
  return num % 2 === 0;
});
输出: 8;
```

```js
// 遍历这个数组的每一元素,如果元素满足func直接返回该元素,如果所有元素都不满足函数条件,默认返回undefinded
function findElement(arr, func) {
  for (let item of arr) {
    if (fun(item)) {
      return item;
    }
  }
}

// 使用ES6中的filter
function findElement(arr, func) {
  return arr.filter(fun)[0]; // filter传入参数func,返回的数组取第一项元素
}

// 使用ES6中的数组find方法
// arr.find(callback):返回满足特定条件的元素对象或者元素值， 不满足返回 undefined
function findElemet(arr, func) {
  return arr.find(func);
}
```

### 基本类型布尔值的检查

![image-20210822010441978](http://i0.hdslb.com/bfs/album/c14846868e17528baf049b35602c3f1556d5e3b0.png)

```js
输入: booWho(true);
输出: true;
```

```js
function boowho(bool) {
  return t(bool) === "boolean" ? true : false;
}
```

### 句中单词首字母大写

![image-20210823105433241](http://i0.hdslb.com/bfs/album/95a43536c922eed77e002653be94970596327699.png)

```js
输入: "sHoRt AnD sToUt";
输出: "Short And Stout";
```

```js
// 字符串split分割为数组 ==> 数组的每一项item转换大小写 ==> 空格拼接数组字符串
function titleCase(str) {
  return str
    .split(" ")
    .map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
}

// 使用正则表达式,匹配空格和空格后面的第一个字母大写
function titleCase(str) {
  return str
    .toLowerCase()
    .replace(/(^|\s)[a-z]/g, (match) => match.toUpperCase());
}
```

### Slice 与 Splice

![image-20210823145106553](http://i0.hdslb.com/bfs/album/1329bcb8a9945168dc68372593a7ce3d54a6cbbc.png)

```js
输入: [1, 2, 3], [4, 5], 1;
返回: [4, 1, 2, 3, 5];
```

```js
// 使用splice方法在指定处切片插入,使用"..."展开运算符,可以打散数组
function frankenSplice(arr1, arr2, n) {
  return [...arr2.splice(0, n), ...arr1, ...arr2.splice(n)];
}

// 直接使用splice方法; arr.splice(index,[deleteCount],item)
function frankenSplice(arr1, arr2, n) {
  let resArr = arr2.slice(); // 对数组直接slice(),拷贝数组
  resArr.splice(n, 0, ...arr1);
  return resArr;
}
```

### 过滤数组中的假值

![image-20210823161810980](http://i0.hdslb.com/bfs/album/7badc1efd9a502202d17207081ceadce5c9d2f91.png)

```js
// 遍历数组元素,对每个元素使用Boolean()函数判断,将判断为真值的打入结果数组并返回
function bouncer(arr) {
  let res = [];
  for (let item of arr) {
    if (Boolean(item)) {
      // 或者使用双重非运算符 !!(item) ,对元素取反默认判断其布尔值,双重取反抵消操作
      res.push(item);
    }
  }
  return res;
}

// 使用filter过滤,回调函数中是返回满足条件的元素
function bouncer(arr) {
  return arr.filter((item) => Boolean(item)); // 回调函数中,返回item的boolean为true的元素
}
// 进一步简化版本
function bouncer(arr) {
  return arr.filter(Boolean); // filter中直接传入一个Boolean函数
}
```

### 找出元素在排序后数组中的索引

![image-20210824102322472](http://i0.hdslb.com/bfs/album/7e90a886203f2b54abef68f3ce58bfa20c45ce31.png)

```js
输入: [10, 20, 30, 40, 50], 35;
输出: 3;
输入: [5, 3, 20, 3], 5;
输出: 2;
```

```js
// 直接使用filter过滤出所有小于num的数组元素输出新数组长度
function getIndexToIns(arr, num) {
  return arr.filter((item) => item < num).length;
}

// 和filter思路一样,找出数组中比num小的数组
function getIndexToIns(arr, num) {
  let res = 0;
  for (let item of arr) {
    if (item < num) {
      res++;
    }
  }
  return res;
}

// 先将num打入到数组中,排序并输出num的第一次出现的位置
function getIndexToIns(arr, num) {
  return [...arr, num].sort((a, b) => a - b).indexOf(num);
}

// 直接遍历添加好元素的数组,访问num的index
function getIndexToIns(arr, num) {
  let sortedArr = [...arr, num].sort((a, b) => a - b);
  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] === num) {
      return i;
    }
  }
}
```

### 比较字符串

![image-20210824153228857](http://i0.hdslb.com/bfs/album/6b7d1785287e2fbde750c31df6c6201f76f1abd0.png)

```js
输入: ["hello", "hey"];
返回: false;
输入: ["voodoo", "no"];
返回: false;
```

```js
// 先将数组字符串都转小写 ==> 遍历第二个字符串 ==> 判断第一个字符中是否包含第二个字符串元素
function mutation(arr) {
  let strArr = arr.map((item) => item.toLowerCase());
  for (let i of strArr[1]) {
    if (!strArr[0].includes(i)) {
      return false;
    }
  }
  return true;
}

// every对第二个字符串内的每一个元素进行遍历比较
function mutation(arr) {
  return arr[1]
    .toLowerCase()
    .split("")
    .every((item) => arr[0].toLowerCase().includes(item));
}

// 使用set集合的.set.has()属性来判断是否存在第二个字符串中的元素
function mutation(arr) {
  let set = new Set(arr[0].toLowerCase());
  for (let item of arr[1].toLowerCase()) {
    if (!set.has(item)) {
      return false;
    }
  }
  return true;
}
```

### 分割数组

![image-20210823181319433](http://i0.hdslb.com/bfs/album/efc44eb91ff005abd4583a3cb4007215259ae980.png)

```js
输入: [0, 1, 2, 3, 4, 5, 6, 7, 8], 4;
返回: [[0, 1, 2, 3], [4, 5, 6, 7], [8]];
```

```js
// 声明结果数组,循环分割数组,将分割好的数组push到res中
function chunkArrayInGroups(arr, size) {
  let res = [];
  while (arr.length > 0) {
    res.push(arr.splice(0, size));
  }
  return res;
}

// 使用双指针
function chunkArrayInGroups(arr, size) {
  let res = [];
  for (let i = 0; i < arr.length; i += size) {
    let tmp = [];
    for (let j = i; j < i + size && j < arr.length; j++) {
      tmp.push(arr[j]);
    }
    res.push(tmp);
  }
  return res;
}
```

## FreeCodeCamp 中级算法

### 范围内的数字求和

![image-20210825174403077](http://i0.hdslb.com/bfs/album/867f3997393a89725d3d8122c103818b24b91141.png)

```js
输入: [1, 4];
返回: 10;
输入: [5, 10];
返回: 45;
```

```js
// 先对数组排序,找出大数和小数 ==> 大数的前n项和减去小数的前n-1项和就是数字范围的和
function sumAll(arr) {
  let sum = (num) => (num === 0 ? 0 : sum(num - 1) + num);
  let sortArr = arr.sort((a, b) => a - b);
  return sum(sortArr[1]) - sum(sortArr[0] - 1);
}

// 等差数列求和公式,(首项 + 尾项) * 项数 / 2
function sumAll(arr) {
  return ((arr[0] + arr[1]) * (Math.abs(arr[0] - arr[1]) + 1)) / 2;
}

// 双指针遍历求和
function sumAll(arr) {
  let start = Math.min(...arr);
  let end = Math.max(...arr);
  let res = 0;
  while (start <= end) {
    res += start;
    start++;
  }
  return res;
}
```

### 数组的对称差

![image-20210825190650209](http://i0.hdslb.com/bfs/album/89a183bb5f81024f49cbf359c7ea5bd4cbc839d6.png)

```js
输入: [1, 2, 3, 5], [1, 2, 3, 4, 5];
返回: [4];
输入: ["andesite", "grass", "dirt", "pink wool", "dead shrub"],
  ["diorite", "andesite", "grass", "dirt", "dead shrub"];
返回: ["diorite", "pink wool"];
```

```js
// 方法一： 对称差 = 并集元素 - 交集元素
function diffArray(arr1, arr2) {
  let sum = arr1.concat(arr2); // 数组并集
  let cross = arr1.filter((item) => arr2.includes(item)); // 数组交集
  return sum.filter((value) => !cross.includes(value));
}

// 方法二： 声明结果数组 ==> 分别遍历两个数组，如果遍历到有另外一个数组中没有的元素push到结果中
function diffArray(arr1, arr2) {
  let res = [];
  arr1.forEach((item) => {
    if (!arr2.includes(item)) {
      res.push(item);
    }
  });
  arr2.forEach((item) => {
    if (!arr1.includes(item)) {
      res.push(item);
    }
  });
  return res;
}
/*
	第二种优化写法,函数中调用函数
*/
function diffArray(arr1, arr2) {
  return [...getDiffOf(arr1, arr2), ...getDiffOf(arr2, arr1)];
}

function getDiffOf(arr, target) {
  // 被调用的求差别函数
  let res = [];
  for (let item of arr) {
    if (!target.includes(item)) {
      res.push(item);
    }
  }
  return res;
}

// 方法三： 两个数组合并，并且过滤出数组一或者数组二中不包含的元素
function diffArray(arr1, arr2) {
  return arr1
    .concat(arr2)
    .filter((val) => !arr1.includes(val) || !arr2.includes(val));
}
```

### 过滤数组元素

![image-20210827181134282](http://i0.hdslb.com/bfs/album/403ee9ea48cd10898ce860e4a551c3ce33412707.png)

```js
输入： [1, 2, 3, 1, 2, 3], 2, 3
返回:  [1,1]
输入:  ["tree", "hamburger", 53], "tree", 53
返回： ["hamburger"]
```

```js
// 使用arguments接收类数组对象变成数组
function destroyer(arr) {
  let toDelete = Array.from(arguments); // 数组后面的参数组成的数组
  return arr.filter((item) => {
    // arr就是默认数组参数
    if (!toDelete.includes(item)) {
      return item;
    }
  });
}

// 换一种map写法
function destroyer(arr) {
  let toDelete = new Set([...arguments].slice(1));
  return arr.filter((item) => {
    if (!toDelete.has(item)) {
      return item;
    }
  });
}
```

### 搜索与替换

![image-20210827110143546](http://i0.hdslb.com/bfs/album/17dfad513c9c6b4505d06c3449914d193c5ffda1.png)

```js
输入: "Let us go to the store", "store", "mall";
返回: "Let us go to the mall";
输入: "This has a spellngi error", "spellngi", "spelling";
返回: "This has a spelling error";
// 注意后after需要与before保持大小写一致
```

```js
// 先判断before的首字母大小写 ==> 匹配before与after大小写一致 ===> 遍历替换str的数组再拼接
function myReplace(str, before, after) {
  if (before.charCodeAt(0) > 96) {
    after = after[0].toLowerCase() + after.slice(1);
  } else {
    after = after[0].toUpperCase() + after.slice(1);
  }
  return str
    .split(" ")
    .map((item) => {
      if (item === before) {
        item = after;
      }
      return item;
    })
    .join(" ");
}

// 思路一样，更换reduce方法来累加返回字符串
function myReplace(str, before, after) {
  let target = "";
  if (before.charCodeAt(0) > 96) {
    target = after[0].toLowerCase() + after.slice(1);
  } else {
    target = after[0].toUpperCase() + after.slice(1);
  }
  // 更换大小写
  return str
    .split(" ")
    .reduce((acc, cur) => {
      if (cur === before) {
        return acc + " " + target; // 如果当前字符串匹配相同，则返回拼接新的字符串
      } else {
        return acc + " " + cur; // 匹配不到，返回的字符没有改变
      }
    }, "")
    .trimStart(); // str.trimStart()方法可以去除字符串的首位空格
}
```

### DNA配对

![image-20210918115325724](http://i0.hdslb.com/bfs/album/d5608e6f1ee0d0b18bf8ada0d64ad7b4b59a5488.png)

``` js
输入: "GCG" 
返回: [["G", "C"], ["C","G"], ["G", "C"]]
```

``` js
function pairElement(str) {
	let obj = {
    "A": "T",
    "T": "A",
    "G": "C",
    "C": "G"
  } 
  let res = []
  for(let item of str) {
		for(let key in obj) {
      if(item === ke) {
        res.push([item,obj[key]])
      }
    }
  }
  return res
}
```





### 寻找缺失的字母

![image-20210904183530343](http://i0.hdslb.com/bfs/album/4e67068f0ec41057b025081041fd6183d81ec7b4.png)

```js
输入: "abce";
返回: "d";
输入: "abcdefghjklmno";
返回: "i";
```

```js
// 方法一, 分割字符串 ==> 字符串转字符码数组 ==> 遍历数组遇到不连续的数就输出其对应的字
function fearNotLetter(str) {
  let arr = str.split("").map((item) => item.charCodeAt());
  let cur = arr[0];
  for (let i of arr) {
    if (i !== cur) {
      return String.fromCharCode(cur);
    }
    cur++;
  }
}

// 方法二, 遍历字符串 ==> 比较字符串当前值和下一个值得code码是否连续
function fearNotLetter(str) {
  for (let i = 0; i < str.length - 1; i++) {
    // i+1的指针需要扫到末尾,所以i的位置要提前
    let cur = str[i].charCodeAt(),
      next = str[i + 1].charCodeAt();
    if (cur + 1 !== next) {
      return String.fromCharCode(cur + 1);
    }
  }
}

// 方法三 在不缺失的字符串数组中过滤出没有出现过的数组元素
function fearNotLetter(str) {
  let start = str[0].charCodeAt(),
    end = str[str.length - 1].charCodeAt();
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(String.fromCharCode(i));
  }
  return arr.filter((item) => !str.split("").includes(item))[0];
}
```

### 求斐波那契数列的奇数和

![image-20210830094728369](http://i0.hdslb.com/bfs/album/eab5a632685d98922db4e2bf510594ec920e0a59.png)

```js
输入: 1000;
返回: 1785;
输入: 4000000;
返回: 4613732;
```

```js
// 方法一: 先获得nums以内的斐波那契数列 ==> 对数列奇数元素求和
function sumFibs(nums) {
  let arr = [1, 1],
    res = 0;
  while (arr[arr.length - 1] + arr[arr.length - 2] <= nums) {
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
  }
  for (let i of arr) {
    if (i % 2 === 1) {
      res += i;
    }
  }
  return res;
}
```

### 短线连接格式

![image-20210831112323829](http://i0.hdslb.com/bfs/album/6af05f5c8e991670410e158f6c418439fa237e75.png)

```js
输入: "This Is Spinal Tap";
返回: "this-is-spinal-tap";
输入: "thisIsSpinalTap";
返回: "this-is-spinal-tap";
输入: "The_Andy_Griffith_Show";
返回: "the-andy-griffith-show";
```

```js
function spinalCase(str) {
  return str
    .split("")
    .map((i) => (i.charCodeAt() < 90 ? " " + i.toLowerCase() : i))
    .join("")
    .trim()
    .split(/ |-|_/)
    .filter((i) => i)
    .join("-");
}

// 讲字符串用几个条件分割开来,再用-拼接,最后转x
function spinalCase(str) {
  return str
    .split(/_| |-|(?<=[a-z])\B(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}
```

### 集合排序

![image-20210831143512068](http://i0.hdslb.com/bfs/album/3fbae109764fddd190819f1d69f6b57943ac9be7.png)

```js
输入: [1, 3, 2], [5, 2, 1, 4], [2, 1];
返回: [1, 3, 2, 5, 4];
输入: [1, 2, 3], [5, 2, 1];
返回: [1, 2, 3, 5];
```

```js
// 接受数组参数 ==> 数组扁平化 ==> set去重
function uniteUnique(arr) {
  return [...new Set(Array.from(arguments).flat())];
}
```

### 质数求和

![image-20210918014831480](http://i0.hdslb.com/bfs/album/072dee20fe25f4510ba43f5515d8330ac44d4058.png)

```js
输入: sumPrimes(10);
返回: 17;
输入: sumPrimes(977);
返回: 73156;
// 数字1 既不算质数也不算合数
```

```js
// 方法一 求出数字范围内得所有数字组成得数组 ==> 判断数字是否为质数 ==> 对质数数组进行求和
function sumPrimes(num) {
  let arr = [];
  for (let i = 1; i <= num; i++) {
    if (isPrimeNum(i)) {
      arr.push(i);
    }
  }
  return arr.reduce((acc, item) => acc + item, 0);
}

function isPrimeNum(number) {
  if (number === 1) {
    return false;
  }
  for (let j = 2; j < number; j++) {
    if (number % j === 0) {
      return false;
    }
  }
  return true;
}
```

### 找出数字范围内的最小公倍数

![image-20210909143445541](http://i0.hdslb.com/bfs/album/b11d9d54a1dbbe774c80641ff77e6cdb205e6ae7.png)

```js
输入：[1, 5]
返回: 60
输入: [5, 1]
返回: 60
输入: [1, 13]
返回: 360360
```

```js
// 获取范围内的数组 ==> 暴力穷举试探数组中的元素是否为所有元素公倍数
function smallestCommons(arr) {
  let min = Math.min(...arr),
    max = Math.max(...arr);
  let numArr = [],
    res = max;
  for (let i = min; i <= max; i++) {
    numArr.push(i);
  }
  while (!numArr.every((i) => res % i === 0)) {
    res += max;
  }
  return res;
}
```

### 根据参数删除数组元素

![image-20210902163043063](http://i0.hdslb.com/bfs/album/2b84d3cb43fc5cac161a62514798ab2de8e46cc7.png)

```js
输入: [1, 2, 3, 4],
  function (n) {
    return n >= 3;
  };
返回: [3, 4];
输入: [1, 2, 3, 7, 4],
  function (n) {
    return n > 3;
  };
返回: [7, 4];
```

```js
// 方法一 和数组filter有区别: filter过滤会对每一项元素进行访问,此题只需要返回第一次满足条件后面的元素
function dropElements(arr, func) {
  let res = [...arr];
  for (let i of arr) {
    if (func(i)) {
      break;
    } else {
      res.shift();
    }
  }
  return res;
}

// 方法二 使用while循环会更加简单点, 不停的判断数组的头部是否满足func,满足不操作,不满足切掉头部
function dropElements(arr, func) {
  while (!func(arr[0])) {
    arr.shift();
  }
}
```

### 数组扁平化

![image-20210910001636637](http://i0.hdslb.com/bfs/album/c1fbee94405174c7c201315c383df28a452789fe.png)

```js
输入: [[["a"]], [["b"]]];
返回: ["a", "b"];
输入: [1, {}, [3, [[4]]]];
返回: [1, {}, 3, 4];
```

```js
// 使用递归: 声明结果数组 ==> 遍历给定数组,每项元素不是数组直接push,是数组递归返回数组中的元素
function steamrollArray(arr) {
  let res = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = [...res, ...steamrollArray(item)];
    } else {
      res.push(item);
    }
  }
  return res;
}

// 方法二: 如果数组中是纯数字数组的话,对数组先转成字符串,分割最后在map
function steamrollArray(arr) {
  return arr
    .toString()
    .split(",")
    .map((item) => parseInt(item));
}
```

### 翻译二进制字符串

![image-20210902145558858](http://i0.hdslb.com/bfs/album/6fd0465b6bc97e5d6e16e6b7a05b04719c75e497.png)

```js
输入: "01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111";
返回: "Aren't bonfires fun!?";
输入: "01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001";
返回: "I love FreeCodeCamp!";
```

```js
// 字符串split分割 ==> 每项字符转十进制数字 ==> string.formCharCode()转字符 ==> join拼接
function binaryAgent(str) {
  return str
    .split(" ")
    .map((item) => String.fromCharCode(parseInt(item, 2)))
    .join("");
}
```

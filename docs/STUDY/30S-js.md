# 30S-JS

### js 实现进度条

- 获取所有需要的元素
- 使用`setInterval()`开启一个定时器，每隔一段时间调用一次函数
- 如果进度条达到 100%，停止定时器

```html
<div id="process"></div>
```

```css
#process {
  width: 300px;
  height: 30px;
  background: red;
}
```

```js
var width = 0;
var process = document.getElementById("process");

function frame() {
  if (width == 100) {
    return 0;
  } else {
    width++;
    process.style.width = width + "%";
  }
}

setInterval(frame, 100);
```

### OBJECT

#### 基础

**按下面的要求写代码，一条对应一行代码**
1. 创建一个空的对象 user。

2. 为这个对象增加一个属性，键是 name，值是 张三

3. 再增加一个属性，键是 surname，值是 李四

4. 把键为 name 的属性的值改成 王五

5. 删除这个对象中键为 name 的属性

``` js
let user = {};
user.name = "张三";
user.surname = "李四";
user.name = "王五";
delete user.name;
```

#### 检查空对象

**写一个判断 `isEmpty(obj)` 的函数,当对象没有属性的时候返回 `true` ,否则返回 `false`**

``` js
function isEmpty (obj){
  for (let key in obj) {
    return true;        //如果对象有属性，则会进入循环，返回 true
  }
  return false;         //没有属性，无法进入循环，返回false
}
```

#### 对象属性求和

**计算所给团队所有成员的工资总和**

``` js
let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}
```

``` js
let sum = 0;
for (let key in salaries) {
  sum += salaries[key];
}
alert(sum);
```

#### 数值属性都乘以2

**创建一个 multiplyNumeric(obj) 函数，把 obj 所有的数值属性值都乘以2**

``` js 
// 调用前
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// 调用函数之后
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

``` js 
function multiplyNumeric(obj) {
  for(let key in obj) {
    if (typeof obj[key] == 'number') {    //判断对象的值为数字
      obj[key] *= 2;
    }
  }
}
```
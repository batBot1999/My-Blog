# 正则表达式入门

### 简写字符集

| 简写 | 描述                                  |
| ---- | ------------------------------------- |
| `.`  | 通配符,匹配所有除换行符以外的所有字符 |
| `\w` | 匹配所有字母数字: 等同于[a-zA-Z0-9_]  |
| `\W` | 匹配所有非字母和数字                  |
| `\d` | 匹配所有数字                          |
| `\D` | 匹配所有非数字                        |
| `\s` | 空白符                                |
| `\S` | 非空白符                              |
|      |                                       |

``` js
str.match(/regex/) 与 /regex/.text(str)
互为反操作
```

`[]` : 字符集(character set)用来指定要匹配的一组字符串

### 匹配单个未指定的字符

如果想对匹配的字符进行取反操作,可以使用**否定字符集**`negated character sets` :  **`^`**

``` js
'helloWORLD'.match(/[l]/g)
[ "l", "l" ]
// 没有否定字符集,匹配到所有小写'l'

'helloWORLD'.match(/[^l]/g) 
[ "h", "e", "o", "W", "O", "R", "L", "D" ]
// 添加了 ^ 否定字符集,匹配所有'l' 的反选
```

### 匹配一次或多次的字符

匹配字符串中至少出现过一次的字符,使用**`+`**符号,匹配时字符必须一个接着一个地重复

``` js
'aaabbccABC'.match(/a+/g)
[ "aaa" ]
```

### 通配符匹配任何内容

如果不知道匹配模式中的确切字符,可以使用 `.` 来替代这个字符

``` js
/.un/.test("Let's have fun with regular expressions!")
// 可以匹配到 `run ,sun, fun, gun, bun`等
```

### 字符集

使用字符集更灵活的匹配字符,将字符集放置在方括号中 `[]` 来定义需要匹配的字符集

``` js
let bigStr = "big";
let bagStr = "bag";
let bugStr = "bug";
let bogStr = "bog";
let bgRegex = /b[aiu]g/;
bigStr.match(bgRegex);
bagStr.match(bgRegex);
bugStr.match(bgRegex);
bogStr.match(bgRegex);
// 顺序排列，四次 match 调用将返回值 ["big"]、["bag"]、["bug"] 和 null。 无法匹配到bog
```

### 连字符

`-` 匹配字符串范围

``` js
/[a-z]/ : 匹配从 `a` 到 `z`的所有字符
```



### 匹配0次或者多次的字符

使用**`*`** 来匹配出现0次和多次的字符

``` js
"over the moon".match(/go*/g)
null
// 没有匹配到字符串里有g的字符

"gooooooooal!".match(/go*/g)
[ "goooooooo" ]
// 匹配到多个o

"gut feeling".match(/go*/g)
[ "g", "g" ]
// 匹配o出现0次的g
```

### 贪心匹配和懒惰匹配

在正则表达式中,字符串匹配默认使用贪心***greddy***匹配,即:尽可能的匹配自己限定范围内最长的子字符串

与其相反的是:懒惰***lazy***匹配,它会匹配自己限定范围内满足正则表达式的字符串最小部分

使用 **`? `** 字符来使正则表单时变成懒惰匹配

``` js
'titanic'.match(/t[a-z]*i/g)
[ "titani" ]
// 贪心匹配:itan多个字符都可以匹配上,并返回

'titanic'.match(/t[a-z]*?i/g) 
[ "ti", "tani" ]
// 使用 ? 改成懒惰匹配,返回满足tiao
```

### 匹配字符串的头部

`^`

### 匹配字符串的末尾

使用`$`  来搜寻末尾的匹配模式

``` js
let str = "This is a never ending story"
str.test(/story$/)
// 返回true
str.test(/apple$/)
// 返回false: 末尾没有匹配到
```



## 修饰符(Flag)

### 匹配时忽略大小写

使用 `i` `(ignore)`来忽略匹配字符串的大小写

``` js
let myString = "freeCodeCamp";
let fccRegex = /FREECODECamp/i;
let result = fccRegex.test(myString);
// true
```

### 全局匹配

使用 `g` (global) 来多次搜寻或提取模式匹配

``` js
"Repeat, Repeat, Repeat".match(/Repeat/g)
//[ 'Repeat', 'Repeat', 'Repeat' ]
```

### 多行匹配

`m` (multiline) 多行匹配,有 m的时候 ^$可以表示第







### 正则练习题

### 连续字符串去重

将`"aaaaaabbbbbbbccccccc"`转化为`"abc"`

``` js
function strReplace(str) {
    return str.replace(/(\w)\1+/g, '$1')
}
// 用(\w)捕获连续字符串中的字母,对匹配到的连续字符串进行替换
```

### 千分位分割数字

将 `“100000000”`这样的数字处理成`100,000,000`

第一步: 尝试将后面的第一个逗号给弄出来

``` js
let str = '123456789'
let reg = /(?=\d{3}$)/				// 找到靠近末尾的临近三个字符的空位置,将空位置替换为 ','
console.log(str.replace(reg,','))		// 123456,789
```



#### [正则表达式验证 PIN 码](https://www.codewars.com/kata/55f8a9c06c018a0d6e000132/train/javascript)



![image-20220215224917408](http://i0.hdslb.com/bfs/album/8f2eb521ae98aa0c3e57bf23c3fd0244d4d269c3.png)

``` js
function validatePIN(pin) {
  return /(^\d{4}$)|(^\d{6}$)/.test(pin)
}
```

![QQ图片20220215225053](http://i0.hdslb.com/bfs/album/dacbb616490134c65835f4c8b8953942a41c1c91.png)



![image-20220216155050200](http://i0.hdslb.com/bfs/album/8983622ced77f21fa433c224cd23ce1996188c1c.png)

![image-20220216160916441](http://i0.hdslb.com/bfs/album/54dd1f3f72c357af3dbe867fd8de19b9effeeaab.png)

![image-20220216161046372](http://i0.hdslb.com/bfs/album/7ad39dde4bc05b9709b3b57c3c5c8be037a369cc.png)

![image-20220216162735069](http://i0.hdslb.com/bfs/album/9160cdd2b9f0373e4efc466b1db8c9f6114dd4e9.png)

### [Trim method](https://www.codewars.com/kata/5a0b33888ba914a5e40000b7/train/javascript)

![image-20220217204110697](http://i0.hdslb.com/bfs/album/2145bc727d9523756d86dfae5b10724230591d4d.png)

``` js
String.prototype.trim = function(c=' ') {
	return this.replace(RegExp(`^${c}+|${c}+$`,'ig'),'')
}
```

### [credit-card-mask](https://www.codewars.com/kata/credit-card-mask/train/javascript)

![image-20220217211448324](http://i0.hdslb.com/bfs/album/a2790f972650d4464c01f36def739b2e88548e01.png)

``` js
function maskify(cc) {
  // return cc.replace(/^.+(?=.{4})/, match => match.replace(/./g, '#'))
  return cc.replace(/^.+(?=.{4})/, match => '#'.repeat(match.length))
}
// 从头开始匹配任意长度 => 使用断言排除后面四位 => 对匹配到的字符进行等长度的替换
```

### [**Decipher this!**](https://www.codewars.com/kata/581e014b55f2c52bb00000f8/train/javascript)

![image-20220217223744849](http://i0.hdslb.com/bfs/album/1a413f895361471484a3a00b611d738c3b5663db.png)

``` js
function decipherThis(str) {
  return str.split(' ').map(i => 
			i.replace(/^\d+/, match => String.fromCharCode(match))
           .replace(/^(.)(.)(.*)(.)$/, '$1$4$3$2')).join(' ')
};
// 空格分割成数组 => 替换首尾的数字为字符 => 使用分组分割字符串为四份并重新组合后返回 => 拼接字符
```


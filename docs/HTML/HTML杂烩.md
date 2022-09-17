# HTML&&CSS知识，后续更新会使知识结构更具备可读性。

### [CSS 选择器]

### 盒模型

盒模型有两种， IE 怪异盒子模型、W3C 标准盒子模型；

盒模型是由： 内容(content)、内边距(padding)、边框(border)、外边距(margin) 组成的。

标准模型的宽高是指的 content 区宽高；
IE 盒模型的宽高是指的 content+padding+border 的宽高。

### CSS 如何设置这两种盒模型？

标准盒模型：

```
box-sizing: content-box;
```

怪异盒模型：

```
box-sizing: border-box;
```
### BFC

[什么是 BFC](https://www.cnblogs.com/libin-1/p/7098468.html)

W3C 对 BFC 定义：

> 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及 overflow 值不为“visiable”的块级盒子，都会为他们的内容创建新的 BFC（块级格式上下文）。

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有 Block-level box 参与， 它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。

BFC 作用：

1. 利用 BFC 避免外边距折叠
2. 清除内部浮动 （撑开高度）
   1. 原理: 触发父 div 的 BFC 属性，使下面的子 div 都处在父 div 的同一个 BFC 区域之内
3. 避免文字环绕
4. 分属于不同的 BFC 时，可以阻止 margin 重叠
5. 多列布局中使用 BFC

如何生成 BFC：（脱离文档流，满足下列的任意一个或多个条件即可）

1. 根元素，即 HTML 元素（最大的一个 BFC）
2. float 的值不为 none
3. position 的值为 absolute 或 fixed
4. overflow 的值不为 visible（默认值。内容不会被修剪，会呈现在元素框之外）
5. display 的值为 inline-block、table-cell、table-caption

BFC 布局规则：

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. 属于同一个 BFC 的两个相邻的 Box 的 margin 会发生重叠
3. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此, 文字环绕效果，设置 float
4. BFC 的区域不会与 float box 重叠。
5. 计算 BFC 的高度，浮动元素也参与计算
### 行高的构成

- 行高是由 line-box 组成的
- line-box 是由一行里的 inline-box 组成的
- inline-box 中最高的那个，或字体最大的拿个决定行高

### float

- 元素"浮动"
- 脱离文档流
- 不脱离文本流
- 位置尽量靠上，并靠左或右

对自己的影响

- 形成"块"(BFC)
- 这个块会负责自己的布局，宽高由自己决定

比如 span 中用 float 这个 span 就形成了一个 BFC，就可以设置宽高了

对兄弟元素的影响

- 上面一般贴非 float 元素
- 靠边贴 float 元素或边
- 不影响其他块级元素位置
- 影响其他块级元素文本

对父级元素的影响

- 从布局上"消失"
- 高度塌陷

### 清除浮动

浮动的元素布局时不会占据父元素的布局空间，即父元素布局时不会管浮动元素，浮动元素有可能超出父元素，从而对其他元素造成影响。

方法一：让父元素变为一个 BFC。
父元素 overflow: auto/hidden。 让父元素去关注里面的高度。
必须定义 width 或 zoom:1，同时不能定义 height，使用 overflow:auto 时，浏览器会自动检查浮动区域的高度

方法二： 使用伪元素清楚浮动

```css
.container::after {
  content: " ";
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
}
```

### inline-block 的间隙

两个并列的 inline-block 中间会有一条裂缝，这个的原因是两个标签之间有空格，浏览器把这些空格当成文字中空格，所以这两个块中间多少有间隙。

解决办法：

1. 删除两个标签间的空格，但是这样 html 排版不好
2. 容器元素 font-size: 0 然后再在里面再重新设置字体大小

### 你对 line-height 是如何理解的？

- line-height 指一行字的高度，包含了字间距，实际上是下一行基线到上一行基线距离
- 如果一个标签没有定义 height 属性，那么其最终表现的高度是由 line-height 决定的
- 一个容器没有设置高度，那么撑开容器高度的是 line-height 而不是容器内的文字内容
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中
- line-height 和 height 都能撑开一个高度，height 会触发 haslayout（一个低版本 IE 的东西），而 line-height 不会

### line-height 三种赋值方式有何区别？（带单位、纯数字、百分比）

- 带单位：px 是固定值，而 em 会参考父元素 font-size 值计算自身的行高
- 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 \* 18 = 27px
- 百分比：将计算后的值传递给后代

### 图片下面有一个缝隙是因为什么

因为 img 也相当于一个 inline 的元素， inline 就要遵守行高的构成，它会按照 base 基线对齐，基线对齐的话那么它就会和底线间有一个缝隙。

如何解决： 因为它会遵守文字对齐方案，那么就把图片的对齐方式修改为 `vertical-align: bottom`。或者让他`display: block`，这样图片虽然会换行，但是没有间隙了。

### 边框

- 边框的属性： 线型、大小、颜色
- 边框背景图
- 边框衔接

### 滚动

- visible 滚动条隐藏, 文字超出显示
- hidden 滚动条隐藏, 文字超出不显示
- scroll 滚动条一直显示，无论文字是否够多
- auto 滚动条自动隐藏

### 文字折行

- overflow-wrap(word-wrap)通用换行控制
  - 是否保留单词
- word-break 针对多字节文本文字
  - 中文句子也是单词
- white-space 空白处是否换行

### 装饰属性及其他

- 字重（粗体） font-weight
- 斜体 font-style: itatic
- 下划线 text-decoration
- 指针 cursor

### 多行文本溢出显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```

### div 中直接展示文字

div 中直接展示 textarea 的文字，要让文字不超出 DOM 边界，自动折行，而且保留原本在 textarea 中换行

```css
div {
  white-space: pre-line;
  word-break: break-word;
}
```

### display: none; 与 visibility: hidden; 的区别

结构：

- display:none
  - 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
- visibility: hidden
  - 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
- opacity: 0
  - 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承

- display: none 和 opacity: 0
  - 非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
- visibility: hidden
  - 继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点显式。

性能

- display:none
  - 修改元素会造成文档回流。读屏器不会读取 display: none 元素内容，性能消耗较大
- visibility:hidden
  - 修改元素只会造成本元素的重绘,性能消耗较少。读屏器读取 visibility: hidden 元素内容
- opacity: 0
  - 修改元素会造成重绘，性能消耗较少

相同点： 它们都能让元素不可见、他们都依然可以被 JS 所获取到

### 外边距折叠(collapsing margins)

外边距重叠就是 margin-collapse

相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。 这种合并外边距的方式被称为折叠，结合而成的外边距称为折叠外边距

折叠结果遵循下列计算规则：

- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值
- 两个外边距一正一负时，折叠结果是两者的相加的和

新手在做导航栏的时候发现页面整体掉下来一截就是这个原因。

### CSS 单位

1. px 绝对单位。传统上一个像素对应于计算机屏幕上的一个点，而对于高清屏则对应更多。

2. % 父元素**宽度**的比例。

   1. 如果对 html 元素设置 font-size 为百分比值，则是以浏览器默认的字体大小 16px 为参照计算的（所有浏览器的默认字体大小都为 16px），如 62.5%即等于 10px（62.5% \* 16px = 10px）。

3. em 相对单位。 不同的属性有不同的参照值。

   1. 对于字体大小属性（font-size）来说，em 的计算方式是相对于父元素的字体大小
   2. border, width, height, padding, margin, line-height）在这些属性中，使用 em 单位的计算方式是参照该元素的 font-size，1em 等于该元素设置的字体大小。同理如果该元素没有设置，则一直向父级元素查找，直到找到，如果都没有设置大小，则使用浏览器默认的字体大小。

4. rem 是相对于根元素 html 的 font-size 来计算的，所以其参照物是固定的。

   1. 好处：rem 只需要修改 html 的 font-size 值即可达到全部的修改，即所谓的牵一发而动全身。

5. vw, vh, vmin, vmax 相对单位，是基于视窗大小（浏览器用来显示内容的区域大小）来计算的。
   1. vw：基于视窗的宽度计算，1vw 等于视窗宽度的百分之一
   2. vh：基于视窗的高度计算，1vh 等于视窗高度的百分之一
   3. vmin：基于 vw 和 vh 中的最小值来计算，1vmin 等于最小值的百分之一
   4. vmax：基于 vw 和 vh 中的最大值来计算，1vmax 等于最大值的百分之一

### [transform 变形](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

与 transition、translate 名字有点像，transition 是做过渡动画的，而 translate 是用来做平移的。

- none
  - 定义不进行转换。
- matrix(n,n,n,n,n,n)
  - 定义 2D 转换，使用六个值的矩阵。
- translate(x,y)
  - 从其当前位置移动，根据给定的 left（x 坐标）和 top（y 坐标）
- translate3d(x,y,z)
  - 定义 3D 转换。
- translateX(x)
- translateY(y)
- translateZ(z)
- scale(x[,y]?)
  - 定义 2D 缩放转换。
- scale3d(x,y,z)
  - 定义 3D 缩放转换。
- scaleX(x)
- scaleY(y)
- scaleZ(z)
- rotate(angle)
  - 定义 2D 旋转，在参数中规定角度。
- rotate3d(x,y,z,angle)
  - 定义 3D 旋转。
- rotateX(angle)
- rotateY(angle)
- rotateZ(angle)
- skew(x-angle,y-angle)
  - 定义沿着 X 和 Y 轴的 2D 倾斜转换。
- skewX(angle)
- skewY(angle)
- perspective(n)
  - 为 3D 转换元素定义透视视图。

### CSS 预处理器

- 嵌套
  - 反映层级和约束
- 变量和计算
  - 减少冗余代码
- entend 和 mixin
  - 代码片段重用
  - mixin 是直接把 CSS 代码每个地方重复写一份
  - extend 是使用逗号分割的选择器来为多个不同的地方使用同一段 CSS
- 循环
  - 适用于复杂有规律的样式
- import
  - CSS 模块化

### CSS 优化、提高性能的方法有哪些？

- 多个 css 合并，尽量减少 HTTP 请求
- css 雪碧图
- 抽象提取公共样式，减少代码量
- 选择器优化嵌套，尽量避免层级过深 （用‘>’替换‘ ’）
- 属性值为 0 时，不加单位
- 压缩 CSS 代码
- 避免使用 [CSS 表达式](http://www.divcss5.com/css3-style/c50224.shtml)
  - 它们要计算成千上万次并且可能会对你页面的性能产生影响。

### 单行文本溢出显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: no-wrap;
```
### link 与 @import 的区别

- link 是 HTML 方式， @import 是 CSS 方式
- link 最大限度支持并行下载，@import 过多嵌套导致串行下载，出现 FOUC
- link 可以通过 rel="alternate stylesheet" 指定候选样式
- 浏览器对 link 支持早于@import ，可以使用 @import 对老浏览器隐藏样式
- @import 必须在样式规则之前，可以在 css 文件中引用其他文件
- 总体来说：link 优于@import

### CSS 有哪些继承属性

- 关于文字排版的属性如：
  - font
  - word-break
  - letter-spacing
  - text-align
  - text-rendering
  - word-spacing
  - white-space
  - text-indent
  - text-transform
  - text-shadow
- line-height
- color
- visibility
- cursor

### display 有哪些值？说明他们的作用

- block 像块类型元素一样显示。
- none 将元素的显示设为无，即在网页中不占任何的位置。
- inline 内联元素，元素前后没有换行符。
- inline-block 象行内元素一样定位，但其内容象块类型元素一样显示。
- list-item 象块类型元素一样显示，并添加样式列表标记。
- table 此元素会作为块级表格来显示
- inherit 规定应该从父元素继承 display 属性的值

### position 有哪些值？ relative 和 absolute 定位原点是？

- absolute 生成绝对定位的元素，相对于值不为 static 的第一个父元素进行定位。
- fixed （老 IE 不支持） 生成绝对定位的元素，相对于浏览器窗口进行定位。
- relative 生成相对定位的元素，相对于其正常位置进行定位。
- static 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right - z-index 声明）。
- inherit 规定从父元素继承 position 属性的值

### 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？

- 响应式设计就是网站能够兼容多个不同大小的终端，而不是为每个终端做一个特定的版本
- 基本原理是利用 CSS3 媒体查询，为不同尺寸的设备适配不同样式
- 对于低版本的 IE，可采用 JS 获取屏幕宽度，然后通过监听 window.onresize 方法来实现兼容

### box-sizing 常用的属性有哪些？分别有什么作用？

- box-sizing: content-box; // 默认的标准(W3C)盒模型元素效果
- box-sizing: border-box; // 触发怪异(IE)盒模型元素的效果
- box-sizing: inherit; // 继承父元素 box-sizing 属性的值

### 请列举几种隐藏元素的方法

- visibility: hidden; 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
- opacity: 0; CSS3 属性，设置 0 可以使一个元素完全透明
- position: absolute; 设置一个很大的 left 负值定位，使元素定位在可见区域之外
- display: none; 元素会变得不可见，并且不会再占用文档的空间。
- transform: scale(0); 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
- \<div hidden="hidden"\> HTML5 属性,效果和 display:none;相同，但这个属性用于记录一个元素的状态
- height: 0; 将元素高度设为 0 ，并消除边框
- filter: blur(0); CSS3 属性，将一个元素的模糊度设置为 0

### rgba() 和 opacity 的透明效果有什么不同？

- opacity 作用于元素以及元素内的所有内容（包括文字）的透明度
- rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果

### css 属性 content 有什么作用？

content 属性专门应用在 before/after 伪元素上，用于插入额外内容或样式

### 元素竖向的百分比设定是相对于容器的高度吗？

元素竖向的百分比设定是相对于容器的宽度，而不是高度

### a 标签上四个伪类的使用顺序是怎么样的？

link > visited > hover > active
简称 lvha(love-ha)

伪类的特殊性（应用优先级）是同样的，所以后出现的伪类会覆盖先出现的伪类（同时激活）

在这里，比如把 hover 放在 active 后面，那么实际你在激活（active）链接的时候就触发了 hover 伪类，hover 在后面覆盖了 active 的颜色，所以始终无法看到 active 的颜色

### 伪元素和伪类的区别和作用？

伪元素:在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：

```css
p::before {
  content: "第一章：";
}
p::after {
  content: "Hot!";
}
p::first-line {
  background: red;
}
p::first-letter {
  font-size: 30px;
}
```

伪类: 将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：

```css
a:hover {
  color: #ff00ff;
}
p:first-child {
  color: red;
}
```
### ::before 和 :after 中双冒号和单冒号有什么区别？

- 在 CSS 中伪类一直用 : 表示，如 :hover, :active 等
- 伪元素在 CSS1 中已存在，当时语法是用 : 表示，如 :before 和 :after
- 后来在 CSS3 中修订，伪元素用 :: 表示，如 ::before 和 ::after，以此区分伪元素和伪类
- 由于低版本 IE 对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 :after 这种老语法表示伪元素
- 综上所述：::before 是 CSS3 中写伪元素的新语法； :after 是 CSS1 中存在的、兼容 IE 的老语法

### 设置元素浮动后，该元素的 display 值会如何变化？

设置元素浮动后，该元素的 display 值自动变成 block

### 请解释 CSS sprites，以及你要如何在页面或网站中实现它

- CSS Sprites 其实就是把网页中一些背景图片整合到一张图片文件中，再利用 CSS 的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position 可以用数字能精确的定位出背景图片的位置。
- CSS Sprites 为一些大型的网站节约了带宽，让提高了用户的加载速度和用户体验，不需要加载更多的图片。











`a` 标签的 `target=_"blank` 属性会导致文档在新窗口中打开

`Class` 选择器的优先级高于继承样式, 相同标签级别的选择器,后声明的优先级是比前声明的优先级高.

选择器等级:

import 导入的样式 > 内联样式 > id > class > 继承

`fixed` 定位是一种特殊的绝对定位(`absolute`),被定位的元素脱离了原本的文档流,其他元素也会忽略他的存在,占用他原本的底层空间,直接在相对于浏览器的窗口固定. `fixed` 与 `absoulte` 的最大区别在于: `fixed` 不会随着屏幕的滚动而移动.

`img` 标签中的 `alt` 属性可以在图片失效时候给予用户友好的提示,帮助理解图片内容,也可以帮助搜索引擎来理解图片内容.将其加入搜索结果中.

---

## CSS 尺寸单位

### 绝对长度单位

> 固定的值,反应的是真是的物理尺寸,绝对长度单位视力输出介质而定,不依赖环境

- `px` 像素,用的是最多的呢,其他的单位很少用到

### 相对长度单位

> 相对长度单位指定了一个长度相对于另一个长度的属性.

- `em` 最初是指字母 M 的宽度,现在是指相对于当前对象内文本的 `font-size`
- `rem` root em, 即 根 em,相对于 `html` 根元素的`font-size` ,通过只修改根元素的大小,就能成比例的调整所有字体大小
- `vw` `vh` `viewport width` ,视窗宽度,将视窗的宽度均分成一百份, `1vw` 就是其中一份
- `%` 尺寸大小相对于父元素而定

## 语义化标签

`main` 标签用来呈现网页的主要内容,并且每一个页面应该只有一个

`section` 标签用来表示文档中的"节"或者"段落"

`nav` 标签主要用于页面的导航链接区域

## BFC

> BFC : block formating context: 块级格式化上下文

简单来说: `BFC` 是一个完全独立的空间,类似于小黑屋.空间里的子元素不会影响到外面的布局.

### `BFC` 解决问题:

- 外边距重叠

```html
<div class="container">
  <div class="box"></div>
</div>
<div class="container">
  <div class="box"></div>
</div>

<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 20px;
  }
</style>
```

<img src="http://i0.hdslb.com/bfs/album/cd349c08bdee0ce168222d3f4d3b29ae7b4742b3.png" alt="image-20211118094504773" style="zoom:67%;" />

两个盒子的外边距都是 20px,按照理解中间边距应为 40px.实际边距确是两个盒子中较大的元素.通过`overflow:hidden` 来触发元素的 BFC 现象,使得盒子中的元素完全的与外界隔离开.此时两个块边距为预先预测的 40px.

<img src="http://i0.hdslb.com/bfs/album/985e0cbf1cef50a9cf1633c1a6ddea57a0524c19.png" alt="截图 2021-11-18 09.52.24" style="zoom: 33%;" />

- 高度塌陷

```html
<div class="container">
  <div class="content"></div>
</div>

<style>
  .container {
    border: 10px green solid;
  }

  .content {
    width: 200px;
    height: 200px;
    background-color: red;
    float: left;
  }
</style>
```

容器内部元素,由于设置了子级元素 左浮动,导致其脱离文档流,父级元素脱离了文档流,内部没有内容导致其高度塌陷,内部元素跑到外界来

<img src="http://i0.hdslb.com/bfs/album/495f8a1b082f5dbdf1d1bf75db772afdb8081050.png" alt="截图 2021-11-18 10.52.07" style="zoom: 33%;" />

可以通过使用`overflow:hidden` 来触发 BFC 来达到清除浮动的效果.

<img src="http://i0.hdslb.com/bfs/album/5e019e85deb0d178867dcb6cf45bd2d7ba7cd3db.png" alt="image-20211118105458106" style="zoom:50%;" />

- 清除浮动

```html
<div class="floatBox">浮动元素</div>
<div class="normal">正常元素</div>

<style>
  .floatBox {
    width: 100px;
    height: 100px;
    background-color: blue;
    float: left;
  }

  .normal {
    width: 200px;
    height: 200px;
    background-color: pink;
  }
</style>
```

<img src="http://i0.hdslb.com/bfs/album/d6a0e4af3e6301b071d22a31951485875d73d47e.png" alt="image-20211118110218234" style="zoom: 67%;" />

此时设置了左浮动的元素覆盖了正常元素的上方,想要避免覆盖就需要触发正常元素的 BFC 属性. `overflow:hidden`这样两个元素就不会互相干扰.

<img src="http://i0.hdslb.com/bfs/album/e79a73d2235811b451016c68ec60f0d35cd58ddb.png" alt="image-20211118110420029" style="zoom: 67%;" />

### 触发方式

- 根元素,即 `html` `body` 标签默认就是`BFC` 容器
- 浮动元素, `float` 设为 `left` `right`
- `overflow` 属性不为 `visible`
- `display` 为 `inline-block` `table-cell` `table-caption` ,`flex` ,`grid`
- `position` 为 非`relative`

---

## 行高相关概念

![image-20211118114244553](http://i0.hdslb.com/bfs/album/75fe36087f9daf94df3097f8ad8b814ce17327cb.png)

## 行内元素和行内块元素间隙问题

<img src="http://i0.hdslb.com/bfs/album/bdfa59a0f2e57a6baff405899b12dfea3f8b1111.png" alt="image-20211121215554034" style="zoom:80%;" />

行内块元素,之间默认会出现一个小空缺,在开发者工具中发现每个元素之间默认出现了空白,查了一圈发现是 vscode 中插件默认的格式化功能导致的.**将元素之间的换行符删除掉就可以消除间隙** ,行内元素也有这个现象.

![image-20211121220155742](http://i0.hdslb.com/bfs/album/150bb48c155f6c526786e0ee27615e945f5f1a99.png)

> **解决方法**

- 负边距

给元素一个负的`margin` 属性

- `font-size = 0`

设置父元素的字体大小为零,将空白符压缩为空,但是这会造成子元素内的字体消失,所以还需要在子元素内恢复原来的字体大小

```css
<style>
body {
  font-size: 0;
}

.content {
  display: inline-block;
  width: 100px;
  height: 100px;
  font-size: 16px;
  background-color: aquamarine;
}
 </style>

<body>
  <div class="content">行内块元素</div>
  <div class="content">行内块元素</div>
  <div class="content">行内块元素</div>
</body>
```

其他的方法,都不如这两个方法好用

## 定位

> `position : static`

所有元素默认的定位就是静态定位,自然的保留在页面的文档流中,因此对各种上下左右定位属性不生效

> `postion : relative`

元素设置了相对定位后,其位置可以相对于其初始位置发生偏移,但是其原本的位置并没有被挤占掉

> `position: fixed`

元素一但设置了固定定位,会脱离文档流,会根据浏览器窗口定位自己,原本他周围的元素会占据他原本的空间.

如果没有给偏移量,其位置就是固定在原来的位置.

> `position: absoulte`

元素设置了绝对定位后,也会脱离文档流,并不会为元素预留空间,他的定位会相对于最近的非 `static` 定位祖先的`padding box` 元素来进行偏移.

> `position: sticky`

元素根据正常文档流进行定位,相对于他的最近滚动祖先和包含块进行定位

> `z-index`

` z-index` 属性只针对定位元素有效,当父元素定位时,子元素无法通过 z-index 跑到父元素的下方.

定位元素不再是行内元素，即给行内元素定位后不再需要声明其 display 属性为 block 或 inline-block 等

## 文档流以及脱离文档流

### 什么是文档流?

将当前浏览器窗口分成一行一行的,每一行从左到右依次排满后换行排放元素.称为文档流(又称普通流)

### 脱离文档流?

脱离文档流,也就是元素从普通布局排版中拿走它,其他盒子定位时,会当作已经脱离文档流的元素不存在来进行定位.

**使用 float 脱离文档流时,其他盒子无视这个元素,但其他盒子内的文本依然会为这个元素让出位置,环绕在它周围**,类似 word 文字环绕效果.

使用绝对定位来脱离文档流的元素,其他盒子还有盒子内部的文本就直接无视他们的存在了.

### 如何脱离文档流?

1. 浮动

浮动元素会脱离文档流,一个元素浮动后,其他内容会"环绕"该元素

2. `position: absolute`

元素设置了绝对定位后,会相对于该元素直系父亲第一个的非`static` 元素来定位的,如果父元素的`position` 全是 `static`时候, `absolute`是相对于`html` 来定位

3. `position: fixed`

固定定位后,元素完全脱离文档流,直接相对于浏览器窗口定位.

## 选择器注意点

- `:first-child` 选中第一个元素

![image-20211214103034683](http://i0.hdslb.com/bfs/album/cf665ae751430a5ff8d8436577c94c50f7c142e7.png)

- `:nth-child(-n + 5) ` 负方向选择,前五个元素

![image-20211214103228446](http://i0.hdslb.com/bfs/album/be12ece4c35a26e9fe57bf2fcac3cd05f89c7b09.png)

- `:nth-child(n + 3)` 正方向选择,从第三个开始到后面

![image-20211214105112290](http://i0.hdslb.com/bfs/album/6bb4cdd1650f316e8126bb44608dd8ae1db7fb24.png)

- 结合使用,可以限制选择在某一个范围内

`:nth-child( n + 6):nth-child( -n + 9)`: 选择从第六个到第九个,取两个范围的交集

![image-20211214112047021](http://i0.hdslb.com/bfs/album/3d0cf2fce1f985ce95446a09c3046003847e069e.png)

## flexbox 布局

以往的布局诸如: `float` `table` 等这些布局方式发明出来的时候就不是为了做网页排版布局的.而 `flexbox` 就是第一套专门用来做网页布局的 `CSS` 方法.

### 基本概念

直接对容器设定`display: flex` 可以将容器变成 `flex` 容器,所有子元素自动成为容器成员,称为 `flex `项目(`flex item`)

容器默认有两个轴,一个是主轴(`main-axis`),一个是交叉轴(`cross-axis`)

### 容器属性

#### flex-direction

> 决定主轴的排列方向

- `row` (默认值) 主轴为水平方向,从左往右
- `row-reverse` 主轴为水平方向,从右往左
- `column` 主轴为竖直方向,从上往下
- `column-reverse` 主轴为竖直方向,从下往上

#### flex-wrap

> 该属性用来定义一条轴线放不下,如何换行

- `no-wrap` 默认值,不换行
- `wrap` 超出部分换行
- `wrap-reverse` 换行,第一行在下方

#### flex-flow

> 是 `flex-direction` 和 `flex-wrap` 属性合在一起的简写形式

- `row` `no-wrap` 默认值

#### justify-content

> 定义了在主轴上面的排列方式

- `flex-start` (默认值) 左对齐
- `flex-end` 右对齐
- `center` 居中对齐
- `space-between` 两端对齐,项目之间的空间间隔都相等
- `space-around` 每个项目两个的间隔都相等,空间包围着项目.
- `space-evenly` 每个项目都沿着主轴均匀分布在指定容器中,项目之间的空间和到首尾的距离都是一样的.

#### align-items

> 定义在交叉轴上面项目如何对齐

- `flex-start` 交叉轴起点对齐
- `flex-end` 交叉轴终点对齐
- `center` 交叉轴居中对齐
- `baseline` 项目中第一行文字的基线对齐
- `stretch` (默认值)如果项目子元素中未设置高度或设为 `auto` 时,将占满整个容器的高度.

#### align-content

> 这个属性只有当容器里面的项目换行多余一行以后才会生效,用于设置多余一行的项目时候,**行与行之间的对齐方式,基本单位是子项构成的行**

### 项目属性

#### order

> 定义项目的排列顺序,按照从小往大排,数值越小越靠前,默认为 0

#### align-self

> 用来覆盖 flex 容器的 `align-items`的设定的,对项目设置该属性后会改变原来的默认对齐方式
> 属性同 `align-items`

#### flex-grow

> 用来定义项目的放大比例,如果所有的项目的 `flex-grow` 都是 1 ,则每个项目都将均匀分割剩余空间.

- 0 (默认值)

#### flex-shrink

> 刚好与`flex-grow` 相反,定义项目的缩小比例,当容器的主轴空间已经无法容纳项目时,项目沿主轴方向如何缩小

- 1 (默认值),如果空间不够,项目将会等比例缩小
- 0 不做任何缩小,保持原来尺寸
- 如果其他数字为 1,则该项目的宽度即为总宽度,乘以他所占比例

#### flex-basis

> 在没有布局前,沿着主轴方向,设置子项目的基本宽度,设置该属性后原本的高度或者宽度都会失效.

- 直接写长度,
- `auto` (默认值) 为项目本来大小

#### flex

> 是 `flex-grow` `flex-shrink` `flex-basis` 一起指定的缩写

### flex 总结导图

![flexbox](http://i0.hdslb.com/bfs/album/689a0566c15edb9b23edfb687de02cbc5c275d3b.png)

## grid 布局

### 基础概念

网格布局沿着主轴和交叉轴分布,通过各种网格属性,来操作这些项目来创建各种布局.

![网格架构](http://i0.hdslb.com/bfs/album/103aead8f2acb02d10a60e9598a0f8a1beed3fe2.png)

网格属性分为两种

- 父容器属性 `container`
- 子项目属性: `item`

以下是**速查表**:

![替换文字](http://i0.hdslb.com/bfs/album/43802cf1c29619d259fcfe0a2ccd273c5b69bf19.png)

![替换文字](http://i0.hdslb.com/bfs/album/979e553f745f77927658c1335a67dd7a18d23e67.png)

### 网格父属性

#### grid-template-columns 属性

通过此属性来定义列的数量和宽度,也可以单独设置每列的宽度,也可以使用` repeat()` 重复函数来为所有列设置同意宽度.

![替换文字](http://i0.hdslb.com/bfs/album/39e392147aa6eab8ed96003a3b7d2c664973779d.png)

从左到右: 固定宽度, 自适应, 固定宽度

![替换文字](http://i0.hdslb.com/bfs/album/d47a83ea700485a73b069e479284b7bda684be4d.png)

水平方向空间均匀分成三份

```css
.container {
  display: grid;
  gap: 20px;
  grid-template-columns: 200px auto 100px;
}
```

**注意:**

- 像素是固定宽度, `auto` 关键字将覆盖可用空间.
- 如果使用 `fr` 为单位,那么所有框的大小将相同.

#### grid-template-rows 属性

可以用此属性来定义行数和行高,也可以单独设置每一行的高度,或者使用`repeat()`重复函数功能来为所有行设置一样的高度.

![替换文字](http://i0.hdslb.com/bfs/album/1cf9912e3a31a3a11a33b7971f3946e00ece2f1e.png)

![替换文字](http://i0.hdslb.com/bfs/album/98be2dbf56385351a84956561ace16b424d7356c.png)

```css
.container {
  display: grid;
  gap: 20px;
  height: 100vh;
  gird-template-rows: 200px auto 100px;
}
```

#### grid-template-areas 属性

通过这个属性来指定网格中单元格的特定命名,可以直观的看到我们对网格区域的划分.

![替换文字](http://i0.hdslb.com/bfs/album/d329ee1b2af39a4d77f707b8cd38c257839ef809.png)

**标准的 `12 X 12 ` 布局**

我们称为布局的模板 👇![替换文字](http://i0.hdslb.com/bfs/album/492c63998c94053c1d8e1f70ecc7ed9dc7fe7bea.png)

这个属性包含以下

- `grid-template-areas` : 用于划分区域
- `grid-area` 对每个划分好的区域进行指定分配

**在父容器中创建模板区域**

```css
.container {
  display: grid;
  gap: 20px;
  height: 100vh;
  grid-template-areas:
    "A A A A   A A A A   A A A A"
    "B B B B   B B B B   B B C C"
    "B B B B   B B B B   B B C C";
}
```

**分配区域**

对于子容器进行设置:

```css
.box-1 {
  gird-area: A;
}
.box-2 {
  grid-area: B;
}
.box-3 {
  grid-area: C;
}
```

#### 列间隙属性

设置每一列之间的间隙空间 👇

![替换文字](http://i0.hdslb.com/bfs/album/50973b4fea1405b394454e09ecf9b2ed06fb7a80.png)

```css
.container {
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 100px 100px;
  column-gap: 50px;
}
```

#### 行间隙属性

通过此属性来设置网格内行与行之间的间隙 👇

![替换文字](http://i0.hdslb.com/bfs/album/a76e1db1f7438f847937ce9a04fb10e9bf5e6c4a.png)

代码如下:

```css
.container {
  display: grid;
  height: 100vh;
  grid-template-rows: 100px 100px 100px;
  row-gap: 50px;
}
```

#### justify-items 属性

通过此属性来定义沿着 `X` 轴(主轴) 定位网格容器内的网格项(子项),分别有四个取值: `start` `end` `center` `stretch`

![替换文字](http://i0.hdslb.com/bfs/album/9de48757d0c851961fd9325915275b37ec67d128.png)

![替换文字](http://i0.hdslb.com/bfs/album/30f4c52f7ee739dc8fcf11364d5c4e9bd351f1f5.png)

`justify-content` 属性是整个内容区域在容器里面的水平位置(左中右,撑满)

```css
.contaniner {
  justify-content: start | end | center | stretch;
}
```

#### align-items 属性

`align-items` 属性设置单元格内容的垂直位置(上中下,撑满)

![替换文字](http://i0.hdslb.com/bfs/album/010398460ab4107c7ead062dd1684eaf62d0c3c4.png)

```css
.container {
  align-items: start | end | center | stretch;
}
```

- `start`：对齐单元格的起始边缘。
- `end`：对齐单元格的结束边缘。
- `center`：单元格内部居中。
- `stretch`：拉伸，占满单元格的整个宽度（默认值）。

合并写法: **`place-items`**

```css
place-items: <align-items> <justify-items>; // 水平对齐 竖直对齐
```

如果省略第二个值,则浏览器认为两个属性取值相同.

#### justify-content 属性

定义整个内容区域在容器里面的水平位置(左中右),有七个取值:👇

![替换文字](http://i0.hdslb.com/bfs/album/4bdd373e840096d7d52b08cdf9e08a1fabff6c75.png)

![替换文字](http://i0.hdslb.com/bfs/album/51f4f1b24afe91997af0adc5e83397fb69bbb999.png)

```css
.container {
  justify-content: start | end | stretch | space-around | space-between |
    space-evenly;
}
```

- `start` 对齐容器的起始位置
- `end` 对齐容器的结束位置
- `center` 对齐容器内部居中
- `stretch` 不指定项目大小的时候,拉伸占据整个网格容器
- `space-between` 两端对齐,项目和项目之间的间隔相等,项目于容器之间没有间距
- `space-around` 每个项目两侧的间隔相等,所以项目之间的间隔比项目容器的边框之间的间隔大一倍
- `space-evenly` 项目与项目,项目与容器边框之间的长度间隔都是一样的.

#### align-content 属性

定义整个内容区域的垂直位置(上中下),和 `justify-content` 一样有七个属性 👇

![替换文字](http://i0.hdslb.com/bfs/album/c8635d8885880a98b1b3b8467a14dd8987350193.png)

![替换文字](http://i0.hdslb.com/bfs/album/455344bbc047f7d33c850db08cdf8cbb43a3990a.png)

```css
align-content: start | end | center | stretch | space-around | space-between |
  space-evenly;
```

属性和 `justify-content`完全一样,只不过将水平方向换成了垂直方向;

**合并写法 `place-content` **

```css
place-content: <align-content> <justify-content>
  // 水平方向内容对齐  垂直方向内容对齐;; ;
```

举个例子:

```css
place-content: space-around space-evenly;
```

如果省略第二个值,浏览器会直接假定第二个值等于第一个值

### 网格子属性

#### grid-column-start | end 属性

指定每个项目的起始位置和终点位置.

- `grid-column-start`: 左边框所在的垂直网格线
- `grid-column-end` : 右边框所在的垂直网格线

![image-20211205170101056](http://i0.hdslb.com/bfs/album/30519b3b563b126c0fcff8f05c59f5558e8bd71f.png)

```css
.item {
  background-color: pink;
  grid-column-start: 3;
  grid-column-end: 5;
}
```

或者还可以使用 `span` 关键字, 表示跨越, 即左右边框跨越多少个网格,结果也是一样

```css
.item {
  background-color: pink;
  grid-column-start: span 2; // 跨越两列
  grid-column-end: 5; // 以第五列为结束
}
```

#### grid-row-start | end 属性

- `grid-row-start` 上边框所在的水平网格线

- `grid-row-end` 下边框所在的水平网格线

  ![image-20211205170815659](http://i0.hdslb.com/bfs/album/95cb74921cd3f7544987c9bb4a98dbd9a24df2ef.png)

```css
.item {
  grid-row-start: 2;
  grid-row-end: 5;
}
```

也可以同水平方向上一样使用 `span` 跨越属性

#### grid-column | row 属性

`grid-column` 属性是 `grid-column-start` 和 `grid-column-end` 的合并简写形式,

`grid-row` 属性是 `grid-row-start` 和 `grid-row-end` 的合并简写形式.

![image-20211205171355794](http://i0.hdslb.com/bfs/album/a45ebc0b2d7649378c932a2eb26c8c8b1978d215.png)

```css
.item {
  grid-column: 3/8; // 开始列/结束列
  grid-row: 2/5; // 开始行/结束行
}
```

#### grid-area 属性

`grid-area` 属性指定项目放在哪一个区域.之前使用`grid-template-areas` 划分好区域后,使用`grid-area` 来指定分配区域

![替换文字](http://i0.hdslb.com/bfs/album/8c35598ee7e2b895bf669f09ab28101d3a036360.png)

标准 12 x 12 布局

然后在父容器中指定`grid-template-areas`

![替换文字](http://i0.hdslb.com/bfs/album/44b32e89005271dc6e345e63910231897d6a401b.png)

像这样在父类中:

```css
.container {
  display: grid;
  grid-template-areas:
    "A A A A   A A A A   A A A A"
    "B B B B   B B B B   B B C C"
    "B B B B   B B B B   B B C C";
}
```

然后使用 `grid-areas` 来指定子类的父容器中使用的名称.

![替换文字](http://i0.hdslb.com/bfs/album/c5058201326753fe00498e24d7ceb8299857e8e1.png)

```css
.box-1 {
  grid-area: A;
}
.box-2 {
  grid-area: B;
}
.box-3 {
  grid-area: C;
}
```

`grid-area` 属性还可以用作`grid-row-start` ,`grid-column-start` ,`grid-row-end` ,`grid-column-end` 的合并简写形式.直接指定项目的位置.

```css
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}
```

![image-20211205172640165](http://i0.hdslb.com/bfs/album/eb6d757ca4c1d3ead73358d3482c946f687cc172.png)

```css
.item {
  grid-area: 2/3/5/8; // 位置逆时针书写, 上左下右!
}
```

#### justify-self

使用这个属性单独设置单元格内容的水平位置(左中右),和 `justify-items` 属性用法一致,但只作用于单个项目.

![替换文字](http://i0.hdslb.com/bfs/album/b8b23dc07d301a0f362011edb378f7c36d437703.png)

- `start` 对齐单元格的起始边缘
- `end` 对齐单元格的结束边缘
- `center` 单元格内部居中
- `stretch` 拉伸,占满单元格整个宽度(默认值)

```css
.item {
  justify-self: start | end | center | stretch;
}
```

#### align-self

该属性用于设置单元格内容的垂直位置(上中下),跟 `align-items` 属性的用法完全一致,也是只作用于单个项目.

![替换文字](http://i0.hdslb.com/bfs/album/95eac68d1e21ac372d64232174d758168424594e.png)

```css
.item {
  align-self: start | end | center | stretch;
}
```

### grid 总结导图

![grid](http://i0.hdslb.com/bfs/album/1552d4777fe33a60034490ce015298584a6f1b2b.png)

## CSS 变量

### 变量声明

> 声明变量可以把它理解成 `css` 自定义属性,和 `color` `font-size` 没有什么不同, 通过 `--` 两道横线来声明变量.注意区分大小写

```css
// 局部申明
body {
  --size: 40px;
  --bg-color: red;
}

// 全局声明
:root {
  --font-size: 20px;
  --box-bgc: pink;
}
```

- 变量名不能包含奇奇怪怪的符号: `$` `[` `^` `(`等,可以使用数字和字母,下划线 `_` 横线`-` ,甚至可以是中文,日文.

### 变量读取

> 使用 `var()` 函数来读取变量

![image-20211202163322748](http://i0.hdslb.com/bfs/album/655841963e9aa6b0e0638f6b26f30bbfa90c3763.png)

## 颜色相关知识

色相: 色彩的基本属性,就是平常所说的颜色基本名称,如红色,黄色,

饱和度: 色彩的纯度,同一种颜色里灰色的占比,占比越少色彩也就越纯,反之则完全是灰色的.

亮度: 颜色的明暗程度,也就是颜色里白色或者黑色的占比,100%的亮度表示纯白色,0%表示纯黑色,50%的亮度就是表示色相中选取的颜色.

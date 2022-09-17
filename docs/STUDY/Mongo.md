# Mongo 入门

## 简介

MongoDB 是由 C++语言编写的非关系型数据库（NoSQL)，是一个基于分布式文件存储的开源数据库系统，Mongo 中的数据存储为一个个文档，数据结构由键值对组成（key=> value),其中的文档类似于 `JSON` 对象，字段值可以包含其他文档、数组、或其他文档数组。

**特点**

- MongoDB 中的数据存储是以 Bson（Binary Json)的形式存储的，Bson 是二进制的 JSON,所以看上去记录的形式类似于 json 数据
- 易扩展、高性能、灵活性高
- 缺点：数据重复存储，占用空间大

## 安装

`windows`安装

[mongo 官网](https://www.mongodb.com/try/download/community)

![image-20220518172744395](http://i0.hdslb.com/bfs/album/89830c1233f1698de58e70f534e11aa3b07d6451.png)

## 概念和术语

| MongoDB 概念 | 说明/解释                               |
| ------------ | --------------------------------------- |
| database     | 数据库                                  |
| collection   | 数据库表/集合                           |
| document     | 数据纪录行/文档                         |
| field        | 数据字段/域                             |
| index        | 索引                                    |
| primary key  | 主键，MongoDB 自动将\_id 字段设置为主键 |

### mongo 中的数据类型

- `Object ID` 文档 ID,唯一定位的 id（12 字节的十六进制数）

  - 前 4 个字节为当前的时间戳
  - 接下来 3 个字节为机器 ID
  - 接下来 2 个字节是 MongoDB 的服务进程 id
  - 最后 3 个字节是简单的增量值

- `String` 字符串，必须是有效的 UTF-8
- `Boolean` 存储布尔值
- `Integer` 整数可以是 32 位或 64 位
- `Double` 存储浮点值
- `Arrays` 数组或列表
- `Object` 用于嵌入式的文档，一个值为一个文档
- `Code` 代码类型，用于在文档中存储 `JavaScript` 代码
- `Binary` 代码类型，用于在文档中存储二进制数据
- `Null` 存储 Null 值
- `Timestamp` 时间戳，表示从 1970-1-1 到现在的总秒数
- `Date` 存储当前日期或时间的 UNIX 时间格式,创建 Date 对象传入年月日信息

**核心概念**

- 文档：一个键值(`key-value`)对(即`BSON`)，本质类似于`json`对象 的键值对。
- 集合： `MongoDB` 文档组，实质上就是包含多个对象的数组。
- 数据库： 数据库中可以包含多个集合

这三者是逐层包含的的关系，一个集合可以包含多个文档，一个数据库可以有多个集合

![image-20220518171733821](http://i0.hdslb.com/bfs/album/88640dab7f47035b09f67de932ba827747958a9f.png)

![image-20220516114651857](http://i0.hdslb.com/bfs/album/8d57989325abfb31f3f02e69d286cab1586a701e.png)

![image-20220516115141397](http://i0.hdslb.com/bfs/album/e28310dba99d8dfe846da8836f7e764721999fbd.png)

## 基础命令

### 命令行终端启动

```sh
mongod #运行客户端
mongo #启动客户端
# 服务默认运行在27017端口
```

- 查询所有的数据库列表

```sh
> show dbs
admin       0.000GB
config      0.000GB
local       0.000GB
mydatabase  0.001GB
```

### 展示当前使用的数据库对象或集合

```sh
> db
test
```

### 切换到指定的数据库

> 切换到没有的数据库，添加数据后就会自动创建

```sh
> use admin
switched to db admin
```

### 显示当前数据库的状态

```sh
> db.stats()
{
    "db" : "test",
    "collections" : 0,
    "views" : 0,
    "objects" : 0,
    "avgObjSize" : 0,
    "dataSize" : 0,
    "storageSize" : 0,
    "totalSize" : 0,
    "indexes" : 0,
    "indexSize" : 0,
    "scaleFactor" : 1,
    "fileSize" : 0,
    "fsUsedSize" : 0,
    "fsTotalSize" : 0,
    "ok" : 1
}
```

## 数据库 CURD

### 在指定的`collection` 中插入文档

```sh
> db.users.insertOne({name: "jackl",age: 12,sex: "female"})
{
    "acknowledged" : true,
    "insertedId" : ObjectId("6284bdc5d6cad9bf5ead78bb")
}
```

### 插入多条文档

参数中传入一个数组，数组中包含了多条对象信息

```sh
> db.users.insertMany(
[{name: "mike",age: 143,sex: "male"},
{name: "hellen",age: 43,sex:"female"}])

{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("6284c095e6391dfd91d1e514"),
        ObjectId("6284c095e6391dfd91d1e515")
    ]
}
```

### 查看集合中所有的文档数据

```sh
> db.users.find()	# 没有传递参数默认展示所有
{ "_id" : ObjectId("6284bdc5d6cad9bf5ead78bb"), "name" : "jackl", "age" : 12, "sex" : "female" }
{ "_id" : ObjectId("6284be83d6cad9bf5ead78bc"), "name" : "jackl", "age" : 12, "sex" : "female" }
{ "_id" : ObjectId("6284be84d6cad9bf5ead78bd"), "name" : "jackl", "age" : 12, "sex" : "female" }
{ "_id" : ObjectId("6284be84d6cad9bf5ead78be"), "name" : "jackl", "age" : 12, "sex" : "female" }
{ "_id" : ObjectId("6284be85d6cad9bf5ead78bf"), "name" : "jackl", "age" : 12, "sex" : "female" }
{ "_id" : ObjectId("6284be85d6cad9bf5ead78c0"), "name" : "jackl", "age" : 12, "sex" : "female" }
{ "_id" : ObjectId("6284be86d6cad9bf5ead78c1"), "name" : "jackl", "age" : 12, "sex" : "female" }
```

### 查询指定的数据

使用 `find` 命令中传入多个参数组成的条件对象来查询

> `and` 且查询

```sh
> db.users.find({sex: "female",age: 12})
{ "_id" : ObjectId("6284be86d6cad9bf5ead78c1"), "name" : "jackl", "age" : 12, "sex" : "female" }

# 运算的查询条件,年龄小于或等于30岁， l:less小于 e: equal等于 $:美元符号表示当前变量
> db.users.find({age: {$lte: 30}})

# 年龄小于40，体重大于等于60的人群	g: greater: 大于 t:than
> db.users.find({age: {$lt: 40}, weight: {$gte: 60}})
```

> `or` 或查询

```sh
# 或条件查询，传入一个条件数组，数组中的条件任意满足都可以返回
> db.user.find({$or: [{price: {$lt: 500}}, weigth: {$gte: 50}]})
```

> 查询时只显示指定的属性

```sh
> db.mysubscribeinfos.find({mid: {$lte:30000}},{uname: 1})
{ "_id" : ObjectId("627fb981311bfd3a267678e1"), "uname" : "SKYline" }
{ "_id" : ObjectId("627fba19a952d9e42e2baf70"), "uname" : "epcdiy" }
{ "_id" : ObjectId("627fbab3441e0e76f36022ef"), "uname" : "STN工作室" }
{ "_id" : ObjectId("627fbab3441e0e76f360230c"), "uname" : "hanser" }
{ "_id" : ObjectId("627fbad4a434ff49d1a6d7af"), "uname" : "STN工作室" }
{ "_id" : ObjectId("627fbad4a434ff49d1a6d7cc"), "uname" : "hanser" }
```

### 更新修改

`updateOne` 只会修改匹配到的第一个数据，而不是所有的文档

```sh
> db.users.updateOne({name: "mike"},{$set: {age: 99}})
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
```

`updateMany` 会修改匹配条件的所有文档

```sh
# 查询所有名字为mike的用户，修改age为 48岁
> db.users.updateMany({name: "mike"},{$set: {age: 48}})
{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }
```

### 删除文档

```sh
# 删除所有age小于20的文档
> db.users.deleteMany({age: {$lte:20}} )
{ "acknowledged" : true, "deletedCount" : 1 }
```

> 如果想要删除所有的文档，可以传入空对象

```sh
> db.users.deleteMany({})
{ "acknowledged" : true, "deletedCount" : 4 }
```

## Mongoose

在 Node 中可以使用第三方包来操作, 不需要使用命令行。`mongodb`包为官方的，使用的比较多的是`mongoose`

### 安装

```sh
pnpm i mongoose
```

### 核心概念

- `Schema` 用于定义数据库的结构，类似于创建表时候的数据定义，每个 Schema 会隐射到 mongodb 中的 collection,Schema 并不具备操作数据库的能力。类似构造函数
- `Model` 作为 Schema 实例生成的 Model 具有抽象行为的能力，可以对数据库进行增删改查

### 使用命令

#### 使用 mongoose 连接数据库

在项目中单独创建一个 `connnecdb.js`文件

```js
const mongoose = require("mongoose");
```

```sh
// 导入mongoose
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost:27017/itcast');
// 设计文档表结构
// 字段名称就是表的属性名称
// 约束是为了保证文档的完整性
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type:String
    }
})
// 把文档结构发布为模型
// 第一个参数：传入一个大写名词字符串作为数据库名称
// mongoose会自动将大写名词字符串生成小写复数的集合名称
// 返回值：模型构造函数
const User = mongoose.model('User', userSchema);

const admin = new User({
    username: 'admin',
    password:'123456',
    email:'admin@admin.com'
})
// 插入数据
admin.save((err, results) => {
    if (err) return console.log('default');
    return console.log('保存成功'+results);
})
// 查询数据
// 查询所有
User.find((err, results) => {
    if (err) return console.log('default');
    return console.log(results);
})
// 按条件查询所有
User.find({username:'zs'}, (err, results) => {
    if (err) return console.log('default');
    return console.log(results);
})
// 按条件查询单个
User.findOne({username:'admin'}, (err, results) => {
    if (err) return console.log('default');
    return console.log(results);
})
// 删除数据
User.deleteOne({id:'6264d223e8862768313fb541'}, (err, results) => {
    if (err) return console.log('default');
    return console.log('删除成功'+results);
})
// 更新数据
User.updateOne({_id: "6264df321679de0656c4109e"},{password:'123'}, (err, results) => {
    if (err) return console.log(err);
    return console.log('更新成功' + results);
})

```

### 过滤数据

``` js
// 使用查询参数来过滤数据库中的结果
const res = await User.find({
    age: 12,
    sex: "female",
})

// 第二种方法
const res = User.find().where("age").equals(12).where("sex").equals("female")
```

### 验证器

``` js
required: [true, "用户名必须存在"]
enum: {
    values: ["male", "female"],
    message: "取值必须为male或female"
}
maxLength: [40,'字符串长度最大为40']
minLength: [10,'字符串长度最小为10']
```

### 查询时默认不返回指定字段

![image-20220624222339147](http://i0.hdslb.com/bfs/album/f68fab896892ce5ef4ca40d52208a001c2dea9cf.png)

在 `schema` 中设定字段的 `select` 为 `false` 在查询数据的时候，默认不显示在查询结果中。

``` js
数据库连接成功
{
  _id: new ObjectId("62b5c41f86d4e6eb6e0925dd"),
  username: 'jack',
  email: '3032825994@qq.com',
  avatar: 'asdgasgd',
  updateTime: 2022-06-24T14:03:10.301Z,
  createTime: 2022-06-24T14:03:12.000Z
}
```

如果想要使用该字段,再查询的时候查询的条件上加上 `select` 

``` js
const user = await User.findOne({email}).select("+password") // password又会显示在查询结果中
```



### 遇到的问题

使用 mongoose 操作数据库时候发现文档莫名奇妙的多加了 `__v` 字段，经过查询得知，此为数据库默认添加的属性。全称：`__version` (版本)，作用是给每一个文档加上版本控制，防止并发来修改数据库中的数据。

![image-20220516163246899](http://i0.hdslb.com/bfs/album/4282ac99cc45e0ccebd65ba2491beaccbd968149.png)

**解决方法**

在 model 末尾加上关闭版本验证的选项

```js
versionKey: false;
```

![image-20220516163855969](http://i0.hdslb.com/bfs/album/6b280fadbcdc11aa1ec31756f00e49e4a0963aef.png)

# Mysql 学习笔记

## 基础命令

```sh
# 展示表格
show databases;
# 选择数据库
use (数据库名);
# 显示当前库中所有表
show tables;
# 显示当前表中的数据
select * from (表名);
```

## 命令行连接 mysql

- 连接 `MySQL` 之前需要确保数据库服务已经启动

```
net stop mysql
net start mysql
```

连接指令

```
mysql -h -P -u -p
```

1. `-P` 为端口号(大写)
2. `-h` ip 地址或不填默认 localhost 本地
3. `-u` 用户
4. `-p` 密码后面不要有空格

## MySQL 三层结构

> 数据库的安装,实质就是在物理机中安装一个数据库管理系统(DBMS)的软件,这个程序可以管理多个数据库.

一个数据库中可以创建多个表来保存信息,所有的表本质都是**文件**

**DBMS,数据库和表的关系**

<img :src="('http://i0.hdslb.com/bfs/album/f0e884ed474d66fce3de96cf4c92480e7e13f1aa.png')" alt="mysql三层结构">

表结构

```sh
+----+--------+---------+
| id | name   | address |
+----+--------+---------+
|  1 | 张三   | 上海    |   //行(row)
|  2 | 李四   | 南京    |
|  3 | 赵五   | 北京    |
|  4 | 王六   | 合肥    |
+----+--------+---------+
    //列(column)
表的每一行称为一条记录-->java程序中,一条记录往往使用对象表示
```

### sql 语句分类型

- DDL: 数据定义语句 [creat 表,库...]
- DML：数据操作语句 [增加 insert，修改 update,删除 delete]
- DQL: 数据查询语句 [select]
- DCL: 数据控制语句 [管理数据库:比如用户权限的增加,撤销..]

## 创建数据库

```sh
# 创建
create database (数据库名) set (字符集) collate utf8_bin;
# 删除
drop database 数据库名;
```

- 校对规则 `utf8_bin` 区分大小写,默认的 `utf8_general_ci` 不区分大小写

查看之前创建的数据库的定义信息

```sh
SHWO CREATE DATABASE `TEST`;
```

注: **使用反引号是为了规避数据库中的关键字**

### 备份数据库

- 备份

```sh{2,5}
# 示范:
mysqldump -u root -p -B test > C:\\Users\\30328\\Desktop\\hi.sql

# 单独备份数据库中的表
mysqldump -u -p 数据库 表1 表二 > 路径文件名.sql
```

此处结尾不能加 `;` 分号,命令必须要再 dos 命令行中运行

- 恢复

```sh
Source 文件名.sql
```

# vitepress

[vitepress](https://vitepress.vuejs.org/) 是一个静态博客生成器,基于 Vue3 + vite,有着以下优点:

1. 速度快
2. 配置简单,打包速度更快
3. 开发的时候热更新快,秒开开发服务器

## 安装

建议使用 `pnpm` 来作为包管理工具,能更快的初始化

**步骤**

1. 创建一个目录并进入此路径

```bash
mkdir my-blog && cd my-blog
```

2. 使用`pnpm` 这个包管理工具来初始化项目

```bash
pnpm init
```

3. 本地安装 `vitepress` 依赖

```bash
pnpm i vitepress
```

4. 创建第一个文档

```bash
mkdir docs && echo '# Hello VitePress' > docs/index.md
```

5. 添加脚本到 `package.json`

```json
{
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "serve": "vitepress serve docs"
  }
}
```

6. 启动开发服务器

```bash
pnpm dev
```

现在 VitePress 将在本地 `http://localhost:3000`启动,点击这个链接就可以

## 表格

- 源代码

```sh
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

- 效果展示

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## 图片

图片通常放置在公共资源 public 下的，images 路径内
alt 属性用于在图片显示出错时给于用户提示

```sh
<img :src="('http://i0.hdslb.com/bfs/album/e6c53dc180e8e1a5dcd819cc161ee0fdc911128d.png')" alt="这是一张图片">
```

- **效果展示**
  <img :src="('http://i0.hdslb.com/bfs/album/e6c53dc180e8e1a5dcd819cc161ee0fdc911128d.png')">

```md
::: tip
提示
:::

::: warning
注意
:::

::: danger
危险
:::
```

::: tip
提示
:::

::: warning
注意
:::

::: danger
危险
:::

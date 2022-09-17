module.exports = {
  lang: "en-US",
  title: "foreverliu前端笔记",
  description: "总结自己的学习历程",
  head: [
    ["meta", {
      name: "keywords",
      content: "好好学习天天向上"
    }],
    [
      "link",
      {
        rel: "icon",
        href: "http://i0.hdslb.com/bfs/album/ec78ee304b559735b0998fc680cfa3a2cfb8c53c.png",
      },
    ], // 网页tab栏的logo图
    ["meta", {
      name: "referrer",
      content: "no-referrer"
    }], //  使用B站图床防盗链
  ],
  // lastUpdated: true, 文档最后更新时间

  themeConfig: {
    nav: nav(),
    logo: "https://gimg3.baidu.com/search/src=https%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F6709c93d70cf3bc71923c096d200baa1cd112aac.jpg&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=w240&n=0&g=0n&q=75&fmt=auto?sec=1662310800&t=8de99d17e7781c53ac3cbf11b99fc",

    sidebar: {
      "/HTML/": HTML(),
      // "/CSS/": CSS(),
      "/JSbase/": JSbase(),
      // "/ES6/": ES6(),
      "/React/": React(),
      "/suanfa/": Algorithms(),
      "/csnet/": Network(),
      "/software/": SoftwareAndEx(),

      // "/STUDY/": sidebarGuide(),
    },

    markdown: {
      lineNumbers: true,
      theme: "poimandres",
    },

    editLink: {
      pattern: "",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present foreverliu",
    },

    algolia: {
      appId: "8J64VVRP8K",
      apiKey: "a18e2f4cc5665f6602c5631fd868adfd",
      indexName: "vitepress",
    },
  },
};

function nav() {
  return [{
      text: "HTML&&CSS",
      link: "/HTML/HTML杂烩",
      // activeMatch: "/HTML/"
    },
    // { text: "CSS", link: "/CSS/185", activeMatch: "/CSS/"},
    {
      text: "JS&&ES6",
      link: "/JSbase/js-shorthand",
      // activeMatch: "/JSbase/"
    },
    // {
    //   text: "ES6",
    //   link: "/ES6/this",
    //   activeMatch: "/ES6/"
    // },
    {
      text: "React",
      link: "/React/React-handbook",
      activeMatch: "/React/"
    },
    // { text: "数据结构", link: "/数据结构/JS-DataStructure", activeMatch: "/数据结构/"},
    {
      text: "算法",
      link: "/suanfa/LeetCode",
      activeMatch: "/suanfa/"
    },
    {
      text: "计算机网络",
      link: "/csnet/跨域",
      activeMatch: "/csnet/"
    },
    {
      text: "常用软件技能扩展等",
      link: "/software/VScode常用扩展与快捷键修改",
      activeMatch: "/software/"
    },


    // { text: "Guide", link: "/STUDY/30S-css", activeMatch: "/STUDY/" },
  ];
}

// function sidebarGuide() {
//   return [
//     {
//       text: "基础知识",
//       collapsible: true,
//       items: [
//         { text: "30S-css", link: "/STUDY/30S-css" },
//         { text: "30S-js", link: "/STUDY/30S-js" },
//         // { text: "html-study", link: "/STUDY/html-study" },
//         // { text: "Javascript简写技巧", link: "/STUDY/js-shorthand" },
//         // { text: "Js数据结构", link: "/STUDY/JS-DataStructure" },
//         { text: "前端面试题", link: "/STUDY/font-end interview" },
//       ],
//     },
//     {
//       text: "框架",
//       collapsible: true,
//       items: [
//         // { text: "Vue", link: "/STUDY/Vue" },
//         // { text: "React", link: "/STUDY/React" },
//         // { text: "Redux", link: "/STUDY/Redux" },
//         // { text: "React-router", link: "/STUDY/React-router" },
//         // { text: "express入门", link: "/STUDY/express" },
//         // { text: "React初学者手册", link: "/STUDY/React-handbook" },
//       ],
//     },
//     {
//       text: "前端拓展技能",
//       collapsible: true,
//       items: [
//         { text: "手写JS源码", link: "/STUDY/JS-Manual" },
//         // { text: "Markdown语法", link: "/STUDY/markdown" },
//         // { text: "git入门教程", link: "/STUDY/git" },
//         { text: "sass入门", link: "/STUDY/sass" },
//         // { text: "正则表达式入门", link: "/STUDY/regex" },
//         // { text: "Linux学习", link: "/STUDY/linux" },
//         { text: "vitepress", link: "/STUDY/vitepress-study" },
//         { text: "docker入门", link: "/STUDY/docker" },
//         { text: "MySQL", link: "/STUDY/mysql" },
//         { text: "Caddy", link: "/STUDY/caddy" },
//         { text: "MongoDB入门", link: "/STUDY/Mongo" },
//       ],
//     },
//     // {
//     //   text: "算法刷题",
//     //   collapsible: true,
//     //   items: [
//     //     { text: "NowCode", link: "/STUDY/nowcoder" },
//     //     { text: "FreeCodeCamp", link: "/STUDY/js-practice" },
//     //     { text: "LeetCode", link: "/STUDY/LeetCode" },
//     //   ],
//     // },
//     {
//       text: "杂七杂八",
//       collapsible: true,
//       items: [
//         // { text: "Javascript中的this问题", link: "/STUDY/this" },
//         { text: "在wsl中开启使用ssh连接", link: "/hub/wsl-ssh" },
//         { text: "node安装与配置", link: "/hub/node-install" },
//         { text: "效率", link: "/hub/efficiency" },
//         { text: "中国程序员容易发音错误的单词", link: "/hub/wordvoice" },
//         { text: "Linux安装nodejs", link: "/hub/Linux-install-nodejs" },
//         { text: "2021前端开发路线图", link: "/hub/fontend" },
//         { text: "debian替换国内镜像源", link: "/hub/debian-img" },
//         { text: "Centos开放防火墙端口", link: "/hub/Centos-open" },
//         { text: "window解除端口占用", link: "/hub/windows-kill-process" },
//         { text: "SPA单页面应用", link: "/hub/spa" },
//         { text: "网址导航", link: "/hub/collect-address" },
//       ],
//     },
//     {
//       text: "其他",
//       collapsible: true,
//       items: [
//         { text: "Javascript中的this问题", link: "/STUDY/this" },
//         { text: "在wsl中开启使用ssh连接", link: "/hub/wsl-ssh" },
//         // { text: "node安装与配置", link: "/hub/node-install" },
//         // { text: "效率", link: "/hub/efficiency" },
//       ],
//     },
//   ];
// }

function HTML() {
  return [{
    text: "HTML&&CSS",
    collapsible: true,
    items: [{
      text: "HTML&&CSS",
      link: "/HTML/HTML杂烩"
    }, ],
  }, ]
}

function JSbase() {
  return [{
    text: "JS&&ES6",
    collapsible: true,
    items: [{
        text: "JS简写小技巧",
        link: "/JSbase/js-shorthand"
      },
      {
        text: "this",
        link: "/JSbase/this"
      },
      {
        text: "变量类型",
        link: "/JSbase/1-变量类型"
      },
      // {
      //   text: "类型转换",
      //   link: "/JSbase/2-类型转换"
      // },
      {
        text: "运算符",
        link: "/JSbase/3-运算符"
      },
      {
        text: "函数",
        link: "/JSbase/函数"
      }, {
        text: "基本数据类型",
        link: "/JSbase/基本数据类型"
      }, {
        text: "全局内置对象",
        link: "/JSbase/全局内置对象"
      }, {
        text: "事件",
        link: "/JSbase/事件"
      }, {
        text: "事件队列",
        link: "/JSbase/事件队列"
      }, {
        text: "原型链与继承",
        link: "/JSbase/原型链与继承"
      }, {
        text: "作用域",
        link: "/JSbase/作用域"
      },
      // {
      //   text: "BOM",
      //   link: "/JSbase/BOM"
      // },
      // {
      //   text: "DOM",
      //   link: "/JSbase/DOM"
      // },
      {
        text: "ES6",
        link: "/JSbase/ES6"
      },
      {
        text: "node事件轮询",
        link: "/JSbase/node事件轮询"
      },

    ],
  }, ]
}

// function ES6() {
//   return [
//     {
//       text: "ES6",
//       collapsible: true,
//       items: [
//         { text: "this", link: "/JSbase/this" },
//       ],
//     },
//   ]
// }

function React() {
  return [{
    text: "React",
    collapsible: true,
    items: [{
        text: "React新手上路",
        link: "/React/React-handbook"
      },
      {
        text: "React",
        link: "/React/React"
      },
      {
        text: "React-router",
        link: "/React/React-router"
      },
      {
        text: "Redux",
        link: "/React/Redux"
      },
    ],
  }, ]
}

// function DATAstru() {
//   return [
//     {
//       text: "数据结构",
//       collapsible: true,
//       items: [
//         { text: "JS-DataStructure", link: "/数据结构/JS-DataStructure" },
//       ],
//     },
//   ]
// }

function Algorithms() {
  return [{
    text: "算法",
    collapsible: true,
    items: [{
        text: "数据结构",
        link: "/suanfa/JS-DataStructure"
      },
      {
        text: "算法",
        link: "/suanfa/js-practice"
      },
      {
        text: "LeetCode",
        link: "/suanfa/LeetCode"
      },
      {
        text: "牛客",
        link: "/suanfa/nowcoder"
      },
    ],
  }, ]
}

function Network() {
  return [{
    text: "计算机网络",
    collapsible: true,
    items: [{
        text: "跨域",
        link: "/csnet/跨域"
      },
      {
        text: "缓存",
        link: "/csnet/缓存"
      },
      {
        text: "Ajax",
        link: "/csnet/Ajax"
      },
      {
        text: "cookie和session",
        link: "/csnet/cookie和session"
      },
      {
        text: "HTTP",
        link: "/csnet/HTTP"
      },
      {
        text: "HTTP2与HTTP3",
        link: "/csnet/HTTP2与HTTP3"
      },
      {
        text: "HTTPS",
        link: "/csnet/HTTPS"
      },
      {
        text: "nginx",
        link: "/csnet/nginx"
      },
      {
        text: "TCP",
        link: "/csnet/TCP"
      },
      {
        text: "UDP",
        link: "/csnet/UDP"
      },
      // { text: "XSS", link: "/csnet/XSS" },
      // { text: "SQL注入", link: "/csnet/SQL注入" },
      // { text: "CSRF", link: "/csnet/CSRF" },
    ],
  }, ]
}

function SoftwareAndEx() {
  return [{
    text: "software",
    collapsible: true,
    items: [{
        text: "VScode常用扩展与快捷键修改",
        link: "/software/VScode常用扩展与快捷键修改"
      },
      {
        text: "git的使用",
        link: "/software/git"
      },
      {
        text: "markdown的使用",
        link: "/software/markdown"
      },
      {
        text: "正则表达式的使用",
        link: "/software/regex"
      },
      {
        text: "express的使用",
        link: "/software/express"
      },
      {
        text: "enodejs安装",
        link: "/software/node-install"
      },
      {
        text: "常见问题",
        link: "/software/font-end interview"
      },
      {
        text: "linux基础命令",
        link: "/software/linux"
      },
    ],
  }, ]
}
const { sidebar } = require("vuepress-auto-sider-utils");

const getBaiduTongji = () => {
  return `
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?0088ce24040b03f2947322ab31d23414";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  `;
};

const getBaiduSpa = () => {
  return `
  var _hmt = _hmt || [];
  _hmt.push(['_requirePlugin', 'UrlChangeTracker', {
    shouldTrackUrlChange: function (newPath, oldPath) {
      newPath = newPath.split('#')[0];
      oldPath = oldPath.split('#')[0];
      return newPath != oldPath;
    }}
  ]);
  `;
};

const baiduTongji = getBaiduTongji();
const baiduSpa = getBaiduSpa();
const base = "/";
// const base = '/note/';
// {
//   text: "JS进阶",
//   link: "/js-advanced/",
//   items: [
//     {
//       text: "js进阶",
//       items: [
//         { text: "《js进阶》", link: "/js-advanced/" },
//         { text: "《设计模式》", link: "/design-mode/" },
//       ],
//     },
//   ],
// },

// const nav = [
//   { text: "React", link: "/react/" },
//   { text: "QA", link: "/qa/" },
//   {
//     text: "JS进阶",
//     link: "/js-advanced/",
//   },
//   {
//     text: "JS设计模式",
//     link: "/design-mode/",
//   },
//   { text: "Leetcode", link: "/leetcode/" },
//   {
//     text: "数据结构",
//     link: "/algorithm/",
//   },
//   { text: "工程化", link: "/engineering/" },
//   { text: "Node", link: "/node/" },
//   { text: "React", link: "https://react.qdzhou.cn" },
//   {
//     text: "个人链接",
//     ariaLabel: "个人链接",
//     items: [
//       { text: "随笔", link: "https://essay.qdzhou.cn", target: "_blank" },
//       { text: "随笔", link: "https://qa.qdzhou.cn", target: "_blank" },
//       { text: "博客", link: "http://qdzhou.cn/", target: "_blank" },
//       { text: "语雀", link: "https://www.yuque.com/xdxmvy" },
//       {
//         text: "Github",
//         link: "https://github.com/duangdong9/note",
//         target: "_blank",
//       },
//     ],
//   },
// ];

const nav = [
  { text: "Node", link: "/node/" },
  {
    text: "JS执行",
    link: "/principle/",
  },
  {
    text: "JS设计模式",
    link: "/design-mode/",
  },
  {
    text: "JS进阶",
    link: "/advanced/",
  },
  {
    text: "高阶函数",
    link: "/advanced-function/",
  },
  { text: "TS", link: "/typescript/" },
  { text: "八股文", link: "/eight-essay/" },
  {
    text: "手写实现",
    link: "/hand-writing/",
  },
  { text: "MDN", link: "/mdn/" },
  {
    text: "工具方法",
    link: "/tools/",
  },
  { text: "Home", link: "https://link.qdzhou.cn" },
];

module.exports = {
  title: "duangdong的note",
  description: "前端相关知识归纳总结",
  base,
  host: "localhost",
  port: 9207,
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "meta",
      {
        name: "keywords",
        content: "qd-blog,node,vuepress,leetcode,algorithm",
      },
    ],
    ["script", {}, baiduTongji],
    ["script", {}, baiduSpa],
  ],
  plugins: [
    ["@vuepress/medium-zoom", true],
    ["@vuepress/back-to-top", true],
    ["vuepress-plugin-code-copy", true],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    [
      "vuepress-plugin-right-anchor",
      {
        showDepth: 3,
        ignore: ["/", "/api/"],
        expand: {
          trigger: "click",
          clickModeDefaultOpen: true,
        },
        customClass: "your-customClass",
        disableGlobalUI: false,
      },
    ],
  ],
  themeConfig: {
    sidebarDepth: 0,
    searchMaxSuggestions: 10,
    lastUpdated: "上次更新",
    editLinks: true,
    smoothScroll: true,
    nav,
    sidebar,
  },
};

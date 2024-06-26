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

const nav = [
  { text: "事件机制", link: "/events/" },
  { text: "Fiber", link: "/fiber/" },
  { text: "进阶", link: "/advanced/" },
  { text: "Hooks", link: "/hooks/" },
  { text: "源码解读", link: "/source-code/" },
  { text: "性能优化", link: "/performance/" },
  { text: "基础", link: "/base/" },
  { text: "单元测试", link: "/jest/" },
  // { text: "Home", link: "https://link.aduang.cn" },
];

module.exports = {
  title: "duangdong的react",
  description: "react相关知识归纳总结",
  base,
  host: "localhost",
  port: 9209,
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "meta",
      {
        name: "keywords",
        content: "react,react进阶,react性能优化,react-hooks,react源码",
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

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

const nav = [
  {
    text: "JS",
    link: "/javascript/",
    items: [
      {
        text: "js基础",
        items: [
          {
            text: "《js代码片段》",
            link: "/javascript/2-代码片段/代码片段-2",
          },
          {
            text: "《常用正则》",
            link: "/javascript/3-常用正则/emoji",
          },
          {
            text: "《常用问题》",
            link: "/javascript/4-常见问题/qa",
          },
          {
            text: "《js重要类型》",
            link: "/javascript/1-重要类型/Map",
          },
        ],
      },
    ],
  },
  { text: "CSS", link: "/c3/" },
  { text: "可视化", link: "/visual/" },
  { text: "开发技巧", link: "/skill/" },
  { text: "Vue", link: "/vue/" },
  { text: "Angular", link: "/angular/" },
  { text: "小程序", link: "/mini-program/" },
  { text: "随笔", link: "/other/" },
  { text: "Home", link: "https://link.aduang.cn/" },
];

module.exports = {
  title: "duangdong随笔",
  description: "前端相关知识归纳总结",
  base,
  host: "localhost",
  port: 9205,
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "qd-blog,js,vuepress,leetcode,react,react进阶,css,js进阶,react性能优化,js设计模式",
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

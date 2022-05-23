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
  { text: "导航", link: "/guide/" },
  { text: "收藏夹", link: "/favorite/" },
  { text: "React", link: "https://react.qdzhou.cn" },
  { text: "工程化", link: "https://engineering.qdzhou.cn" },
  { text: "算法", link: "https://algorithm.qdzhou.cn" },
  { text: "QA", link: "https://qa.qdzhou.cn" },
  { text: "CI/CD", link: "https://deploy.qdzhou.cn" },
  { text: "JS", link: "https://note.qdzhou.cn" },
  { text: "随笔", link: "https://essay.qdzhou.cn" },
  { text: "其它编程", link: "https://collect.qdzhou.cn" },
  {
    text: "个人链接",
    ariaLabel: "个人链接",
    items: [
      { text: "博客", link: "http://qdzhou.cn/", target: "_blank" },
      { text: "语雀", link: "https://www.yuque.com/xdxmvy" },
      {
        text: "Github",
        link: "https://github.com/duangdong9/note",
        target: "_blank",
      },
    ],
  },
];

module.exports = {
  title: "duangdong的link",
  description: "优质链接",
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
    // vuepress-plugin-helper-live2d
    // [
    //   "vuepress-plugin-helper-live2d",
    //   {
    //     log: false,
    //     live2d: {
    //       // 是否启用(关闭请设置为false)(default: true)
    //       enable: true,
    //       // 模型名称(default: hibiki)>>>取值请参考：
    //       // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
    //       model: "wanko",
    //       display: {
    //         position: "right", // 显示位置：left/right(default: 'right')
    //         width: 135, // 模型的长度(default: 135)
    //         height: 300, // 模型的高度(default: 300)
    //         hOffset: 65, //  水平偏移(default: 65)
    //         vOffset: 0, //  垂直偏移(default: 0)
    //       },
    //       mobile: {
    //         show: false, // 是否在移动设备上显示(default: false)
    //       },
    //       react: {
    //         opacity: 0.8, // 模型透明度(default: 0.8)
    //       },
    //     },
    //   },
    // ],
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

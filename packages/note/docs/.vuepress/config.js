const { sidebar } = require("./siderbar");
// const { sidebar } = require("vuepress-auto-sider-utils");

// const getBaiduTongji = () => {
//   return `
//   var _hmt = _hmt || [];
//   (function() {
//     var hm = document.createElement("script");
//     hm.src = "https://hm.baidu.com/hm.js?0088ce24040b03f2947322ab31d23414";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
//   })();
//   `;
// };

// const getBaiduSpa = () => {
//   return `
//   var _hmt = _hmt || [];
//   _hmt.push(['_requirePlugin', 'UrlChangeTracker', {
//     shouldTrackUrlChange: function (newPath, oldPath) {
//       newPath = newPath.split('#')[0];
//       oldPath = oldPath.split('#')[0];
//       return newPath != oldPath;
//     }}
//   ]);
//   `;
// };

// const baiduTongji = getBaiduTongji();
// const baiduSpa = getBaiduSpa();
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
//   { text: "React", link: "https://react.aduang.cn" },
//   {
//     text: "个人链接",
//     ariaLabel: "个人链接",
//     items: [
//       { text: "随笔", link: "https://essay.aduang.cn", target: "_blank" },
//       { text: "随笔", link: "https://qa.aduang.cn", target: "_blank" },
//       { text: "博客", link: "http://aduang.cn/", target: "_blank" },
//       { text: "语雀", link: "https://www.yuque.com/xdxmvy" },
//       {
//         text: "Github",
//         link: "https://github.com/chnduang/note",
//         target: "_blank",
//       },
//     ],
//   },
// ];

const nav = [
  { text: "导航", link: "/link/" },
  { text: "React", link: "/react/" },
  { text: "MDN", link: "/mdn/" },
  { text: "Node", link: "/node/" },
  {
    text: "开发进阶",
    items: [
      {
        text: "工程化",
        items: [
          {
            text: "工程化",
            link: "/engineering/",
          },
        ],
      },
      {
        text: "部署",
        items: [
          {
            text: "部署",
            link: "/deploy/",
          },
        ],
      },
      {
        text: "算法",
        items: [
          {
            text: "算法",
            link: "/algorithm/",
          },
        ],
      },
    ],
  },
  {
    text: "前端开发",
    items: [
      {
        text: "H5",
        items: [
          {
            text: "CSS",
            link: "/css/",
          },
        ],
      },
      {
        text: "框架",
        items: [
          {
            text: "Vue",
            link: "/vue/",
          },
        ],
      },
      {
        text: "随笔",
        items: [
          {
            text: "QA",
            link: "/qa/",
          },
        ],
      },
    ],
  },
  {
    text: "开发技能",
    items: [
      {
        text: "数据库",
        items: [
          {
            text: "数据库",
            link: "/database/",
          },
        ],
      },
      {
        text: "后端",
        items: [
          {
            text: "后端",
            link: "/skill/",
          },
        ],
      },
    ],
  },
  {
    text: "链接",
    ariaLabel: "链接",
    items: [
      {
        text: "前端归纳",
        link: "https://copy.aduang.cn/",
        target: "_blank",
      },
      {
        text: "Github",
        link: "https://github.com/chnduang/cv-collect-blog.git",
        target: "_blank",
      },
    ],
  },
];

module.exports = {
  title: "note",
  description: "知识归纳总结",
  base,
  host: "localhost",
  port: 9200,
  head: [
    ["link", { rel: "icon", href: "/logo.webp" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "meta",
      {
        name: "keywords",
        content: "blog,react,node,js",
      },
    ],
    // ["script", {}, baiduTongji],
    // ["script", {}, baiduSpa],
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

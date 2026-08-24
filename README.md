# 我的笔记站

一个基于 [Astro](https://astro.build/) 的个人笔记博客：用 Markdown 写文章，自动生成支持**多分类**和**标签**的静态网站。

## 技术栈

| 工具 | 作用 |
|---|---|
| [Astro 7](https://astro.build/) | 网站框架：把 Markdown + 组件编译成纯静态网页 |
| [Node.js](https://nodejs.org/) | JavaScript 运行时，跑 Astro 需要它（本机已装 v26） |
| [npm](https://www.npmjs.com/) | 包管理器，用来安装和管理项目依赖 |
| Markdown | 所有文章的内容格式 |

## 快速开始

```bash
# 1. 安装依赖（第一次需要）
npm install

# 2. 启动本地开发服务器（浏览器打开 http://localhost:4321）
npm run dev

# 3. 生成正式静态文件（输出到 dist/ 目录）
npm run build

# 4. 本地预览构建结果
npm run preview
```

## 写一篇文章

在 `src/content/blog/` 目录下新建一个 `.md` 文件，顶部写 frontmatter（`---` 包裹的元信息），下面写正文：

```md
---
title: '文章的标题'
description: '一两句话的摘要'
pubDate: 'Aug 25 2026'
category: '游戏设计'        # 分类 = 你的子方向
tags: ['系统设计', '新手向'] # 标签，可以多个
heroImage: '../../assets/blog-placeholder-1.jpg'  # 可选：封面图
---

这里是正文，用 Markdown 书写。
```

保存后，开发服务器会自动刷新页面。文章会出现在首页、笔记列表页，以及对应的分类页（`/category/游戏设计/`）和标签页（`/tag/系统设计/`）。

> 💡 也可以直接复制 `templates/文章模板.md` 到 `src/content/blog/` 里改，字段说明都写在里面。

**规则：**
- `category` 和 `pubDate` 是必填的（忘了写会构建报错）
- `tags` 不写默认为空
- 文章文件名的英文部分决定 URL，如 `game-design-notes.md` → `/blog/game-design-notes/`

## 目录结构

```
notes-site/
├── astro.config.mjs        # Astro 配置（站点地址、集成插件）
├── package.json            # 项目信息、依赖列表、命令脚本
├── src/
│   ├── consts.ts           # 全站共用信息：网站名、简介（改这里）
│   ├── content.config.ts   # 内容模型：frontmatter 字段校验（分类/标签在这里定义）
│   ├── content/blog/       # ★ 所有文章都放这里（.md 文件）
│   ├── components/         # 可复用组件：页头、页脚、日期等
│   ├── layouts/            # 页面布局：文章页模板
│   ├── pages/              # 页面路由：
│   │   ├── index.astro     #   首页
│   │   ├── blog/index.astro         #   笔记列表
│   │   ├── blog/[...slug].astro     #   文章详情
│   │   ├── category/[category].astro #   分类页
│   │   ├── tag/[tag].astro           #   标签页
│   │   ├── about.astro     #   关于页
│   │   └── rss.xml.js      #   RSS 订阅
│   └── styles/global.css   # 全局样式
└── public/                 # 静态资源（favicon 等）
```

## 下一步

- [ ] 把网站名改成你自己的（`src/consts.ts`）
- [ ] 把首页和关于页的占位信息换成你的（`src/pages/index.astro`、`src/pages/about.astro`）
- [ ] 写你的第一篇真文章（`src/content/blog/`）
- [ ] 按 `DEPLOY.md` 指南部署到 Cloudflare Pages（免备案上线；本地 git 仓库已初始化、首次提交已完成）

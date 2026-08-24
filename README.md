# 四时小路观测周报

「四时小路 Komichi」的都市传说观测周报网站：每周将 B 站专栏发布的周报**重新排版收录**，参考 anyway.fm 的编辑排版风格，红黑主色 + 交通指示牌点缀色（黄/绿/蓝）。

> 🤖 给 AI 协作者/新对话的交接说明见 [AGENTS.md](AGENTS.md)（本地 AI 应优先读它再动手）

## 技术栈

| 工具 | 作用 |
|---|---|
| [Astro 7](https://astro.build/) | 网站框架：把 Markdown + 组件编译成纯静态网页 |
| [Node.js](https://nodejs.org/) | JavaScript 运行时（本机已装 v26） |
| [npm](https://www.npmjs.com/) | 包管理器，安装和管理依赖 |
| Markdown | 周报内容格式 |

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

## 收录一期周报（每周的核心工作）

1. 复制 `templates/周报模板.md` 到 `src/content/issues/` 目录
2. 文件名改成英文，如 `issue-3.md`（决定网址 `/issue/issue-3/`）
3. 修改 frontmatter：

```md
---
title: '第三路口观测记录'
issue: 3                    # ← 必填：期数
pubDate: 'Aug 24 2026'      # ← 必填：发布日期
author: '又一不举害我备孕失败' # ← 可选：编辑署名（有默认值）
originalUrl: 'https://www.bilibili.com/opus/xxxxx' # ← 建议每期填：B 站原文链接
summary: '一句话摘要'         # ← 可选：首页展示用
---
```

4. 正文按周报栏目结构用 Markdown 写（小标题分节），保存后浏览器自动刷新

**规则：** `issue` 和 `pubDate` 必填（缺了构建会报错）；`originalUrl` 每期都填，保留署名和原文链接是对合作朋友的尊重，也能给 B 站回流流量。

## 目录结构

```
notes-site/
├── astro.config.mjs        # Astro 配置（站点地址、集成插件）
├── package.json            # 项目信息、依赖、命令脚本
├── templates/周报模板.md     # ★ 每周收录新一期时复制它
├── src/
│   ├── consts.ts           # 网站名、简介、编辑署名（改这里）
│   ├── content.config.ts   # 内容模型：周报字段校验
│   ├── content/issues/     # ★ 所有周报内容都放这里（.md 文件）
│   ├── components/         # 页头、页脚、日期、导航
│   ├── layouts/IssueLayout.astro  # 期数页布局（含阅读进度条）
│   ├── pages/
│   │   ├── index.astro             # 首页：最新一期 + 往期列表
│   │   ├── archive.astro           # 全部期数归档
│   │   ├── issue/[slug].astro      # 单期页面（动态路由）
│   │   ├── about.astro             # 关于本刊
│   │   └── rss.xml.js              # RSS 订阅
│   └── styles/global.css   # 全局样式（红黑 + 交通色）
├── public/                 # 静态资源（favicon 等）
└── 参考文献/               # 周报原文存档（你的参考素材）
```

## 设计说明

- **主色**：交通红 `#C8102E` + 近黑 `#171717`；**点缀**：黄 `#FFD100` / 绿 `#009A44` / 蓝 `#0057B7`
- **排版**：正文衬线宋体（书卷气）、界面无衬线、行距 2.0
- **交互**：页面切换过渡动画（Astro ClientRouter）、文章页红色阅读进度条
- 所有品牌文案集中在 `src/consts.ts`

## 下一步

- [ ] 验收后按反馈调整设计（字体 / 颜色 / 布局）
- [ ] 补第 1 期《第一路口观测记录》真实内容
- [ ] 填关于页的联系方式（`src/pages/about.astro`）
- [ ] 按 `DEPLOY.md` 部署到 Cloudflare Pages（免备案上线）

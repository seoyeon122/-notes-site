# AGENTS.md — 项目交接说明（给 AI 协作者 / 新对话）

> 本文件供本地 AI（Claude Code 等）在**新对话**中快速接手本项目：先读本文件再动手。
> 人类用户是刚入行的游戏策划，本项目是教学模式（边学边做）：**每步讲解"为什么"、改动小而可验证、交付后由用户在浏览器验收**。

## 1. 项目是什么

四时小路观测周报网站：把合作朋友的每周周报（B 站专栏，作者"又一不举害我备孕失败"，对象为 VTuber @四时小路Komichi）**重新排版收录**成网站。
设计参照：anyway.fm 编辑风。主色：交通红 `#C8102E` + 近黑 `#171717`；点缀：黄 `#FFD100` / 绿 `#009A44` / 蓝 `#0057B7`。

## 2. 技术栈与版本

- **Astro 7.2.4**（静态站 SSG）。⚠️ v7 与旧版 API 有差异：页面过渡用 `<ClientRouter />`（来自 `astro:transitions`），**不是** `<ViewTransitions />`；动手前查 https://docs.astro.build
- Node 26（要求 ≥22.12）、npm
- 动效：GSAP 3.15（ScrollTrigger）+ Lenis 1.3（平滑滚动）
- 集成已配置：@astrojs/mdx（**后续文章内组件用它**）、@astrojs/rss、@astrojs/sitemap

## 3. 架构速览（文件地图）

- `src/consts.ts` — 全站文案（站名/简介/编辑署名/页脚标语），一处修改
- `src/content.config.ts` — 内容模型：`issues` 集合（字段见 §4）
- `src/content/issues/*.md` — ★ 周报内容；每周新增一期 = 复制 `templates/周报模板.md`
- `src/pages/` — `index`（最新一期+往期）、`archive`、`issue/[slug]`、`about`、`404`、`rss.xml`
- `src/layouts/IssueLayout.astro` — 期数页布局（含阅读进度条；h1 带 `data-animate`）
- `src/components/` — Header / HeaderLink / Footer / BaseHead（含 ClientRouter+MotionInit）/ FormattedDate / **MotionInit**（动效管理器，见 §6）
- `src/styles/global.css` — 设计 tokens（`--paper/--ink/--red/--yellow/--green/--blue` + 动效 tokens `--ease-out-expo/--dur-*`）
- `templates/周报模板.md` — 新一期复制它
- `参考文献/` — 朋友原文存档，**已在 .gitignore，绝不提交**（见 §7 红线）

## 4. 内容模型（issues 集合）

frontmatter：`title`(必填) / `issue`(必填，整数期数) / `pubDate`(必填) / `author`(默认"又一不举害我备孕失败") / `originalUrl`(B站原文链接，建议每期必填) / `summary`(可选) / `heroImage`(可选)。
正文：Markdown，按栏目用小标题分节；**链接清理** `?spm_id_from=` 等追踪参数。

## 5. 常用命令

- `npm run dev`（或 `astro dev --background` 后台模式；用 `astro dev status / stop / logs` 管理）
- `npm run build` → `dist/`（改完必跑，验证一切）
- git：`add → commit → push` 到 `origin/main`；仓库 **https://github.com/seoyeon122/-notes-site**（**PRIVATE，勿改公开**）
- ⚠️ **dev 模式疑难杂症先重启**：长驻的 Vite dev server 模块图会陈旧（尤其是中途新增 npm 依赖后），症状是"初次加载样式不生效/行为怪异、导航后恢复"。遇到先 `astro dev stop` 再 `astro dev --background`。此问题只存在于 dev 模式，`npm run build` 产物不受影响。

## 6. 动效约定（MotionInit.astro）

- 全站已接 Lenis 平滑滚动 + GSAP ScrollTrigger，并兼容 ClientRouter 页面切换（`astro:page-load` 时重置）
- 新元素要进场动画：**加 `data-animate` 属性即可**（自动淡入上移 + 交错）
- 已尊重系统 `prefers-reduced-motion`（开启时全部动画关闭）——新增动效必须保持这一点

## 7. 硬约束 / 红线

- **内容授权**：朋友周报**已获授权收录**（第 1、2、3 期已全部收录上线）。但未经用户明确授权，**不得**收录未来其他期的原文；`参考文献/` 仍仅本地（.gitignore），内含 `zhuanlan-1/2/3.md` 供重排版参考。
- **仓库保持 Private**；内容收录虽已获授权，但**仓库可见性、部署上线时机由用户决定**，不要擅自改 Public 或部署公网。
- Astro v7 API 变化多：改到不熟的 API 先查官方文档。
- 站名/文案只在 `src/consts.ts` 改。

## 8. 当前状态与 Roadmap（优先级从高到低）

**已完成**：内容模型（期数归档）、红黑编辑风设计、动效地基、git 私有仓库、文档（README/LEARNING/DEPLOY/周报模板/本文件）。

**待办**：
1. **骨架升级（下一个大任务）**：周报排版组件——顶部速览卡(TL;DR)、切片卡片、本周数据大数字块、文章内目录 TOC、时间线排版、上一篇/下一篇导航；并升级 `templates/周报模板.md` 让写作者"填表格式"套组件（MDX 已就绪，组件可做成 `.mdx` 内可用的标记/组件）
2. ~~等授权 → 恢复 issue-2~~（已完成：已获授权，第 2 期完整内容已恢复）；等用户决定 → 公开仓库 / 部署上线
3. 部署 Cloudflare Pages（免备案；见 DEPLOY.md；连上 GitHub 后每次 push 自动部署）
4. 可选：自定义域名；WebGL 特别篇页（架构支持 Three.js 岛屿，非必须）

**长期每周流程**：朋友发周报 → 复制模板到 `src/content/issues/` → 重排版 → `git push`。

## 9. 协作模式

- 用户是新手：解释"为什么"；一次只做一小块；交付后让用户浏览器验收（http://localhost:4321）
- 用户可能中途暂停或换方向：**重要进展及时 `git commit` + `push`**，保证可回退、可接续

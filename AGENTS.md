# AGENTS.md — 项目交接说明（给 AI 协作者 / 新对话）

> 本文件供本地 AI（Claude Code 等）在**新对话**中快速接手本项目：先读本文件再动手。
> 人类用户是刚入行的游戏策划，本项目是教学模式（边学边做）：**每步讲解"为什么"、改动小而可验证、交付后由用户在浏览器验收**。

## 1. 项目是什么

四时小路观测周报网站：把合作朋友的每周周报（B 站专栏，作者"又一不举害我备孕失败"，对象为 VTuber @四时小路Komichi）**重新排版收录**成网站。
设计参照：anyway.fm 编辑风 + komichi-vup 暗红黑世界观。**当前固定暗色**：暗红黑 `#0C0505` 底 + 鲜红 `#FF2231` 强调 + 暖白 `#F6EBE8` 字（点缀黄/绿/蓝信号灯）；**纸面浅色**（`#F6F4F0` 底 + 深墨字）仅阅读页固定使用（`IssueLayout` 的 `<html data-theme="light">` 自声明）。**明暗切换按钮已移除**（含 ThemeToggle 组件 + BaseHead 的 localStorage 脚本，git 历史可找回），双模式切换待后续再做。**左侧栏（80px 装订脊）**：固定贴左，竖排站名 + 竖排信号灯 + 导航（首页/归档/关于，米灰 `#E6E2D8` 横排文字，激活红左线）。**移动端响应式（≤820px）**：左侧栏变**顶部横栏 + 汉堡菜单**（站名常驻 + 右侧汉堡按钮 44px/距右缘 15px，导航收进下拉；交互脚本用事件委托 + `data-burger-ready` 幂等标记 + `astro:page-load` 重绑，防 ClientRouter 切页失效与双重绑定抵消），正文让位从左边距切上边距（`--rail-h:60px`，媒体查询在 `Rail.astro` 与 `global.css` 底部；首页高亮卡 ≤480px 改单列）。首页是"报告三版"：暗色封面（第一版，左封面+右两行高亮卡）→ **早间电台（第二点五版，施工中：渐变底 `#b27685→#beb09c` + 左介绍 + 右四图正方形占位「施工中」，文案/图片待填充）** → 浅色往期观测（第三版）。

## 2. 技术栈与版本

- **Astro 7.2.4**（静态站 SSG）。⚠️ v7 与旧版 API 有差异：页面过渡用 `<ClientRouter />`（来自 `astro:transitions`），**不是** `<ViewTransitions />`；动手前查 https://docs.astro.build
- Node 26（要求 ≥22.12）、npm
- 动效：GSAP 3.15（ScrollTrigger）+ Lenis 1.3（平滑滚动）
- 集成已配置：@astrojs/mdx（**文章内组件用它，如 Clip 切片卡片**）、@astrojs/rss、@astrojs/sitemap

## 3. 架构速览（文件地图）

- `src/consts.ts` — 全站文案（站名/简介/编辑署名/页脚标语），一处修改
- `manual.md` — **人类手操指南**（无 AI 时的维护步骤）；⚠️ 每次新增功能后必须同步更新它，保持与代码一致
- `decisions.md` — **决策档案**（做过/否过什么、为什么）；⚠️ 重要决策后补一条，供压缩上下文时找回"为什么"
- `public/images/issue-N/` — 各期图片的本地副本（不再热链 B 站，见 §7）
- `src/content.config.ts` — 内容模型：`issues` 集合（字段见 §4）
- `src/content/issues/*.md` — ★ 周报内容；每周新增一期 = 复制 `templates/weekly-template.md`
- `src/pages/` — `index`（最新一期+往期）、`archive`、`issue/[slug]`、`about`、`404`、`rss.xml`
- `src/layouts/IssueLayout.astro` — 期数页布局（**固定浅色阅读页**：`<html data-theme="light">` 自声明，不随全局主题变；右侧 **Timeline Scrollspy 时间线目录**（灰色线段+滚动高亮+悬停显示章节名，≥1200px 显示）+ 阅读进度条；h1 带 `data-animate`）
- `src/components/` — **Rail**（左侧栏：竖排站名+信号灯+导航）/ **Clip**（切片卡片：正文视频链接卡片化，`.mdx` 里用）/ Footer / BaseHead（含 ClientRouter+MotionInit）/ FormattedDate / **MotionInit**（动效管理器，见 §6）
- `src/styles/global.css` — 设计 tokens：默认暗色在 `:root`（komichi 暗红黑）、纸面模式在 `:root[data-theme='light']`（`--paper/--ink/--accent/--selection/--gray*` + 交通灯装饰色 + 动效 tokens）
- `templates/weekly-template.md` — 新一期复制它
- `参考文献/` — 朋友原文存档，**已在 .gitignore，绝不提交**（见 §7 红线）

## 4. 内容模型（issues 集合）

frontmatter：`title`(必填) / `issue`(必填，整数期数) / `pubDate`(必填) / `author`(默认"又一不举害我备孕失败") / `originalUrl`(B站原文链接，建议每期必填) / `summary`(可选) / `period`(推荐，该周周期如 `2026.08.17-2026.08.23`，归档/上下篇显示) / `stats`(可选，本周数据键值对，文章页大数字块) / `highlights`(可选，高亮卡数据：title/points/image/target，首页两行卡 + 文章页"本周速览"用) / `heroImage`(可选)。
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
- **页面过渡**：旧页向下渐隐 → 新页向上渐显（`global.css` 底部 `vt-fade-*` 关键帧）；左侧栏 `view-transition-name: rail` 单独快照保持不动（`::view-transition-old/new(rail){animation:none}`）

## 7. 硬约束 / 红线

- **内容授权**：朋友周报**已获授权收录**（第 1、2、3 期已全部收录上线）。但未经用户明确授权，**不得**收录未来其他期的原文；`参考文献/` 仍仅本地（.gitignore），内含 `zhuanlan-1/2/3.md` 供重排版参考。
- **仓库保持 Private**；内容收录虽已获授权，但**仓库可见性、部署上线时机由用户决定**，不要擅自改 Public 或部署公网。
- Astro v7 API 变化多：改到不熟的 API 先查官方文档。
- 站名/文案只在 `src/consts.ts` 改。

## 8. 当前状态与 Roadmap（优先级从高到低）

**已完成**：内容模型（期数归档 1~3 期）、红黑双主题（暗色全站 + 浅色阅读页）、动效地基、git 私有仓库、文档（README/LEARNING/DEPLOY/weekly-template/本文件）。

**待办**：
1. ~~骨架升级~~（✅ **已全部完成**：速览卡/时间线目录/上一篇下一篇/本周数据块/切片卡片，模板已升级）
2. ~~等授权 → 恢复 issue-2~~（已完成：已获授权，第 2 期完整内容已恢复）；等用户决定 → 公开仓库 / 部署上线
3. ~~部署上线~~（✅ **已在 Vercel 上线**：通过 GitHub 仓库自动部署；大陆访问速度一般）→ 后续按 DEPLOY.md「方案 B」迁阿里云/腾讯云香港服务器（免备案、国内可直连）
4. **早间电台版（第二点五版，施工中）**：渐变底已定、左介绍为占位文案、右四图正方形占位「施工中」；待用户提供正式文案 + 4 张电台图片
5. 可选：自定义域名；WebGL 特别篇页（架构支持 Three.js 岛屿，非必须）

**长期每周流程**：朋友发周报 → 复制模板到 `src/content/issues/` → 重排版 → `git push`。

## 9. 协作模式

- 用户是新手：解释"为什么"；一次只做一小块；交付后让用户浏览器验收（http://localhost:4321）
- **验收方式（省 token）**：用户本地能直接打开 http://localhost:4321 看效果，**AI 不要用截图/视觉工具（vision_html_screenshot / read_image 等）验证视觉结果**；AI 验证只做 `npm run build` 通过 + 用 grep/read 抽查产物关键点（类名、颜色值、结构顺序）即可，视觉判断交给用户浏览器
- 用户可能中途暂停或换方向：**重要进展及时 `git commit` + `push`**，保证可回退、可接续
- 用户说"先做预览不做推送"时：**只改代码 + `npm run build`，不 commit、不 push、不更新文档**，等用户确认效果后再一并提交并同步文档
- **新增任何功能后，同步更新 `manual.md` 与 `decisions.md`**（人类手操指南 + 决策档案），让无 AI 时也能照做、压缩上下文时能找回"为什么"

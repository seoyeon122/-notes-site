# CLAUDE.md —— AI 操作规则

> 本文件记录 AI 协作者在本项目中的**操作规则与硬约束**。动手前先读这里；项目背景、设计历程、决策原因见下方「参考文档」。

---

## 1. 项目一句话

为 VTuber「四时小路 Komichi」粉丝做的周报网站：把合作朋友的 B 站专栏周报重新排版收录，已获授权。技术栈 Astro 7 + GSAP + Lenis，托管 Vercel。

---

## 2. 动手前必读

- 先读 [AGENTS.md](AGENTS.md)：项目交接、文件地图、红线、Roadmap。
- 再读 [manual.md](manual.md)：无 AI 时的手操步骤，很多修改流程 AI 也应遵循。
- 设计/决策背景随时查 [decisions.md](decisions.md) 与 [design.md](design.md)。

---

## 3. 修改任何代码前的检查清单

1. **确认目标页面当前主题**：
   - 首页 `/`、归档 `/archive`、404 固定**暗色**。
   - 阅读页 `/issue/`、关于 `/about` 由 `IssueLayout.astro` 固定声明 `<html data-theme="light">`，**不要改全局主题脚本**。
2. **确认左侧栏/顶栏规则**：
   - 桌面 ≥821px：`Rail.astro` 80px 左侧装订脊，正文让位用 `padding-left`。
   - 移动 ≤820px：`Rail.astro` 变顶部横栏，正文让位切为 `padding-top: var(--rail-h)`（当前 60px）。
   - 改 Rail、全局 padding、进度条、锚点位置时，必须同时检查 `@media (max-width: 820px)`。
3. **首页三版顺序固定**：
   - 第一版 `.poster`（暗色报告封面）→ 第二点五版 `.radio`（早间电台，施工中）→ 第三版 `.info`（往期观测）。
   - 不要擅自调整顺序或做整页吸附切换。

---

## 4. 新增功能 / 改首页结构的标准流程

1. **小步修改，先 preview 后 commit**：
   - 代码改完后先 `npm run build` 验证通过。
   - 让用户在浏览器 `http://localhost:4321` 验收视觉效果（AI 不截图验证，只做构建/代码抽查）。
2. **用户确认后再提交**：
   - `git add .`
   - `git commit -m "..."`
   - `git push`
3. **同步更新文档**（见下一条）。

---

## 5. 文档同步规则（新增/修改功能后必做）

| 改了什么 | 必须更新的文档 |
|---|---|
| 新功能、新组件、新流程 | `manual.md` + `decisions.md` |
| 首页结构 / 视觉 / 交互重大调整 | `manual.md` + `decisions.md` + 必要时 `design.md` |
| 内容模型、frontmatter 字段 | `manual.md` + `AGENTS.md` §4 + `decisions.md` |
| 仅文案 / 常量 | `src/consts.ts` 即可，无需更新文档 |
| 仅配色数值微调 | `manual.md` 对应章节 + `decisions.md` |

> **红线**：新增功能后不更新文档，等同于未完成。

---

## 6. 测试与验证规则

- **必跑**：`npm run build`，确认无 TypeScript/Astro 编译错误。
- **视觉验收交给用户**：不要在 AI 侧用截图/视觉工具判断效果，用户浏览器才是标准。
- **代码抽查允许**：用 `grep` / `read` 抽查产物关键点（类名、颜色值、结构顺序、frontmatter 字段）。
- **dev 异常先重启**：样式/行为怪异时，先 `astro dev stop` 再 `astro dev --background`；构建产物若正常则不是代码问题。

---

## 7. 协作与交付规则

- 用户是新手，**每步解释「为什么」**，一次只做一小块。
- 用户说「先做预览不做推送」时：**只改代码 + `npm run build`，不 commit、不 push、不更新文档**，等用户确认后再一并提交。
- 重要进展及时 `git commit` + `push`，保证可回退、可接续。
- 用户中途暂停或换方向时，优先保存当前进度再讨论新方向。

---

## 8. 硬约束 / 红线

1. **仓库保持 Private**（`https://github.com/seoyeon122/-notes-site`），不要改公开。
2. **内容授权**：朋友周报已获授权（第 1~3 期），未来其他期必须经用户明确授权才可收录。
3. **`参考文献/` 仅本地**，已在 `.gitignore`，绝不提交。
4. **站名/全站文案只在 `src/consts.ts` 改**，不要散落在各页面。
5. **明暗切换按钮已移除**，不要恢复旧 localStorage 主题脚本或重新引入 `ThemeToggle.astro`；双模式切换待用户后续决策。
6. Astro v7 API 有变化，改到不熟的 API 先查官方文档（如页面过渡用 `<ClientRouter />` 而非 `<ViewTransitions />`）。
7. 新增动效必须尊重 `prefers-reduced-motion`；已有 `MotionInit.astro` 管理，新元素加 `data-animate` 即可。

---

## 9. 快速参考

| 想做什么 | 去哪里 |
|---|---|
| 改站名/简介/署名/页脚 | `src/consts.ts` |
| 改首页三版结构/高亮卡/早间电台 | `src/pages/index.astro` |
| 改左侧栏/导航/移动端顶栏 | `src/components/Rail.astro` + `src/styles/global.css` |
| 改暗色/浅色主题变量 | `src/styles/global.css`（`:root` / `:root[data-theme="light"]`） |
| 新增一期周报 | 复制 `templates/weekly-template.md` → `src/content/issues/issue-N.md` |
| 文章内视频链接卡片化 | 文件改 `.mdx`，用 `<Clip title="..." url="..." />` |
| 改凌晨四点时区映射 | `src/components/FourAMWatch.astro` |
| 换首页背景图 | `src/assets/` + `src/pages/index.astro` 顶部 import |
| 换 favicon | `src/assets/icon-source.jpg` + `node scripts/gen-icons.cjs` |
| 部署 | 见 [DEPLOY.md](DEPLOY.md) |

---

## 10. 参考文档

- [AGENTS.md](AGENTS.md) — 项目交接、文件地图、Roadmap
- [manual.md](manual.md) — 无 AI 手操步骤
- [decisions.md](decisions.md) — 做过/否过什么、为什么
- [design.md](design.md) — 形态、视觉、组件讨论
- [DEPLOY.md](DEPLOY.md) — 部署指南

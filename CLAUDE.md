# CLAUDE.md —— AI 操作规则

> 🔒 **内部维护文档**：给 AI 协作者看的操作规则，**不是面向网站读者的内容**；访客请看 [README.md](README.md)。

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

### ⭐ 长期维护 AI 工作守则（每次新增周报 / 电台内容时必读）

每当用户新增一期周报、或更新早间电台内容时，按下面清单执行。**漏掉任一步等于本次任务未完成。**

#### 一、首页自动轮换的项（无需手动改，但要知道机制）

`src/pages/index.astro` 用 `getCollection('issues')` 按 `issue` 号倒序取数据，以下全部**自动**跟随：
- 首页高亮卡：`latest`（最新一期）+ `second`（上一期）自动下移，上上期自动不再显示
- 首页"阅读最新一期"按钮：自动指向 `latest`
- 往期观测列表：`rest`（除最新外）自动列出
- 归档页、阅读页上一篇/下一篇、RSS：均基于集合自动生成

⚠️ 但有一个**前置条件**：新一期周报的 frontmatter 必须填 `highlights`，否则高亮卡那行会因无数据被过滤掉、不显示。

#### 二、必须手动维护的项

**A. 新增一期周报（issue-N.md）时：**
1. 在 `src/pages/index.astro` 顶部 `recentUpdates` 数组**最前面加一条**：`{ date: 'YYYY-MM-DD', title: '第N期 · 标题', href: '/issue/issue-N/' }`（首页只显示最新 4 条，最旧的自动不显示）
2. 确认 frontmatter 填了 `highlights`（否则首页卡片不显示）
3. `npm run build` 验证 → `git push`

**B. 早间电台更新到新一期时：**
1. 在 `recentUpdates` 数组**最前面加一条**：`{ date: 'YYYY-MM-DD', title: '…', href: '#radio' }`（首页只显示最新 4 条，最旧的自动不显示）
2. 在 `src/consts.ts` 的 `RADIO_EPISODES` 数组**最前面加一条**：`{ issue, image, url, album }`（封面图放 `public/images/radio/`）。首页电台版、电台归档页 `/radio`、「收听最新一期」按钮（`RADIO_LATEST_URL`）会自动跟随。
3. `npm run build` 验证 → `git push`

**B′. 有新视频投稿时：**
1. 投稿数据（封面图/标题/链接/描述）加到 `src/consts.ts` 的 `VIDEO_SUBMISSIONS` 数组**最前面**（封面放 `public/images/videos/`）；首页投稿影院版会自动跟随。
2. 在 `recentUpdates` 数组**最前面加一条**：`{ date: 'YYYY-MM-DD', title: '新投稿 · 标题', href: '#videos' }`（跳首页投稿影院；首页只显示最新 4 条，最旧的自动不显示）。
3. `npm run build` 验证 → `git push`

**C. 有"之后要改"的临时占位时（如链接待替换为导剪版）：**
- 同步挂一条到 `AGENTS.md` §8 Roadmap 的待办提醒，避免遗忘。

#### 三、其他可能需要同步更新的点（排查清单）

| 变动 | 位置 | 说明 |
|---|---|---|
| 站名/简介/署名/页脚 | `src/consts.ts` | 全站文案唯一入口，勿散落 |
| 首页三版结构/高亮卡/电台 | `src/pages/index.astro` | 见 §3 首页三版顺序 |
| 左侧栏导航链接 | `src/components/Rail.astro` 的 `links` | 加/删导航项 |
| 明暗主题变量 | `src/styles/global.css` | `:root` / `:root[data-theme="light"]` |
| 换 favicon / 首页背景图 | `src/assets/` + `scripts/gen-icons.cjs` | 见 §9 快速参考 |
| 部署/域名/服务器 | `DEPLOY.md` | 换域名或迁服务器时 |

> 本节是**硬性守则**，与"更新文档"同级；漏掉等于本次任务未完成。

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

> 🖥️ **命令环境提示（新会话）**：本机终端是 **PowerShell** 不是 bash，别用 unix 命令；项目根目录 `D:\002-explore\notes-site`（旧 `e:\002-site` 已废弃）；git 用隐私邮箱、仓库已公开；编辑偶发 `EIO` 错原样重试即可。完整约定见 AGENTS.md §5。

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

1. **仓库已公开**（`https://github.com/seoyeon122/-notes-site`，用户 2026 决定），**勿改回 Private**。
2. **内容授权**：朋友周报已获授权（第 1~3 期，后续期数以实际授权为准），未来其他期必须经用户明确授权才可收录。
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

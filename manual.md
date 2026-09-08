# 操作手册（无 AI 也能维护）

> 本手册记录网站常用调整的**手动操作步骤**，供没有 AI 时独立维护使用。
> ⚠️ **每次给网站新增功能后，必须回来更新本手册**（AI 协作时也应同步更新）。
> 所有命令都在项目根目录 `notes-site/` 下执行。

---

## 0. 环境准备（一次性）

- 安装 [Node.js](https://nodejs.org/)（≥22，本机 v26）、git、VS Code
- 首次进入项目后安装依赖：`npm install`

## 1. 日常：预览 / 构建 / 停止

```bash
npm run dev      # 启动开发服务器，浏览器打开 http://localhost:4321
npm run build    # 生成正式静态文件到 dist/
npm run preview  # 预览构建结果
```

停止开发服务器：在终端按 `Ctrl + C`，或 `astro dev stop`。

## 2. 每周收录一期周报（核心工作流）

1. 把朋友周报原文存到 `参考文献/`（如 `zhuanlan-4.md`，此目录不入库）
2. 复制 `templates/weekly-template.md` → `src/content/issues/issue-4.md`
3. 修改 frontmatter（`---` 之间）：
   - `title`（必填）、`issue`（必填，期数）、`pubDate`（必填，如 `'Aug 31 2026'`）
   - `author`（默认已填）、`originalUrl`（B 站原文链接，建议填）、`summary`（可选）
   - `period`（推荐）：该周周期，如 `2026.08.17-2026.08.23`（归档、上下篇会显示）
   - `stats`（可选）：本周数据大数字块，如 `入侵次数: 7`、`投稿: 0`、`本周神回: '3050 追悼会'`（文章页速览下方显示）
   - `highlights`（可选）：高亮卡数据，首页两行卡 + 文章页"本周速览"用；每条含 `title / points / image / target`（`image` 用本地路径，`target` 填正文小标题关键词）
4. 正文重排版：
   - 清理链接里的 `?spm_id_from=...` 等追踪参数
   - 按日期加 `##` 小标题分节（**会自动生成右侧时间线目录**：灰色线段 + 滚动高亮 + 悬停显示章节名，宽屏 ≥1200px 显示，无需手动维护）
   - **视频链接可换成切片卡片**：把文件后缀改为 `.mdx`，正文开头加 `import Clip from '../../components/Clip.astro';`，链接写成 `<Clip title="标题" url="链接" />`（见第 3 期样板）
   - **图片**：下载到 `public/images/issue-4/` 目录，正文里用 `![说明](/images/issue-4/xxx.webp)`
5. 本地 `npm run dev` 预览确认
6. 提交推送：`git add .` → `git commit -m "新增：第 4 期"` → `git push`

## 2.5 更新首页"近期更新"栏（每次周报/电台/投稿有更新都要做）

- 首页第一版左栏（"阅读最新一期"按钮下方）有"近期更新"栏，是**数据驱动**的：在 `src/pages/index.astro` 顶部的 `recentUpdates` 数组里**加一条**即可，页面自动多一行。
- 加条目的格式：
  ```js
  const recentUpdates = [
  	{ date: '2026-09-07', title: '标题', href: '跳转目标' },  // 新条目放最前面
  	{ date: '2026-08-31', title: '四时小路早间电台第四期', href: '#radio' },
  ];
  ```
- `href` 规则：
  - **周报更新** → `href: '/issue/issue-4/'`（跳转对应期数页）
  - **电台更新** → `href: '#radio'`（跳转到首页早间电台版，已带 80px 锚点偏移）
  - **投稿更新** → `href: '#videos'`（跳转到首页投稿影院版）
- 记得同时更新 `decisions.md` 或按需记录，然后 `git push`。

## 2.6 新增视频投稿（首页投稿影院）

- 投稿影院组件 = `src/components/VideoCinema.astro`，展示 `src/consts.ts` 的 `VIDEO_SUBMISSIONS` 数组（新到旧排列，组件按数组顺序轮播）。
- 新增一条投稿：
  1. 封面图放到 `public/images/videos/`（命名 `v00N.webp`，**必须是真 WebP**）
  2. 在 `VIDEO_SUBMISSIONS` 数组**最前面**加：`{ title: '标题', image: '/images/videos/v00N.webp', url: '视频链接', description: '一句话' }`
  3. 在 `recentUpdates` 数组**最前面**加一条：`{ date: 'YYYY-MM-DD', title: '新投稿 · 标题', href: '#videos' }`（见 §2.5）
  4. `npm run build` 验证 → `git push`

## 3. 改文案（站名 / 简介 / 署名 / 页脚）

- 全部在 `src/consts.ts` 一处改：
  - `SITE_TITLE` 站名、`SITE_DESCRIPTION` 简介、`SITE_AUTHOR` 编辑署名、`SITE_TAGLINE` 页脚标语

## 4. 改配色 / 明暗主题

- 在 `src/styles/global.css`：
  - `:root` = **默认暗色**（komichi 暗红黑）
  - `:root[data-theme='light']` = **纸面模式**（暖白）
  - 关键变量：`--paper`（底色）、`--ink`（文字色）、`--accent`（强调红）、`--gray` / `--gray-light`（灰与边框）、`--selection`（选中色）
- 交通信号灯的红/黄/绿是固定色，在 `src/pages/index.astro` 的 `.signals` 样式里

## 5. 换首页背景图

1. 图片放进 `src/assets/`
2. 打开 `src/pages/index.astro`，顶部改这行：
   `import bg from '../assets/Background_test02.png';` → 换成你的图
3. 不透明度在 `.poster-bg` 的 `opacity`（当前 `0.9`，可改 0.8~1）
4. 首页四张大背景已经用 Astro 的 `Image` 自动生成多档 WebP：浏览器会按屏幕宽度选择合适尺寸，2K 屏不会被小图强行放大；首屏背景优先加载，电台和视频影院背景延后加载。
5. **不要把这些 `<Image>` 改成 `<Picture>`**：`Picture` 会多包一层标签，进入 CSS Grid 后可能挤乱左右排版。

## 6. 调首页左右两页宽度

- `src/pages/index.astro` 的 `.poster` 里这一行：
  `grid-template-columns: minmax(0, calc(50% + 160px)) minmax(0, calc(50% - 160px));`
- 左边是封面、右边是周报窗口；改 `160px` 数值即可（左加宽 / 右变窄）

## 6.5 早间电台（首页电台版 + 电台归档页）

- **电台数据统一在 `src/consts.ts` 的 `RADIO_EPISODES` 数组**（首页电台版、电台归档页、`RADIO_LATEST_URL` 按钮链接都从这里取）。
- **每周更新电台**：把新一期加到数组**最前面**，填 `issue`（期号）/ `image`（封面图 `/images/radio/image_05.xxx`）/ `url`（B 站链接）/ `album`（分享专辑名）。
- **首页电台版**：`src/pages/index.astro` 的 `<section class="radio">`，取 `RADIO_EPISODES.slice(0,4)` 显示最新 4 张；封面说明直接读取 `album`，默认隐藏，鼠标悬停或键盘聚焦时从底部显示。电台归档页的常驻文字不受这组首页样式影响。
- **电台归档页**：`/radio`（`src/pages/radio.astro`）——桌面端"番剧索引"网格排满、手机端一行两个；每张卡片显示「第 N 期 + 专辑名」，点击跳 B 站视频。

## 6.6 首页视频影院

- **视频数据统一在 `src/consts.ts` 的 `VIDEO_SUBMISSIONS` 数组**，按从新到旧排列；新增视频时复制一项，填写 `title` / `image` / `url` / `description`。
- 封面放进 `public/images/videos/`，建议保持 16:9、约 1350×760，保存为真正的 WebP；单张尽量控制在 100–250 KB。代码里的路径从 `/images/` 开始，不写 `public`。
- 视频影院组件在 `src/components/VideoCinema.astro`，舞台背景源图是 `src/assets/videoback.jpg`；Astro 会在构建时自动输出适合不同屏幕的 WebP。
- 改完运行 `npm run build`，确认所有图片都能被处理、页面可以正常生成。

## 7. 改左侧栏导航

- 左侧栏在 `src/components/Rail.astro`（宽 80px，固定贴左，全站共用）：
  - **导航链接**：改文件里的 `links` 数组（首页 / 归档 / 电台 / 关于），加链接加一项即可
  - 竖排站名、竖排信号灯装饰也在里面
- **移动端自动变顶栏 + 汉堡菜单**（≤820px 宽）：站名常驻左侧，右侧汉堡按钮（三横线，44px 触控区，距右缘 15px），点开下拉菜单显示导航（激活项红字、点链接自动收起）。汉堡按钮和下拉样式在 `Rail.astro` 的 `@media (max-width: 820px)` 里；交互脚本在文件底部（事件委托 + `data-burger-ready` 幂等标记 + `astro:page-load` 重绑，**别改成直接绑定**，否则切页后会失效）
- **正文让位**：从"左边距"自动改成"上边距"（`--rail-h:60px`，见 `global.css` 底部媒体查询）

## 8. 改"凌晨四点观测"的时区→国家映射

- `src/components/FourAMWatch.astro` 里的 `ZONES` 数组（`o` 时区偏移 / `country` 国家 / `city` 城市）
- 东八区固定为「中国 · 北京」

## 9. 明暗主题（当前：固定暗色，双模式待后续）

- **当前状态**：首页 / 归档 / 404 固定**暗色**（komichi 暗红黑）；**阅读页（周报 `/issue/`、关于 `/about`）固定浅色**（`src/layouts/IssueLayout.astro` 的 `<html>` 自声明 `data-theme="light"`，不受全局影响）
- **明暗切换按钮已移除**（连同 `ThemeToggle.astro` 组件、`BaseHead.astro` 里的 localStorage 记忆脚本一起删除）；后续做双模式切换时再从 git 历史（提交 e1fc9a1 之前）找回，或重做
- 两套配色变量仍在 `src/styles/global.css`：`:root` = 暗色（默认）、`:root[data-theme='light']` = 纸面浅色（阅读页用）

## 10. 部署上线

- 见 `DEPLOY.md`（Vercel + GitHub，免备案；连 GitHub 后每次 push 自动部署）

## 11. 常见故障排查

| 现象 | 处理 |
|---|---|
| dev 模式样式/行为怪异 | 重启 dev：`astro dev stop` 再 `astro dev --background` |
| 图片裂了 | 已加 `no-referrer` 解防盗链；若仍裂，把图下载到 `public/images/` 改用本地路径 |
| 端口 4321 被占用 | 看终端提示的实际端口（会自动换） |
| `npm run dev` 报 astro 不是命令 | 先 `npm install` |
| git push 要登录 | 见 `DEPLOY.md` 常见问题（Personal Access Token） |

## 13. 页面过渡效果

- 自定义过渡（旧页向下渐隐 → 新页向上渐显）在 `src/styles/global.css` 底部的 `vt-fade-down / vt-fade-up` 关键帧；想调节奏 / 位移改这里的数值（当前 0.38s / 0.45s / 26px）
- 左侧栏不参与过渡（`view-transition-name: rail` 单独快照 + `animation: none`）；想让它也动，删掉 global.css 里 `::view-transition-old(rail)` 那两行即可

## 14. 换网站图标（favicon / 标签页图标）

1. 准备一张方形图（建议 ≥512×512，PNG/JPG 均可），命名为 `icon-source.jpg` 放到 `src/assets/`（覆盖旧的）
2. 运行：`node scripts/gen-icons.cjs` → 自动生成各尺寸图标到 `public/`
3. 本地预览确认 → `git push`（部署自动更新）

## 12. git 常用命令

| 命令 | 作用 |
|---|---|
| `git status` | 看改了哪些文件 |
| `git add .` | 把所有改动加入暂存 |
| `git commit -m "说明"` | 提交一个版本 |
| `git push` | 推送到 GitHub（触发部署） |
| `git pull` | 拉取远端最新 |
| `git log --oneline` | 看提交历史 |

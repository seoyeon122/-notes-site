# 四时小路观测周报

「四时小路 Komichi」的都市传说观测周报网站：把合作朋友在 B 站专栏发布的每周周报**重新排版收录**，并汇集周报 / 早间电台 / 视频投稿的粉丝向内容站。

设计语言：**观测公报（传单）**。参考 anyway.fm 编辑排版 + komichi 暗红黑世界观：暗红黑底 + 鲜红强调 + 暖白文字，点缀交通信号灯色（黄 / 绿）；浅色"纸面"版用于周报阅读页。

> 🤖 给 AI 协作者 / 新对话的交接说明见 [AGENTS.md](AGENTS.md)（本地 AI 应优先读它再动手）；维护步骤见 [manual.md](manual.md)；决策历史见 [decisions.md](decisions.md)。

## 站点内容（首页四版）

首页从上到下四个版块（侧边栏「首页」下有子栏可跳转）：

1. **周报封面**：最新一期高亮卡 + 近期更新栏（周报 / 电台 / 投稿的更新动态，数据驱动）
2. **投稿影院**：视频投稿轮播（`VideoCinema`）
3. **早间电台**：四时小路的音乐电台专辑墙，点封面就地展开专辑简介 + 曲目目录
4. **往期观测**：全部期数列表

另有：归档页、**电台归档页 `/radio`**（全部专辑封面网格，点开看歌单）、关于页、RSS。

彩蛋：首页有「**凌晨四点观测**」——实时从真实地点里找出此刻正好是当地凌晨 04:00 的地方（四时小路是活跃在凌晨四点的都市传说）。

## 技术栈

| 工具 | 作用 |
|---|---|
| [Astro 7](https://astro.build/) | 网站框架：Markdown + 组件编译成纯静态站 |
| [Node.js](https://nodejs.org/) | JavaScript 运行时（≥22.12） |
| [npm](https://www.npmjs.com/) | 包管理器 |
| [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/) | 滚动动效与平滑滚动 |
| [Vercel](https://vercel.com/) | 托管部署（GitHub 自动部署，免备案） |

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

## 每周核心工作流

- **收录一期周报**：复制 `templates/weekly-template.md` → `src/content/issues/issue-N.md` → 填 frontmatter（`title`/`issue`/`pubDate` 必填，建议补 `originalUrl` 保留署名与原文链接）→ 正文按栏目用小标题分节 → 更新首页 `recentUpdates` → `git push`
- **更新早间电台**：在 `src/consts.ts` 的 `RADIO_EPISODES` 数组最前面加新一期（封面放 `public/images/radio/`），首页电台版 / 电台归档页 / 「收听最新一期」按钮自动跟随
- **新增视频投稿**：加到 `src/consts.ts` 的 `VIDEO_SUBMISSIONS` 最前面（封面放 `public/images/videos/`，真 WebP）
- 更多细节与 AI 守则见 `manual.md` / `CLAUDE.md`

## 目录结构

```
notes-site/
├── astro.config.mjs          # Astro 配置（站点地址、集成）
├── package.json              # 项目信息、依赖、命令脚本
├── templates/weekly-template.md  # ★ 每周收录新一期时复制它
├── src/
│   ├── consts.ts             # ★ 全站文案 + 电台数据 + 投稿数据（一处改）
│   ├── content.config.ts     # 内容模型：周报字段校验
│   ├── content/issues/       # ★ 所有周报内容（.md / .mdx）
│   ├── components/           # Rail 导航 / RadioAlbums / VideoCinema /
│   │                         # FourAMWatch / Clip 切片卡 / Footer 等
│   ├── layouts/IssueLayout.astro   # 阅读页布局（固定浅色 + 时间线目录 + 进度条）
│   ├── pages/
│   │   ├── index.astro       # 首页（四版 + 近期更新）
│   │   ├── archive.astro     # 周报归档
│   │   ├── radio.astro       # 电台归档（封面网格）
│   │   ├── issue/[slug].astro
│   │   ├── about.astro       # 关于本刊
│   │   └── rss.xml.js        # RSS 订阅
│   └── styles/global.css     # 设计 tokens（红黑双主题）+ 动效关键帧
├── public/
│   ├── data/four-am.json     # 凌晨四点观测的地点数据（575 条真实地点）
│   └── images/               # 各期 / 电台 / 投稿封面图
├── design-iteration.md       # 设计整改方案（去 AI 味 · 日式简约）
└── 参考文献/                 # 周报原文存档（不入库，见 AGENTS.md）
```

## 设计说明

- **主色**：暗红黑 `#0C0505` + 鲜红 `#FF2231` + 暖白 `#F6EBE8`；浅色纸面 `#F2EDE3`（阅读页）
- **克制**：细线框、低圆角、少阴影；红只用于期号 / 关键数字 / 激活态
- **动效**：页面过渡（Astro ClientRouter）+ 滚动进场（GSAP/Lenis），尊重 `prefers-reduced-motion`
- 所有品牌文案集中在 `src/consts.ts`

## 版权与授权声明

本仓库收录的内容，版权均归**原作者 / 原画师 / 原投稿人所有**：

- **周报正文**：由合作作者「又一不举害我备孕失败」撰写、**已获授权**在本站二次排版收录展示；每期均保留编辑署名与 [B 站原文链接](https://space.bilibili.com/1512246445)。
- **插画 / 封面 / 二创素材**：均来自 B 站公开内容，版权归**各画师 / 创作者**所有（每期文末均有特别致谢）。
- 本仓库为**粉丝非营利收录站**，仅作排版与展示，不主张任何内容版权。

**如您是某期内容的作者/画师，认为收录不当，请联系我们移除：**（联系邮箱待补充 —— 见 `src/pages/about.astro`）

---

## 参考资料与致谢

- **「凌晨四点观测」地点数据**：来自 [KomichiTime](https://github.com/Badj0ey/KomichiTime)（MIT License，致谢关注四时小路谢谢喵 🙏）——本项目将其 619 条真实地点（国家 / 额外地区 / IANA 城市）精简合并为 `public/data/four-am.json`，保留真实名称并给"国家 - 地区"加分隔符展示；运行时用 `Intl.DateTimeFormat` 精确计算当地时刻，找出此刻正好 04:00 的地点。
- 设计参考：[anyway.fm](https://anyway.fm/) 编辑排版；komichi 官方世界观配色。
- 周报内容与素材由合作朋友「又一不举害我备孕失败」授权，[四时小路 Komichi](https://space.bilibili.com/1512246445) 本人在追更本网站 🎉

## 许可证

- **本站代码**（网站框架 / 组件 / 样式，非内容部分）：**MIT License**。
- **收录内容**（周报正文、图片等）：版权归原作者 / 画师所有，见上文「版权与授权声明」，不适用 MIT。
- 「凌晨四点观测」地点数据组件部分参考 [KomichiTime](https://github.com/Badj0ey/KomichiTime)（MIT），见上文致谢。

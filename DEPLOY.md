# 部署上线指南（阶段四：免备案方案）

目标：把网站部署到 **Cloudflare Pages**，获得一个公开网址（`xxx.pages.dev`），以后每次写完文章推送一下，网站自动更新。

特点：**完全免费、免备案**。大陆访问通常可用（速度一般）；想要大陆稳定快速，将来可再迁回国内服务器（那时才需要备案）。

## 你需要准备（都是免费的）

| 账号 | 用途 | 注册地址 |
|---|---|---|
| GitHub | 存放网站源码（git 仓库） | https://github.com |
| Cloudflare | 托管网站 + 域名服务 | https://dash.cloudflare.com |

---

## 第 1 步：配置 git 身份（一次性）

打开终端，进入项目目录，把下面的名字和邮箱换成你自己的：

```bash
cd D:\002-explore\notes-site
git config user.name "你的名字"
git config user.email "你的邮箱@example.com"
```

> 本仓库已经初始化好了 git（`git init` 已执行、首次提交已完成）。这一步只是告诉 git"你是谁"，以后每次提交会记录作者信息。

## 第 2 步：推到 GitHub

1. 登录 GitHub → 右上角 **+** → **New repository**
2. 仓库名填 `notes-site`，选 **Public**，**不要**勾选任何初始化选项（README、.gitignore 都不勾）
3. 创建后，把仓库地址（形如 `https://github.com/你的名字/notes-site.git`）记下来
4. 在本地终端执行：

```bash
git remote add origin https://github.com/你的名字/notes-site.git
git push -u origin main
```

> 第一次推送会弹窗登录 GitHub（或要求用户名 + Personal Access Token，见文末常见问题）。

## 第 3 步：在 Cloudflare Pages 创建项目

1. 登录 Cloudflare → 左侧菜单 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权连接你的 GitHub 账号，选择 `notes-site` 仓库
3. 构建设置（一般会自动识别，没有就手动填）：
   - Framework preset：**Astro**
   - Build command：`npm run build`
   - Build output directory：`dist`
4. 点击 **Save and Deploy**，等一两分钟

## 第 4 步：看到你的网站

部署完成后会得到一个网址：`<项目名>.pages.dev`（如 `notes-site.pages.dev`）。浏览器打开它——你的网站上线了！🎉

## 第 5 步：以后更新文章（日常工作流）

写完文章 → 终端执行：

```bash
git add .
git commit -m "新增：一篇新笔记"
git push
```

Cloudflare 检测到推送，自动重新构建部署。**整个过程 1~2 分钟，你只需要这三行命令。**

## 第 6 步（可选）：绑定你自己的域名

1. 买一个域名（`name.com`、阿里云、腾讯云等，约 ¥50~100/年）
2. 把域名的 DNS 托管到 Cloudflare（免费）
3. Cloudflare Pages → 你的项目 → **Custom domains** → 添加域名
4. 顺便把 `astro.config.mjs` 里的 `site` 改成 `https://你的域名`，重新推送

---

## 上线前清单（Checklist）

- [ ] `src/consts.ts`：网站名、简介改成真的
- [ ] `src/pages/index.astro`：`你好，我是[你的名字]` 改成真名
- [ ] `src/pages/about.astro`：补充你的联系方式
- [ ] `src/content/blog/`：把示例文章换成 / 加进你的内容
- [ ] `npm run build` 能通过
- [ ] GitHub 仓库已推送
- [ ] Cloudflare 部署成功，`*.pages.dev` 能打开

## 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| push 要求密码 | GitHub 已不支持密码推送 | 用 Personal Access Token：GitHub → Settings → Developer settings → Personal access tokens → 生成（勾选 repo 权限），当密码用 |
| Cloudflare 构建失败 | 看构建日志 | 常见：网络导致 `npm install` 失败 → 点重试；output directory 填错 → 确认是 `dist` |
| 部署成功但页面空白 | 构建设置不对 | 确认 Build command 是 `npm run build`、输出目录是 `dist` |
| 大陆访问很慢 | 节点在海外 | 免费方案正常现象；想快需国内服务器 + 备案（见 LEARNING.md） |

## 延伸：git 常用命令速查

| 命令 | 作用 |
|---|---|
| `git status` | 看哪些文件改了 |
| `git add .` | 把所有改动加入暂存区 |
| `git commit -m "说明"` | 提交一个版本 |
| `git push` | 推送到远程（触发自动部署） |
| `git log --oneline` | 看提交历史 |

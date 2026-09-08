# 部署上线指南（Vercel + GitHub）

> 🔒 **内部维护文档**：给项目维护者的部署指南。本仓库现已公开，本文供记录部署方式与香港服务器方案。

目标：让网站可被公开访问。**当前已在 Vercel 上线**，通过 GitHub 仓库自动部署。每次 `git push` 到 `main` 分支，Vercel 会自动构建并发布。

特点：Vercel = 免费即时、海外访问好、与 GitHub 集成方便；**大陆访问速度一般**，如需国内直连见「方案 B」香港服务器。

---

## 你需要准备（都是免费的）

| 账号   | 用途                     | 注册地址           |
| ------ | ------------------------ | ------------------ |
| GitHub | 存放网站源码（git 仓库） | https://github.com |
| Vercel | 构建并托管网站           | https://vercel.com |

---

## 第 1 步：配置 git 身份（一次性）

打开终端，进入项目目录，把下面的名字和邮箱换成你自己的：

```bash
cd e:\002-site
git config user.name "你的名字"
git config user.email "你的邮箱@example.com"
```

> 本仓库已经初始化好了 git（`git init` 已执行、首次提交已完成）。这一步只是告诉 git"你是谁"，以后每次提交会记录作者信息。

---

## 第 2 步：推到 GitHub

1. 登录 GitHub → 右上角 **+** → **New repository**
2. 仓库名填 `-notes-site`（或你现在的仓库名）——仓库现已公开，若重新建仓可见性自选
3. 创建后，把仓库地址（形如 `https://github.com/你的名字/-notes-site.git`）记下来
4. 在本地终端执行：

```bash
git remote add origin https://github.com/你的名字/-notes-site.git
git push -u origin main
```

> 第一次推送会弹窗登录 GitHub（或要求用户名 + Personal Access Token，见文末常见问题）。

---

## 第 3 步：在 Vercel 创建项目

1. 登录 Vercel → 点击 **Add New...** → **Project**
2. 点击 **Import Git Repository**，授权并连接你的 GitHub 账号
3. 找到并选择 `-notes-site` 仓库，点击 **Import**
4. 构建设置（一般会自动识别 Astro，没有就手动填）：
   - Framework preset：**Astro**
   - Build command：`npm run build`
   - Build output directory：`dist`
   - Root directory：`./`（项目就在仓库根目录）
5. 点击 **Deploy**，等 1~2 分钟

> 如果导入时提示 "Unable to unpack repo: there was at least one filename that was too long"，通常是仓库里有损坏的符号链接。检查 `git ls-files --stage | grep '^120000'`，把 symlink 改回普通文件后再推。

---

## 第 4 步：看到你的网站

部署完成后会得到一个网址：`<项目名>.vercel.app`（如 `-notes-site.vercel.app`，Vercel 会自动生成）。浏览器打开它——你的网站上线了！🎉

---

## 第 5 步：以后更新文章（日常工作流）

写完文章 → 终端执行：

```bash
git add .
git commit -m "新增：一篇新笔记"
git push
```

Vercel 检测到 `main` 分支有新推送，会自动重新构建部署。**整个过程 1~2 分钟，你只需要这三行命令。**

---

## 第 6 步（可选）：绑定你自己的域名

1. 买一个域名（`name.com`、阿里云、腾讯云等，约 ¥50~100/年）
2. 进入 Vercel 项目 → **Settings** → **Domains** → 输入你的域名并添加
3. 按 Vercel 提示，在域名 DNS 里添加对应的 CNAME 或 A 记录
4. 把 `astro.config.mjs` 里的 `site` 改成 `https://你的域名`，重新推送

---

## 方案 B：阿里云 / 腾讯云香港服务器（免备案，国内可直连）

> 香港服务器**不需要 ICP 备案**，国内一般可直连，速度明显好于 Vercel 免费版。适合作为"国内正式版"。

1. 买一台**香港轻量应用服务器**（阿里云轻量 / 腾讯云轻量，约 ¥30~50/月，2C2G 够用）
2. 系统装 Ubuntu/Debian，安装 Nginx：`sudo apt install nginx`
3. 本地构建：`npm run build` → 把 `dist/` 上传到服务器（如 `scp -r dist user@服务器IP:/var/www/weeklykomichi/`）
4. Nginx 站点配置：`root /var/www/weeklykomichi;` + `try_files $uri $uri/ /index.html;`
5. 域名（如 `weeklykomichi.com`）DNS 的 A 记录指向服务器 IP → 直接访问
6. 以后更新：本地 `npm run build` → 重新上传 `dist/` 覆盖（可写个一行脚本）

> 注意：香港服务器需要自己维护（系统更新、Nginx 配置），没有 Vercel"push 自动部署"方便。两条线可共存：Vercel 版管海外/开发预览，香港版管国内。

---

## 上线前清单（Checklist）

- [ ] `src/consts.ts`：网站名、简介、编辑署名确认无误
- [ ] `src/pages/about.astro`：补充联系方式
- [ ] `src/content/issues/`：确认已收录期数（第 1~3 期）内容与授权无误
- [ ] 每期周报都有 `originalUrl`（B 站原文链接）
- [ ] `npm run build` 能通过
- [ ] GitHub 仓库已推送
- [ ] Vercel 部署成功，`*.vercel.app` 能打开

## 常见问题

| 现象                | 原因                    | 解决                                                                                                                             |
| ------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| push 要求密码       | GitHub 已不支持密码推送 | 用 Personal Access Token：GitHub → Settings → Developer settings → Personal access tokens → 生成（勾选 repo 权限），当密码用 |
| Vercel 构建失败     | 看构建日志              | 常见：`npm install` 网络失败 → 点重试；output directory 填错 → 确认是 `dist`；framework preset 不是 Astro → 手动选择             |
| 部署成功但页面空白  | 构建设置不对            | 确认 Build command 是`npm run build`、输出目录是 `dist`                                                                          |
| "Unable to unpack repo: filename too long" | 仓库里有损坏的符号链接 | 本地执行 `git ls-files --stage \| grep '^120000'`，找到后删除重建为普通文件，再 push                             |
| 大陆访问很慢/需翻墙 | 节点在海外              | Vercel 免费版正常现象；想快走「方案 B」香港服务器（免备案），或国内服务器+备案                                               |

## 延伸：git 常用命令速查

| 命令                     | 作用                       |
| ------------------------ | -------------------------- |
| `git status`           | 看哪些文件改了             |
| `git add .`            | 把所有改动加入暂存区       |
| `git commit -m "说明"` | 提交一个版本               |
| `git push`             | 推送到远程（触发自动部署） |
| `git log --oneline`    | 看提交历史                 |

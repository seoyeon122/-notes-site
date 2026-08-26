---
# ===== 周报模板：复制这个文件到 src/content/issues/ 下使用 =====
# 使用方法：
#   1. 复制本文件 → 粘贴到 src/content/issues/ 目录
#   2. 文件名改成英文（决定网址），如 issue-13.md
#   3. 修改下面 frontmatter 里的字段（# 后面的中文是说明，改完可以删掉）
#   4. 正文按你朋友周报的栏目结构写，保存后浏览器自动刷新
#   5. （可选）要用"切片卡片"：把文件后缀改成 .mdx，并在正文开头加一行：
#      import Clip from '../../components/Clip.astro';
#      然后把视频链接写成 <Clip title="标题" url="链接" />

title: '本期标题'            # ← 必填：标题
issue: 13                    # ← 必填：期数（数字，每期 +1）
pubDate: 'Aug 31 2026'       # ← 必填：发布日期，格式 "Aug 31 2026" 或 "2026-08-31"
author: '又一不举害我备孕失败'   # ← 可选：作者署名（默认就是这个）
originalUrl: 'https://www.bilibili.com/opus/xxxxx' # ← 可选：B 站原文链接（建议每期都填）
summary: '一句话摘要'         # ← 可选：显示在首页
period: '2026.08.31-2026.09.06' # ← 推荐：该周周期（归档和上下篇会显示）
stats:                           # ← 可选：本周数据（大数字块）
  入侵次数: 7
  投稿: 0
  本周神回: '3050 追悼会'
# heroImage: '../../assets/blog-placeholder-1.jpg' # ← 可选：封面图，需要就取消注释

---

# 正文从这里开始

按你朋友的栏目结构写，比如：

## 本周观察

……

## 好物分享

- ……
- ……

## 碎碎念

……

*写完了就保存。想发布上线？git add . → git commit -m "新增：第 N 期" → git push（见 DEPLOY.md）*

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 内容模型：一期周报 = 一个 Markdown 文件
const issues = defineCollection({
	// 读取 src/content/issues/ 目录下的 Markdown 文件
	loader: glob({ base: './src/content/issues', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(), // 本期标题
			issue: z.number().int().positive(), // 期数（第几期）
			pubDate: z.coerce.date(), // 发布日期
			author: z.string().default('又一不举害我备孕失败'), // 作者署名（周报编辑）
			originalUrl: z.string().url().optional(), // B 站原文链接（每期保留署名+原文链接）
			summary: z.string().default(''), // 一句话摘要（首页用）
			highlights: z
				.array(
					z.object({
						title: z.string(), // 高亮标题
						points: z.array(z.string()).default([]), // 要点
						image: z.string().optional(), // 配图（本地路径，如 /images/issue-3/radio.webp）
						target: z.string().optional(), // 点击跳转的小节（正文小标题的关键词）
					})
				)
				.default([]), // 本周高亮（首页三卡 + 文章页速览复用）
			heroImage: z.optional(image()), // 封面图（可选）
		}),
});

export const collections = { issues };

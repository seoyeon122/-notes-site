import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(), // 标题
			description: z.string(), // 摘要（列表页和搜索引擎用）
			pubDate: z.coerce.date(), // 发布日期（会自动转成 Date 对象）
			updatedDate: z.coerce.date().optional(), // 更新日期（可选）
			category: z.string(), // 分类 = 你的子方向（如：游戏设计、读书笔记、随笔）
			tags: z.array(z.string()).default([]), // 标签，可以多个
			heroImage: z.optional(image()), // 封面图（可选）
		}),
});

export const collections = { blog };

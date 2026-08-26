// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://weeklykomichi.pages.dev', // 部署项目名 = weeklykomichi；以后买自定义域名再改这里
	integrations: [mdx(), sitemap()],
});

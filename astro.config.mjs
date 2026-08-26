// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com', // TODO: 上线前改成你的真实域名（影响 sitemap 和 RSS 链接）
	integrations: [mdx(), sitemap()],
});

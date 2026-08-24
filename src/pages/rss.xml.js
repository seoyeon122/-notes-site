import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const issues = await getCollection('issues');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: issues.map((issue) => ({
			title: `第 ${issue.data.issue} 期 · ${issue.data.title}`,
			description: issue.data.summary || issue.data.title,
			pubDate: issue.data.pubDate,
			link: `/issue/${issue.id}/`,
		})),
	});
}

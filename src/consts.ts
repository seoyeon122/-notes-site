// 全站共用信息：网站名、简介、作者都在这一个文件里改。
export const SITE_TITLE = '四时小路观测周报'; // 网站名
export const SITE_DESCRIPTION = '每周同步四时小路的都市传说观察资讯：出没记录、传单情报与珍贵影像。'; // 一句话介绍
export const SITE_AUTHOR = '又一不举害我备孕失败'; // 周报编辑（写周报的人 = 合作朋友）
export const SITE_MAINTAINER = '小小琴笑笑晴'; // 站点维护（搭站/运营的人 = 你）
export const SITE_TAGLINE = '每周一期，观测都市传说。'; // 页脚趣味文案

// ★ 早间电台各期数据（首页电台版 + 电台归档页共用）
// 每周更新电台时：把新一期放到数组【最前面】，并补 image/url/album
export interface RadioEpisode {
	issue: number; // 第几期
	image: string; // 封面图（public/images/radio/ 下）
	url: string; // B 站视频链接
	album: string; // 分享的专辑名
}
export const RADIO_EPISODES: RadioEpisode[] = [
	{ issue: 4, image: '/images/radio/image_04.jpg', url: 'https://www.bilibili.com/video/BV18cte6mEuV', album: '在通往未达的道路上 / 李吉吉' },
	{ issue: 3, image: '/images/radio/image_03.png', url: 'https://www.bilibili.com/video/BV1vHhN6HEQ6', album: '月上伊甸 / 江上青山' },
	{ issue: 2, image: '/images/radio/image_02.jpg', url: 'https://www.bilibili.com/video/BV1mnbq6sENS', album: 'OK Computer / radiohead' },
	{ issue: 1, image: '/images/radio/image_01.png', url: 'https://www.bilibili.com/video/BV1rfbb64ELm', album: 'ビアリストックス / Bialystocks' },
];
// 「收听最新一期」按钮的链接 = 最新一期（数组第一项）
export const RADIO_LATEST_URL = RADIO_EPISODES[0].url;

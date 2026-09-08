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
	album: string; // 格式：专辑名 / 艺人名（保留中间的空格与斜杠）
	description: string; // 展开后的专辑简介
	tracks: string[]; // 曲目目录：每首歌一个字符串，按显示顺序填写
	trackNote?: string; // 目录旁的小提示；正式填写后可改为 '' 隐藏
	hidden?: boolean; // 设为 true 时从首页/归档隐藏（数据保留，取消标记即恢复）
}
export const RADIO_EPISODES: RadioEpisode[] = [
	{
		issue: 5,
		image: '/images/radio/image_05.png',
		url: 'https://www.bilibili.com/video/BV1tibw6tE3X',
		album: '观众推歌电台第一期 / JPOP主题',
		description: '大家工作日加油+',
		trackNote: '', // 填好正式曲目后，改为 ''
		tracks: [
			'music - chilldspot',
			'yours - chilldspot',
			'Die or feel - chilldspot',
			'呼吸のように - Vaundy',
			'宮 - Vaundy',
			'花 - 藤井风',
			'Comet + Gold - Elmiene/藤井风',
			'千鳥 - ヨルシカ',
			'パドドゥ - ヨルシカ',
			'アメヲマツ、（等雨、） - 美波',
			'この街に晴れはこない（不霁之都） - 美波',
			'マリーゴールド（金盏花） - あいみょん',
			'Dear Mr 「F」- ずっと真夜中でいいのに。',
			'ヒューマノイド（Humanoid） - ずっと真夜中でいいのに。',
			'天国 - Mrs. GREEN APPLE',
			'愛をこめて花束を（献上花束） - Superfly',


		],
	},

	{
		issue: 4,
		image: '/images/radio/komichi-future-road-v1.png',
		url: 'https://www.bilibili.com/video/BV18cte6mEuV',
		album: '在通往未达的道路上 / 李吉吉',
		description: '这是抵达终点前，一段旅程的所见所闻所感，我，和无数人一样，在路上，在通往伟大或未达的道路上。',
		trackNote: '', // 填好正式曲目后，改为 ''
		tracks: [
			'启 (feat.王非凡Frank)',
			'山谷慢',
			'云端',
			'晚熟',
			'伪装成瘾 (feat.伍凌枫FlinWu)',
			'成功学',
			'一日之卷始于晨',
			'在通往伟大的道路上',
			'不争上游',
			'谁又不是',
			'不要拒绝我的Groove (专辑版)',

		],
	},
	{
		issue: 3,
		image: '/images/radio/image_03.png',
		url: 'https://www.bilibili.com/video/BV1vHhN6HEQ6',
		album: '月上伊甸 / 江上青山',
		description: '闭上眼观察自己  与自己对话 自己的伊甸会为你打开大门。',
		trackNote: '', // 填好正式曲目后，改为 ''
		tracks: [
			'鏡中初見Mirror’s First Sight',
			'撒手舞姿さようなら stylish goodbye',
			'笨蛋节奏バカSilly Beat',
			'放荡不羁 雅飒喜やさしい Wild and free',
			'收到了解还没死 わかりました Moonlight Real Life',
			'日日好日子 蜀の毎日 SiChuandaily',
			'80克拉 80carats キャラット',
			'反派打领带Bad guy suit and tie',
		],
	},
	{
		issue: 2,
		image: '/images/radio/image_02.jpg',
		url: 'https://www.bilibili.com/video/BV1mnbq6sENS',
		album: 'OK Computer / radiohead',
		description: ' 「摇滚乐在《OK Computer》裡完结与重生，20年后，它仍像一则魔幻的预言。」――陈德政',
		trackNote: '', // 填好正式曲目后，改为 ''
		tracks: [
			'Airbag',
			'Paranoid Android',
			'Subterranean Homesick Alien',
			'Exit Music (For a Film)',
			'Let Down',
			'Karma Police',
			'Fitter Happier',
			'Electioneering',
			'Climbing Up the Walls',
			'No Surprises',
			'Lucky',
			'The Tourist',
		],
	},
	{
		issue: 1,
		image: '/images/radio/image_01.png',
		url: 'https://www.bilibili.com/video/BV1rfbb64ELm',
		album: 'ビアリストックス / Bialystocks',
		description: '这里是一切的起点。',
		hidden: true, // 下架：不在首页/归档展示（数据保留，去掉即恢复）
		trackNote: '', // 填好正式曲目后，改为 ''
		tracks: [
			'花束',
			'I Don’t Have A Pen',
			'ごはん（饭）',
			'またたき（转眼之间）',
			'コーラ・バナナ・ミュージック（可乐 香蕉 音乐）',
			'Thank You',
			'夜よ',
			'Nevermore',
		],
	},
];
// 「收听最新一期」按钮的链接 = 最新一期（数组第一项）
export const RADIO_LATEST_URL = RADIO_EPISODES[0].url;

// 所有专辑共用的按钮和栏目文字（上方 RADIO_EPISODES 编辑每期内容）。
export const RADIO_DETAIL_COPY = {
	back: '← 返回全部专辑',
	listen: '前往收听 ↗',
	tracks: '曲目目录',
};

// 首页影院：标题暂留空；投稿按新到旧排列，封面放 public/images/videos/。
export const VIDEO_CINEMA_COPY = {
	title: '',
	label: '视频投稿',
	previous: '上一条投稿',
	next: '下一条投稿',
	placeholder: '视频封面预留位',
};

export type VideoSubmission = {
	title: string;
	image: string;
	url: string;
	description?: string;
};

// ★ 投稿列表：**最新的放最前**（新到旧排列），投稿影院默认显示第 1 条 = 最新投稿。
// 后续新增投稿时：把新条目加到数组最前面，并同步 recentUpdates（见 CLAUDE.md §4 守则 B′）。
export const VIDEO_SUBMISSIONS: VideoSubmission[] = [
	{
		title: '想要上演一出疯狂的独角戏 | 「大女優さん / いよわ」【四时小路】',
		image: '/images/videos/v003.webp',
		url: 'https://www.bilibili.com/video/BV1irbN6DEYs',
		description: '⚠️何时能以完美的剧本来行动？',
	},
	{
		title: '赤着脚能去往何处呢？| 「天国 / 初音ミク × ひらぎ」【四时小路】',
		image: '/images/videos/v002.webp',
		url: 'https://www.bilibili.com/video/BV1DFuu6iEqX',
		description: '去往大海的彼岸、去往天国。',
	},
	{
		title: '⛔️⚠️!!!CHO-DARI-️!!!⚠️⛔️',
		image: '/images/videos/v001.webp',
		url: 'https://www.bilibili.com/video/BV1q8Mq6dE7Q',
		description: '+初投稿+⚠️偶尔也想尝试从「正道」偏离一步对吧？',
	},
];

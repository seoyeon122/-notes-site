// 生成网站各尺寸图标（favicon）——用 sharp 从源图生成
// 用法：node scripts/gen-icons.cjs
// 源图：src/assets/icon-source.jpg（替换它再运行即可换图标）
const sharp = require('sharp');

(async () => {
	const src = 'src/assets/icon-source.jpg';
	console.log('源图：', src);
	// 现代浏览器标签页
	await sharp(src).resize(32, 32, { fit: 'cover' }).png().toFile('public/favicon-32.png');
	console.log('✓ public/favicon-32.png');
	// 小标签/书签
	await sharp(src).resize(16, 16, { fit: 'cover' }).png().toFile('public/favicon-16.png');
	console.log('✓ public/favicon-16.png');
	// iPhone 主屏
	await sharp(src).resize(180, 180, { fit: 'cover' }).png().toFile('public/apple-touch-icon.png');
	console.log('✓ public/apple-touch-icon.png');
	// 老浏览器回退（.ico）
	await sharp(src).resize(32, 32, { fit: 'cover' }).toFile('public/favicon.ico');
	console.log('✓ public/favicon.ico');
})().catch((e) => {
	console.error('生成失败：', e.message);
	process.exit(1);
});

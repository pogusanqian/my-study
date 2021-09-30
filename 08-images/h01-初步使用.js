const images = require('images');
const textToSvg = require('text-to-svg');
const svgToPng = require('svg2png');

// 从指定文件加载并解码文件
const img1 = images('../sources/imgs/社群背景图.png');
const img2 = images('../sources/imgs/美女1.jpg');

// 创建一个透明的image对象
const img3 = images(300, 300);

// 获取图像的宽高
console.log(img1.size(), img1.width(), img3.height());
// 设置图像的宽高
img1.size(702, 1032);
img2.size(480, 480);
// 填充颜色
img3.fill(155, 155, 155, 1);

// 绘制图片
img1.draw(img2, 111, 351);
// 保存图片
img3.save('../sources/nocommit/生成的图片.jpg');
img1.save('../sources/nocommit/合并后的图片.png');

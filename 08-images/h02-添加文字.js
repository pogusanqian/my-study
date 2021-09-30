const images = require('images');
const TextToSVG = require('text-to-svg');
const SvgToPng = require('svg2png');

// 从指定文件加载并解码文件
const img1 = images('../sources/imgs/社群背景图.png');
const img2 = images('../sources/imgs/美女1.jpg');

// 设置图像的宽高
img1.size(702, 1032);
img2.size(480, 480);

// 创建一个svg字符串
const textToSVG = TextToSVG.loadSync();
const flag = 'xmlns="http://www.w3.org/2000/svg"';
const svg = textToSVG.getSVG('美女_1001', {
  x: 0,
  y: 0,
  fontSize: 24,
  anchor: 'top',
}).replace(flag, `style="fill:rgba(0,0,0,0.3);" ${flag}`);

// console.log(svg);

// 绘制图片
SvgToPng(svg).then((buffer) => {
  img1.draw(img2, 111, 351);
  img1.draw(images(buffer), 280, 843);
  img1.save('../sources/nocommit//带数字的图片.png');
});

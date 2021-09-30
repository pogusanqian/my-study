const TextToSVG = require('text-to-svg');
const SvgToPng = require('svg2png');
const fs = require('fs');

// 创建一个svg, 并把svg转换成图片
const textToSVG = TextToSVG.loadSync();
const textToSVG2 = TextToSVG.loadSync('../sources/fonts/SIMYOU.TTF');
const options = {
  x: 0,
  y: 0,
  fontSize: 100,
  anchor: 'top',
};
const svg = textToSVG.getSVG('美女_1001', options);
const svg2 = textToSVG2.getSVG('美女_1001', options);

SvgToPng(svg).then((buffer) => fs.writeFileSync('../sources/nocommit/默认文字1.png', buffer));
SvgToPng(svg2).then((buffer) => fs.writeFileSync('../sources/nocommit/使用文字2.png', buffer));

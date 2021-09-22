const TextToSVG = require('text-to-svg');

// 字体参数可以不填写, 有一个默认的字体
const textToSVG = TextToSVG.loadSync('./fonts/SIMYOU.TTF');
// 返回的svg是一个字符串
const svg = textToSVG.getSVG('你好, 世界', {
  x: 30,
  y: 30,
  fontSize: 13,
});
console.log(svg);

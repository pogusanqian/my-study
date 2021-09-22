const TextToSVG = require('text-to-svg');

// 字体参数可以不填写, 有一个默认的字体
const textToSVG = TextToSVG.loadSync('../sources/fonts/SIMYOU.TTF');
// 返回的svg是一个字符串
const svg = textToSVG.getSVG('你好, 世界', {
  // 这里的xy坐标写默认值0就行了, 否则会超出svg的长宽限制
  x: 0,
  y: 0,
  fontSize: 13,
  // 这个top值是万万不可以省略的, 否则在html上显示不出来, 或者显示不全
  anchor: 'top',
});
console.log(typeof svg);
// 不要粘贴这个打印出来的值到html, 因为做了换行处理, 做好是debug的时候copy值
console.log(svg);

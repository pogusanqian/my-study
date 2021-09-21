const Images = require('images');

console.time('oneTime');
const width = 702;
const heigth = 1032;
const partentImg = Images('D:\\Code\\my-study\\sources\\imgs\\社群背景图.png').size(width, heigth);

for (let i = 0; i < 500; i++) {
  const img1 = Images(partentImg);
  const img2 = Images('D:\\Code\\my-study\\sources\\imgs\\美女1.jpg');
  img2.size(480, 480);

  // 绘制图片
  img1.draw(img2, 111, 351);
  img2.save(`./imgs/批量合并后的图片_${i}.png`);
}
console.timeEnd('oneTime');

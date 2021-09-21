const Images = require('images');
const JSZip = require('jszip');
const fs = require('fs');

console.time('oneTime');
const zip = new JSZip();
const width = 702;
const heigth = 1032;
const partentImg = Images('D:\\Code\\my-study\\sources\\imgs\\社群背景图.png').size(width, heigth);

// 1000张用了两分钟
for (let i = 0; i < 10; i++) {
  const img1 = Images(partentImg);
  const img2 = Images('D:\\Code\\my-study\\sources\\imgs\\美女1.jpg');
  img2.size(480, 480);

  // 绘制图片
  img1.draw(img2, 111, 351);
  zip.file(`${i}_美女.png`, img1.encode('png'));
}

// generateNodeStream生成了一个压缩文件对象, pipe则是下载到了本地, finish则是下载完成之后的事件
zip
  .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
  .pipe(fs.createWriteStream('./imgs/out.zip'))
  .on('finish', () => {
    console.timeEnd('oneTime');
  });

const Images = require('images');
const JSZip = require('jszip');
const fs = require('fs');
const TextToSVG = require('text-to-svg');
const SvgToPng = require('svg2png');
const images = require('images');

/**
 * 一维数组, 转换成二维数组
 * @param arr
 * @param size
 */
function oneToTwoDimen(arr, size) {
  const copyArr = [...arr];
  const twoDimenArr = [];
  while (copyArr.length > size) {
    twoDimenArr.push(copyArr.splice(0, size));
  }
  twoDimenArr.push(copyArr);
  return twoDimenArr;
}

async function zipImages() {
  console.time('oneTime');
  const flag = 'xmlns="http://www.w3.org/2000/svg"';
  const svgParams = {
    x: 0,
    y: 0,
    fontSize: 24,
    anchor: 'top',
  };
  const zip = new JSZip();
  const textToSVG = TextToSVG.loadSync();
  const width = 702;
  const heigth = 1032;
  const partentImg = Images('../sources/imgs/社群背景图.png').size(width, heigth);

  // 1000张用了两分钟(没有文字的情况下), 有文字的情况下, 100张就用两分钟
  for (let i = 0; i < 10; i++) {
    const img1 = Images(partentImg);
    const img2 = Images('../sources/imgs/美女1.jpg');
    img2.size(480, 480);
    // 生成svg, 并转换成buffer
    const svg = textToSVG.getSVG(`美女_${i}`, svgParams).replace(flag, `style="fill:rgba(0,0,0,0.3);" ${flag}`);
    const buffer = await SvgToPng(svg);
    console.count('=========');
    // 绘制图片
    img1.draw(img2, 111, 351);
    img1.draw(images(buffer), 280, 843);
    zip.file(`${i}_美女.png`, img1.encode('png'));
  }

  // generateNodeStream生成了一个压缩文件对象, pipe则是下载到了本地, finish则是下载完成之后的事件
  zip
    .generateNodeStream({type: 'nodebuffer', streamFiles: true})
    .pipe(fs.createWriteStream('../sources/nocommit/out.zip'))
    .on('finish', () => {
      console.timeEnd('oneTime');
    });
}

zipImages();

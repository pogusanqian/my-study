const Images = require('images');
const JSZip = require('jszip');
const fs = require('fs');
const TextToSVG = require('text-to-svg');
const SvgToPng = require('svg2png');

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

/**
 * 获取svg和qrcode对应的bufferArr
 * @param qrArr
 * @returns {Promise<(unknown[]|*)[]>}
 */
async function getBufferArr(qrArr) {
  // 文字转svg使用的三个参数
  const textToSVG = TextToSVG.loadSync();
  const flag = 'xmlns="http://www.w3.org/2000/svg"';
  const svgParams = {
    x: 0,
    y: 0,
    fontSize: 24,
    anchor: 'top',
  };

  const arr1 = await Promise.all(qrArr.map(async (item) => {
    const svg = textToSVG.getSVG(item.qrNmae, svgParams).replace(flag, `style="fill:rgba(0,0,0,0.3);" ${flag}`);
    const svgBuffer = await SvgToPng(svg);
    return svgBuffer;
  }));
  const arr2 = qrArr.map((item) => Images(item.qrCode).size(480, 480));
  return [arr1, arr2];
}

/**
 * 合成并压缩图片
 * @returns {Promise<void>}
 */
async function zipImages() {
  console.time('总时间');
  const zip = new JSZip();
  const width = 702;
  const heigth = 1032;
  const partentImg = Images('../sources/imgs/社群背景图.png').size(width, heigth);

  // TODO 这里的qrCode因该是一个base64字符串
  console.time('加载图片');
  const qrArr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    qrArr.push({
      qrCode: Images('../sources/imgs/美女1.jpg'),
      qrNmae: `美女_${i}`,
    });
  }
  console.timeEnd('加载图片');

  // svgBufferArr和qrCodeArr是一一对应的
  let svgBufferArr = [];
  let qrCodeArr = [];
  const qrTwoDimenArr = oneToTwoDimen(qrArr, 100);
  // getBufferArr()已经使用promise.all开启了多线程, 这个for循环中就不再开启多线程
  // eslint-disable-next-line no-plusplus
  console.time('文字转图片');
  for (let i = 0; i < qrTwoDimenArr.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const [arr1, arr2] = await getBufferArr(qrTwoDimenArr[i]);
    svgBufferArr = svgBufferArr.concat(arr1);
    qrCodeArr = qrCodeArr.concat(arr2);
  }
  console.timeEnd('文字转图片');

  // 合成图片
  svgBufferArr.forEach((svgBuffer, index) => {
    const backgroundImg = Images(partentImg);
    const qrCodeImg = qrCodeArr[index];
    backgroundImg.draw(qrCodeImg, 111, 351).drawImage(Images(svgBuffer), 280, 843);
    zip.file(`${index}_美女.png`, backgroundImg.encode('png'));
  });

  console.time('压缩');
  const buffers = await zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true });
  console.timeEnd('压缩');
  console.time('下载');
  buffers.pipe(fs.createWriteStream('../sources/nocommit/out.zip'));
  console.timeEnd('下载');
  console.timeEnd('总时间');
}

zipImages();

const fs = require('fs');
const JSZip = require('jszip');

// 创建一个压缩包文件
const zip = new JSZip();

// 往压缩包中添加文件, 如果文件同名, 后者会把前者覆盖掉
zip.file('my.txt', '你好, 世界;');
zip.file('my.txt', 'Hello World');

// 往压缩包中压缩流文件
// 往压缩包中压缩流文件
zip.folder('imgs');
zip.file('imgs/img1.jpg', fs.readFileSync('../sources/imgs/美女1.jpg'));

// 下载压缩包到本地
zip.generateAsync({
  type: 'nodebuffer', // 指定zip对象转换成什么流对象, 必须指定; 而且还需要根据文档区分浏览器和node环境的支持
}).then((data) => {
  fs.writeFileSync('../sources/out.zip', data);
  console.log('压缩文件成功');
});

// node环境中独有的用法, 专门转换成了一个nodebuffer流
// zip.generateNodeStream().pipe(fs.createWriteStream('../sources/out.zip'));

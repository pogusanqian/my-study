const fs = require('fs');
const JSZip = require('jszip');

const zip = new JSZip();
zip.file('a.txt', '你好, 世界;');
zip.file('b.txt', '你好, 世界;');
zip.file('c.txt', '你好, 世界;');
zip.folder('imgs');
zip.file('imgs/img1.jpg', fs.readFileSync('../sources/imgs/美女1.jpg'));
zip.file('imgs/img2.jpg', fs.readFileSync('../sources/imgs/美女2.jpg'));

// filter返回的是过滤掉的jszip对象, 但是对原本的zip对象并没有影响; 相当与是数组的slice()方法
const res = zip.filter((relativePath) => relativePath.includes('a'));
console.log(res);

zip.forEach((relativePath) => {
  console.log(relativePath);
});

// 删除文件和目录; 对原有的zip对象有影响的
zip.remove('a.txt').remove('imgs');

// node环境中独有的用法, 专门转换成了一个nodebuffer流
zip.generateNodeStream().pipe(fs.createWriteStream('../sources/out.zip'));

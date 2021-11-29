const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const zip = new JSZip();
// 解压zip文件
zip.loadAsync(fs.readFileSync('../sources/out.zip')).then((data) => {
  // 创建压缩包的目录(fs读取的目录结构是: my.txt, imgs/美女.png)
  // web上传读取的路径是out/my.txt, out/imgs/美女.png, 多了一层out路径
  const mypath = '../sources/out';
  fs.mkdirSync(mypath);
  // 这里不需要进行迭代循环的, 因为这个files是将所有的文件目录都查询出来了, 他们都在一个层级里面
  Object.keys(data.files).forEach((item) => {
    const zipObj = data.files[item];
    const dest = path.join(mypath, item);
    if (zipObj.dir) { // 如果是目录就创建目录
      fs.mkdirSync(dest);
    } else {
      zipObj.async('nodebuffer').then((content) => fs.writeFileSync(dest, content));
    }
  });
});

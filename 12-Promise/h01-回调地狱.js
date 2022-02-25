const fs = require('fs');

const path = './hello.txt';
fs.writeFile(path, '你好世界', err => {
  fs.readFile(path, (err, buf) => {
    console.log('第一次读取:', buf.toString());
    fs.writeFile(path, 'Hello World', { flag: 'a' }, err => {
      fs.readFile(path, (err, buf) => {
        console.log('第二次读取:', buf.toString());
      });
    });
  });
});
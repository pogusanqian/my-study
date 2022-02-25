const { readFile, writeFile } = require('fs/promises');

const path = ('./hello.txt');

writeFile(path, 'Hello World')
  .then(() => readFile(path))
  .then(buf => {
    console.log(buf.toString());
    return writeFile(path, '你好, 世界');
  })
  .then(() => readFile(path))
  .then(buf => console.log(buf.toString()))
  .catch(err => console.error(err));

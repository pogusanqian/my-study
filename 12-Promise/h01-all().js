// promise.all()里面的异步抛出了异常, 还能使用try捕捉到异常吗?
const fs = require('fs');

const path1 = '../sources/htmls/index.html';
const path2 = './hahah.html';

function promiseFs(path, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

/**
 * 等待promise时, 返回的是reject, 则整个主程序都会崩掉,
 * 如果不等待promise, reject不会将整个程序搞崩, 定时器比较特殊(就算我们抛出了异常, 定时器也能正常跑)
 */
async function rej() {
  // const data = promiseFs(path2, 'utf8');
  // console.log(data);
  // console.log('rejEnd');
  throw Error('错苏');
}

// rej();
throw Error('kkk');
console.log('立即立即离开');
// setInterval(() => console.count('=========='), 1000);

const { readFile } = require('fs/promises');

// then(success, error), 由于promise对成功和失败的情况做了区分, 回调函数失败了, 并不会执行success这个回调函数
// Node中回调函数发生异常的情况没有被处理, process进程的uncaughtException事件是用来专门抓捕没有捕获的异常信息的, 可以重写此事件
// Promise实现异步的原理仍然是回调, 将
readFile('./hellosss.txt').then(buf => console.log(buf.toString()))

setTimeout(() => {
  console.log('===============')
}, 3000);

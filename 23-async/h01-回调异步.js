const fs = require('fs');

/**
 * 1. 使用回调函数实现异步的的时候, err异常是不能通过try进行捕捉的; 读取文件信息这个线程根本不是在js引擎中执行的, 而是在宿主机
 * 2. 如果在回调函数中将异常再次抛出, 这个异常是没有try处理的, 就会终止程序, 导致程序健壮性弱
 */
fs.readFile('./hello.txt', (err, buf) => {
  // if (err) throw err; // 这里抛出的异常没有被try处理, 会导致程序终止, 定时器不会执行
  if (err) {
    console.error(err);
    return;
  } 
  console.log(buf.toString());
});

setTimeout(() => {
  console.log('===========');
}, 3000);

const fs = require('fs/promises');

/**
 * 1. async时generator函数的包装, 语法更加强大, 更加美观
 * 2. async仍然时开启了一个协程, 通过执行权限在主线程和协程之间的交替, 实现异步
 * 3. async自带generator函数执行器, 不需要再引入co模块
 */
async function readFiled() {
  const buf1 = await fs.readFile('./hello.txt');
  console.log(buf1.toString());
  const buf2 = await fs.readFile('./hello.txt');
  console.log(buf2.toString());
  const buf3 = await fs.readFile('./hello.txt');
  console.log(buf3.toString());
  const buf4 = await fs.readFile('./hello.txt');
  console.log(buf4.toString());
  const buf5 = await fs.readFile('./hello.txt');
  console.log(buf5.toString());
}

console.log('===========');
readFiled(); // 执行async函数, 开启协程
setTimeout(() => {
  console.log('定时器执行')
}, 3);
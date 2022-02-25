const fs = require('fs');
const co = require('co');
const thunkify = require('thunkify');

const readFileThunk = thunkify(fs.readFile);

/**
 * 1. generator是一个协程, 会和主线程轮换执行权限; 当主线程调用next()方法时, 会将执行权限交给协程; 当协程遇到yeild阻塞时, 会将执行权限还给主线程
 * 2. generator函数的执行: gen协程如果获取执行权限过早, 异步函数并没有执行完毕; 获取执行权限太晚, 又会造成性能的低下
 * 3. 主线程会在调用异步函数的回调函数时或者promise.then()方法时, 调用next()方法, 将执行权限交给协程gen函数
 * 4. co模块是一个generator函数执行器, 封装了何时调用next()方法, 将执行权限交给generator函数
 */
function* gen() {
  const r1 = yield readFileThunk('./hello.txt');
  console.log(r1.toString());
  const r2 = yield readFileThunk('./hello.txt');
  console.log(r2.toString());
  const r3 = yield readFileThunk('./hello.txt');
  console.log(r3.toString());
  const r4 = yield readFileThunk('./hello.txt');
  console.log(r4.toString());
  const r5 = yield readFileThunk('./hello.txt');
  console.log(r5.toString());
  const r6 = yield readFileThunk('./hello.txt');
  console.log(r6.toString());
};

// co模板是一个generator函数的自动执行器, 返回的是一个promise
co(gen).then(data => console.log('gen函数执行完毕'));
console.log('================');
setTimeout(() => { // 定时器会卡在中间执行, 因为执行权限会在主线程和协程之间相互交替
  console.log('定时器执行');
}, 3);
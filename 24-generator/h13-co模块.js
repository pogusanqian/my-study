const fs = require('fs');
const co = require('co');
const thunkify = require('thunkify');

const readFileThunk = thunkify(fs.readFile);

function* gen() {
  const r1 = yield readFileThunk('./hello.txt');
  console.log(r1.toString());
  const r2 = yield readFileThunk('./hello2.txt');
  console.log(r2.toString());
};

// 使用co模块之后, 就不用手动写generator函数执行器了
// co模块的generator执行器可以通过thunk函数的回调方法获取执行权限, 也能通过promise的then方法获取执行权限
co(gen).then(data => console.log('gen函数执行完毕'));
console.log('================');

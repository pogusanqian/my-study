const fs = require('fs');
const thunkify = require('thunkify');
const readFileThunk = thunkify(fs.readFile);

/**
 * generator函数实现异步的思想
 *  1. 开启协程用来跑generator函数, 当generator阻塞时变将执行权限还给了主线程
 *  2. 当yeild异步函数执行完毕之后, 主线程会执行它的回调函数, 然后在回调函数中调用了next方法, 将执行权限还给了generator协程
 */
function* gen() {
  // 这里是先读取了hello.txt, 读取完之后又读取了hello2.txt; 读取hello2的时候其实是放在hello1的回调函数中读取的, 这种异步读取就像是同步写法一样
  const r1 = yield readFileThunk('./hello.txt');
  console.log(r1.toString());
  const r2 = yield readFileThunk('./hello2.txt');
  console.log(r2.toString());
};

// 封装run函数作为generator函数的自动执行器, 用来自动执行generator函数
function run(g) {
  // 定义thunk函数的回调方法
  function callback(err, data) {
    if (err) return;
    var result = g.next(data);
    if (result.done) return;
    result.value(callback); // 给thunk函数添加了回调方法, 用到了递归
  }
  callback(); // 相当于于是第一次执行next()不需要传递参数的
}

run(gen());
run(gen());
console.log('==============')
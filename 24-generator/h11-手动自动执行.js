const fs = require('fs');
const thunkify = require('thunkify');
const readFileThunk = thunkify(fs.readFile);

function* gen() {
  // 返回的是一个thunk函数, thunk函数接受的参数是一个回调函数; 在回调函数中调用了next()方法, 主函数将执行权限还给了generator函数
  const r1 = yield readFileThunk('./hello.txt');
  console.log(r1.toString());
  const r2 = yield readFileThunk('./hello.txt');
  console.log(r2.toString());
  const r3 = yield readFileThunk('./hello.txt');
  console.log(r3.toString());
};


const g = gen();
const r1 = g.next();

// 给thunk函数添加回调函数, 当yield的异步函数执行完后, 就会执行此会调用函数; 然后再此回调函数中调用了next方法, 重新将执行权限给了genrator函数
// 通过thunk函数可以实现generator函数的自动流程管理
r1.value((err, data) => {
  if (err) throw err;
  const r2 = g.next(data);
  r2.value((err, data) => {
    if (err) throw err;
    const r3 = g.next(data);
    r3.value((err, data) => {
      if(err) throw err;
      g.next(data);
    })
  });
});
console.log('============')
const fs = require('fs');
const axios = require('axios');


function ThunkFactory(fn) {
  return function (...parames) { // 形参...paramse是收集参数用的, 把所有传递过来的参数, 都放在了parames数组中
    return function (callback) {
      return fn.call(this, ...parames, callback); // 实参...parames是将参数解构使用的
    }
  };
};

// 生成readFile的Thunk工厂
const readFileThunkFactory = ThunkFactory(fs.readFile);
const readFileThunk = readFileThunkFactory('./hello.txt');
readFileThunk((err, buf) => console.log(buf.toString()));
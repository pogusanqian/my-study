const fs = require('fs');

/**
 * 1. JS中的thunk函数是将接受多个参数的函数, 转换成只接受一个回调函数参数的函数
 * 2. ReadThunkFactory构造器返回的是一个thunk函数, thunk函数只接受一个回调函数的值
 */
function ReadThunkFactory(path) {
  return function (callback) {
    fs.readFile(path, callback);
  };
}

const readThunk = ReadThunkFactory('./hello.txt');
readThunk((err, buf) => console.log(buf.toString()));
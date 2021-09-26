async function asyncError() {
  console.log('asyncError');
  // throw Error('错误');
  return 23;
}

// 同步抛出异常
// console.log('start');
// throw Error('错误'); // 后面的end语句不会输出, 整个程序被打断了
// console.log('end');

// async方法中抛出异常
console.log('start');
const promise = asyncError();
console.log(promise);
console.log('end');

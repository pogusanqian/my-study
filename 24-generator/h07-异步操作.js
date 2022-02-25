const axios = require('axios');

/**
 * 1. generator使用协程完成了异步操作, 一个generator就相当于是一个协程
 * 2. 主线程通过第一个next()开启了协程gen(此时执行权限由主线程转移到了协程)
 * 3. 协程遇到yeild进行了阻塞, 将执行权限还给了主线程
 * 4. 主线程继续执行, 然后再次调用next()方法将执行权限转移给了协程, 但是此时传递过来的promise并没有结束, 无法获取到对应的值
 * 
 * 所以困难的地方就在于主线程何时把执行权限还给协程, 如果转移协程早了, data1会是一个promise值; 如果使用then调用的话, 由太麻烦了
 */

function* gen() {
  const data1 = yield axios('http://www.baidu.com');
  console.log(data1);
  const data2 = yield axios('http://www.qq.com');
  console.log(data2);
  return axios('http://www.qq.com');
}

const g1 = gen();
const pro1 = g1.next().value;
console.log('=============');
const pro2 = g1.next(pro1).value;
console.log('==============');
const pro3 = g1.next(pro2).value;

// 通过then传递具体的响应值
const g2 = gen();
g2.next().value.then(data => g2.next(data).value).then(data => g2.next(data))

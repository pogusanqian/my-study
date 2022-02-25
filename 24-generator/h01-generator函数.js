function* hello() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

// 返回的是一个遍历器对象
const he = hello();
console.log(he);

// 使用next移向下一个yield状态, 由于第三次执行的时候已经将generator函数执行完毕, 所以第四次返回的就是undefined
console.log(he.next());  // { value: 'hello', done: false }
console.log(he.next());  // { value: 'world', done: false }
console.log(he.next());  // { value: 'ending', done: false }
console.log(he.next());  // { value: 'undefined', done: false }
console.log('=============='); // 此行语句最后输出, 上面代码都是同步执行的

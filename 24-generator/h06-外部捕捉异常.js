function* fun() {
  fs.readFile();
  yield 100;
  yield 200;
};

const f = fun();
try {
  f.next();
} catch (err) {
  console.log('===', err);
}

console.log(f.next());  // { value: undefined, done: true }; 内部抛出异常后, 被外部try进行捕捉之后, 整个generater函数便结束了
console.log('==========');


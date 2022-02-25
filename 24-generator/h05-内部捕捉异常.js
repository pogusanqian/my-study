function* fun() {
  try {
    yield 100;
  } catch (e) {
    console.log('=======', e);
  }
  yield 200;
};

const f = fun();
// 内部try必须在执行一次next()方法之后才会起作用; 因为不执行next的话, 是走不到内部try的
const res1 = f.next();

const res2 = f.throw(new Error('出错了1'));  // 第一次抛出的异常, 可以被generator函数的内部try捕捉
console.log(res2);  // 200, 异常捕捉之后, 会再次执行一次yield产出
// i.throw(new Error('出错了2'));  // 第二次抛出异常, 在内部try无法捕捉, 因为此时yeild已经脱了的内部try的范围, 移动到了yield 200

console.log('============');
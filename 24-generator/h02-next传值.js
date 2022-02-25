function* fun() {
  let res = 'init';
  console.log(res);
  res = yield 1; // 这里并没有将1赋值给res, 而是被yield返回产出了; 这里res的值是需要通过next()赋值的
  console.log(res);
  res = yield 2;
  console.log(res);
  res = yield 3;
  console.log(res);
  let res1, res2 = yield 4; // next函数只能注入一个值, hello值被赋值给了res2
  console.log(res1, res2);  // undefined, hello
  return 'ending';
}

const f1 = fun();
f1.next();
f1.next('你好世界');
f1.next();
f1.next([1, 2, 3]);
f1.next('hello', 'world');
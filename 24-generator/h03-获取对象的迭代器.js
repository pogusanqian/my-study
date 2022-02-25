const stu = { name: '张三', age: 23 };

// 通过generator函数获取对象的迭代器
function* getIteratorAtObj(obj) {
  let keys = Reflect.ownKeys(obj);
  for (let key of keys) {
    yield [key, obj[key]];
  }
}

for (let [key, value] of getIteratorAtObj(stu)) {
  console.log(`${key}: ${value}`);
}
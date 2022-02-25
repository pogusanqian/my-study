function* numbers() {
  yield 1;
  yield 2;
  return 3; // return的返回值, 不会被for of迭代
}

console.log([...numbers()]);
console.log(Array.from(numbers()));

for (let n of numbers()) {
  console.log(n); // 1, 2
}

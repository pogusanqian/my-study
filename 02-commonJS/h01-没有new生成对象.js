const stu1 = require('./h01-Student')();
// 没有new是创建不成对象的, koa-router那个应该是一个特例
const stu2 = new require('./h01-Student')();
const stu3 = new (require('./h01-Student'))();

console.log(stu1);
console.log(stu2);
console.log(stu3);

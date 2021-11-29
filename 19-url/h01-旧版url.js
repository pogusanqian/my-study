const url = require('url');

const originStr = 'http://localhost:3000';
const pathnameStr = '/pogu/mykoa/getText';
const searchStr = '?name=张三&age=23';
const hrefStr = 'https://localhost:3000/pogu/mykoa/getTxt?name=张三&age=23';

const obj1 = url.parse(hrefStr);
const obj2 = url.parse(searchStr);
const obj3 = url.parse(searchStr, true);
console.log(obj1.href); // https://localhost:3000/pogu/mykoa/getTxt?name=张三&age=23 中文并没有做转码操作
console.log(obj2); // 即使没有base地址, 也可以创建url对象, 只不过相关的属性是null; 新版url就会报错
console.log(obj3.query); // 如果第二个参数是true的话, 就可以解析出一个query属性

const url = require('url');

const { URL } = url;

const originStr = 'http://localhost:3000';
const pathnameStr = '/pogu/mykoa/getText';
const searchStr = '?name=张三&age=23';
const hrefStr = 'https://localhost:3000/pogu/mykoa/getTxt?name=张三&age=23';

// const obj = new URL(searchStr); // 报错, 不是有效的URL地址
const obj1 = new URL(hrefStr);
const obj2 = new URL(pathnameStr + searchStr, originStr);
console.log(obj1.href); // https://localhost:3000/pogu/mykoa/getTxt?name=%E5%BC%A0%E4%B8%89&age=23, 对中文做了Unicode转码
console.log(obj2.searchParams.get('name')); // 获取请求参数

// input和base拼接使用; base这个参数只能提供originStr, 多余的部分并不会拼接到href中
const obj3 = new URL('/getText?name=张三&age=23', originStr + pathnameStr);
console.log(obj3.href); // http://localhost:3000/getText?name=%E5%BC%A0%E4%B8%89&age=23, 相比较与预期少了pogu/mykoa

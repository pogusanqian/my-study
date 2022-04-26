// 当前路径.表示的是就是执行node命令目录
require('dotenv').config({ path: './28-dotenv/.env' });

console.log(process.env.name);
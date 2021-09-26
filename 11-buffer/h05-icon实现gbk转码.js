// iconv-lite比iconv的性能要好
const iconv = require('iconv-lite');

console.log(iconv.encode('你好, 世界', 'GBK')); // <Buffer c4 e3 ba c3 2c 20 ca c0 bd e7>
console.log(typeof iconv.encode('你好, 世界', 'GBK'));  // Object

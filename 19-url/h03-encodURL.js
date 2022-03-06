const url = require('url');

// 返回的是ASCII的序列化
console.log(url.domainToASCII('中国'));  // xn--fiqs8s
console.log(url.domainToUnicode('xn--fiqs8s')); // 反向转义

console.log(url.fileURLToPath('file://你好.txt'));
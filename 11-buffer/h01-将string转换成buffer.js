// buffer其实是已经直接挂在到了全局对象中, 官网推荐我们使用require引用
const { Buffer } = require('buffer');

const str = '你好, 世界';

// 通常不适用new Buffer的方式将字符串转换成buffer, 而是直接采用from方法, 默认的编码就是'utf8';
// console.log(new Buffer(str, 'utf8')); // <Buffer e4 bd a0 e5 a5 bd 2c 20 e4 b8 96 e7 95 8c>
console.log(Buffer.from(str, 'utf8')); // <Buffer e4 bd a0 e5 a5 bd 2c 20 e4 b8 96 e7 95 8c>
console.log(Buffer.from(str)); // <Buffer e4 bd a0 e5 a5 bd 2c 20 e4 b8 96 e7 95 8c>

// 注意中文字符占用3个元素, 而英文字符和半角字符占用了一个
console.log(Buffer.from('中', 'utf8')); // <Buffer e4 b8 ad>
console.log(Buffer.from('a')); // <Buffer 61>
console.log(Buffer.from('。')); // <Buffer e3 80 82>
console.log(Buffer.from('.')); // <Buffer 2e>

// buffer目前支持的编码就只有utf8, utf16le, latin1
console.log(Buffer.from(str, 'utf16le')); // <Buffer 60 4f 7d 59 2c 00 20 00 16 4e 4c 75>

// 编码将字符串转换成buffer, 解码是将buffer转换成字符串
const buf1 = Buffer.from('好好学习');
console.log(buf1.toString()); // 好好学习, 默认使用的就是utf8解码
console.log(buf1.toString('hex')); // e5a5bde5a5bde5ada6e4b9a0
console.log(buf1.toString('base64')); // 5aW95aW95a2m5Lmg
console.log(buf1.toString('utf8')); // 好好学习

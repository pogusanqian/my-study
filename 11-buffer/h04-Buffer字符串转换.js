/**
 * 在js中, buffer只能转换成ASCII, UTF-8, UTF-16LE/USC-2, Base64, Binary, Hex编码的字符串
 * 同理也只能是这种编码的字符串转换成buffer, 默认使用的是UTF-8编码
 * 转换成Base64和hex的时候, 会是一个空, 挺奇怪的
 * buffer对象转换成字符串是通过toString()方法
 */

// 字符串转换成buffer对象
console.log(new Buffer.from('中国', 'ASCII')); // <Buffer 2d fd>
console.log(new Buffer.from('中国', 'utf-8')); // <Buffer e4 b8 ad e5 9b bd>
console.log(new Buffer.from('中国', 'binary')); // <Buffer 2d fd>
console.log(new Buffer.from('中国', 'base64')); // <Buffer >
console.log(new Buffer.from('中国', 'hex')); // <Buffer >
// console.log(new Buffer.from('中国', 'GBK')); // 报错
console.log(Buffer.isEncoding('gbk'), Buffer.isEncoding('utf8')); // false, true 用来判断是否支持此编码转换

// buffer对象转换成字符串
const buf = new Buffer.from('中国');
console.log(buf.toString());
console.log(buf.toString('ascii')); // de-8 出现了乱码
console.log(buf.toString('utf8', 0, 3));// 中, 正好是三个字节去成了一个汉字, buffer及其类似与数组, 他的每一个单位就是一个字节

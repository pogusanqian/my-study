// 低版本的node中是没有blob这个对象的
const { Blob, Buffer } = require('buffer');
/**
 * Blob(Binary Large Object)术语最初来自数据库(oracle 中也有类似的栏位类型; ),
 * 早期数据库因为要存储声音, 图片, 以及可执行程序等二进制数据对象所以给该类对象取名为Blob;在Web领域, Blob被定义为包含只读数据的类文件对象;
 * Blob中的数据不一定是js原生数据形式; 常见的File接口就继承自Blob, 并扩展它用于支持用户系统的本地文件;
 * 构建一个Blob对象通常有三种方式:
 *  1. 通过Blob对象的构造函数来构建;
 *  2. 从已有的Blob对象调用slice接口切出一个新的Blob对象;
 *  3. canvas API toBlob方法, 把当前绘制信息转为一个Blob对象;
 */

const buf = Buffer.from('好好学习');
const blob = new Blob(buf);

console.log(blob);

const buf = new Buffer(100);
buf[20] = 100;
buf[21] = -100;
buf[22] = 300;
buf[23] = 2.2;
buf[24] = 2.8;
/**
 * buffer元素的值是再[0~255]之间, 如果大于255则递减255到区间, 如果小于0则递加255到区间
 * buffer元素的默认是0
 * buffer元素如果是小数, 则直接取正, 不会进行四舍五入
 */
console.log(buf[10], buf[11]); // 0, 0
console.log(buf[20]); // 100
console.log(buf[21]); // 递加255, -100+255=155
console.log(buf[22]); // 递加255, 300-255=44
console.log(buf[23]); // 2
console.log(buf[24]); // 2


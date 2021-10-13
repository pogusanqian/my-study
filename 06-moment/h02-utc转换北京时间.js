const moment = require('moment');

const localDate = '2021-10-13 12:31:48';
const UTCDate = '2021-10-13 04:31:48'; // 格式化后的UTC时间
const UTCDate1 = '2021-10-13T04:31:48Z'; // 普通的UTC时间
const UTCDate2 = '2021-10-13T16:31:48Z'; // 加8正好是0点的UTC时间

// 将UTC时间转换成东八区时间(建议是先转换成utc, 然后再使用utfOffset加8, 再然后使用format格式化)
console.log(moment.utc(UTCDate).utcOffset(+8).format('YYYY-MM-DD hh:mm:ss')); // 2021-10-13 12:31:48
console.log(moment(UTCDate).add(8, 'hours').format('YYYY-MM-DD hh:mm:ss')); // 2021-10-13 12:31:48
// 非格式化的UTC时间转换成东八区
console.log(moment(UTCDate1).format('YYYY-MM-DD hh:mm:ss')); // 2021-10-13 12:31:48注意这里就不需要+8了

console.log('0点转换:');
// HH表示的是24小时值, hh表示的是12小时
console.log(moment.utc(UTCDate2).utcOffset(+8).format('YYYY-MM-DD HH:mm:ss')); //  00:31:48
console.log(moment.utc(UTCDate2).utcOffset(+8).format('YYYY-MM-DD hh:mm:ss')); //  12:31:48

// 将东八区时间转换成UTC时间
console.log(moment.utc(localDate).utcOffset(-8).format('YYYY-MM-DD hh:mm:ss')); // 2021-10-13 04:31:48

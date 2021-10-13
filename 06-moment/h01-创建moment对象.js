const moment = require('moment');

/**
 * UTC表示: 2021-09-13T02:42:39.000Z
 * 东八区的UTC表示: 2021-09-13T10:42:39+08:00
 * 东八区格式化表示: 2021-09-13 10:42:39
 * 东八区 = UTC + 8
 */
console.log(moment()); // 创建东八区的moment对象
console.log(moment(undefined)); // 传一个undefined相当于什么都没有传递
console.log(moment(null)); // Moment<Invalid date>
console.log(moment.utc()); // 创建utc的moment对象
console.log(moment().format('YYYY-MM-DD HH:mm:ss')); // 格式化东八区时间输出
console.log(moment.utc().format('YYYY-MM-DD HH:mm:ss')); // 格式化UTC时间输出

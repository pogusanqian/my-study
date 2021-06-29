const moment = require('moment');

console.log(moment()); // Moment<2021-06-22T08:38:33+08:00>, 这个是获取moment对象
console.log(moment().local()); // Moment<2021-06-22T08:36:30+08:00>, 这个是获取本地的moment对象
console.log(moment().format()); // string 2021-06-22T08:34:40+08:00

console.log(moment('1995-12-25')); // Moment<1995-12-25T00:00:00+08:00>, 根据字符串创建时间, 会根据时区自动调整
console.log(moment('2013-02-08 09:30:26')); // Moment<2013-02-08T09:30:26+08:00>

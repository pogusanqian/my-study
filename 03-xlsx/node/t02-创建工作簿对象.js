const xlsx = require('xlsx');

const workBook = xlsx.utils.book_new(); // 创建一个工作簿
const wsData = [
  ['S', 'h', 'e', 'e', 't', 'J', 'S'],
  [1, 2, 3, 4, 5],
  [11, 22, 33, 44, 55],
];

const workSheet = xlsx.utils.aoa_to_sheet(wsData);// 使用二维数组创建一个工作表对象

xlsx.utils.book_append_sheet(workBook, workSheet, '第一张表');// 向工作簿追加一个工作表, 并给这个工作表起了一个名字
xlsx.utils.book_append_sheet(workBook, workSheet, '第二张表');// 向工作簿追加一个工作表, 并给这个工作表起了一个名字

console.log(workBook);

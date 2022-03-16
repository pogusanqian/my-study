const XLSX = require('xlsx');

const wb = XLSX.utils.book_new();
const title = { f_age: '年龄', f_name: '姓名', f_sex: '性别' };
const data = [
  { f_name: '张三', f_age: 23, f_sex: '男' },
  { f_name: '张三', f_age: 5, f_sex: '女' },
];
data.splice(0, 0, title);
const ws = XLSX.utils.json_to_sheet(data, {
  // header: ['f_name', 'f_age', 'f_sex'], // 指定顺序, 如果不指定顺序的话, 就市按照title中key的顺序
  skipHeader: true, // 不要表头
});

XLSX.utils.book_append_sheet(wb, ws, '工作表1');
XLSX.utils.book_append_sheet(wb, ws, '工作表2');

XLSX.writeFile(wb, 'C:\\Users\\pogus\\Desktop\\hell.xlsx');

const XLSX = require('xlsx');

const data = [
  { f_age: '年龄', f_name: '姓名', f_sex: '性别' },
  { f_name: '张三', f_age: 23, f_sex: '男' },
  { f_name: '张三', f_age: 5, f_sex: '女' },
];

const sheet = XLSX.utils.json_to_sheet(data, {skipHeader: true});
const str = XLSX.utils.sheet_to_html(sheet);

console.log(str);

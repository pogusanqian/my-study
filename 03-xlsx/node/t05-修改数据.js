const xlsx = require('xlsx');

// 键会自动填充到第一行
const workSheet = xlsx.utils.json_to_sheet([
  { 列1: 1, 列2: 2, 列3: 3 },
  { 列1: 4, 列2: 5, 列3: 6 },
]);
console.log(workSheet);
console.log('===============');

xlsx.utils.sheet_add_aoa(workSheet, [
  [700, 888, 999],
  ['AA', 'BB', 'CC'],
], {
  origin: 'A4', // 从A4开始增加内容, 也就是第四行, 如果是写A1的话, 会覆盖之前的第一行与第二行数据
});
console.log(workSheet);

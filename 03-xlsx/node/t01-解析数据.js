const xlxs = require('xlsx');
const fs = require('fs');

(async function () {
  // 获取流文件
  const excelBuffer = fs.readFileSync('C:\\Users\\v_vqcailiu\\Desktop\\1617965547544.xlsx');
  // 将流文件解析成对象
  const workbook = xlxs.read(excelBuffer, {
    type: 'buffer',

  });
  const sheetNames = workbook.SheetNames; // 工作表名称集合
  const worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
  const json = xlxs.utils.sheet_to_json(worksheet, {
    // 对中文表头进行替换
    header: [
      'f_id',
      'f_province_code',
      'f_city_code',
      'f_drugstore_name',
      'f_drugstore_id',
      'f_shop_name',
      'f_shop_id',
      'f_employee_name',
      'f_employee_id',
      'f_is_shop_manager',
      'f_is_shop_administrator',
    ],
  });

  // 获取单元格
  const cell = worksheet['A1', 'B1'];
  console.log(cell);
}());

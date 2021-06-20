const xlsx = require('xlsx');

const workSheet = xlsx.utils.aoa_to_sheet([[1, 2, 3, new Date()], [1, 2, 3, 4]]);

console.log(workSheet);

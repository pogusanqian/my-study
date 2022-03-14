const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const urlencode = require('urlencode');
const axios = require('axios');
const md5 = require('md5');

// 配置数据库连接
dotenv.config({ path: '26-腾讯地图/.env' });
const sequelize = new Sequelize('db_school', 'root', '123123', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
  timezone: '+08:00',
  logging: false,
  pool: {
    max: 10,
  },
  define: {
    timestamps: false,
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
});

function getInsertSqlValuesByObject(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === true) { // 针对数据库中没有boolean数据类型
      obj[key] = 1;
    } else if (value === false) {
      obj[key] = 0;
    } else if (typeof value === 'object') { // 针对数据库中的JSON数据类型
      obj[key] = JSON.stringify(value);
    }
  }
  return `(${JSON.stringify(Object.values(obj)).slice(1, -1)})`;
}

function getInsertSqlValues(data) {
  if (Array.isArray(data)) {
    return data.map(item => getInsertSqlValuesByObject(item)).join(',');
  }
  return getInsertSqlValuesByObject(data);
}

function getInsertSqlFileNames(data) {
  const templateObj = Array.isArray(data) ? data[0] : data;
  return `(${Object.keys(templateObj).toString()})`;
}

async function insertData(tableName, data) {
  try {
    data = data.map(item => ({
      f_name: item.name || '', // 区域名称没有这个字段
      f_full_name: item.fullname,
      f_code: item.id,
      f_pin_yin: item.pinyin?.join('') || '' // 区域名称没有这个字段
    }));
    const sql = `insert into ${tableName} ${getInsertSqlFileNames(data)} values ${getInsertSqlValues(data)}`;
    return await sequelize.query(sql);
  } catch (err) {
    console.error(err);
  }
}

// 从腾讯地图拉取数据
async function getData() {
  const originUrl = 'https://apis.map.qq.com';
  const pathname = '/ws/district/v1/list';
  const key = 'QEIBZ-SMDKK-Q6KJT-AU6LO-JEE4K-WVFJD';
  const sig = md5(`${pathname}?key=${key}${process.env.sk}`);

  return (await axios.get(`${originUrl}${pathname}?key=${key}&sig=${sig}`)).data.result;
}

(async () => {
  const [provinceData, cityData, districtData] = await getData();
  await insertData('t_province_map', provinceData);
  await insertData('t_city_map', cityData);
  await insertData('t_district_map', districtData);
})();
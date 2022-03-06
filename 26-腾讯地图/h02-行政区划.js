const dotenv = require('dotenv');
const urlencode = require('urlencode');
const axios = require('axios');
const md5 = require('md5');

dotenv.config({path: '26-腾讯地图/.env'})
const originUrl = 'https://apis.map.qq.com';
const pathname = '/ws/district/v1/list';
const key = 'QEIBZ-SMDKK-Q6KJT-AU6LO-JEE4K-WVFJD';
// 获取签名时, 请求参数一定要按顺序排序
const sig = md5(`${pathname}?key=${key}${process.env.sk}`);

axios.get(`${originUrl}${pathname}?key=${key}&sig=${sig}`)
  .then(data => console.log(JSON.stringify(data.data)))
  .catch(err => console.error(err));

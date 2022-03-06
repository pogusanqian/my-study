const dotenv = require('dotenv');
const urlencode = require('urlencode');
const axios = require('axios');
const md5 = require('md5');

dotenv.config({path: '26-腾讯地图/.env'})
const originUrl = 'https://apis.map.qq.com';
const pathname = '/ws/place/v1/search';
const keyword = '酒店';
const boundary = 'nearby(39.908491,116.374328,1000)';
const key = 'QEIBZ-SMDKK-Q6KJT-AU6LO-JEE4K-WVFJD';
// 获取签名时, 请求参数一定要按顺序排序
const sig = md5(`${pathname}?boundary=${boundary}&key=${key}&keyword=${keyword}${process.env.sk}`);

axios.get(`${originUrl}${pathname}?boundary=${boundary}&key=${key}&keyword=${urlencode(keyword)}&sig=${sig}`)
  .then(data => console.log(data.data))
  .catch(err => console.error(err));

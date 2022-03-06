const dotenv = require('dotenv');
const urlencode = require('urlencode');
const axios = require('axios');
const md5 = require('md5');

dotenv.config({path: '26-腾讯地图/.env'})
const originUrl = 'https://apis.map.qq.com';
const pathname = '/ws/geocoder/v1/';
const key = 'QEIBZ-SMDKK-Q6KJT-AU6LO-JEE4K-WVFJD';
const address = '北京市海淀区彩和坊路海淀西大街74号';
const sig = md5(`${pathname}?address=${address}&key=${key}${process.env.sk}`);

axios.get(`${originUrl}${pathname}?address=${urlencode(address)}&key=${key}&sig=${sig}`)
  .then(data => console.log(JSON.stringify(data.data)))
  .catch(err => console.error(err));

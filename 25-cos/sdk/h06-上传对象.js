const dotenv = require('dotenv');
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');

dotenv.config({ path: '25-cos/.env' });
const path = './sources/imgs/美女1.jpg';
const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

cos.putObject({
  Bucket: `${process.env.Bucket}-${process.env.APPID}`,
  Region: process.env.Region,
  Key: '/imgs/美女.jpg',
  StorageClass: 'STANDARD', // 存储类型, 默认是STANDARD标准存储
  Body: fs.createReadStream(path),
  ContentLength: fs.statSync(path).size
}).then(data => console.log(data));
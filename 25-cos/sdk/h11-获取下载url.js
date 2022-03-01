const dotenv = require('dotenv');
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');

dotenv.config({ path: '25-cos/.env' });
const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

cos.getObjectUrl({
  Bucket: `${process.env.Bucket}-${process.env.APPID}`,
  Region: process.env.Region,
  Key: '/imgs/美女.jpg',
}, ((err, data) => console.log(data)));
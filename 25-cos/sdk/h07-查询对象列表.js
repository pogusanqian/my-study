const dotenv = require('dotenv');
const COS = require('cos-nodejs-sdk-v5');

dotenv.config({ path: '25-cos/.env' });
const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

cos.getBucket({
  Bucket: `${process.env.Bucket}-${process.env.APPID}`,
  Region: process.env.Region,
  Prefix: 'imgs',  // 前缀不要以/开头
}).then(data => console.log(data.Contents));
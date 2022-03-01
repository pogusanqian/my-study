const dotenv = require('dotenv');
const COS = require('cos-nodejs-sdk-v5');

dotenv.config({ path: '25-cos/.env' });
const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

cos.deleteObject({
  Bucket: `${process.env.Bucket}-${process.env.APPID}`,
  Region: process.env.Region,
  Key: '/imgs/美女.jpg',
}).then(data => console.log(JSON.stringify(data)));
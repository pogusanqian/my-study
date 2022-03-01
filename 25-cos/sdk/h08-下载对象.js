const dotenv = require('dotenv');
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');

dotenv.config({ path: '25-cos/.env' });
const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

cos.getObject({
  Bucket: `${process.env.Bucket}-${process.env.APPID}`,
  Region: process.env.Region,
  Key: '/imgs/美女.jpg',
  // Output: fs.createWriteStream('./sources/美女.jpg'), // 如果没有OutPut属性, 则可以再回调中将操作返回的Buffer
}).then(data => fs.writeFileSync('./sources/美女.jgp', data.Body));
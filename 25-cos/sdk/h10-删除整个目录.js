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
  Prefix: 'imgs',
}).then(data => {
  // cos不提供直接删除目录的方法, 需要先遍历出删除的数据然后再多对象删除
  return cos.deleteMultipleObject({
    Bucket: `${process.env.Bucket}-${process.env.APPID}`,
    Region: process.env.Region,
    Objects: data.Contents.map(item => ({ Key: item.Key }))
  });
}).then(data => console.log(data));
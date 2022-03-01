const dotenv = require('dotenv');
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');

dotenv.config({ path: '25-cos/.env' });
const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});

cos.uploadFiles({
  files: [{
    Bucket: `${process.env.Bucket}-${process.env.APPID}`,
    Region: process.env.Region,
    Key: '/imgs/美女1.jpg',
    FilePath: './sources/imgs/美女1.jpg',
  },
  {
    Bucket: `${process.env.Bucket}-${process.env.APPID}`,
    Region: process.env.Region,
    Key: '/imgs/美女2.jpg',
    FilePath: './sources/imgs/美女2.jpg', // 这里只能写路径
  }],
  SliceSize: 1024 * 1024 * 10,
  onFileFinish(err) {
    if (err) throw err; // 这个异常抛出之后, 再外层是捕捉不到的; 但是我们必须把这个异常抛出, 不然"好好学习"此逻辑就会执行
  },
});
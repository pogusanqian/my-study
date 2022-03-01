const dotenv = require('dotenv');
const COS = require('cos-nodejs-sdk-v5');

dotenv.config({ path: '25-cos/.env' });
const cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey,
});


(async () => {
  try {
    await cos.uploadFiles({
      files: [{
        Bucket: `${process.env.Bucket}-${process.env.APPID}`,
        Region: process.env.Region,
        Key: '/imgs',
        FilePath: './sources/imgs/*', // 无法使用通配符*
      }],
      SliceSize: 1024 * 1024 * 10,
      onFileFinish(err) {
        if (err) throw err; // 这个异常抛出之后, 在外层是捕捉不到的; 但是我们必须把这个异常抛出, 不然"好好学习"此逻辑就会执行
      },
    });
  } catch (err) {
    console.error('===========', err);
  }
  console.log('好好学习');

})();
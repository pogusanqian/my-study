const http = require('http');
const dotenv = require('dotenv');
const STS = require('qcloud-cos-sts');

dotenv.config({ path: '25-cos/.env' });
const app = http.createServer((req, rsp) => {
  const policy = {
    version: '2.0',
    statement: [{
      action: ['*'],
      effect: 'allow',
      principal: { 'qcs': ['*'] },
      resource: ['*'],
    }],
  };

  // 如果没有给process赋值, 这个方法会直接报错, 根本不会走到回调函数, 直接就把程序终止了
  // 因为谁都不知道调用的bao中他们的代码写的怎么样
  try {
    STS.getCredential({
      secretId: process.env.SecretId,
      secretKey: process.env.SecretKey,
      proxy: '',
      durationSeconds: 1800,
      policy: policy,
    }, (err, data) => {
      rsp.setHeader('Content-Type', 'application/json');
      rsp.end(JSON.stringify(err || data));
    });
  } catch (err) {
    console.error(err);
    rsp.end(JSON.stringify(err));
  }
});

app.listen(3000, () => console.log('启动服务成功'));
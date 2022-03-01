const http = require('http');
const dotenv = require('dotenv');
const STS = require('qcloud-cos-sts');

dotenv.config({ path: '25-cos/.env' });
/**
 * 1. 让客户端通过http请求获取一个临时密匙, 这样SecretId和SecretKey就不用放在客户端了
 * 2. 通过http的接口获取的临时密匙是可以添加对应的权限的
 * 3. 通过sdk获取临时密匙仍然是调用sts.tencentcloudapi.com暴漏的GetFederationToken接口
 * 4. policy参数说明: https://cloud.tencent.com/document/product/598/10603#6.-.E7.94.9F.E6.95.88.E6.9D.A1.E4.BB.B6.EF.BC.88condition.EF.BC.89
 */
const app = http.createServer((req, rsp) => {
  const policy = {
    version: '2.0',
    statement: [{
      action: [ // 允许的权限
        'name/cos:PutObject',
        'name/cos:PostObject',
      ],
      effect: 'allow',
      principal: { 'qcs': ['*'] },
      resource: [ // 允许操作的桶路径, preifx组成了一个允许操作的路径
        `qcs::cos:${process.env.Region}:uid/${process.env.APPID}:prefix//${process.env.APPID}/${process.env.Bucket}/imgs`,
      ],
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
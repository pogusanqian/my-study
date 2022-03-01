const http = require('http');
const axios = require('axios');
const dotenv = require('dotenv');
const STS = require('qcloud-cos-sts');

dotenv.config({ path: '25-cos/.env' });
const app = http.createServer(async (req, rsp) => {
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
        `qcs::cos:${process.env.region}:uid/${process.env.APPID}:prefix//${process.env.APPID}/${process.env.bucket}/imgs`,
      ],
    }],
  };

  // TODO 这里需要填写一些公共参数
  await axios.get('http://sts.tencentcloudapi.com', {
    Action: 'GetFederationToken',
    Version: '2018-08-13',
    Region: process.env.Region,
    Name: 'pogu',
    Policy: JSON.stringify(policy),
  });
});

app.listen(3000, () => console.log('启动服务成功'));
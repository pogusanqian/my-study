const dotenv = require('dotenv');
const COS = require('cos-nodejs-sdk-v5');

// 解析配置文件, config也会把属性加载到全局变量process.env中
const { parsed: config } = dotenv.config({ path: '25-cos/.env' });
// 创建cos对象
const cos = new COS({
    SecretId: process.env.SecretId,
    SecretKey: config.SecretKey,
});

// 获取bucket列表
cos.getService((err, data) => {
    if (err) throw err;
    console.log(data);
});
const axios = require('axios');
const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
    async getAuthorization(options, callback) {
        try {
            const { data } = await axios.get('http://127.0.0.1:3000/sts');
            callback({
                TmpSecretId: data.credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
                TmpSecretKey: data.credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
                SecurityToken: data.credentials.sessionToken,     // 临时密钥的 sessionToken
                ExpiredTime: data.expiredTime,                    // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
            });
        } catch (err) {
            console.error(err);
        }

    }
});

// 调用getService()后去buckets时, 会先调用getAuthorization获取临时的token
cos.getService().then(data => console.log(data.Buckets));
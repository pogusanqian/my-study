const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');
// 生成公钥和私钥
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

const pub = publicKey.toString('ascii');
const pri = privateKey.toString('ascii');
console.log(pub, pri);

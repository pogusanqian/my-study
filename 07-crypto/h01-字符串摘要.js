const crypto = require('crypto');

const pulicKey = '999';
const priviteKey = '999';
const hmac = crypto.createHmac('sha256', pulicKey);
hmac.update('你好世界');
console.log(hmac.digest('hex'));

const hmac2 = crypto.createHmac('sha256', priviteKey);
hmac2.update('你好世界');
console.log(hmac2.digest('hex'));

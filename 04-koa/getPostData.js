module.exports = function (ctx) {
  return new Promise(((resolve, reject) => {
    try {
      let str = '';
      ctx.req.on('data', (data) => {
        str += data;
      });
      ctx.req.on('end', (chunk) => {
        resolve(str);
      });
    } catch (e) {
      reject(e);
    }
  }));
};

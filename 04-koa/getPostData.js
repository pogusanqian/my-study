module.exports = function (ctx) {
  return new Promise(function (resolve, reject) {
    try {
      let str = '';
      ctx.req.on('data', function (data) {
        str += data;
      })
      ctx.req.on('end', function (chunk) {
        resolve(str);
      })
    } catch (e) {
      reject(e);
    }

  })
}

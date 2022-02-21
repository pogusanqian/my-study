const http = require('http');
const DataHubDao = require('../22-sequelize/dao/DataHubDao');

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const sql = urlObj.searchParams.get('sql');
  // 异步回调的将数据相应给客户端, 这样不会阻塞, 适合做大并发接受请求, 然后调用Java或Go来处理具体的业务逻辑(密集计算)
  DataHubDao.querySql(sql)
    .then(data => res.end(JSON.stringify(data)))
    .catch(err => console.error(err));
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

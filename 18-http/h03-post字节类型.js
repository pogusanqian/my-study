const http = require('http');

const server = http.createServer((req, res) => {
  res.end('请求成功');
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

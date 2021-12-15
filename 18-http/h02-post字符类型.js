const http = require('http');
const { URL } = require('url');

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = urlObj;
  // 获取字符流数据
  let body = '';
  req.on('data', (chunk) => { // http中的post请求, 应该分包传送过来的
    body += chunk;
  });
  req.on('end', () => {
    if (pathname === '/postStudent' && req.method === 'POST') { // 判断路径和请求方式
      // 根据请求头将字符串转换成对象
      if (req.headers['content-type'] === 'application/json') {
        console.log('JSON请求参数', JSON.parse(body));
      } else {
        console.log('其他请求参数: ', body);
      }
      res.end('请求成功');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain;charset=utf-8');
      res.end(`路径出错:${pathname}`);
    }
  });
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

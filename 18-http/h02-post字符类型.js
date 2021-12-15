const http = require('http');
const querystring = require('querystring');

// 不在考虑路由的问题了, 原文链接: https://www.jianshu.com/p/9e0129b01930
const server = http.createServer((req, res) => {
  const body = []; // 接收 post 数据
  req.on('data', (chuck) => { // chuck 是二进制数据
    body.push(chuck);
    // str += chunk; 使用字符串来接收
  });

  req.on('end', () => {
    // 将二进制数组拼接成一个 Buffer 对象, 并将buffer转换成字符串
    const buffer = Buffer.concat(body);
    const str = buffer.toString();
    const contentType = req.headers['content-type'];

    if (contentType === 'application/json') {
      console.log(str); // { name: '张三', age: 23 }JSON字符串
      console.log(JSON.parse(str)); // { name: '张三', age: 23 }
    } else if (contentType === 'application/x-www-form-urlencoded') {
      console.log(str); // name=%E5%BC%A0%E4%B8%89&age=23
      console.log(querystring.parse(str)); // 解析数据
    } else {
      console.log(str);
    }

    res.end('请求成功');
  });
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

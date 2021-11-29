const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  // 获取请求路径
  const pathname = req.url;
  if (pathname === '/getTxt') {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain;charset=gbk') // 也可以通过请求头设置编码
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end('你好世界'); // 设置相应字符串的编码, 默认是utf-8
  } else if (pathname === '/getJson') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // 响应给前端的是一个json字符串, 然后浏览器根据响应头将字符串解析成了json对象,
    res.end(JSON.stringify({
      name: '张三',
      age: 23,
    }));
  } else if (pathname === '/getFileTxt') {
    // txt格式是纯文本格式, 是可以使用字符传递的, 字符流传递的时候都需要设置编码, node默认的编码是utf-8 所以我们不用设置了
    res.statusCode = 200;
    // 设置相应类型, 设置的是文件内容在浏览器中展示的时候的编码, 这个编码只能设置在浏览器中展示的编码, 对于下载文件的编码是不起作用的
    res.setHeader('Content-Type', 'text/plain;charset=gbk');
    res.setHeader('Content-Disposition', 'attachment;filename=my.txt'); // 表示文本要下载, 并且指定了下载名称;
    const value = fs.readFileSync('../sources/my.txt'); // 读出来的是一个Buffer, Buffer是流
    res.end(value); // 这里就不能设置文件的编码了
  } else if (pathname === '/getFileExcle') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/octet-stream'); // 设置相应类型
    res.setHeader('Content-Disposition', 'attachment;filename=myexcle.xlsx'); // 表示文本要下载, 并且指定了下载名称
    const value = fs.readFileSync('../sources/myexcle.xlsx'); // 读出来的是一个Buffer
    res.end(value);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.end(`路径出错:${pathname}`);
  }
});

server.listen(port, () => {
  console.log('服务器启动成功');
});

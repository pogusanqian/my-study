const http = require('http');
const querystring = require('querystring');
const { ar } = require('faker/lib/locales');

// 原文链接: https://www.jianshu.com/p/9e0129b01930
const server = http.createServer((req, res) => {
  const body = []; // 接收 post 数据
  req.on('data', (chuck) => { // chuck 是二进制数据
    body.push(chuck);
  });

  req.on('end', () => {
    // 将二进制数组拼接成一个 Buffer 对象, 并将buffer转换成字符串
    const buffer = Buffer.concat(body);
    const str = buffer.toString();
    const contentType = req.headers['content-type'];

    /**
     contentType的值是: multipart/form-data; boundary=--------------------------915679419528704120966313
     boundary: 是分隔符, 但是这个分隔符少了两个--
      ----------------------------915679419528704120966313
      Content-Disposition: form-data; name="name"

      张三
      ----------------------------915679419528704120966313
      Content-Disposition: form-data; name="age"

      23
      ----------------------------915679419528704120966313--
     */

    if (contentType.includes('multipart/form-data')) {
      // 获取分隔符, 注意contentType中的分隔符本来就少两个--, 现在需要补上
      const boundary = `--${querystring.parse(contentType.split('; ')[1]).boundary}`;
      const boudaryLength = boundary.length;
      let arr = []; // 用来装传递过来的参数
      let bodyBuffer = Buffer.concat(body);
      // console.log(buffer.toString());
      let boudaryIndex = 0; // boundary在buffer中的位置

      bodyBuffer = bodyBuffer.slice(boudaryLength); // 去掉首行boudary
      while ((boudaryIndex = bodyBuffer.indexOf(boundary)) !== -1) {
        arr.push(bodyBuffer.slice(0, boudaryIndex)); // 把boundary前面的装到数组中
        bodyBuffer = bodyBuffer.slice(boudaryIndex + boudaryLength); // 将boundary后面的形成新的buffer
      }

      arr = arr.map((buf) => {
        buf = buf.slice(2, buf.length - 2); // 去掉首尾两个空行\r\n
        const n = buf.indexOf('\r\n\r\n');
        const info = buf.slice(0, n).toString(); // info 是字段描述信息，可以转换成字符串查看
        const key = info.slice(info.indexOf('"') + 1, info.lastIndexOf('";')); // 这里确定key的过滤条件还是有点问题
        const value = buf.slice(n + 4); // value 是字段数据
        return {
          key,
          value,
        };
      });
      // 响应一张图片
      const rspData = arr.find((item) => item.key === 'img').value;
      res.setHeader('Content-Type', 'image/png'); // 设置相应类型
      res.end(rspData);
    } else if (contentType === 'application/x-www-form-urlencoded') {
      console.log('=======');
    } else {
      console.log(str);
    }
  });
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

const http = require('http');
const DataHubDao = require('../22-sequelize/dao/DataHubDao');

// 整个请求的处理都是再async开启的协程中处理的; 主线程和协程之间交替使用执行权限, 根本不会造成阻塞
// node分发请求的时候, 使用的是监听实现的异步; 当接受到一个请求, 就会把请求放到createServer中的回调函数中进行处理
const server = http.createServer(async (req, res) => {
  const { pathname , searchParams} = new URL(req.url, `http://${req.headers.host}`);
  if (pathname == '/getStudents') {
    // promise调用then时, 协程就已经执行完毕了, then中的回调函数被放到了事件队列中; 主线程执行完毕后, 会扫描事件队列, 然后将值相应给客户端
    DataHubDao.querySql(searchParams.get('sql')).then(data => res.end(JSON.stringify(data))).catch(err => console.error(err));
  } else if (pathname == '/insertStudents') {
    for (let i = 0; i < 1000; i++) {
      const sql = `insert t_student (f_name, f_school_id) values('张三_${i}', ${i})`;
      // await等待时, 会把执行权限交给主线程; 主线程继续处理请求; 当querySql执行完毕后, 会再次获取执行权限
      await DataHubDao.doSql(sql);
    }
    await DataHubDao.doSql(`TRUNCATE t_student`);
    res.end('插入数据完成');
  } else {
    res.end('请求路径错误');
  }
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

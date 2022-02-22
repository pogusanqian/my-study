const http = require('http');
const DataHubDao = require('../22-sequelize/dao/DataHubDao');

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const { pathname, searchParams } = urlObj;

  if (pathname == '/getStudents') {
    const sql = `SELECT f_id FROM t_student`;
    DataHubDao.querySql(sql).then(data => res.end(JSON.stringify(data))).catch(err => console.error(err));
  } else if (pathname == '/insertStudents') {
    for (let i = 0; i < 1000; i++) {
      const sql = `insert t_student (f_name, f_school_id) values('张三_${i}', ${i})`;
      // TODO await等待根本不会影响到主线程
      await DataHubDao.querySql(sql);
    }
    await DataHubDao.querySql(`TRUNCATE t_student`);
    res.end('插入数据完成');
  } else {
    res.end('请求路径错误');
  }
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

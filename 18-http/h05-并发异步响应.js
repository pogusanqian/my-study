const http = require('http');
const DataHubDao = require('../22-sequelize/dao/DataHubDao');

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = urlObj;

  if (pathname == '/getStudents') {
    const sql = `SELECT * FROM t_student limit 10`;
    DataHubDao.querySql(sql).then(data => res.end(JSON.stringify(data))).catch(err => console.error(err));
  } else if (pathname == '/insertStudents') {
    setTimeout(() => {
      const sql = "INSERT t_student(f_name, f_school_id) VALUE('张三', '1001')";
      DataHubDao.doSql(sql).then(data => res.end(JSON.stringify(data))).catch(err => console.error(err));
    }, 5000);
  } else {
    res.end('请求路径错误');
  }
});

server.listen(3000, () => {
  console.log('服务器启动成功');
});

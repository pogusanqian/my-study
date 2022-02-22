const Koa = require('koa');
const KoaRouter = require('koa-router');
const DataHubDao = require('../22-sequelize/dao/DataHubDao');

const app = new Koa();
const router = new KoaRouter();

/**
 * 1. 在处理insertStudents的请求的时候, getStudents的请求可以被处理
 */
router.get('/insertStudents', async (ctx) => {
  console.log("==================插入数据开始==================start")
  for (let i = 0; i < 1000; i++) {
    const sql = `insert t_student (f_name, f_school_id) values('张三_${i}', ${i})`;
    await DataHubDao.querySql(sql);
  }
  await DataHubDao.querySql(`TRUNCATE t_student`);
  console.log("==================插入数据结束==================end")
  ctx.body = '插入数据成功';
});

router.get('/getStudents', async (ctx) => {
  console.log(`$$$$$$$$$$$$$读取数据开始, uuid=>${ctx.query.uuid}`);
  const sql = `select f_name from t_student order by f_id DESC limit 10`;
  ctx.body = await DataHubDao.querySql(sql);
  console.log(`%%%%%%%%%%%%%读取数据结束, uuid=>${ctx.query.uuid}`);
});

router.get('/getStudentsSync', async (ctx) => {
  console.log(`getStudentsSync读取数据开始, uuid=>${ctx.query.uuid}`);
  const sql = `select f_name from t_student order by f_id DESC limit 10`;
  DataHubDao.querySql(sql);
  ctx.body = '请求完成功';
  console.log(`getStudentsSync读取数据结束, uuid=>${ctx.query.uuid}`);
});


app.use(router.routes());
app.listen(3000, () => console.log('服务启动成功'));

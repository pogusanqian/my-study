const Koa = require('koa');
const KoaRouter = require('koa-router');
const DataHubDao = require('../22-sequelize/dao/DataHubDao');

const app = new Koa();
const router = new KoaRouter();

/**
 * 1. 在处理insertStudents的请求的时候, getStudents的请求可以被处理
 * 2. 每一个请求的处理都是通过协程处理的, 主线程仍然是再跑的
 */
router.get('/insertStudents', async (ctx) => {
  console.log("==================插入数据开始==================start");
  for (let i = 0; i < 100; i++) {
    const sql = `insert t_student (f_name, f_school_id) values('张三_${i}', ${i})`;
    await DataHubDao.doSql(sql);
  }
  await DataHubDao.doSql(`TRUNCATE t_student`);
  console.log("==================插入数据结束==================end");
  ctx.body = '插入数据成功';
});

router.get('/getStudents', async (ctx) => { // 使用协程处理了请求
  console.log(`getStudents读取数据开始`);
  ctx.body = await DataHubDao.querySql(ctx.query.sql);
  console.log(`getStudents读取数据结束`);
});

app.use(router.routes());
app.listen(3000, () => console.log('服务启动成功'));

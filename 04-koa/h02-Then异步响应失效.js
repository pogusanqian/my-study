const Koa = require('koa');
const DataHubDao = require('../22-sequelize/dao/DataHubDao');

const app = new Koa();

/**
 * 1. then无法给ctx赋值, 很有可能是因为ctx是一个会话变量,  当中间件执行完毕后, 就要把ctx上的body值响应给客户端
 * 2. 当执行then的时候, 整个协程中间件就已经执行完毕了, 此时koa就会立即将body值响应给客户端, 但是此时的body没有赋值, 就报错了
 * 3. 当koa响应给客户端空body之后, 主线程已经执行完毕; 然后主线程就会去任务队列中拉取回调函数, 然后给body赋值, 但是此时赋值太晚了, body值已经被相应给客户端了
 * 4. then和await的区别:
 *    await等待是又协程处理的, 此时中间件并没有执行完毕, 所以当异步执行完毕之后, 协程可以给ctx.body赋值
 *    then回调是由主线程处理的, 当主线程处理then时, 整个中间件早执行完了(但是并没有给body赋值), koa相应给客户端的是一个空body(报错)
 */ 
app.use(async ctx => {
  const sql = 'select * from t_student limit 10';
  DataHubDao.querySql(sql).then(data => ctx.body = data);
});

app.listen(3000, () => console.log('服务启动成功'));

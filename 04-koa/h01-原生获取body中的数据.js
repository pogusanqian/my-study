const Koa = require('koa');
const KoaRouter = require('koa-router');
const getPostData = require('./getPostData');

const app = new Koa();
const router = new KoaRouter();

router.post('/test', async (ctx, next) => {
  // 主要是通过data事件读取相关的值
  const body = await getPostData(ctx);
  console.log('post参数', body);
  ctx.body = '成功';
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

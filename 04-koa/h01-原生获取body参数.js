const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

function getPostData(ctx) {
  return new Promise(((resolve, reject) => {
    try {
      let str = '';
      ctx.req.on('data', (data) => {
        str += data;
      });
      ctx.req.on('end', (chunk) => {
        resolve(str);
      });
    } catch (e) {
      reject(e);
    }
  }));
}

router.post('/test', async (ctx, next) => {
  const body = await getPostData(ctx);
  console.log('post参数', body);
  ctx.body = '成功';
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);

const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const { client } = require("@tars/rpc");
const {Hello } = require("./proxy/HelloProxy.js");

// 创建代理对象, 代理对象可以通过servent名称参数Hello.HelloRpcServer.HelloObj进行寻址, 查找到rpc服务所在的地址
const proxy = client.stringToProxy(Hello.TestProxy, "Hello.HelloRpcServer.HelloObj");

router.get("/hello", (ctx, next) => {
  ctx.body = "hello tars";
});

router.get("/add", async (ctx, next) => {
  const {a, b} = ctx.query;
  const res = await proxy.add(Number(a), Number(b));
  ctx.body = res.response;
});

app.use(router.routes());
app.use(async (ctx, next) => {
  await next();
  ctx.status = 404;
  ctx.body = "404 Not Found";
});

// 这里的ip和port在通过web部署的时候, 可以进行传递
const hostname = process.env.IP || "0.0.0.0";
const port = process.env.PORT || 5000;

app.listen(port, hostname, () => {
  console.log(`server listening at ${hostname}:${port}`);
});
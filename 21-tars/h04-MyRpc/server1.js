const { server } = require('@tars/rpc');
const { Util } = require('./protocol/UtilImp');

// endpoint, protocol必填; endpoint暴漏的网址如果是127.0.0.1的话, 非本机的客户端代理是访问不同的
const svr = server.createServer(Util.CalculateImp);
svr.start({
  name: 'Util.CalculateServer.CalculateObjAdapetr',
  servant: 'Util.CalculateServer.CalculateObj',
  endpoint: 'tcp -h 127.0.0.1 -p 14001 -t 10000',
  maxconns: 200000,
  protocol: 'tars'
});

console.log('启动tar服务');
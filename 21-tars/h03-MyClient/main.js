const { client } = require('@tars/rpc');
const { Util } = require('./proxy/UtilProxy');

// 创建客户端代理
const remoteStr = 'Util.CalculateServer.CalculateObj@tcp -h 192.168.124.13 -p 14001 -t 10000';
const localStr = 'Util.CalculateServer.CalculateObj@tcp -h 127.0.0.1 -p 14001 -t 10000';
const proxy = client.stringToProxy(Util.CalculateProxy, localStr);

proxy.add(10, 20).then(data => console.log(data.response)).done();
proxy.sub(10, 20).then(data => console.log(data.response)).done();
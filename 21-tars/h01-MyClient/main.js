const { client } = require("@tars/rpc");
const { Hello } = require("./proxy/HelloProxy");

// 创建客户端代理
const proxy = client.stringToProxy(Hello.TestProxy, "Hello.HelloRpcServer.HelloObj@tcp -h 192.168.254.132 -t 7000 -p 6000 -e 0");
proxy.add(10, 20).then(data => console.log(data.response)).done();
const Tars = require("@tars/rpc");
const path = require("path");
const Hello = require("./protocol/HelloImp").Hello;

const svr = new Tars.server();
const impMap = {
  "Hello.HelloRpcServer.HelloObj": Hello.TestImp
};
svr.initialize(process.env.TARS_CONFIG || path.resolve(__dirname, "./dev.config.conf"), function (server) {
  const servantName = `${server.Application}.${server.ServerName}.HelloObj`;
  server.addServant(impMap[servantName], servantName);
});
svr.start();
console.log("tars server started");
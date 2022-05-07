"use strict";

var Util = require("./Util.js").Util;
module.exports.Util = Util;

Util.CalculateImp.prototype.initialize = function () {
};

Util.CalculateImp.prototype.add = function (current, a, b, c) {
    c = a + b;
    current.sendResponse(0, c);
};

Util.CalculateImp.prototype.sub = function (current, a, b, c) {
    c = a - b;
    current.sendResponse(0, c);
};

Util.CalculateImp.prototype.show = function (current, stuReq, stuRsp) {
    stuRsp =stuReq;
    current.sendResponse(stuReq, stuRsp);
};



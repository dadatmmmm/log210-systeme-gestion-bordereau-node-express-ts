"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.encodeSession = void 0;
var jwt_simple_1 = require("jwt-simple");
function encodeSession(secretKey, partialSession) {
    var algorithm = "HS512";
    var issued = Date.now();
    var fifteenMinutesInMs = 15 * 60 * 1000;
    var expires = issued + fifteenMinutesInMs;
    var session = __assign(__assign({}, partialSession), { issued: issued, expires: expires });
    return {
        token: (0, jwt_simple_1.encode)(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}
exports.encodeSession = encodeSession;

"use strict";
exports.__esModule = true;
exports.decodeSession = void 0;
var jwt_simple_1 = require("jwt-simple");
function decodeSession(secretKey, tokenString) {
    // Always use HS512 to decode the token
    var algorithm = "HS512";
    var result;
    try {
        result = (0, jwt_simple_1.decode)(tokenString, secretKey, false, algorithm);
    }
    catch (_e) {
        var e = _e;
        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token",
                session: null,
                id: null
            };
        }
        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error",
                session: null,
                id: null
            };
        }
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token",
                session: null,
                id: null
            };
        }
        throw e;
    }
    return {
        type: "valid",
        session: result,
        id: result.id
    };
}
exports.decodeSession = decodeSession;

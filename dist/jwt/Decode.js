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
        var error = _e;
        var errorParam = {
            session: null,
            id: null
        };
        if (error.message === "No token supplied" || error.message === "Not enough or too many segments") {
            return __assign({ type: "Token invalide" }, errorParam);
        }
        if (error.message === "Signature verification failed" || error.message === "Algorithm not supported") {
            return __assign({ type: "Erreur d'intégrité" }, errorParam);
        }
        if (error.message.indexOf("Unexpected token") === 0) {
            return __assign({ type: "Token invalide" }, errorParam);
        }
        throw error;
    }
    return {
        type: "Valide",
        session: result,
        id: result.id
    };
}
exports.decodeSession = decodeSession;

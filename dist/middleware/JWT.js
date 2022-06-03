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
exports.requireJwtMiddleware = exports.SECRET_KEY_HERE = void 0;
var Decode_1 = require("./Decode");
var CheckExpiration_1 = require("./CheckExpiration");
var Encode_1 = require("./Encode");
exports.SECRET_KEY_HERE = "rggvnecenDE3308";
function requireJwtMiddleware(request, response, next) {
    var unauthorized = function (message) { return response.status(401).json({
        ok: false,
        status: 401,
        message: message
    }); };
    // const requestHeader = "X-Be-Token";
    // const responseHeader = "X-Renewed-JWT-Token";
    // const header = request.header(requestHeader);
    var token = request.query.token;
    if (!token) {
        unauthorized("Required token not found.");
        return;
    }
    var decodedSession = (0, Decode_1.decodeSession)(exports.SECRET_KEY_HERE, token);
    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized("Failed to decode or validate authorization token. Reason: " + decodedSession.type + ".");
        return;
    }
    var expiration = (0, CheckExpiration_1.checkExpirationStatus)(decodedSession.session);
    if (expiration === "expired") {
        unauthorized("Authorization token has expired. Please create a new authorization token.");
        return;
    }
    var session;
    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        var _a = (0, Encode_1.encodeSession)(exports.SECRET_KEY_HERE, decodedSession.session), token_1 = _a.token, expires = _a.expires, issued = _a.issued;
        session = __assign(__assign({}, decodedSession.session), { expires: expires, issued: issued });
        response.session = session;
    }
    else {
        session = decodedSession.session;
    }
    // Set the session on response.locals object for routes to access
    response.locals = __assign(__assign({}, response.locals), { session: session });
    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}
exports.requireJwtMiddleware = requireJwtMiddleware;

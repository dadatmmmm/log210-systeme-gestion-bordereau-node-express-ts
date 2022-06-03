"use strict";
exports.__esModule = true;
exports.checkExpirationStatus = void 0;
function checkExpirationStatus(token) {
    var now = Date.now();
    if (token.expires > now)
        return "active";
    // Find the timestamp for the end of the token's grace period
    var threeHoursInMs = 3 * 60 * 60 * 1000;
    var threeHoursAfterExpiration = token.expires + threeHoursInMs;
    if (threeHoursAfterExpiration > now)
        return "grace";
    return "expired";
}
exports.checkExpirationStatus = checkExpirationStatus;

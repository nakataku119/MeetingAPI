"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
function errorHandle(error, res) {
    console.error(error);
    return res.status(error.status || 500).send(error.message);
}
exports.errorHandle = errorHandle;

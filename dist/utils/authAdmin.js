"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = void 0;
const currentUser_1 = require("./currentUser");
const authAdmin = (req, res, next) => {
    const currentUser = (0, currentUser_1.getUserFromCache)();
    if (currentUser.admin) {
        next();
    }
    else {
        const error = new Error("権限がありません。");
        error.status = 403;
        next(error);
    }
};
exports.authAdmin = authAdmin;

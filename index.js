"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const agendas_1 = __importDefault(require("./routes/agendas"));
const meetings_1 = __importDefault(require("./routes/meetings"));
const admin_1 = __importDefault(require("./routes/admin"));
const userId_1 = require("./utils/userId");
const auth_1 = require("./utils/auth");
const cors_1 = __importDefault(require("./utils/cors"));
const cache_1 = require("./utils/cache");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const app = (0, express_1.default)();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use(express_1.default.json());
/**
 * @swagger
 * /:
 *  get:
 *    description: ルート
 *    responses:
 *      200:
 *        description: "top response"
 */
app.get("/", (req, res) => {
    res.json("top response");
});
app.use("/*", cors_1.default, auth_1.checkJwt, userId_1.setUserIdToCache);
/**
 * @swagger
 * /logout:
 *  post:
 *    description: ログインユーザーのキャッシュを削除
 *    responses:
 *      200:
 *        description: 成功
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *              example: キャッシュを削除しました。
 */
app.post("/logout", (req, res) => {
    console.log("logout");
    (0, cache_1.deleteCache)();
    res.json("キャッシュを削除しました。");
});
app.use("/", users_1.default, agendas_1.default, meetings_1.default, admin_1.default);
app.listen(8080, () => {
    console.log("8080起動");
});

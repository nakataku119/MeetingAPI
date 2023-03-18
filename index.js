"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const agendas_1 = __importDefault(require("./routes/agendas"));
const meetings_1 = __importDefault(require("./routes/meetings"));
// JWTのチェック
const checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    // .envに書く　環境変数
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    tokenSigningAlg: "RS256",
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
// corsの設定
const allowedOrigins = [process.env.CLIENT_ORIGIN_URL];
const options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)(options));
// リクエストボディにユーザーIDを追加する共通処理
app.use("/*", 
// checkJwt,
function (req, res, next) {
    var _a;
    if ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) {
        // 例外？
        const decoded = (0, jwt_decode_1.default)(req.headers["authorization"].split(" ")[1]);
        req.body.id = decoded.sub;
    }
    next();
});
app.use("/", users_1.default, teams_1.default, agendas_1.default, meetings_1.default);
app.listen(8080, () => {
    console.log("8080起動");
});

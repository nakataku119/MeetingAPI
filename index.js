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
const cors_1 = __importDefault(require("./utils/cors"));
const cache_1 = require("./utils/cache");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json("top response");
});
// app.use("/*", cors, checkJwt, setUserIdToCache);
app.use("/*", cors_1.default);
app.post("/logout", (req, res) => {
    console.log("logout");
    (0, cache_1.deleteCache)();
    res.json("キャッシュを削除しました。");
});
app.use("/", users_1.default, agendas_1.default, meetings_1.default, admin_1.default);
app.listen(8080, () => {
    console.log("8080起動");
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const agendas_1 = __importDefault(require("./routes/agendas"));
const meetings_1 = __importDefault(require("./routes/meetings"));
const admin_1 = __importDefault(require("./routes/admin"));
const userId_1 = require("./utils/userId");
const auth_1 = require("./utils/auth");
const cors_1 = __importDefault(require("./utils/cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json("top response");
});
app.use("/*", cors_1.default, auth_1.checkJwt, userId_1.setUserIdToCache);
app.use("/", users_1.default, teams_1.default, agendas_1.default, meetings_1.default, admin_1.default);
app.listen(8080, () => {
    console.log("8080起動");
});

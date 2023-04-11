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
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./swagger";
const userId_1 = require("./utils/userId");
const app = (0, express_1.default)();
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
    res.json("root response");
});
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", cors_1.default, userId_1.setUserIdToReq, users_1.default, agendas_1.default, meetings_1.default, admin_1.default);
app.listen(8080, () => {
    console.log("8080起動");
});

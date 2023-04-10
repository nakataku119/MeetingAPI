import express, { Express, NextFunction, Request, Response } from "express";
import usersRoutes from "./routes/users";
import agendaRoutes from "./routes/agendas";
import meetingRoutes from "./routes/meetings";
import adminRoutes from "./routes/admin";
import { setUserIdToCache } from "./utils/userId";
import { checkJwt } from "./utils/auth";
import cors from "./utils/cors";
import { deleteCache } from "./utils/cache";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app: Express = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

/**
 * @swagger
 * /:
 *  get:
 *    description: ルート
 *    responses:
 *      200:
 *        description: "top response"
 */
app.get("/", (req: Request, res: Response) => {
  res.json("top response");
});

app.use("/*", cors, checkJwt, setUserIdToCache);

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
app.post("/logout", (req: Request, res: Response) => {
  console.log("logout");
  deleteCache();
  res.json("キャッシュを削除しました。");
});

app.use("/", usersRoutes, agendaRoutes, meetingRoutes, adminRoutes);

app.listen(8080, () => {
  console.log("8080起動");
});

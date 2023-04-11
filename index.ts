import express, { Express, Request, Response } from "express";
import usersRoutes from "./routes/users";
import agendaRoutes from "./routes/agendas";
import meetingRoutes from "./routes/meetings";
import adminRoutes from "./routes/admin";
import cors from "./utils/cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { setUserIdToReq } from "./utils/userId";

const app: Express = express();
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
  res.json("root response");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  "/",
  cors,
  setUserIdToReq,
  usersRoutes,
  agendaRoutes,
  meetingRoutes,
  adminRoutes
);

app.listen(8080, () => {
  console.log("8080起動");
});

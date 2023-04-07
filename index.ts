import express, { Express, NextFunction, Request, Response } from "express";
import usersRoutes from "./routes/users";
import agendaRoutes from "./routes/agendas";
import meetingRoutes from "./routes/meetings";
import adminRoutes from "./routes/admin";
import { setUserIdToCache } from "./utils/userId";
import { checkJwt } from "./utils/auth";
import cors from "./utils/cors";
import { deleteCache } from "./utils/cache";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("top response");
});

// app.use("/*", cors, checkJwt, setUserIdToCache);
app.use("/*", cors);
app.post("/logout", (req: Request, res: Response) => {
  console.log("logout");
  deleteCache();
  res.json("キャッシュを削除しました。");
});

app.use("/", usersRoutes, agendaRoutes, meetingRoutes, adminRoutes);

app.listen(8080, () => {
  console.log("8080起動");
});

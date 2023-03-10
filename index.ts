import express, { NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import jwt_decode from "jwt-decode";

const checkJwt = auth({
  audience: "https://meeting-app-back",
  issuerBaseURL: "https://dev-8qn600b6uii32mqx.us.auth0.com",
  tokenSigningAlg: "RS256",
});

const app: express.Express = express();
const prisma = new PrismaClient();
app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
// リクエストボディにユーザーIDを追加する共通処理
app.use(
  "/*",
  function (req: express.Request, res: express.Response, next: NextFunction) {
    if (req.headers["authorization"]?.split(" ")[1]) {
      const decoded: { sub: string } = jwt_decode(
        req.headers["authorization"].split(" ")[1]
      );
      req.body.id = decoded.sub;
    }
    next();
  }
);
// topページへアクセス
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello");
});
// User一覧の取得
app.get(
  "/users",
  checkJwt,
  async (req: express.Request, res: express.Response) => {
    const decoded: { sub: string } = jwt_decode(
      req.headers["authorization"]?.split(" ")[1]!
    );
    console.log(decoded.sub);
    const users = await prisma.user.findMany();
    return res.json(users);
  }
);
// 特定ユーザーの取得
app.get("/users/:id", async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return res.json(user);
});
// Userデータの追加
app.post("/users", async (req: express.Request, res: express.Response) => {
  const { id, name } = req.body;
  const user = await prisma.user.create({
    data: {
      id: id,
      name: name,
    },
  });
  return res.json(user);
});
// Userデータの更新
app.put("/users/:id", async (req: express.Request, res: express.Response) => {
  const { id, name } = req.body;
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  return res.json(user);
});
// Userデータの削除
app.delete(
  "/users/:id",
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    return res.json(user);
  }
);

app.listen(3333, () => {
  console.log("3000起動");
});

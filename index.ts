import express from "express";
import { PrismaClient } from "@prisma/client";
const app: express.Express = express();
const prisma = new PrismaClient();
app.use(express.json());
// topページへアクセス
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello");
});
// User一覧の取得
app.get("/users", async (req: express.Request, res: express.Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
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

app.listen(3000, () => {
  console.log("3000起動");
});

import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Userデータの追加
router.post("/users", async (req: Request, res: Response) => {
  const { id, name } = req.body;
  const user = await prisma.user.create({
    data: {
      id: id,
      name: name,
    },
  });
  return res.json(user);
});
// User一覧の取得
router.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});
// 特定ユーザーの取得
router.get("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return res.json(user);
});
// Userデータの更新
router.put("/users/:id", async (req: Request, res: Response) => {
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
router.delete("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return res.json(user);
});

export default router;
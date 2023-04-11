import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorHandle } from "../utils/errorHandle";

const router = Router();
const prisma = new PrismaClient();

router.get("/users/me", async (req: Request, res: Response) => {
  console.log(req.body.id);
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: req.body.id },
      include: {
        mtgs: {
          include: { agendas: true, users: { where: { deleted: false } } },
        },
        teams: {
          where: { deleted: false },
          include: {
            users: {
              where: { NOT: { id: req.body.id }, deleted: false },
            },
          },
        },
      },
    });
    return res.json(currentUser);
  } catch (error) {
    errorHandle(error, res);
  }
});

router.post("/users", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        id: req.body.sub,
        name: name,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "作成に失敗ました。" });
  }
});

router.put("/users", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "ユーザー名は必須です。" });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: req.body.sub,
      },
      data: {
        name,
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: "更新に失敗しました。" });
  }
});

export default router;

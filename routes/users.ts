import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromCache } from "../utils/userId";

const router = Router();
const prisma = new PrismaClient();

router.get("/users/me", async (req: Request, res: Response) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: getUserIdFromCache() },
      include: {
        mtgs: {
          include: { agendas: true, users: { where: { deleted: false } } },
        },
        teams: {
          where: { deleted: false },
          include: {
            users: {
              where: { NOT: { id: getUserIdFromCache() }, deleted: false },
            },
          },
        },
      },
    });
    return res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "ユーザー情報の取得に失敗しました。" });
  }
});

router.post("/users", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        id: getUserIdFromCache(),
        name: name,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "更新に失敗ました。" });
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
        id: getUserIdFromCache(),
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

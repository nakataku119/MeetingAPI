import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { setUserToCache, getUserFromCache } from "../utils/currentUser";
import { authAdmin } from "../utils/authAdmin";

const router = Router();
const prisma = new PrismaClient();

router.use(setUserToCache, authAdmin);

router.get("/admin/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ where: { deleted: false } });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "情報の取得に失敗しました。" });
  }
});

router.delete("/admin/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "削除に失敗しました。" });
  }
});

router.post("/admin/teams", async (req: Request, res: Response) => {
  const { name, members } = req.body.data;
  if (!name) {
    return res.status(400).json({ error: "必須項目があります。" });
  }

  try {
    const team = await prisma.team.create({
      data: {
        name: name,
        users: {
          connect: members,
        },
      },
    });
    return res.json(team);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "登録に失敗しました。" });
  }
});

router.get("/admin/teams", async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany({
      where: { deleted: false },
      include: {
        users: true,
      },
    });
    return res.json(teams);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "取得に失敗しました。" });
  }
});

router.put("/admin/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { members, name } = req.body.data;

  if (!name) {
    return res.status(400).json({ error: "必須項目があります。" });
  }

  try {
    const team = await prisma.team.update({
      where: {
        id,
      },
      data: {
        name: name,
        users: {
          set: members,
        },
      },
      include: {
        users: true,
      },
    });
    return res.json(team);
  } catch (error) {
    console.log(error);
    res.json(400).json({ error: "更新に失敗しました。" });
  }
});

router.delete("/admin/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const team = await prisma.team.update({
      where: {
        id,
      },
      data: { deleted: true },
    });
    return res.json(team);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "削除に失敗しました。" });
  }
});

export default router;

import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { authAdmin } from "../utils/authAdmin";
import { errorHandle } from "../utils/errorHandle";

const router = Router();
const prisma = new PrismaClient();

router.use(authAdmin);

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
    errorHandle(error, res);
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
    errorHandle(error, res);
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
    errorHandle(error, res);
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
    errorHandle(error, res);
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
    errorHandle(error, res);
  }
});

export default router;

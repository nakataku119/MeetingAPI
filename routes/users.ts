import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getUserIdFromCache } from "../utils/userId";

const router = Router();
const prisma = new PrismaClient();

router.get("/users/me", async (req: Request, res: Response) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: getUserIdFromCache() },
    include: {
      mtgs: { include: { agendas: true, users: true } },
      teams: {
        include: { users: { where: { NOT: { id: getUserIdFromCache() } } } },
      },
    },
  });
  return res.json(currentUser);
});

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

router.put("/users", async (req: Request, res: Response) => {
  const { id, name } = req.body;
  if (!name) {
    return;
  }
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

export default router;

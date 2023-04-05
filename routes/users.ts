import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { saveUserToCache, getUserFromCache } from "../cache";

const router = Router();
const prisma = new PrismaClient();

router.get("/users/me", async (req: Request, res: Response) => {
  const currentUser = await prisma.user.findUnique({
    where: { id: req.body.id },
    include: {
      mtgs: { include: { agendas: true, users: true } },
      teams: { include: { users: { where: { NOT: { id: req.body.id } } } } },
    },
  });
  saveUserToCache(currentUser);
  return res.json(currentUser);
});

router.get("/users", async (req: Request, res: Response) => {
  console.log(getUserFromCache());
  console.log("test");
  const users = await prisma.user.findMany();
  return res.json(users);
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

import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// import { saveUserToCache, getUserFromCache } from "../cache";

const router = Router();
const prisma = new PrismaClient();

router.get("/admin/users", async (req: Request, res: Response) => {
  // console.log(getUserFromCache());
  console.log("admin/users");
  const users = await prisma.user.findMany();
  return res.json(users);
});

router.delete("/admin/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return res.json(user);
});

router.post("/admin/teams", async (req: Request, res: Response) => {
  const { name, members } = req.body.data;
  const team = await prisma.team.create({
    data: {
      name: name,
      users: {
        connect: members,
      },
    },
  });
  return res.json(team);
});

router.get("/admin/teams", async (req: Request, res: Response) => {
  const teams = await prisma.team.findMany({
    include: {
      users: true,
    },
  });
  return res.json(teams);
});

router.put("/admin/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { members, name } = req.body.data;
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
});

router.delete("/admin/teams/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const team = await prisma.team.delete({
    where: {
      id,
    },
  });
  return res.json(team);
});

export default router;

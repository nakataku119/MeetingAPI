import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// ゲストユーザーデモ用
router.get("/users/guest", async (req: Request, res: Response) => {
  const guestUser = await prisma.user.findUnique({
    where: { id: "guest" },
    include: {
      mtgs: {
        include: {
          agendas: true,
          users: true,
          team: { include: { users: { where: { NOT: { id: "guest" } } } } },
        },
      },
      teams: { include: { users: { where: { NOT: { id: "guest" } } } } },
    },
  });
  return res.json(guestUser);
});

// ログインユーザーのデータ、所属チーム、参加ミーテイング、関連のメンバーを取得
router.get("/users/me", async (req: Request, res: Response) => {
  console.log(req.body.id);
  const currentUser = await prisma.user.findUnique({
    where: { id: req.body.id },
    include: {
      mtgs: { include: { agendas: true, users: true } },
      teams: { include: { users: { where: { NOT: { id: req.body.id } } } } },
    },
  });
  return res.json(currentUser);
});
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
// router.get("/users/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const user = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });
//   return res.json(user);
// });
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
// 紐づくミーティングの取得
router.get("/users/:id/mtgs", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user_mtgs = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      mtgs: true,
    },
  });
  return res.json(user_mtgs);
});
// 紐づくチームの取得
router.get("/users/:id/teams", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user_teams = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      teams: true,
    },
  });
  return res.json(user_teams);
});

export default router;

// 使わないAPIは作らない　情報漏洩のリスク
// フロントを作りながら、何が必要か不要か意識する
// 論理削除と物理削除

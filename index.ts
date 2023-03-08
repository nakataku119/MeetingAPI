import express from "express";
import { PrismaClient } from "@prisma/client";
const app: express.Express = express();
const prisma = new PrismaClient();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("こんにち");
});

app.get("/users", async (req: express.Request, res: express.Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

app.listen(3000, () => {
  console.log("3000起動");
});

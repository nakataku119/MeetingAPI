import express from "express";
const app: express.Express = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("こんにち");
});
app.listen(3000, () => {
  console.log("3000起動");
});

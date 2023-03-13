import express, { NextFunction } from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import jwt_decode from "jwt-decode";
import usersRoutes from "./routes/users";
import teamsRoutes from "./routes/teams";
import topicRoutes from "./routes/topics";
import meetingRoutes from "./routes/meetings";

const checkJwt = auth({
  audience: "https://meeting-app-back",
  issuerBaseURL: "https://dev-8qn600b6uii32mqx.us.auth0.com",
  tokenSigningAlg: "RS256",
});

const app: express.Express = express();
app.use(express.json());
// corsの設定
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
// リクエストボディにユーザーIDを追加する共通処理
app.use(
  "/*",
  function (req: express.Request, res: express.Response, next: NextFunction) {
    if (req.headers["authorization"]?.split(" ")[1]) {
      const decoded: { sub: string } = jwt_decode(
        req.headers["authorization"].split(" ")[1]
      );
      req.body.id = decoded.sub;
    }
    next();
  }
);

app.use("/", usersRoutes, teamsRoutes, topicRoutes, meetingRoutes);

// topページへアクセス
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hello");
});
app.listen(3333, () => {
  console.log("3000起動");
});

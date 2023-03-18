import express, { NextFunction } from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import jwt_decode from "jwt-decode";
import usersRoutes from "./routes/users";
import teamsRoutes from "./routes/teams";
import agendaRoutes from "./routes/agendas";
import meetingRoutes from "./routes/meetings";
// JWTのチェック
const checkJwt = auth({
  // .envに書く　環境変数
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: "RS256",
});
const app: express.Express = express();
app.use(express.json());
// corsの設定
const allowedOrigins = [process.env.CLIENT_ORIGIN_URL!];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
// リクエストボディにユーザーIDを追加する共通処理
app.use(
  "/*",
  // checkJwt,
  function (req: express.Request, res: express.Response, next: NextFunction) {
    if (req.headers["authorization"]?.split(" ")[1]) {
      // 例外？
      const decoded: { sub: string } = jwt_decode(
        req.headers["authorization"].split(" ")[1]
      );
      req.body.id = decoded.sub;
    }
    next();
  }
);

app.use("/", usersRoutes, teamsRoutes, agendaRoutes, meetingRoutes);

app.listen(8080, () => {
  console.log("8080起動");
});

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import jwt_decode from "jwt-decode";
import usersRoutes from "./routes/users";
import teamsRoutes from "./routes/teams";
import agendaRoutes from "./routes/agendas";
import meetingRoutes from "./routes/meetings";
import adminRoutes from "./routes/admin";
import { setUserIdToCache, getUserIdFromCache } from "./utils/userId";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json("top response");
});

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: "RS256",
});

const allowedOrigins = [
  process.env.CLIENT_ORIGIN_URL!,
  process.env.CLIENT_ORIGIN_LOCAL_URL!,
  process.env.CLIENT_ORIGIN_DEV_URL!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.use("/*", checkJwt, setUserIdToCache);

app.use(
  "/",
  usersRoutes,
  teamsRoutes,
  agendaRoutes,
  meetingRoutes,
  adminRoutes
);

app.listen(8080, () => {
  console.log("8080起動");
});

import cors from "cors";

const allowedOrigins = [
  process.env.CLIENT_ORIGIN_URL!,
  process.env.CLIENT_ORIGIN_LOCAL_URL!,
  process.env.CLIENT_ORIGIN_DEV_URL!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export default cors(options);

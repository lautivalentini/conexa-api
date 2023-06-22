import dotenv from "dotenv";
dotenv.config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  PORT: process.env.PORT ?? 3000,
  MONGODB_URI: process.env.MONGODB_URI ?? "",
};

export default config;

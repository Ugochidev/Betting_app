import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "production",
  dbUrl: process.env.DATABASE_URL || "",
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    "03afc0820d376f9fdb1e8faa460902c6f74705feb01f101c480f4205964e3e10",
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    "7bfd6e6512e8ac8b56e31cfbdbe767892a87075039d4a524b2b2ddcb2fb2c69f",
  saltRounds: 10,
  redisHost: process.env.REDIS_HOST || "127.0.0.1",
  redisPort: process.env.REDIS_PORT || "6379",
};

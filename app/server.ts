import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";
import connectDB from "./config/database";
import apiRouter from ".";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
if (env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use("/api", apiRouter);

(async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`⚡  Server ready  →  http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error("❌  Startup failed:", err);
    process.exit(1);
  }
})();

export default app;
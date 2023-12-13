import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";
import environment from "../config/environment";
import logger from "morgan";
import errorHandler from "../shared/middlewares/errorHandler";
import rateLimiter from "../shared/middlewares/rateLimiter";
import routes from "../shared/routes";

export default class App {
  app: express.Application;
  constructor() {
    this.app = express();
    require("../config/database");
    this.app.use(
      logger("dev", {
        skip: (request: Request, response: Response) =>
          environment.nodeEnv === "test",
      })
    );
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(rateLimiter);
    this.setRoutes();
    this.app.use(errorHandler);
  }

  setRoutes() {
    this.app.get("/", async (request: Request, response: Response) => {
      response.json({
        status: true,
        message: "Welcome",
      });
    });

    this.app.use("/api/v1", routes);
  }

  getApp() {
    return this.app;
  }

  listen() {
    const { port } = environment;
    this.app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  }
}

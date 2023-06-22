import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import config from "./config";
import routes from "./routes";
import handlerError from "./middlewares/handlerError.middleware";
import { connectToMongoDB } from "./database";
import notFoundRoute from "./middlewares/notFoundRoute.middleware";

const init = async () => {
  const app = express();

  // Connection to MongoDB
  await connectToMongoDB();

  // Middlewares
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(logger("dev"));

  // Routes
  app.use(routes);

  // Not Found Routes
  app.use(notFoundRoute);

  // Handler HTTP errors
  app.use(handlerError);

  app.listen(config.PORT, () => {
    console.log(`> Ready on http://localhost:${config.PORT}`);
  });
};

init();

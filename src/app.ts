import express from "express";
import cors from "cors";
import logger from "morgan";
import path from "path";
import routes from "./routes";
import handlerError from "./middlewares/handlerError.middleware";
import notFoundRoute from "./middlewares/notFoundRoute.middleware";

const app = express();

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

export default app;

import { Router } from "express";

import exampleController from "../../controllers/exampleController/exampleController.js";
import exampleMiddlewares from "../../middlewares/exampleMiddlewares/exampleMiddleware.js";

const exampleRouter = Router();

exampleRouter.get("/test", exampleMiddlewares.exampleMiddleware ,exampleController);

export default exampleRouter;
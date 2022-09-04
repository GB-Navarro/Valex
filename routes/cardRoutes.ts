import { Router } from "express";

import cardMiddlewares from "../middlewares/cardMiddlewares/cardMiddlewares.js";
import cardController from "../controllers/cardController/cardController.js";

const cardRouter = Router();

cardRouter.post("/createCard", cardMiddlewares.checkApiKeyExistence, cardMiddlewares.validateCreateCardSchema, cardController);

export default cardRouter;